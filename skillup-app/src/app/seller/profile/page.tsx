"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface SellerGig {
    _id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    skills: string[];
    rating: number;
    reviews: number;
    status: string;
    createdAt: string;
}

export default function SellerProfilePage() {
    const { isLoggedIn, user } = useAuth();
    const router = useRouter();
    const [gigs, setGigs] = useState<SellerGig[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn || !user) {
            router.push("/login");
            return;
        }
        if (user.role !== "seller") {
            router.push("/");
            return;
        }
        fetchGigs();
    }, [isLoggedIn, user]);

    const fetchGigs = async () => {
        if (!user?.email) return;
        try {
            const res = await fetch(`/api/seller/gigs?seller=${encodeURIComponent(user.email)}`);
            const data = await res.json();
            if (data.success) setGigs(data.data);
        } catch (err) {
            console.error("Failed to fetch gigs:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!isLoggedIn || !user || user.role !== "seller") return null;

    const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    const allSkills = Array.from(new Set([...(user.skills || []), ...gigs.flatMap((g) => g.skills)]));
    const avgPrice = gigs.length ? Math.round(gigs.reduce((s, g) => s + g.price, 0) / gigs.length) : 0;

    return (
        <main className="profile-page">
            <div className="profile-container">
                {/* Profile Header Card */}
                <div className="profile-hero">
                    <div className="profile-hero-bg"></div>
                    <div className="profile-hero-content">
                        <div className="profile-avatar">{initials}</div>
                        <div className="profile-info">
                            <h1 className="profile-name">{user.name}</h1>
                            <p className="profile-title">{user.title || "Freelancer"}</p>
                            <div className="profile-meta">
                                <span className="meta-badge seller-badge">🔧 Seller</span>
                                <span className="meta-item">📧 {user.email}</span>
                                {user.address && <span className="meta-item">🔗 {user.address}</span>}
                            </div>
                        </div>
                        <div className="profile-stats-mini">
                            <div className="mini-stat">
                                <div className="mini-val">{gigs.length}</div>
                                <div className="mini-label">Gigs</div>
                            </div>
                            <div className="mini-stat">
                                <div className="mini-val">${avgPrice}</div>
                                <div className="mini-label">Avg Rate</div>
                            </div>
                            <div className="mini-stat">
                                <div className="mini-val">⭐ New</div>
                                <div className="mini-label">Rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                {user.bio && (
                    <div className="section-card">
                        <h2 className="card-title">About</h2>
                        <p className="bio-text">{user.bio}</p>
                    </div>
                )}

                {/* Skills */}
                {allSkills.length > 0 && (
                    <div className="section-card">
                        <h2 className="card-title">Skills & Expertise</h2>
                        <div className="skills-grid">
                            {allSkills.map((skill) => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Posted Gigs / Portfolio */}
                <div className="section-card">
                    <div className="card-header-row">
                        <h2 className="card-title">Services & Gigs</h2>
                        <Link href="/seller/post-gig" className="add-gig-link">+ Add New</Link>
                    </div>

                    {loading ? (
                        <div className="empty-state">Loading...</div>
                    ) : gigs.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h3>No gigs posted yet</h3>
                            <p>Your profile will be automatically populated once you post your first gig.</p>
                            <Link href="/seller/post-gig" className="btn-primary" style={{ marginTop: "20px", display: "inline-flex" }}>
                                Post Your First Gig →
                            </Link>
                        </div>
                    ) : (
                        <div className="gigs-grid">
                            {gigs.map((gig) => (
                                <div key={gig._id} className="profile-gig-card">
                                    <div className="pgig-top">
                                        <span className="pgig-category">{gig.category}</span>
                                        <span className="pgig-price">${gig.price}<small>/hr</small></span>
                                    </div>
                                    <h3 className="pgig-title">{gig.title}</h3>
                                    <p className="pgig-desc">{gig.description.slice(0, 120)}{gig.description.length > 120 ? "..." : ""}</p>
                                    <div className="pgig-skills">
                                        {gig.skills.slice(0, 4).map((s) => (
                                            <span key={s} className="pgig-skill">{s}</span>
                                        ))}
                                    </div>
                                    <div className="pgig-footer">
                                        <span className="pgig-status">● Active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="profile-actions">
                    <Link href="/seller/dashboard" className="btn-primary">← Back to Dashboard</Link>
                </div>
            </div>

            <style jsx>{`
        .profile-page {
          min-height: 100vh;
          padding: 140px 40px 80px;
          background: var(--cream);
          position: relative;
          z-index: 10;
        }
        .profile-container {
          max-width: 900px;
          margin: 0 auto;
        }

        /* Hero */
        .profile-hero {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 32px;
          overflow: hidden;
          margin-bottom: 24px;
          position: relative;
        }
        .profile-hero-bg {
          height: 120px;
          background: linear-gradient(135deg, var(--ink), #2a2826);
          position: relative;
        }
        .profile-hero-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 70% 50%, rgba(232,100,44,0.3) 0%, transparent 60%);
        }
        .profile-hero-content {
          padding: 0 40px 40px;
          display: flex;
          align-items: flex-end;
          gap: 24px;
          margin-top: -40px;
          position: relative;
          flex-wrap: wrap;
        }
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E8642C, #C9A96E);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid #fff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          flex-shrink: 0;
        }
        .profile-info {
          flex: 1;
          padding-top: 44px;
          min-width: 200px;
        }
        .profile-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 28px;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .profile-title {
          font-size: 15px;
          color: var(--muted);
          margin-bottom: 12px;
        }
        .profile-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .meta-badge {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 5px 14px;
          border-radius: 100px;
        }
        .seller-badge {
          background: rgba(232,100,44,0.1);
          color: #E8642C;
        }
        .meta-item {
          font-size: 12px;
          color: var(--muted);
          font-family: 'DM Sans', sans-serif;
        }
        .profile-stats-mini {
          display: flex;
          gap: 24px;
          padding-top: 44px;
        }
        .mini-stat {
          text-align: center;
        }
        .mini-val {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: var(--ink);
        }
        .mini-label {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--muted);
          margin-top: 2px;
        }

        /* Section Cards */
        .section-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px 40px;
          margin-bottom: 24px;
        }
        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: var(--ink);
          margin-bottom: 16px;
        }
        .add-gig-link {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #E8642C;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .add-gig-link:hover { opacity: 0.7; }
        .bio-text {
          font-size: 15px;
          color: var(--muted);
          line-height: 1.7;
        }

        /* Skills */
        .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 12px;
          padding: 8px 18px;
          border-radius: 100px;
          border: 1px solid var(--border);
          color: var(--ink);
          background: rgba(0,0,0,0.02);
          transition: all 0.2s;
        }
        .skill-tag:hover {
          background: var(--ink);
          color: var(--cream);
          border-color: var(--ink);
        }

        /* Gigs Grid */
        .gigs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .profile-gig-card {
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s;
        }
        .profile-gig-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
        }
        .pgig-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .pgig-category {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: rgba(232,100,44,0.1);
          color: #E8642C;
          padding: 4px 12px;
          border-radius: 100px;
        }
        .pgig-price {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: var(--ink);
        }
        .pgig-price small {
          font-size: 11px;
          color: var(--muted);
          font-weight: 600;
        }
        .pgig-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .pgig-desc {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.5;
          margin-bottom: 12px;
        }
        .pgig-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .pgig-skill {
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: 'Syne', sans-serif;
          font-weight: 600;
        }
        .pgig-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pgig-status {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 11px;
          color: #4a7a40;
        }

        .empty-state {
          padding: 60px 20px;
          text-align: center;
          color: var(--muted);
        }
        .empty-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }
        .empty-state h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: var(--ink);
          margin-bottom: 8px;
        }

        .profile-actions {
          text-align: center;
          margin-top: 40px;
        }

        @media (max-width: 768px) {
          .profile-page { padding: 120px 20px 60px; }
          .profile-hero-content { flex-direction: column; align-items: center; text-align: center; padding: 0 24px 32px; }
          .profile-info { padding-top: 20px; }
          .profile-meta { justify-content: center; }
          .profile-stats-mini { padding-top: 20px; }
          .section-card { padding: 24px; }
          .gigs-grid { grid-template-columns: 1fr; }
        }
      `}</style>
        </main>
    );
}
