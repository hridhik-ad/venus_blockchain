"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout, openAuthModal } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleNavScroll = () => {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 60);
      }
    };
    window.addEventListener("scroll", handleNavScroll);
    return () => window.removeEventListener("scroll", handleNavScroll);
  }, []);

  return (
    <nav id="navbar" className="cw-nav">
      <div className="nav-left">
        {!isHomePage && (
          <button onClick={() => router.back()} className="nav-back-btn">
            ← Back
          </button>
        )}
        <Link href="/" className="nav-brand">
          SkillUP
          <span className="brand-badge">Beta</span>
        </Link>
      </div>

      {!isAuthPage && (
        <ul className="nav-links">
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/talent">Talent</Link>
          </li>
          <li>
            <Link href="#">How It Works</Link>
          </li>
          <li>
            <Link href="#">Protocol</Link>
          </li>
        </ul>
      )}

      {!isAuthPage && (
        isLoggedIn && user ? (
          <div className="nav-user-area">
            <div className="nav-user-info">
              <div className="nav-user-av">{user.name.charAt(0)}</div>
              <div className="nav-user-details">
                <span className="nav-user-name">{user.name}</span>
                <span className="nav-user-addr">{user.address || "0x..."}</span>
              </div>
            </div>
            <button onClick={logout} className="nav-logout-btn">Logout</button>
          </div>
        ) : (
          <button onClick={openAuthModal} className="nav-btn">
            Connect Wallet
          </button>
        )
      )}

      <style jsx>{`
        .cw-nav {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-back-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--muted);
          padding: 8px 16px;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .nav-back-btn:hover {
          border-color: var(--ink);
          color: var(--ink);
          transform: translateX(-4px);
        }
        .nav-links {
          flex: 1;
          display: isAuthPage ? 'none' : 'flex';
          justify-content: center;
          gap: 48px;
          margin: 0 40px;
        }
        .nav-user-area {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .nav-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-user-av {
          width: 36px;
          height: 36px;
          background: var(--ink);
          color: var(--cream);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 14px;
        }
        .nav-user-details {
          display: flex;
          flex-direction: column;
        }
        .nav-user-name {
          font-size: 13px;
          font-weight: 700;
          color: var(--ink);
        }
        .nav-user-addr {
          font-size: 10px;
          color: var(--muted);
          font-family: 'DM Sans', monospace;
        }
        .nav-logout-btn {
          background: none;
          border: 1px solid var(--border);
          padding: 8px 16px;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .nav-logout-btn:hover {
          background: #ff4d4d;
          color: #fff;
          border-color: #ff4d4d;
        }
      `}</style>
    </nav>
  );
}
