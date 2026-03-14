"use client";

import Link from "next/link";
import { CustomCursor, ParticleCanvas, ScrollReveal } from "@/components/Effects";

const contracts = [
    { id: 1, title: "DeFi Protocol Architecture", client: "0x8a9B...3f4D", amount: 80, status: "completed", date: "2026-03-10", tx: "0xf4c8...a91d" },
    { id: 2, title: "Web3 Dashboard UI Design", client: "0x2c3D...7e8F", amount: 40, status: "active", date: "2026-03-12", tx: "0xa7b2...e3f1" },
    { id: 3, title: "Smart Contract Security Audit", client: "0x5f6A...1b2C", amount: 150, status: "pending", date: "2026-03-14", tx: "pending" },
];

const statusMap: Record<string, { bg: string; text: string; label: string }> = {
    completed: { bg: "bg-sage/20", text: "text-[#4a7a40]", label: "✓ Completed" },
    active: { bg: "bg-blush/30", text: "text-accent", label: "● In Progress" },
    pending: { bg: "bg-cream2", text: "text-muted", label: "◌ Pending" },
};

export default function FreelancerDashboard() {
    const earned = contracts.filter((c) => c.status === "completed").reduce((s, c) => s + c.amount, 0);
    const active = contracts.filter((c) => c.status === "active").length;

    return (
        <main className="min-h-screen pt-[120px] pb-20">
            <CustomCursor />
            <ParticleCanvas />
            <div className="max-w-6xl mx-auto px-8 lg:px-[60px]">
                {/* Header */}
                <div className="mb-12">
                    <div className="font-ui text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Dashboard</div>
                    <h1 className="font-display font-black text-[clamp(36px,4vw,56px)] text-ink tracking-tight mb-3">Freelancer <em className="italic text-accent">Dashboard</em></h1>
                    <p className="text-muted max-w-lg">Manage your gigs, track escrow payments, and withdraw earnings.</p>
                </div>

                {/* Stats */}
                <ScrollReveal>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
                        {[
                            { label: "Total Earned", value: `${earned} USDC`, icon: "💰", border: "border-sage/40" },
                            { label: "Active Escrows", value: String(active), icon: "🔄", border: "border-accent/30" },
                            { label: "Total Contracts", value: String(contracts.length), icon: "📊", border: "border-gold/40" },
                        ].map((s) => (
                            <div key={s.label} className={`bg-white rounded-3xl p-7 border ${s.border}`}>
                                <div className="text-2xl mb-3">{s.icon}</div>
                                <div className="font-ui text-[10px] font-bold tracking-[2px] uppercase text-muted mb-1">{s.label}</div>
                                <div className="font-display font-bold text-3xl text-ink">{s.value}</div>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Wallet */}
                <ScrollReveal delay={0.1}>
                    <div className="bg-navy rounded-3xl p-10 mb-10 relative overflow-hidden">
                        <div className="absolute w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(232,100,44,0.15)_0%,transparent_70%)] -top-16 -right-16 pointer-events-none" />
                        <div className="relative z-[1] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div>
                                <div className="font-ui text-[10px] font-bold tracking-[2px] uppercase text-cream/50 mb-2">Connected Wallet</div>
                                <div className="font-mono font-extrabold text-lg text-cream">0x1a2B3c4D...aBcDeF12</div>
                                <div className="text-xs text-cream/40 mt-1">Network: Base Sepolia · USDC Token</div>
                            </div>
                            <button className="font-ui font-bold text-[13px] bg-cream text-ink px-8 py-3.5 rounded-full hover:bg-white hover:-translate-y-0.5 transition-all">
                                Withdraw Earnings →
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Contracts */}
                <ScrollReveal delay={0.2}>
                    <div className="bg-white rounded-3xl border border-border-c overflow-hidden">
                        <div className="p-7 border-b border-border-c">
                            <h2 className="font-ui font-extrabold text-xl text-ink">Escrow Contracts</h2>
                            <p className="text-xs text-muted mt-1">On-chain payment tracking</p>
                        </div>
                        {contracts.map((c) => {
                            const st = statusMap[c.status];
                            return (
                                <div key={c.id} className="p-7 border-b border-border-c/50 hover:bg-cream2/40 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-ui font-extrabold text-ink mb-1">{c.title}</h3>
                                            <div className="flex items-center gap-4 text-xs text-muted">
                                                <span>Client: <span className="font-mono font-bold">{c.client}</span></span>
                                                <span>·</span>
                                                <span>{c.date}</span>
                                                {c.tx !== "pending" && <><span>·</span><span className="font-mono">Tx: {c.tx}</span></>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-ui font-bold tracking-[1px] uppercase ${st.bg} ${st.text}`}>{st.label}</span>
                                            <div className="text-right min-w-[80px]">
                                                <div className="font-ui font-extrabold text-lg text-ink">{c.amount}</div>
                                                <div className="text-[10px] text-accent font-ui font-bold">USDC</div>
                                            </div>
                                            {c.status === "active" && (
                                                <button className="font-ui font-bold text-xs bg-ink text-cream px-5 py-2.5 rounded-full hover:bg-navy transition-all">Release</button>
                                            )}
                                            {c.status === "completed" && (
                                                <span className="font-ui font-bold text-xs bg-sage/20 text-[#4a7a40] px-5 py-2.5 rounded-full">Paid ✓</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </ScrollReveal>

                <div className="mt-10 text-center">
                    <Link href="/" className="font-ui font-bold text-[13px] text-ink no-underline flex items-center justify-center gap-2 hover:text-accent transition-colors">
                        ← Back to Marketplace
                    </Link>
                </div>
            </div>
        </main>
    );
}
