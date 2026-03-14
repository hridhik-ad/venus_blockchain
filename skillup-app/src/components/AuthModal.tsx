"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const { showAuthModal, closeAuthModal, login } = useAuth();

  if (!showAuthModal) return null;

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close button removed to make modal mandatory */}
        
        <div className="auth-header">
          <div className="section-eyebrow">Authentication</div>
          <h2 className="section-title">Access Protocol</h2>
          <p className="auth-sub">Please sign in to interact with services and talent.</p>
        </div>

        <div className="auth-options">
          <Link href="/login" className="btn-primary" style={{ textAlign: "center", width: "100%" }} onClick={closeAuthModal}>
            Login to Account
          </Link>
          <Link href="/signup" className="nav-btn auth-wallet-btn" style={{ justifyContent: "center" }} onClick={closeAuthModal}>
            Create New Account
          </Link>
          
          {/* Simplified to redirect options as requested */}
        </div>

        <p className="auth-footer">
          New to SkillUP? <Link href="/signup" onClick={closeAuthModal}>Create Account</Link>
        </p>

        <style jsx>{`
          .auth-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(15, 14, 12, 0.9);
            backdrop-filter: blur(12px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .auth-modal-content {
            background: var(--cream);
            width: 90%;
            max-width: 440px;
            padding: 50px;
            border-radius: 40px;
            position: relative;
            box-shadow: 0 40px 100px rgba(0,0,0,0.5);
            margin: auto;
            animation: modalReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes modalReveal {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .auth-modal-close {
            position: absolute;
            top: 30px;
            right: 30px;
            background: none;
            border: 1px solid var(--border);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .auth-modal-close:hover {
            background: var(--ink);
            color: var(--cream);
          }
          .auth-header {
            text-align: center;
            margin-bottom: 40px;
          }
          .auth-sub {
            color: var(--muted);
            margin-top: 15px;
            font-size: 14px;
          }
          .auth-options {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }
          .auth-wallet-btn {
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            background: #fff;
            color: var(--ink);
            border: 1px solid var(--border);
            font-weight: 700;
          }
          .auth-wallet-btn:hover {
            background: var(--ink);
            color: #fff;
          }
          .auth-divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 10px 0;
            color: var(--muted);
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .auth-divider::before, .auth-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid var(--border);
          }
          .auth-divider span {
            padding: 0 15px;
          }
          .cw-input {
            width: 100%;
            padding: 16px 24px;
            border-radius: 100px;
            border: 1px solid var(--border);
            background: #fff;
            font-family: 'Syne', sans-serif;
            font-size: 14px;
            margin-bottom: 16px;
            outline: none;
            transition: border-color 0.3s;
          }
          .cw-input:focus {
            border-color: var(--ink);
          }
          .auth-footer {
            text-align: center;
            margin-top: 40px;
            font-size: 14px;
            color: var(--muted);
          }
          .auth-footer a {
            color: var(--ink);
            font-weight: 700;
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  );
}
