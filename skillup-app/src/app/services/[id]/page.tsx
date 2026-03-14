"use client";

import React, { use, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SERVICES_DATA, FREELANCERS, TAG_COLORS, FreelancerType } from "@/data/skillupData";

// ─── Freelancer Card ─────────────────────────────────────────────────────────
function FreelancerCard({
    freelancer, accent, serviceId, selected, onSelect,
}: {
    freelancer: FreelancerType; accent: string; serviceId: string;
    selected: boolean; onSelect: () => void;
}) {
    const tagColor = TAG_COLORS[freelancer.tag] ?? accent;

    return (
        <motion.div
            layout
            whileHover={{ y: -3 }}
            style={{
                background: selected ? "#0f0e0c" : "#fff",
                color: selected ? "#fff" : "#0f0e0c",
                border: selected ? `2px solid ${accent}` : "2px solid transparent",
                borderRadius: "24px", padding: "28px", position: "relative",
                boxShadow: selected ? `0 0 0 4px ${accent}22, 0 20px 60px rgba(0,0,0,0.15)` : "0 2px 16px rgba(0,0,0,0.06)",
                transition: "background 0.25s, color 0.25s, box-shadow 0.25s",
            }}
        >
            {/* Tag */}
            <div style={{
                position: "absolute", top: "20px", right: "20px",
                background: `${tagColor}22`, color: tagColor,
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
                padding: "4px 10px", borderRadius: "100px",
            }}>{freelancer.tag}</div>

            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "18px" }}>
                <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${accent}, ${accent}88)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", fontWeight: 800, color: "#fff", flexShrink: 0,
                }}>{freelancer.avatar}</div>
                <div>
                    <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "3px" }}>{freelancer.name}</div>
                    <div style={{ fontSize: "12px", opacity: 0.5 }}>{freelancer.title}</div>
                </div>
            </div>

            {/* Rating */}
            <div style={{ marginBottom: "14px" }}>
                <span style={{ color: "#F59E0B", fontSize: "13px" }}>{"★".repeat(Math.floor(freelancer.rating))}</span>
                <span style={{ fontWeight: 600, fontSize: "13px", marginLeft: "6px" }}>{freelancer.rating.toFixed(1)}</span>
                <span style={{ fontSize: "12px", opacity: 0.4, marginLeft: "4px" }}>({freelancer.reviews})</span>
            </div>

            {/* Skills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                {freelancer.skills.slice(0, 3).map(skill => (
                    <span key={skill} style={{
                        fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "100px",
                        background: selected ? "rgba(255,255,255,0.12)" : `${accent}15`,
                        color: selected ? "#fff" : accent,
                    }}>{skill}</span>
                ))}
            </div>

            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", opacity: 0.55, marginBottom: "20px" }}>
                <span>✅ {freelancer.completions} completed</span>
                <span>⚡ {freelancer.response}</span>
            </div>

            {/* Price + Actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                <div>
                    <div style={{ fontSize: "10px", fontWeight: 600, opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>From</div>
                    <div style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.02em" }}>{freelancer.price}</div>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                    {/* Select for pricing */}
                    <button
                        onClick={onSelect}
                        style={{
                            padding: "9px 16px", borderRadius: "100px", border: "none",
                            background: selected ? accent : `${accent}18`,
                            color: selected ? "#fff" : accent,
                            fontWeight: 700, fontSize: "12px", cursor: "pointer",
                            transition: "background 0.2s",
                        }}
                    >{selected ? "✓ Selected" : "Select"}</button>

                    {/* View full profile */}
                    <Link
                        href={`/freelancer/${serviceId}/${freelancer.id}`}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            padding: "9px 16px", borderRadius: "100px",
                            background: selected ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.07)",
                            color: selected ? "#fff" : "#333",
                            fontWeight: 700, fontSize: "12px", textDecoration: "none",
                            display: "flex", alignItems: "center", gap: "4px",
                            transition: "background 0.2s",
                        }}
                    >
                        Profile →
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ServicesDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const service = SERVICES_DATA.find((s) => s.id === id) || SERVICES_DATA[0];
    const freelancers = FREELANCERS[id] ?? FREELANCERS["01"];

    const [selectedFreelancer, setSelectedFreelancer] = useState<FreelancerType | null>(null);
    const pricingRef = useRef<HTMLDivElement>(null);

    const handleSelect = (freelancer: FreelancerType) => {
        const newVal = selectedFreelancer?.id === freelancer.id ? null : freelancer;
        setSelectedFreelancer(newVal);
        if (newVal) {
            setTimeout(() => pricingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
        }
    };

    return (
        <motion.main
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                backgroundColor: "#FAFAF8", minHeight: "100vh",
                paddingTop: "140px", paddingBottom: "100px",
                paddingLeft: "60px", paddingRight: "60px", boxSizing: "border-box",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

                {/* Back */}
                <Link href="/services" style={{
                    display: "inline-flex", alignItems: "center", gap: "12px",
                    fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em",
                    textDecoration: "none", color: "#1a1a1a", marginBottom: "48px", opacity: 0.6,
                }}>
                    <span style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        border: "1px solid rgba(0,0,0,0.12)", display: "flex",
                        alignItems: "center", justifyContent: "center",
                    }}>←</span>
                    BACK TO MARKETPLACE
                </Link>

                <div style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>

                    {/* ─── Left ─── */}
                    <div style={{ flex: 1, minWidth: 0 }}>

                        {/* Hero */}
                        <header style={{ marginBottom: "64px" }}>
                            <div style={{
                                fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em",
                                textTransform: "uppercase", color: service.accent, marginBottom: "16px",
                            }}>Service Details</div>
                            <h1 style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: "clamp(40px, 5vw, 66px)", fontWeight: 900,
                                lineHeight: 1.05, marginBottom: "24px", letterSpacing: "-0.02em", color: "#0f0e0c",
                            }}>
                                {service.name.split(" ").slice(0, -1).join(" ")}{" "}
                                <em style={{ fontStyle: "italic", fontWeight: 400 }}>{service.name.split(" ").slice(-1)}</em>
                            </h1>
                            <p style={{ fontSize: "18px", lineHeight: 1.7, color: "rgba(0,0,0,0.55)", maxWidth: "640px" }}>
                                {service.fullDesc}
                            </p>
                        </header>

                        {/* Technical Breakdown */}
                        <section style={{ marginBottom: "80px" }}>
                            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 900, marginBottom: "28px", color: "#0f0e0c" }}>
                                Technical Breakdown
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                                {service.process.map((step, idx) => (
                                    <div key={idx} style={{ background: "#fff", padding: "32px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)" }}>
                                        <div style={{
                                            width: "40px", height: "40px", borderRadius: "50%",
                                            backgroundColor: service.accent, color: "#fff",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontWeight: 700, fontSize: "14px", marginBottom: "20px",
                                        }}>{idx + 1}</div>
                                        <h3 style={{ fontWeight: 700, fontSize: "16px", marginBottom: "10px", color: "#0f0e0c" }}>{step.title}</h3>
                                        <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.45)", lineHeight: 1.6 }}>{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ── Expert Selection ── */}
                        <section style={{ marginBottom: "80px" }}>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "8px" }}>
                                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 900, color: "#0f0e0c", margin: 0 }}>
                                    Choose an <em style={{ fontStyle: "italic", fontWeight: 400 }}>Expert</em>
                                </h2>
                                <span style={{ fontSize: "13px", color: "rgba(0,0,0,0.4)", fontWeight: 500 }}>
                                    {freelancers.length} specialists available
                                </span>
                            </div>
                            <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.45)", marginBottom: "28px", lineHeight: 1.6 }}>
                                Click <strong>Profile →</strong> to view full details, or <strong>Select</strong> to unlock their pricing packages below.
                            </p>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                                {freelancers.map((f) => (
                                    <FreelancerCard
                                        key={f.id}
                                        freelancer={f}
                                        accent={service.accent}
                                        serviceId={id}
                                        selected={selectedFreelancer?.id === f.id}
                                        onSelect={() => handleSelect(f)}
                                    />
                                ))}
                            </div>

                            {/* Hint */}
                            <AnimatePresence>
                                {!selectedFreelancer && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        style={{
                                            marginTop: "24px", textAlign: "center",
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                                            fontSize: "13px", color: "rgba(0,0,0,0.35)", fontWeight: 500,
                                        }}
                                    >
                                        <span style={{
                                            width: "6px", height: "6px", borderRadius: "50%",
                                            backgroundColor: service.accent, display: "inline-block",
                                            animation: "pulse 1.5s ease-in-out infinite",
                                        }} />
                                        Select an expert above to reveal their pricing packages
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* ── Pricing (revealed after selection) ── */}
                        <AnimatePresence>
                            {selectedFreelancer && (
                                <motion.section
                                    ref={pricingRef}
                                    key="pricing"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    style={{ marginBottom: "80px" }}
                                >
                                    {/* Banner */}
                                    <div style={{
                                        background: `linear-gradient(135deg, ${service.accent}10, ${service.accent}20)`,
                                        border: `1px solid ${service.accent}30`, borderRadius: "20px",
                                        padding: "20px 28px", display: "flex", alignItems: "center",
                                        gap: "16px", marginBottom: "36px",
                                    }}>
                                        <div style={{
                                            width: "44px", height: "44px", borderRadius: "50%",
                                            background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)`,
                                            color: "#fff", fontWeight: 800, fontSize: "14px",
                                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                                        }}>{selectedFreelancer.avatar}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: "15px", color: "#0f0e0c" }}>
                                                Packages for <span style={{ color: service.accent }}>{selectedFreelancer.name}</span>
                                            </div>
                                            <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.45)" }}>
                                                {selectedFreelancer.title} · from {selectedFreelancer.price}
                                            </div>
                                        </div>
                                        <div style={{ marginLeft: "auto", display: "flex", gap: "8px" }}>
                                            <Link
                                                href={`/freelancer/${id}/${selectedFreelancer.id}`}
                                                style={{
                                                    padding: "8px 16px", borderRadius: "100px",
                                                    background: service.accent, color: "#fff",
                                                    fontSize: "12px", fontWeight: 700, textDecoration: "none",
                                                }}
                                            >View Profile →</Link>
                                            <button onClick={() => setSelectedFreelancer(null)} style={{
                                                padding: "8px 16px", borderRadius: "100px",
                                                border: "1px solid rgba(0,0,0,0.12)", background: "#fff",
                                                fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#666",
                                            }}>✕ Change</button>
                                        </div>
                                    </div>

                                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 900, marginBottom: "28px", color: "#0f0e0c" }}>
                                        Select a <em style={{ fontStyle: "italic", fontWeight: 400 }}>Package</em>
                                    </h2>

                                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "start" }}>
                                        {service.pricing.map((tier, idx) => (
                                            <div key={idx} style={{
                                                padding: "32px", borderRadius: "24px",
                                                border: tier.popular ? `2px solid ${service.accent}` : "1px solid rgba(0,0,0,0.07)",
                                                backgroundColor: tier.popular ? `${service.accent}10` : "#fff",
                                                transform: tier.popular ? "scale(1.03)" : "scale(1)",
                                                transition: "transform 0.2s",
                                            }}>
                                                {tier.popular && (
                                                    <div style={{ fontSize: "10px", fontWeight: 700, color: service.accent, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px" }}>
                                                        Most Popular
                                                    </div>
                                                )}
                                                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: 900, marginBottom: "8px", color: "#0f0e0c" }}>{tier.name}</h3>
                                                <div style={{ fontSize: "32px", fontWeight: 700, marginBottom: "24px", color: "#0f0e0c" }}>{tier.price}</div>
                                                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px 0" }}>
                                                    {tier.features.map((feat, fIdx) => (
                                                        <li key={fIdx} style={{ fontSize: "13px", color: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                                                            <span style={{ color: service.accent, fontWeight: 700 }}>✓</span>{feat}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <Link
                                                    href={`/freelancer/${id}/${selectedFreelancer.id}`}
                                                    style={{
                                                        display: "block", width: "100%", padding: "14px",
                                                        borderRadius: "100px", textAlign: "center",
                                                        fontWeight: 700, fontSize: "13px",
                                                        backgroundColor: tier.popular ? "#0f0e0c" : "rgba(0,0,0,0.06)",
                                                        color: tier.popular ? "#fff" : "#0f0e0c",
                                                        textDecoration: "none", boxSizing: "border-box",
                                                    }}
                                                >
                                                    Book with {selectedFreelancer.name.split(" ")[0]}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </motion.section>
                            )}
                        </AnimatePresence>

                        {/* Trust Signals */}
                        <section>
                            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 900, marginBottom: "28px", color: "#0f0e0c" }}>Trust Signals</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center", background: "rgba(255,255,255,0.6)", padding: "32px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.06)" }}>
                                {["UNISWAP", "AAVE", "CURVE", "COMPOUND"].map((brand) => (
                                    <div key={brand} style={{ fontWeight: 900, fontSize: "18px", letterSpacing: "-0.02em", color: "rgba(0,0,0,0.22)" }}>{brand}</div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* ─── Right: Sticky Inquiry Form ─── */}
                    <aside style={{ width: "380px", flexShrink: 0 }}>
                        <div style={{ position: "sticky", top: "120px", background: "#0f0e0c", color: "#fff", padding: "40px", borderRadius: "32px", boxShadow: "0 30px 80px rgba(0,0,0,0.18)" }}>
                            <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px", letterSpacing: "-0.02em" }}>Service Inquiry</h3>
                            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "28px", lineHeight: 1.6 }}>
                                {selectedFreelancer
                                    ? `Ready to work with ${selectedFreelancer.name}. Fill in the details.`
                                    : "Select an expert to enable booking, or browse profiles."}
                            </p>

                            {selectedFreelancer && (
                                <div style={{
                                    background: "rgba(255,255,255,0.06)", borderRadius: "16px",
                                    padding: "16px 20px", display: "flex", alignItems: "center",
                                    gap: "12px", marginBottom: "24px",
                                    border: `1px solid ${service.accent}44`,
                                }}>
                                    <div style={{
                                        width: "38px", height: "38px", borderRadius: "50%",
                                        background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)`,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: 800, fontSize: "12px", color: "#fff", flexShrink: 0,
                                    }}>{selectedFreelancer.avatar}</div>
                                    <div>
                                        <div style={{ fontSize: "13px", fontWeight: 700 }}>{selectedFreelancer.name}</div>
                                        <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>from {selectedFreelancer.price}</div>
                                    </div>
                                    <span style={{ marginLeft: "auto", fontSize: "16px", color: service.accent }}>✓</span>
                                </div>
                            )}

                            <form style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                                {[
                                    { label: "Full Name", type: "text", placeholder: "John Doe" },
                                    { label: "Email", type: "email", placeholder: "you@domain.com" },
                                ].map(({ label, type, placeholder }) => (
                                    <div key={label}>
                                        <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>{label}</label>
                                        <input type={type} placeholder={placeholder} style={{
                                            width: "100%", background: "rgba(255,255,255,0.06)",
                                            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                                            padding: "13px 18px", color: "#fff", fontSize: "14px",
                                            outline: "none", boxSizing: "border-box",
                                        }} />
                                    </div>
                                ))}
                                <div>
                                    <label style={{ display: "block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "8px" }}>Description</label>
                                    <textarea rows={3} placeholder="Tell us about your project..." style={{
                                        width: "100%", background: "rgba(255,255,255,0.06)",
                                        border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                                        padding: "13px 18px", color: "#fff", fontSize: "14px",
                                        outline: "none", resize: "vertical", boxSizing: "border-box",
                                    }} />
                                </div>
                                <button disabled={!selectedFreelancer} type="submit" style={{
                                    width: "100%", padding: "16px", borderRadius: "100px",
                                    backgroundColor: selectedFreelancer ? "#fff" : "rgba(255,255,255,0.1)",
                                    color: selectedFreelancer ? "#0f0e0c" : "rgba(255,255,255,0.25)",
                                    fontWeight: 900, fontSize: "13px", border: "none",
                                    cursor: selectedFreelancer ? "pointer" : "not-allowed",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                    transition: "background 0.3s, color 0.3s",
                                }}>
                                    {selectedFreelancer ? `Book ${selectedFreelancer.name.split(" ")[0]} →` : "Select an Expert First"}
                                </button>
                            </form>

                            <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{
                                    width: "42px", height: "42px", borderRadius: "50%",
                                    background: "rgba(255,255,255,0.08)", display: "flex",
                                    alignItems: "center", justifyContent: "center", fontSize: "18px",
                                }}>✅</div>
                                <div>
                                    <div style={{ fontSize: "13px", fontWeight: 700 }}>Verified Experts</div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)" }}>All vetted by SkillUp team</div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }`}</style>
        </motion.main>
    );
}
