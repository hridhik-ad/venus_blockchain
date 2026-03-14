"use client";

import { useParams } from "next/navigation";
import { DUMMY_GIGS } from "@/lib/dummyData";
import Link from "next/link";
import { CustomCursor, ParticleCanvas, ScrollReveal } from "@/components/Effects";

export default function GigDetailPage() {
    const params = useParams();
    const gig = DUMMY_GIGS.find((g) => g.id === params.id);

    if (!gig) {
        return (
            <main className="min-h-screen flex items-center justify-center pt-[120px]">
                <div className="text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="font-display text-3xl font-bold text-ink mb-2">Gig Not Found</h1>
                    <p className="text-muted mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/" className="font-ui font-bold text-[13px] bg-ink text-cream px-8 py-3 rounded-full no-underline hover:bg-navy transition-all">Back to Marketplace</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-[120px] pb-20">
            <CustomCursor />
            <ParticleCanvas />
            <div className="max-w-6xl mx-auto px-8 lg:px-[60px]">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-muted mb-10">
                    <Link href="/" className="hover:text-accent transition-colors no-underline">Services</Link>
                    <span>/</span>
                    <span className="text-ink font-ui font-semibold">{gig.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Freelancer Card */}
                        <ScrollReveal>
                            <div className="bg-white rounded-3xl p-10 border border-border-c">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center font-ui font-extrabold text-3xl text-white" style={{ background: gig.gradient }}>{gig.freelancer_initials}</div>
                                    <div>
                                        <div className="font-ui text-[10px] font-bold tracking-[2px] uppercase text-accent mb-1">{gig.freelancer_role}</div>
                                        <h2 className="font-display font-bold text-3xl text-ink">{gig.freelancer_name}</h2>
                                        <p className="text-xs text-muted font-mono mt-1">{gig.freelancer_address.slice(0, 6)}...{gig.freelancer_address.slice(-4)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-gold text-sm tracking-wide">★★★★★</span>
                                    <span className="font-ui text-sm font-bold text-ink">{gig.rating}</span>
                                    <span className="text-xs text-muted">({gig.reviews} reviews)</span>
                                    <span className="ml-auto bg-sage/30 text-[#4a7a40] font-ui text-[10px] font-bold tracking-[1px] uppercase px-2.5 py-1 rounded-full">✓ Verified</span>
                                </div>
                                <p className="text-[14px] text-muted leading-relaxed">{gig.freelancer_bio}</p>
                            </div>
                        </ScrollReveal>

                        {/* Service Details */}
                        <ScrollReveal delay={0.1}>
                            <div className="bg-white rounded-3xl p-10 border border-border-c">
                                <h3 className="font-ui font-extrabold text-xl text-ink mb-4">About this Service</h3>
                                <h2 className="font-display font-bold text-2xl text-ink mb-4">{gig.title}</h2>
                                <p className="text-[14px] text-muted leading-relaxed mb-6">{gig.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {gig.skills.map((s) => (
                                        <span key={s} className="font-ui text-[11px] font-semibold px-3.5 py-1.5 rounded-full border border-border-c text-muted bg-cream2">{s}</span>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* How Escrow Works */}
                        <ScrollReveal delay={0.2}>
                            <div className="bg-navy rounded-3xl p-10 relative overflow-hidden">
                                <div className="absolute font-display text-[120px] font-black text-white/[0.03] -top-4 -right-4 pointer-events-none select-none">ESCROW</div>
                                <h3 className="font-ui font-extrabold text-xl text-cream mb-6 relative z-[1]">How Escrow Works</h3>
                                <div className="space-y-4 relative z-[1]">
                                    {[
                                        { num: "01", title: "Approve USDC Spend", desc: "Allow the escrow contract to access your USDC tokens.", color: "text-blush" },
                                        { num: "02", title: "Deposit Into Escrow", desc: "USDC is locked in the smart contract on Base Sepolia.", color: "text-gold" },
                                        { num: "03", title: "Freelancer Delivers", desc: "Work is completed and submitted for your review.", color: "text-sage" },
                                        { num: "04", title: "Approve & Release", desc: "Confirm delivery and USDC releases to the freelancer's wallet automatically.", color: "text-accent" },
                                    ].map((s) => (
                                        <div key={s.num} className="flex gap-4 bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-sm">
                                            <div className={`font-ui font-extrabold text-lg ${s.color} w-10 min-w-[40px] text-center`}>{s.num}</div>
                                            <div>
                                                <h4 className="font-ui font-extrabold text-cream mb-1">{s.title}</h4>
                                                <p className="text-[13px] text-cream/50">{s.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right — Checkout */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            {/* Price */}
                            <ScrollReveal delay={0.1}>
                                <div className="bg-white rounded-3xl p-8 border border-border-c shadow-[0_20px_60px_rgba(15,14,12,0.08)]">
                                    <div className="text-center mb-6">
                                        <div className="font-ui text-[10px] font-bold tracking-[2px] uppercase text-muted mb-2">Service Price</div>
                                        <div className="font-display font-bold text-5xl text-ink">{gig.price} <span className="text-xl text-accent">USDC</span></div>
                                        <div className="text-xs text-muted mt-1">per hour · Base Sepolia</div>
                                    </div>

                                    {/* Escrow info */}
                                    <div className="bg-cream2 rounded-2xl p-5 mb-6 border border-border-c">
                                        <div className="flex items-center gap-2.5 mb-2"><span className="text-lg">🔒</span><span className="font-ui text-xs font-extrabold text-ink">Blockchain Escrow</span></div>
                                        <p className="text-[11px] text-muted leading-relaxed">USDC locked in a smart contract on Base Sepolia. Released only when you approve the work.</p>
                                    </div>

                                    {/* Button */}
                                    <button className="w-full py-4 bg-accent text-white rounded-full font-ui font-bold text-[13px] hover:-translate-y-[3px] hover:shadow-[0_14px_40px_rgba(232,100,44,0.4)] transition-all flex items-center justify-center gap-2 mb-3">
                                        Deposit & Hire →
                                    </button>
                                    <p className="text-center font-ui text-[10px] text-muted">
                                        ⛽ <span className="font-bold text-accent">Gas Sponsored</span> by Chainwork
                                    </p>
                                </div>
                            </ScrollReveal>

                            {/* Contract */}
                            <ScrollReveal delay={0.2}>
                                <div className="bg-white rounded-3xl p-6 border border-border-c">
                                    <div className="flex items-center gap-2 mb-4"><span className="text-lg">📋</span><span className="font-ui text-xs font-extrabold text-ink">Contract Details</span></div>
                                    <div className="space-y-3 text-xs text-muted">
                                        <div className="flex justify-between"><span>Network</span><span className="font-ui font-bold text-ink">Base Sepolia</span></div>
                                        <div className="flex justify-between"><span>Token</span><span className="font-ui font-bold text-ink">USDC</span></div>
                                        <div className="flex justify-between"><span>USDC Address</span><span className="font-mono font-bold text-ink text-[10px]">0x036C...7e</span></div>
                                        <div className="flex justify-between"><span>Escrow</span><span className="font-mono font-bold text-ink text-[10px]">0xDCc6...c0</span></div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
