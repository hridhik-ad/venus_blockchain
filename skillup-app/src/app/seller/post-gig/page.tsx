"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const CATEGORIES = [
    "Smart Contract Audit", "Product Design", "dApp Development",
    "Cross-Chain Solutions", "Graphics & Design", "Content Creation",
    "Community & Growth", "Digital Marketing",
];

export default function PostGigPage() {
    const { isLoggedIn, user } = useAuth();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [price, setPrice] = useState("");
    const [skills, setSkills] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isLoggedIn || !user) {
            router.push("/login");
            return;
        }
        if (user.role !== "seller") {
            router.push("/");
            return;
        }
    }, [isLoggedIn, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setSubmitting(true);
        setError("");

        try {
            const res = await fetch("/api/seller/gigs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    price: Number(price),
                    skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
                    sellerEmail: user.email,
                    sellerName: user.name,
                }),
            });

            const data = await res.json();
            if (data.success) {
                router.push("/seller/dashboard");
            } else {
                setError(data.error || "Failed to post gig");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!isLoggedIn || !user || user.role !== "seller") return null;

    return (
        <main className="post-page">
            <div className="post-container reveal visible">
                <div className="post-content">
                    <Link href="/seller/dashboard" className="back-link">← Back to Dashboard</Link>

                    <div className="post-header">
                        <div className="section-eyebrow">New Listing</div>
                        <h1 className="section-title">Post a <em>Gig</em></h1>
                        <p className="post-sub">Create a service listing for buyers to discover.</p>
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <form className="post-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Gig Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Smart Contract Development & Audit"
                                className="cw-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                placeholder="Describe your service in detail — what you deliver, how long it takes, what buyers can expect..."
                                className="cw-input cw-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={5}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Category</label>
                                <select
                                    className="cw-input cw-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Price (USDC / hour)</label>
                                <input
                                    type="number"
                                    placeholder="50"
                                    className="cw-input"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    min="1"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Skills (comma-separated)</label>
                            <input
                                type="text"
                                placeholder="Solidity, React, Foundry"
                                className="cw-input"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary post-submit" disabled={submitting}>
                            {submitting ? "Posting..." : "Publish Gig →"}
                        </button>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .post-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 140px 20px 80px;
          background: var(--cream);
          position: relative;
          z-index: 10;
        }
        .post-container {
          width: 100%;
          max-width: 680px;
          background: #fff;
          padding: 60px 80px 80px;
          border-radius: 40px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
        }
        .back-link {
          display: inline-block;
          color: var(--muted);
          text-decoration: none;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 32px;
          transition: color 0.3s;
        }
        .back-link:hover {
          color: var(--ink);
        }
        .post-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .post-sub {
          color: var(--muted);
          margin-top: 12px;
          font-size: 16px;
        }
        .error-msg {
          background: rgba(255,77,77,0.08);
          border: 1px solid rgba(255,77,77,0.2);
          color: #ff4d4d;
          padding: 14px 20px;
          border-radius: 16px;
          font-size: 14px;
          margin-bottom: 24px;
          text-align: center;
        }
        .post-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .form-row {
          display: flex;
          gap: 20px;
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
          text-align: left;
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
        .cw-textarea {
          border-radius: 24px;
          resize: vertical;
          min-height: 120px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          line-height: 1.6;
        }
        .cw-select {
          appearance: none;
          cursor: pointer;
        }
        .cw-input:focus {
          border-color: var(--ink);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(15,14,12,0.05);
        }
        .post-submit {
          margin-top: 16px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .post-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        @media (max-width: 640px) {
          .post-container { padding: 40px 30px; }
          .form-row { flex-direction: column; }
        }
      `}</style>
        </main>
    );
}
