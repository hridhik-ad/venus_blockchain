"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 lg:px-[60px] transition-all duration-400 ${scrolled
          ? "py-[18px] bg-cream/92 backdrop-blur-2xl shadow-[0_1px_0_rgba(15,14,12,0.1)]"
          : "py-7 bg-transparent"
        }`}
    >
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2 no-underline">
        <span className="font-ui font-extrabold text-[22px] tracking-tight text-ink">
          Chainwork
        </span>
        <span className="bg-accent text-white font-ui text-[9px] font-bold tracking-[2px] uppercase px-[7px] py-[3px] rounded-sm">
          Beta
        </span>
      </Link>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-9 list-none">
        {[
          { label: "Services", href: "/#services" },
          { label: "Talent", href: "/#talent" },
          { label: "How It Works", href: "/#how" },
          { label: "Protocol", href: "/#features" },
        ].map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="font-ui text-[13px] font-semibold text-muted no-underline tracking-wide hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Wallet */}
      <Link
        href="#"
        className="hidden md:inline-block font-ui font-bold text-[12px] tracking-[1px] uppercase bg-ink text-cream px-7 py-3 rounded-full no-underline border-2 border-ink hover:bg-navy hover:-translate-y-0.5 transition-all"
      >
        Connect Wallet
      </Link>

      {/* Mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden w-10 h-10 rounded-full bg-cream2 flex items-center justify-center text-ink"
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          {menuOpen ? (
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-cream border-t border-border-c md:hidden px-8 py-4 flex flex-col gap-2">
          {["Services", "Talent", "How It Works", "Protocol", "Dashboard"].map((l) => (
            <Link
              key={l}
              href={l === "Dashboard" ? "/freelancer" : "#"}
              className="font-ui text-sm font-semibold text-muted py-3 px-4 rounded-xl hover:bg-cream2 hover:text-ink transition-all no-underline"
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
