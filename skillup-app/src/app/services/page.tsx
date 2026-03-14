"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SERVICES_DATA = [
  {
    id: "01",
    name: "Smart Contract Dev",
    desc: "Solidity, Rust, and Move developers ready to build audited, gas-optimized contracts.",
    count: "1,240 gigs",
    icon: "⬡",
    color: "rgba(232,100,44,0.1)",
  },
  {
    id: "02",
    name: "Web3 Design",
    desc: "UI/UX designers specializing in dApps, NFT platforms, and DeFi dashboards.",
    count: "870 gigs",
    icon: "◈",
    color: "rgba(201,169,110,0.12)",
  },
  {
    id: "03",
    name: "Token Engineering",
    desc: "Tokenomics design, whitepaper writing, and economic modeling for your protocol.",
    count: "420 gigs",
    icon: "◎",
    color: "rgba(184,201,176,0.2)",
  },
  {
    id: "04",
    name: "Security Audits",
    desc: "On-chain verified audit reports from top-ranked security researchers worldwide.",
    count: "310 gigs",
    icon: "🛡",
    color: "rgba(13,27,62,0.07)",
  },
  {
    id: "05",
    name: "Frontend dApps",
    desc: "React devs fluent in ethers.js, wagmi, RainbowKit and wallet integrations.",
    count: "980 gigs",
    icon: "💻",
    color: "rgba(242,212,194,0.4)",
  },
  {
    id: "06",
    name: "Community & Growth",
    desc: "Discord management, community building, influencer campaigns & launch strategy.",
    count: "660 gigs",
    icon: "📣",
    color: "rgba(232,100,44,0.08)",
  },
  {
    id: "07",
    name: "NFT Creation",
    desc: "Generative art, 1/1 artwork, metadata design, and collection deployment.",
    count: "750 gigs",
    icon: "🎨",
    color: "rgba(201,169,110,0.12)",
  },
  {
    id: "08",
    name: "Protocol Research",
    desc: "ZK circuit design, cryptography consulting, and litepaper writing.",
    count: "190 gigs",
    icon: "🔬",
    color: "rgba(184,201,176,0.2)",
  },
  {
    id: "09",
    name: "Zero Knowledge Proofs",
    desc: "Implementing privacy-preserving features using Circom, Noir, and Halo2.",
    count: "150 gigs",
    icon: "👤",
    color: "rgba(13,27,62,0.1)",
  },
  {
    id: "10",
    name: "AI & Web3 Integration",
    desc: "Developing autonomous agents and AI-powered dApps on decentralized networks.",
    count: "320 gigs",
    icon: "🧠",
    color: "rgba(232,100,44,0.15)",
  },
  {
    id: "11",
    name: "DAO Governance",
    desc: "Setting up governance structures, voting mechanisms, and treasury management.",
    count: "210 gigs",
    icon: "⚖️",
    color: "rgba(184,201,176,0.15)",
  },
  {
    id: "12",
    name: "Cross-Chain Solutions",
    desc: "Bridging assets and data across multiple L1s and L2s securely.",
    count: "440 gigs",
    icon: "🕸",
    color: "rgba(201,169,110,0.2)",
  }
];

export default function ServicesPage() {
  const tiltCardsRef = useRef<NodeListOf<Element> | null>(null);

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

    // Cleanup
    return () => {
      // tilt listener cleanup could be added if needed
    };
  }, []);

  return (
    <>
      <main className="services-page" style={{ paddingTop: "140px" }}>
        <section className="services-section">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Marketplace</div>
              <h1 className="section-title reveal">
                Browse <em>Services</em>
              </h1>
              <p className="hero-sub reveal" style={{ marginTop: "20px" }}>
                Find specialized talent for your Web3 project. From smart contracts to tokenomics, we have the world's best freelancers ready to build.
              </p>
            </div>
            <div className="search-bar reveal" style={{ maxWidth: "400px", width: "100%", position: "relative" }}>
               <input 
                type="text" 
                placeholder="Search services..." 
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  borderRadius: "100px",
                  border: "1px solid var(--border)",
                  background: "#fff",
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "14px",
                  outline: "none"
                }}
               />
            </div>
          </div>

          <div className="services-grid">
            {SERVICES_DATA.map((svc, idx) => (
              <div key={svc.id} className={`svc-card tilt-card reveal reveal-d${(idx % 4) + 1}`}>
                <div className="svc-icon-wrap" style={{ background: svc.color }}>
                  <span>{svc.icon}</span>
                  <div className="svc-num">{svc.id}</div>
                </div>
                <div className="svc-name">{svc.name}</div>
                <div className="svc-desc">{svc.desc}</div>
                <div className="svc-footer">
                  <div className="svc-count">{svc.count}</div>
                  <div className="svc-arrow">→</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section reveal" style={{ margin: "140px 60px" }}>
          <div>
            <div className="cta-eyebrow">Don't see what you need?</div>
            <h2 className="cta-title">
              Post a <em>Custom Job</em>
            </h2>
            <p className="cta-sub">
              Explain your project requirements and let our specialized talent come to you. Start building your decentralized vision now.
            </p>
          </div>
          <div className="cta-actions">
            <Link href="#" className="btn-light">
              Post a Job →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
