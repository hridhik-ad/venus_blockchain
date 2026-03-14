"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, UserRole } from "@/context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("buyer");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    login(email, name, role);
    router.push(role === "seller" ? "/seller/dashboard" : "/");
  };

  return (
    <main className="auth-page">
      <div className="auth-container reveal visible">
        <div className="auth-content" style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/" className="auth-logo">SkillUP <span>Beta</span></Link>
          </div>

          <div className="auth-header" style={{ marginTop: "40px" }}>
            <div className="section-eyebrow">Welcome Back</div>
            <h1 className="section-title">Sign In</h1>
            <p className="auth-sub">Access your decentralized workspace.</p>
          </div>

          {/* Role Toggle */}
          <div className="role-toggle">
            <button
              type="button"
              className={`role-btn ${role === "buyer" ? "active" : ""}`}
              onClick={() => setRole("buyer")}
            >
              🛒 Buyer
            </button>
            <button
              type="button"
              className={`role-btn ${role === "seller" ? "active" : ""}`}
              onClick={() => setRole("seller")}
            >
              🔧 Seller
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="cw-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="cw-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" className="cw-input" required />
            </div>

            <button type="submit" className="btn-primary auth-submit">
              Sign In as {role === "buyer" ? "Buyer" : "Seller"} →
            </button>
          </form>

          <footer className="auth-footer">
            <p>Don&apos;t have an account? <Link href="/signup">Create One</Link></p>
            <Link href="/" className="back-link">← Back to Marketplace</Link>
          </footer>
        </div>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          background: var(--cream);
          position: relative;
          z-index: 10;
        }
        .auth-container {
          width: 100%;
          max-width: 540px;
          background: #fff;
          padding: 60px 80px 80px;
          border-radius: 40px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
        }
        .auth-logo {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 24px;
          color: var(--ink);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .auth-logo span {
          font-size: 10px;
          text-transform: uppercase;
          background: var(--ink);
          color: var(--cream);
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 1px;
        }
        .auth-header {
          margin-bottom: 32px;
        }
        .auth-sub {
          color: var(--muted);
          margin-top: 12px;
          font-size: 16px;
          line-height: 1.6;
        }
        .role-toggle {
          display: flex;
          gap: 0;
          margin-bottom: 32px;
          background: #f5f5f0;
          border-radius: 100px;
          padding: 4px;
          border: 1px solid var(--border);
        }
        .role-btn {
          flex: 1;
          padding: 14px 20px;
          border: none;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(.16,1,.3,1);
          background: transparent;
          color: var(--muted);
        }
        .role-btn.active {
          background: var(--ink);
          color: var(--cream);
          box-shadow: 0 4px 16px rgba(15,14,12,0.15);
        }
        .role-btn:not(.active):hover {
          color: var(--ink);
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .form-group label {
          display: block;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 10px;
          color: var(--muted);
        }
        .cw-input {
          width: 100%;
          padding: 18px 24px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: #fcfcfc;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          outline: none;
          transition: all 0.3s;
        }
        .cw-input:focus {
          border-color: var(--ink);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(15,14,12,0.05);
        }
        .auth-submit {
          margin-top: 16px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .auth-footer {
          margin-top: 48px;
          text-align: center;
          padding-top: 32px;
          border-top: 1px solid var(--border);
        }
        .auth-footer p {
          color: var(--muted);
          font-size: 15px;
          margin-bottom: 16px;
        }
        .auth-footer a {
          color: var(--ink);
          font-weight: 700;
          text-decoration: underline;
        }
        .back-link {
          display: block;
          color: var(--muted);
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 24px;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: var(--ink);
        }
      `}</style>
    </main>
  );
}
