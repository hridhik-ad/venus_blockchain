"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // ─── CURSOR ───
    const dot = document.getElementById("cur-dot");
    const ring = document.getElementById("cur-ring");
    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    let animFrame: number;
    const anim = () => {
      if (dot && ring) {
        dot.style.left = mx + "px";
        dot.style.top = my + "px";
        rx += (mx - rx) * 0.1;
        ry += (my - ry) * 0.1;
        ring.style.left = rx + "px";
        ring.style.top = ry + "px";
      }
      animFrame = requestAnimationFrame(anim);
    };
    anim();

    const hoverEls = document.querySelectorAll("a,button,.svc-card,.talent-card,.feature-item");
    const handleMouseEnter = () => document.body.classList.add("hovering");
    const handleMouseLeave = () => document.body.classList.remove("hovering");

    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    // ─── PARTICLE ORBS ───
    const canvas = canvasRef.current;
    let ctx: CanvasRenderingContext2D | null = null;
    let orbs: any[] = [];
    let orbFrame: number;

    if (canvas) {
      ctx = canvas.getContext("2d");
      const resize = () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      };
      resize();
      window.addEventListener("resize", resize);

      const COLORS = ["rgba(232,100,44,", "rgba(201,169,110,", "rgba(184,201,176,", "rgba(242,212,194,", "rgba(13,27,62,"];
      for (let i = 0; i < 18; i++) {
        orbs.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 180 + 60,
          dx: (Math.random() - 0.5) * 0.35,
          dy: (Math.random() - 0.5) * 0.35,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: Math.random() * 0.12 + 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }

      const drawOrbs = () => {
        const currentCtx = ctx;
        if (!currentCtx || !canvas) return;
        currentCtx.clearRect(0, 0, canvas.width, canvas.height);
        orbs.forEach((o) => {
          o.phase += 0.008;
          o.x += o.dx;
          o.y += o.dy;
          if (o.x < -o.r) o.x = canvas.width + o.r;
          if (o.x > canvas.width + o.r) o.x = -o.r;
          if (o.y < -o.r) o.y = canvas.height + o.r;
          if (o.y > canvas.height + o.r) o.y = -o.r;
          const pulse = o.alpha + Math.sin(o.phase) * 0.03;
          const grad = currentCtx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
          grad.addColorStop(0, o.color + pulse + ")");
          grad.addColorStop(1, o.color + "0)");
          currentCtx.beginPath();
          currentCtx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
          currentCtx.fillStyle = grad;
          currentCtx.fill();
        });
        orbFrame = requestAnimationFrame(drawOrbs);
      };
      drawOrbs();
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
      cancelAnimationFrame(orbFrame);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cur-dot"></div>
      <div id="cur-ring"></div>
      <canvas id="orb-canvas" ref={canvasRef}></canvas>
    </>
  );
}
