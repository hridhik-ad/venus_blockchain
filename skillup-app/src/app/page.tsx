"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
        htmlCard.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale3d(1.02,1.02,1.02)`;
        htmlCard.style.transition = "transform 0.05s";
        htmlCard.style.boxShadow = `${-x * 20}px ${-y * 20}px 60px rgba(15,14,12,0.13)`;
      };
      const handleTiltLeave = () => {
        htmlCard.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale3d(1,1,1)";
        htmlCard.style.transition = "transform 0.5s cubic-bezier(.16,1,.3,1), box-shadow 0.5s";
        htmlCard.style.boxShadow = "";
      };
      htmlCard.addEventListener("mousemove", handleTiltMove);
      htmlCard.addEventListener("mouseleave", handleTiltLeave);
    };
    tiltCardsRef.current.forEach(initTilt);

    // Hero card special
    const hc = document.getElementById("hero3dCard");
    if (hc && hc.parentElement && hc.parentElement.parentElement) {
      hc.parentElement.parentElement.addEventListener("mousemove", (e) => {
        const r = hc.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        hc.style.transform = `perspective(1200px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
        hc.style.transition = "transform 0.08s";
      });
      hc.parentElement.parentElement.addEventListener("mouseleave", () => {
        hc.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
        hc.style.transition = "transform 0.6s cubic-bezier(.16,1,.3,1)";
      });
    }

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
      { threshold: 0.12 }
    );
    revEls.forEach((el) => ro.observe(el));

    // Cleanup
    return () => {
      // tilt listener cleanup could be added if needed
    };

  }, []);

  return (
    <>
      {/* Page content only, Navbar and Footer are in layout.tsx */}

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Blockchain-Powered Freelance</div>
          <h1 className="hero-h1">
            Hire the<br />
            <em>World&apos;s Best</em><br />
            <span className="outline-text">Web3 Talent</span>
          </h1>
          <p className="hero-sub">
            A decentralized marketplace where smart contracts replace middlemen — payments are
            trustless, reputations are on-chain, and opportunity has no borders.
          </p>
          <div className="hero-actions">
            <Link href="/talent" className="btn-primary">
              Browse Talent →
            </Link>
            <Link href="#" className="btn-ghost">
              How it Works
            </Link>
          </div>
          <div className="hero-trust">
            <div className="trust-avatars">
              <div className="trust-av" style={{ background: "linear-gradient(135deg,#e8642c,#c9a96e)" }}>KR</div>
              <div className="trust-av" style={{ background: "linear-gradient(135deg,#0d1b3e,#4a6fa5)" }}>SR</div>
              <div className="trust-av" style={{ background: "linear-gradient(135deg,#b8c9b0,#4a7a40)" }}>AM</div>
              <div className="trust-av" style={{ background: "linear-gradient(135deg,#f2d4c2,#e8642c)" }}>LJ</div>
            </div>
            <div className="trust-text">
              Trusted by <strong>12,000+ freelancers</strong><br />
              across 94 countries
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div style={{ position: "relative" }}>
            <div className="float-badge" style={{ animationDelay: "0s" }}>
              <div className="float-icon">🔒</div>
              <div className="float-text">
                <div className="float-label">Escrow Active</div>
                <div className="float-val">0.08 ETH</div>
              </div>
            </div>
            <div
              className="float-badge"
              style={{ animationDelay: "1.5s", bottom: "auto", top: "-20px", right: "-32px", left: "auto" }}
            >
              <div className="float-icon">⭐</div>
              <div className="float-text">
                <div className="float-label">Rating</div>
                <div className="float-val">4.99 / 5.0</div>
              </div>
            </div>
            <div className="hero-card-wrap">
              <div className="hero-card" id="hero3dCard">
                <div className="card-header">
                  <div className="card-profile">
                    <div className="card-avatar">KR</div>
                    <div>
                      <div className="card-name">Kaito Ryu</div>
                      <div className="card-role">Smart Contract Engineer</div>
                    </div>
                  </div>
                  <div className="card-verified">✓ Verified</div>
                </div>
                <div className="card-gig-title">DeFi Protocol Architecture & Solidity Development</div>
                <div className="card-gig-desc">
                  Former Uniswap v3 contributor. I build secure, gas-optimized smart
                  contracts with 3 CVEs disclosed and zero exploits in production.
                </div>
                <div className="card-tags">
                  <span className="tag">Solidity</span>
                  <span className="tag">Foundry</span>
                  <span className="tag">EVM</span>
                  <span className="tag">DeFi</span>
                  <span className="tag">Auditing</span>
                </div>
                <div className="card-footer">
                  <div className="card-price">
                    0.08 ETH <span>/ hr</span>
                  </div>
                  <Link href="#" className="card-hire">
                    Hire Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="stats-strip reveal">
        <div className="stat-item">
          <div className="stat-num">
            12<em>K+</em>
          </div>
          <div className="stat-label">Verified Freelancers</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-num">
            $4.2<em>M</em>
          </div>
          <div className="stat-label">Paid On-Chain</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-num">
            0.8<em>%</em>
          </div>
          <div className="stat-label">Protocol Fee</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-num">94</div>
          <div className="stat-label">Countries</div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="services-section">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">What We Offer</div>
            <h2 className="section-title reveal">
              All <em>Services</em>
            </h2>
          </div>
          <Link href="/services" className="view-all-link">
            Browse All
          </Link>
        </div>
        <div className="services-grid">
          <div className="svc-card tilt-card reveal reveal-d1">
            <div className="svc-icon-wrap" style={{ background: "rgba(232,100,44,0.1)" }}>
              <span>⬡</span>
              <div className="svc-num">01</div>
            </div>
            <div className="svc-name">Smart Contract Dev</div>
            <div className="svc-desc">
              Solidity, Rust, and Move developers ready to build audited, gas-optimized contracts.
            </div>
            <div className="svc-footer">
              <div className="svc-count">1,240 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
          <div className="svc-card tilt-card reveal reveal-d2">
            <div className="svc-icon-wrap" style={{ background: "rgba(201,169,110,0.12)" }}>
              <span>◈</span>
              <div className="svc-num">02</div>
            </div>
            <div className="svc-name">Web3 Design</div>
            <div className="svc-desc">
              UI/UX designers specializing in dApps, NFT platforms, and DeFi dashboards.
            </div>
            <div className="svc-footer">
              <div className="svc-count">870 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
          <div className="svc-card tilt-card reveal reveal-d3">
            <div className="svc-icon-wrap" style={{ background: "rgba(184,201,176,0.2)" }}>
              <span>◎</span>
              <div className="svc-num">03</div>
            </div>
            <div className="svc-name">Token Engineering</div>
            <div className="svc-desc">
              Tokenomics design, whitepaper writing, and economic modeling for your protocol.
            </div>
            <div className="svc-footer">
              <div className="svc-count">420 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
          <div className="svc-card tilt-card reveal reveal-d4">
            <div className="svc-icon-wrap" style={{ background: "rgba(13,27,62,0.07)" }}>
              <span>🛡</span>
              <div className="svc-num">04</div>
            </div>
            <div className="svc-name">Security Audits</div>
            <div className="svc-desc">
              On-chain verified audit reports from top-ranked security researchers worldwide.
            </div>
            <div className="svc-footer">
              <div className="svc-count">310 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
          <div className="svc-card tilt-card reveal reveal-d1">
            <div className="svc-icon-wrap" style={{ background: "rgba(242,212,194,0.4)" }}>
              <span>💻</span>
              <div className="svc-num">05</div>
            </div>
            <div className="svc-name">Frontend dApps</div>
            <div className="svc-desc">
              React devs fluent in ethers.js, wagmi, RainbowKit and wallet integrations.
            </div>
            <div className="svc-footer">
              <div className="svc-count">980 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
          <div className="svc-card tilt-card reveal reveal-d2">
            <div className="svc-icon-wrap" style={{ background: "rgba(232,100,44,0.08)" }}>
              <span>📣</span>
              <div className="svc-num">06</div>
            </div>
            <div className="svc-name">Community & Growth</div>
            <div className="svc-desc">
              Discord management, community building, influencer campaigns & launch strategy.
            </div>
            <div className="svc-footer">
              <div className="svc-count">660 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
          <div className="svc-card tilt-card reveal reveal-d3">
            <div className="svc-icon-wrap" style={{ background: "rgba(201,169,110,0.12)" }}>
              <span>🎨</span>
              <div className="svc-num">07</div>
            </div>
            <div className="svc-name">NFT Creation</div>
            <div className="svc-desc">
              Generative art, 1/1 artwork, metadata design, and collection deployment.
            </div>
            <div className="svc-footer">
              <div className="svc-count">750 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
          <div className="svc-card tilt-card reveal reveal-d4">
            <div className="svc-icon-wrap" style={{ background: "rgba(184,201,176,0.2)" }}>
              <span>🔬</span>
              <div className="svc-num">08</div>
            </div>
            <div className="svc-name">Protocol Research</div>
            <div className="svc-desc">
              ZK circuit design, cryptography consulting, and litepaper writing.
            </div>
            <div className="svc-footer">
              <div className="svc-count">190 gigs</div>
              <div className="svc-arrow">→</div>
            </div>
          </div>
        </div>
      </section>

      {/* TALENT */}
      <section className="talent-section">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Top Talent</div>
            <h2 className="section-title reveal">
              Featured <em>Freelancers</em>
            </h2>
          </div>
          <Link href="/talent" className="view-all-link">
            Browse All
          </Link>
        </div>
        <div className="talent-grid">
          <div className="talent-card featured-card tilt-card reveal">
            <div className="talent-av" style={{ background: "linear-gradient(135deg,#e8642c,#c9a96e)" }}>
              KR
            </div>
            <div>
              <div className="talent-role">Lead Smart Contract Engineer</div>
              <div className="talent-name">Kaito Ryu</div>
              <div className="talent-bio">
                Former core contributor at Uniswap v3. Specializes in DeFi protocol
                architecture, gas optimization, and custom EVM tooling. 3 critical vulnerabilities disclosed
                responsibly.
              </div>
              <div className="talent-skills">
                <span className="skill-tag">Solidity</span>
                <span className="skill-tag">Foundry</span>
                <span className="skill-tag">EVM</span>
                <span className="skill-tag">DeFi</span>
                <span className="skill-tag">Hardhat</span>
              </div>
              <div className="talent-rate-row">
                <div className="talent-rate">
                  0.08 ETH <small>/ hour</small>
                </div>
                <div>
                  <div className="stars">★★★★★</div>
                  <div className="review-count">312 reviews</div>
                </div>
              </div>
            </div>
            <div className="talent-right-meta">
              <div className="talent-big-rating">4.99</div>
              <div className="talent-reviews-label">Overall score</div>
            </div>
          </div>

          <div className="talent-card tilt-card reveal reveal-d1">
            <div
              className="talent-av"
              style={{ background: "linear-gradient(135deg,#0d1b3e,#4a6fa5)", marginBottom: "20px" }}
            >
              SR
            </div>
            <div className="talent-role">Web3 UX Designer</div>
            <div className="talent-name">Sofia Reyes</div>
            <div className="talent-bio">
              10 years designing crypto products. Built UI for 3 top-20 DeFi protocols. Figma
              master + frontend-fluent.
            </div>
            <div className="talent-skills">
              <span className="skill-tag">Figma</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">dApp UI</span>
            </div>
            <div className="talent-rate-row">
              <div className="talent-rate">
                0.04 ETH <small>/ hr</small>
              </div>
              <div>
                <div className="stars">★★★★★</div>
                <div className="review-count">187 reviews</div>
              </div>
            </div>
          </div>

          <div className="talent-card tilt-card reveal reveal-d2">
            <div
              className="talent-av"
              style={{ background: "linear-gradient(135deg,#b8c9b0,#4a7a40)", marginBottom: "20px" }}
            >
              AM
            </div>
            <div className="talent-role">ZK Proof Engineer</div>
            <div className="talent-name">Alex Marchetti</div>
            <div className="talent-bio">
              Circom and Noir specialist. PhD-level cryptography. Active zkEVM contributor and
              researcher.
            </div>
            <div className="talent-skills">
              <span className="skill-tag">Circom</span>
              <span className="skill-tag">Noir</span>
              <span className="skill-tag">zkEVM</span>
            </div>
            <div className="talent-rate-row">
              <div className="talent-rate">
                0.12 ETH <small>/ hr</small>
              </div>
              <div>
                <div className="stars">★★★★★</div>
                <div className="review-count">89 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="how-bg-text">WORK</div>
        <div className="section-eyebrow">Process</div>
        <h2 className="section-title reveal">
          How It <em>Works</em>
        </h2>
        <div className="how-steps">
          <div className="how-step reveal reveal-d1">
            <div className="step-dot">01</div>
            <div className="step-title">Connect Wallet</div>
            <div className="step-desc">
              Link your Ethereum or any EVM wallet. Your address is your identity — no email
              required.
            </div>
          </div>
          <div className="how-step reveal reveal-d2">
            <div className="step-dot">02</div>
            <div className="step-title">Post or Browse</div>
            <div className="step-desc">
              Post a job on-chain or browse thousands of verified gigs filtered by chain,
              skill, and reputation.
            </div>
          </div>
          <div className="how-step reveal reveal-d3">
            <div className="step-dot">03</div>
            <div className="step-title">Escrow Funds</div>
            <div className="step-desc">
              Funds lock in a smart contract. Neither party can access them until milestones
              are approved.
            </div>
          </div>
          <div className="how-step reveal reveal-d4">
            <div className="step-dot">04</div>
            <div className="step-title">Release Payment</div>
            <div className="step-desc">
              Approve work on-chain. Funds release instantly. Reputation updates automatically.
              Zero delays.
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div>
          <div className="section-eyebrow">Why Blockchain</div>
          <h2 className="section-title reveal">
            Built on <em>Trust</em>
          </h2>
        </div>
        <div className="features-grid">
          <div className="features-list reveal left">
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <div>
                <div className="feature-title">Trustless Escrow</div>
                <div className="feature-desc">
                  Smart contracts hold funds until both parties confirm delivery. No platform can freeze or confiscate.
                </div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🌐</div>
              <div>
                <div className="feature-title">Instant Global Payments</div>
                <div className="feature-desc">
                  Pay in ETH, USDC, or any supported token. Settle in seconds, not business days.
                </div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⭐</div>
              <div>
                <div className="feature-title">On-Chain Reputation</div>
                <div className="feature-desc">
                  Your work history lives on the blockchain permanently. Reviews can&apos;t be deleted or manipulated.
                </div>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚖️</div>
              <div>
                <div className="feature-title">Decentralized Disputes</div>
                <div className="feature-desc">
                  Token holders arbitrate disputes via DAO governance. Fair, transparent, community-driven.
                </div>
              </div>
            </div>
          </div>

          <div className="features-visual reveal right">
            <div className="vis-card tilt-card">
              <div className="vis-label">
                <div className="vis-dot"></div> Smart Contract Escrow
              </div>
              <div className="vis-amount">0.08 ETH</div>
              <div className="vis-sub">Locked · Block #19,847,221</div>
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid var(--border)",
                  display: "flex",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--muted)",
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      marginBottom: "4px",
                    }}
                  >
                    Client
                  </div>
                  <div style={{ fontFamily: "'DM Sans',monospace", fontSize: "11px", color: "var(--ink)" }}>
                    0xD8a2...F1e4
                  </div>
                </div>
                <div style={{ width: "1px", background: "var(--border)" }}></div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "var(--muted)",
                      fontFamily: "'Syne',sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      marginBottom: "4px",
                    }}
                  >
                    Freelancer
                  </div>
                  <div style={{ fontFamily: "'DM Sans',monospace", fontSize: "11px", color: "var(--ink)" }}>
                    0xA3f9...B2c1
                  </div>
                </div>
              </div>
            </div>
            <div className="vis-card tilt-card">
              <div className="vis-hash">TxHash: 0xf4c8...a91d</div>
              <div className="vis-status">Payment Released</div>
              <div style={{ marginTop: "12px", fontSize: "12px", color: "var(--muted)" }}>
                Milestone 3 of 3 approved · 2 min ago
              </div>
            </div>
            <div className="vis-card tilt-card" style={{ textAlign: "center" }}>
              <div className="vis-mini-label">Rating</div>
              <div className="vis-mini-val">4.99</div>
              <div style={{ color: "var(--gold)", fontSize: "16px", marginTop: "4px" }}>★★★★★</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-section reveal">
        <div>
          <div className="cta-eyebrow">Ready to Begin?</div>
          <h2 className="cta-title">
            Start Building<br />
            <em>Today</em>
          </h2>
          <p className="cta-sub">
            Connect your wallet and access the world&apos;s best blockchain talent in under 60 seconds. No
            account, no email — just your wallet.
          </p>
        </div>
        <div className="cta-actions">
          <Link href="#" className="btn-light">
            Connect Wallet →
          </Link>
          <Link href="#" className="btn-outline-light">
            I&apos;m a Freelancer
          </Link>
        </div>
      </div>

    </>
  );
}
