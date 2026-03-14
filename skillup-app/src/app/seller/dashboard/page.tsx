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

export default function SellerDashboard() {
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

    const deleteGig = async (id: string) => {
        if (!confirm("Are you sure you want to delete this gig?")) return;
        try {
            const res = await fetch(`/api/seller/gigs?id=${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                setGigs((prev) => prev.filter((g) => g._id !== id));
            }
        } catch (err) {
            console.error("Failed to delete gig:", err);
        }
    };

    if (!isLoggedIn || !user || user.role !== "seller") return null;

    const totalEarnings = gigs.reduce((sum, g) => sum + g.price, 0);

    return (
        <main className="dashboard-page">
            <div className="dashboard-container">
                {/* Header */}
                <div className="dash-header">
                    <div>
                        <div className="section-eyebrow">Seller Dashboard</div>
                        <h1 className="section-title">
                            Welcome, <em>{user.name}</em>
                        </h1>
                        <p className="dash-sub">Manage your gigs and track your performance.</p>
                    </div>
                    <Link href="/seller/post-gig" className="btn-primary">
                        + Post New Gig
                    </Link>
                </div>

                {/* Stats */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-icon">📦</div>
                        <div className="stat-label">Active Gigs</div>
                        <div className="stat-value">{gigs.length}</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">💰</div>
                        <div className="stat-label">Avg. Rate</div>
                        <div className="stat-value">${gigs.length ? Math.round(totalEarnings / gigs.length) : 0}/hr</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-label">Profile</div>
                        <div className="stat-value">
                            <Link href="/seller/profile" className="profile-link">View →</Link>
                        </div>
                    </div>
                </div>

                {/* Gigs List */}
                <div className="gigs-section">
                    <div className="gigs-header">
                        <h2 className="gigs-title">Your Gigs</h2>
                    </div>

                    {loading ? (
                        <div className="empty-state">
                            <div className="empty-icon">⏳</div>
                            <p>Loading your gigs...</p>
                        </div>
                    ) : gigs.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h3>No gigs yet</h3>
                            <p>Post your first gig to get started and build your seller profile.</p>
                            <Link href="/seller/post-gig" className="btn-primary" style={{ marginTop: "20px" }}>
                                Post Your First Gig →
                            </Link>
                        </div>
                    ) : (
                        <div className="gig-list">
                            {gigs.map((gig) => (
                                <div key={gig._id} className="gig-row">
                                    <div className="gig-info">
                                        <h3 className="gig-title">{gig.title}</h3>
                                        <p className="gig-desc">{gig.description.slice(0, 100)}...</p>
                                        <div className="gig-meta">
                                            <span className="gig-category">{gig.category}</span>
                                            <span className="gig-skills">
                                                {gig.skills.slice(0, 3).map((s) => (
                                                    <span key={s} className="skill-chip">{s}</span>
                                                ))}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="gig-actions">
                                        <div className="gig-price">${gig.price}<small>/hr</small></div>
                                        <span className={`gig-status ${gig.status}`}>{gig.status}</span>
                                        <button className="delete-btn" onClick={() => deleteGig(gig._id)}>✕</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
        .dashboard-page {
          min-height: 100vh;
          padding: 140px 40px 80px;
          background: var(--cream);
          position: relative;
          z-index: 10;
        }
        .dashboard-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 48px;
          gap: 24px;
          flex-wrap: wrap;
        }
        .dash-sub {
          color: var(--muted);
          margin-top: 8px;
          font-size: 16px;
        }
        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        .stat-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.06);
        }
        .stat-icon {
          font-size: 28px;
          margin-bottom: 12px;
        }
        .stat-label {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .stat-value {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 28px;
          color: var(--ink);
        }
        .profile-link {
          font-size: 16px;
          color: #E8642C;
          text-decoration: none;
          font-weight: 700;
        }
        .gigs-section {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 32px;
          overflow: hidden;
        }
        .gigs-header {
          padding: 32px 40px;
          border-bottom: 1px solid var(--border);
        }
        .gigs-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: var(--ink);
        }
        .empty-state {
          padding: 80px 40px;
          text-align: center;
          color: var(--muted);
        }
        .empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .empty-state h3 {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: var(--ink);
          margin-bottom: 8px;
        }
        .gig-row {
          padding: 28px 40px;
          border-bottom: 1px solid rgba(0,0,0,0.04);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          transition: background 0.2s;
        }
        .gig-row:hover {
          background: rgba(0,0,0,0.01);
        }
        .gig-info {
          flex: 1;
        }
        .gig-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: var(--ink);
          margin-bottom: 4px;
        }
        .gig-desc {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 8px;
        }
        .gig-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .gig-category {
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
        .gig-skills {
          display: flex;
          gap: 6px;
        }
        .skill-chip {
          font-size: 10px;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid var(--border);
          color: var(--muted);
          font-family: 'Syne', sans-serif;
          font-weight: 600;
        }
        .gig-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .gig-price {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: var(--ink);
        }
        .gig-price small {
          font-size: 12px;
          color: var(--muted);
          font-weight: 600;
        }
        .gig-status {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 6px 14px;
          border-radius: 100px;
        }
        .gig-status.active {
          background: rgba(74,122,64,0.1);
          color: #4a7a40;
        }
        .delete-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: none;
          cursor: pointer;
          font-size: 12px;
          color: var(--muted);
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .delete-btn:hover {
          background: #ff4d4d;
          color: #fff;
          border-color: #ff4d4d;
        }
        @media (max-width: 768px) {
          .dashboard-page { padding: 120px 20px 60px; }
          .stats-row { grid-template-columns: 1fr; }
          .gig-row { flex-direction: column; align-items: flex-start; }
          .gig-actions { width: 100%; justify-content: flex-start; }
        }
      `}</style>
        </main>
    );
}
