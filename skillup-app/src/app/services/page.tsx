"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const SERVICES_DATA = [
  {
    id: "01",
    name: "Smart Contract Audit",
    desc: "Rigorous security analysis of your Solidity or Rust contracts by top-tier auditors.",
    count: "1,240 gigs",
    icon: "🛡",
    color: "rgba(232,100,44,0.2)",
  },
  {
    id: "02",
    name: "Product Design",
    desc: "Premium Web3-first UX/UI design that converts users and defines your protocol brand.",
    count: "890 gigs",
    icon: "✨",
    color: "rgba(74,111,165,0.2)",
  },
  {
    id: "03",
    name: "dApp Development",
    desc: "Full-stack decentralized application building from zero to mainnet launch.",
    count: "2,100 gigs",
    icon: "⚡",
    color: "rgba(74,122,64,0.2)",
  },
  {
    id: "04",
    name: "Cross-Chain Solutions",
    desc: "Bridging assets and data across multiple L1s and L2s securely.",
    count: "440 gigs",
    icon: "🕸",
    color: "rgba(201,169,110,0.2)",
  }
];

export default function ServicesPage() {
  const tiltCardsRef = useRef<NodeListOf<Element> | null>(null);
  const { isLoggedIn, openAuthModal } = useAuth();

  const handleServiceClick = (e: React.MouseEvent, name: string) => {
    if (!isLoggedIn) {
      e.preventDefault();
      openAuthModal();
    } else {
      console.log(`Navigating to service: ${name}`);
    }
  };

  useEffect(() => {
    // ─── 3D CARD TILT ───
    tiltCardsRef.current = document.querySelectorAll(".tilt-card");
    const initTilt = (card: Element) => {
      const htmlCard = card as HTMLElement;
      const handleTiltMove = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const r = htmlCard.getBoundingClientRect();
        const x = (mouseEvent.clientX - r.left) / r.width - 0.5;
        const y = (mouseEvent.clientY - r.top) / r.height - 0.5;
        htmlCard.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`;
        htmlCard.style.boxShadow = `${-x * 15}px ${-y * 15}px 45px rgba(15,14,12,0.1)`;
      };
      const handleTiltLeave = () => {
        htmlCard.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)";
        htmlCard.style.boxShadow = "";
      };
      htmlCard.addEventListener("mousemove", handleTiltMove);
      htmlCard.addEventListener("mouseleave", handleTiltLeave);
    };
    tiltCardsRef.current.forEach(initTilt);

    // ─── SCROLL REVEAL ───
    const revEls = document.querySelectorAll(".reveal");
    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    revEls.forEach((el) => ro.observe(el));
  }, []);

  return (
    <main className="services-page" style={{ paddingTop: "140px" }}>
      <section className="services-section">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Marketplace</div>
            <h1 className="section-title reveal">
              Premium <em>Services</em>
            </h1>
          </div>
          <div className="search-wrap reveal">
            <input type="text" placeholder="Search services..." className="search-input" />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES_DATA.map((svc, idx) => (
            <div 
              key={svc.id} 
              className={`svc-card tilt-card reveal reveal-d${(idx % 4) + 1}`}
              onClick={(e) => handleServiceClick(e, svc.name)}
              style={{ cursor: "pointer" }}
            >
              <div className="svc-icon-wrap" style={{ background: svc.color }}>
                <span>{svc.icon}</span>
                <div className="svc-num">{svc.id}</div>
              </div>
              <h3 className="svc-name">{svc.name}</h3>
              <p className="svc-desc">{svc.desc}</p>
              <div className="svc-footer">
                <span className="svc-count">{svc.count}</span>
                <span className="svc-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <div className="cta-section reveal" style={{ margin: "140px 60px" }}>
        <div>
          <h2 className="cta-title">
            Can't find what you <em>need?</em>
          </h2>
          <p className="cta-sub">
            Post a custom job request and let our verified experts bid on your project.
          </p>
        </div>
        <div className="cta-actions">
          <Link href="#" className="btn-primary">
            Post a Job Request →
          </Link>
        </div>
      </div>
    </main>
  );
}
