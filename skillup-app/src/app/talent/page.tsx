"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TALENT_DATA = [
  {
    id: "KR",
    name: "Kaito Ryu",
    role: "Lead Smart Contract Engineer",
    bio: "Former core contributor at Uniswap v3. Specializes in DeFi protocol architecture, gas optimization, and custom EVM tooling. 3 critical vulnerabilities disclosed responsibly.",
    skills: ["Solidity", "Foundry", "EVM", "DeFi", "Hardhat"],
    rate: "0.08 ETH",
    rating: "4.99",
    reviews: "312",
    color: "linear-gradient(135deg,#e8642c,#c9a96e)",
    featured: true
  },
  {
    id: "SR",
    name: "Sofia Reyes",
    role: "Web3 UX Designer",
    bio: "10 years designing crypto products. Built UI for 3 top-20 DeFi protocols. Figma master + frontend-fluent.",
    skills: ["Figma", "React", "dApp UI"],
    rate: "0.04 ETH",
    rating: "4.98",
    reviews: "187",
    color: "linear-gradient(135deg,#0d1b3e,#4a6fa5)",
    featured: false
  },
  {
    id: "AM",
    name: "Alex Marchetti",
    role: "ZK Proof Engineer",
    bio: "Circom and Noir specialist. PhD-level cryptography. Active zkEVM contributor and researcher.",
    skills: ["Circom", "Noir", "zkEVM"],
    rate: "0.12 ETH",
    rating: "4.95",
    reviews: "89",
    color: "linear-gradient(135deg,#b8c9b0,#4a7a40)",
    featured: false
  },
  {
    id: "LJ",
    name: "Li Jing",
    role: "Frontend dApp Developer",
    bio: "Expert in ethers.js and wagmi. Built high-performance trading interfaces for several L2 protocols.",
    skills: ["React", "Wagmi", "Tailwind", "Ethers"],
    rate: "0.05 ETH",
    rating: "4.97",
    reviews: "154",
    color: "linear-gradient(135deg,#f2d4c2,#e8642c)",
    featured: false
  },
  {
    id: "DW",
    name: "David Wright",
    role: "Token Economist",
    bio: "Specializing in game theory and economic modeling. Designed tokenomics for 5+ successful project launches.",
    skills: ["Python", "Economics", "Math", "CadCAD"],
    rate: "0.10 ETH",
    rating: "4.92",
    reviews: "62",
    color: "linear-gradient(135deg,#c9a96e,#0d1b3e)",
    featured: false
  },
  {
    id: "SK",
    name: "Sarah Kim",
    role: "Security Researcher",
    bio: "Ex-audit firm lead. Discovered multiple high-severity bugs in major protocols. Certified Auditor.",
    skills: ["Security", "Auditing", "Mythril", "Slither"],
    rate: "0.15 ETH",
    rating: "5.00",
    reviews: "45",
    color: "linear-gradient(135deg,#4a7a40,#b8c9b0)",
    featured: false
  }
];

export default function TalentPage() {
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
      <main className="talent-page" style={{ paddingTop: "140px" }}>
        <section className="talent-section">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">Discover</div>
              <h1 className="section-title reveal">
                Web3 <em>Talent</em>
              </h1>
              <p className="hero-sub reveal" style={{ marginTop: "20px" }}>
                Connect with the world's most elite blockchain professionals. Our talent are verified on-chain and reviewed by the community.
              </p>
            </div>
          </div>

          <div className="talent-grid">
            {TALENT_DATA.map((talent, idx) => (
              <div 
                key={talent.id} 
                className={`talent-card tilt-card reveal ${talent.featured ? 'featured-card' : `reveal-d${(idx % 3) + 1}`}`}
                style={talent.featured ? { gridColumn: "1 / -1" } : {}}
              >
                <div 
                  className="talent-av" 
                  style={{ 
                    background: talent.color,
                    marginBottom: talent.featured ? "0" : "20px" 
                  }}
                >
                  {talent.id}
                </div>
                <div>
                  <div className="talent-role">{talent.role}</div>
                  <div className="talent-name">{talent.name}</div>
                  <div className="talent-bio">{talent.bio}</div>
                  <div className="talent-skills">
                    {talent.skills.map(skill => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <div className="talent-rate-row">
                    <div className="talent-rate">
                      {talent.rate} <small>/ hour</small>
                    </div>
                    <div>
                      <div className="stars">★★★★★</div>
                      <div className="review-count">{talent.reviews} reviews</div>
                    </div>
                  </div>
                </div>
                {talent.featured && (
                   <div className="talent-right-meta">
                    <div className="talent-big-rating">{talent.rating}</div>
                    <div className="talent-reviews-label">Overall score</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="cta-section reveal" style={{ margin: "140px 60px" }}>
          <div>
            <div className="cta-eyebrow">Are you a Web3 expert?</div>
            <h2 className="cta-title">
              Join the <em>Protocol</em>
            </h2>
            <p className="cta-sub">
              Create your on-chain profile and start receiving gigs from the best Web3 projects. Your reputation is your most valuable asset.
            </p>
          </div>
          <div className="cta-actions">
            <Link href="#" className="btn-light">
              Become a Freelancer →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
