"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let mx = 0, my = 0, rx = 0, ry = 0;
        const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
        document.addEventListener("mousemove", move);

        let raf: number;
        const anim = () => {
            if (dotRef.current) { dotRef.current.style.left = mx + "px"; dotRef.current.style.top = my + "px"; }
            rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
            if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
            raf = requestAnimationFrame(anim);
        };
        raf = requestAnimationFrame(anim);

        return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cur-dot hidden lg:block" />
            <div ref={ringRef} className="cur-ring hidden lg:block" />
        </>
    );
}

export function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize();
        window.addEventListener("resize", resize);

        const COLORS = ["rgba(232,100,44,", "rgba(201,169,110,", "rgba(184,201,176,", "rgba(242,212,194,", "rgba(13,27,62,"];
        const orbs = Array.from({ length: 14 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            r: Math.random() * 180 + 60,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.35,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.12 + 0.04,
            phase: Math.random() * Math.PI * 2,
        }));

        let raf: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            orbs.forEach((o) => {
                o.phase += 0.008;
                o.x += o.dx; o.y += o.dy;
                if (o.x < -o.r) o.x = canvas.width + o.r;
                if (o.x > canvas.width + o.r) o.x = -o.r;
                if (o.y < -o.r) o.y = canvas.height + o.r;
                if (o.y > canvas.height + o.r) o.y = -o.r;
                const pulse = o.alpha + Math.sin(o.phase) * 0.03;
                const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
                grad.addColorStop(0, o.color + pulse + ")");
                grad.addColorStop(1, o.color + "0)");
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);

        return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-65" />;
}

export function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            (entries) => { entries.forEach((e) => { if (e.isIntersecting) el.classList.add("reveal-visible"); }); },
            { threshold: 0.12 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className={`reveal-base ${className}`} style={{ transitionDelay: `${delay}s` }}>
            {children}
        </div>
    );
}
