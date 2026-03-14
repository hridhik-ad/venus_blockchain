import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">SkillUP</div>
          <div className="footer-brand-desc">
            A decentralized freelance protocol built on Ethereum. Where talent meets
            opportunity — trustlessly.
          </div>
          <div className="footer-social">
            <Link href="#" className="social-btn">𝕏</Link>
            <Link href="#" className="social-btn">in</Link>
            <Link href="#" className="social-btn">⌥</Link>
            <Link href="#" className="social-btn">⬡</Link>
          </div>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Platform</div>
          <Link href="/services">Browse Services</Link>
          <Link href="#">Post a Job</Link>
          <Link href="/talent">Find Talent</Link>
          <Link href="#">How It Works</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Protocol</div>
          <Link href="#">Smart Contracts</Link>
          <Link href="#">Tokenomics</Link>
          <Link href="#">Governance</Link>
          <Link href="#">Audit Reports</Link>
        </div>
        <div className="footer-col">
          <div className="footer-col-title">Community</div>
          <Link href="#">Discord</Link>
          <Link href="#">Twitter / X</Link>
          <Link href="#">GitHub</Link>
          <Link href="#">Blog</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SkillUP Protocol — All rights reserved</span>
        <span>Built on Ethereum · Audited by OpenZeppelin</span>
      </div>
    </footer>
  );
}
