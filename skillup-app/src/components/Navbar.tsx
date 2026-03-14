"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
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
      <Link href="/" className="nav-brand">
        Chainwork
        <span className="brand-badge">Beta</span>
      </Link>
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
      <Link href="#" className="nav-btn">
        Connect Wallet
      </Link>
    </nav>
  );
}
