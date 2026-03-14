"use client";

import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { SERVICES_DATA, FREELANCERS, TAG_COLORS } from "@/data/skillupData";

export default function FreelancerProfilePage({
    params,
}: {
    params: Promise<{ serviceId: string; freelancerId: string }>;
}) {
    const { serviceId, freelancerId } = use(params);
    const service = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
    const freelancers = FREELANCERS[serviceId] ?? FREELANCERS["01"];
    const freelancer = freelancers.find((f) => f.id === freelancerId) || freelancers[0];

    const [selectedTier, setSelectedTier] = useState<number | null>(null);
    const [bookingSubmitted, setBookingSubmitted] = useState(false);

    const tagColor = TAG_COLORS[freelancer.tag] ?? service.accent;

    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
                fontFamily: "'Inter', 'DM Sans', sans-serif",
                backgroundColor: "#FAFAF8",
                minHeight: "100vh",
                paddingTop: "120px",
                paddingBottom: "100px",
                paddingLeft: "60px",
                paddingRight: "60px",
                boxSizing: "border-box",
            }}
        >
            <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

                {/* Back link */}
                <Link
                    href={`/services/${serviceId}`}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: "12px",
                        fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em",
                        textDecoration: "none", color: "#1a1a1a", marginBottom: "48px", opacity: 0.6,
                    }}
                >
                    <span style={{
                        width: "32px", height: "32px", borderRadius: "50%",
                        border: "1px solid rgba(0,0,0,0.12)", display: "flex",
                        alignItems: "center", justifyContent: "center", fontSize: "14px",
                    }}>←</span>
                    BACK TO {service.name.toUpperCase()}
                </Link>

                {/* Main grid */}
                <div style={{ display: "flex", gap: "60px", alignItems: "flex-start" }}>

                    {/* ─── Left: Profile ─── */}
                    <div style={{ flex: 1, minWidth: 0 }}>

                        {/* Profile Header Card */}
                        <div style={{
                            background: "#fff", borderRadius: "32px",
                            padding: "40px", marginBottom: "32px",
                            border: "1px solid rgba(0,0,0,0.06)",
                            boxShadow: "0 4px 40px rgba(0,0,0,0.05)",
                        }}>
                            <div style={{ display: "flex", gap: "28px", alignItems: "flex-start" }}>
                                {/* Avatar */}
                                <div style={{
                                    width: "100px", height: "100px", borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${service.accent}, ${service.accent}88)`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "30px", fontWeight: 900, color: "#fff", flexShrink: 0,
                                    boxShadow: `0 12px 40px ${service.accent}44`,
                                }}>
                                    {freelancer.avatar}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px", flexWrap: "wrap" }}>
                                        <h1 style={{
                                            fontFamily: "'Playfair Display', Georgia, serif",
                                            fontSize: "32px", fontWeight: 900,
                                            color: "#0f0e0c", margin: 0, letterSpacing: "-0.02em",
                                        }}>
                                            {freelancer.name}
                                        </h1>
                                        <span style={{
                                            background: `${tagColor}18`, color: tagColor,
                                            fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
                                            padding: "5px 12px", borderRadius: "100px",
                                        }}>
                                            {freelancer.tag}
                                        </span>
                                    </div>
                                    <p style={{ fontSize: "16px", color: "rgba(0,0,0,0.5)", marginBottom: "16px", margin: "0 0 16px 0" }}>
                                        {freelancer.title}
                                    </p>

                                    {/* Stats row */}
                                    <div style={{ display: "flex", gap: "28px", flexWrap: "wrap" }}>
                                        {[
                                            { label: "Rating", value: `⭐ ${freelancer.rating.toFixed(1)}` },
                                            { label: "Reviews", value: `${freelancer.reviews}` },
                                            { label: "Completed", value: `${freelancer.completions} jobs` },
                                            { label: "Response", value: freelancer.response },
                                            { label: "Member Since", value: freelancer.memberSince },
                                            { label: "Location", value: `📍 ${freelancer.location}` },
                                        ].map(({ label, value }) => (
                                            <div key={label}>
                                                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", marginBottom: "4px" }}>{label}</div>
                                                <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f0e0c" }}>{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio */}
                        <div style={{
                            background: "#fff", borderRadius: "28px", padding: "36px",
                            border: "1px solid rgba(0,0,0,0.06)", marginBottom: "28px",
                        }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: "22px", fontWeight: 900, marginBottom: "16px", color: "#0f0e0c",
                            }}>About</h2>
                            <p style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(0,0,0,0.6)", margin: 0 }}>
                                {freelancer.bio}
                            </p>
                        </div>

                        {/* Skills */}
                        <div style={{
                            background: "#fff", borderRadius: "28px", padding: "36px",
                            border: "1px solid rgba(0,0,0,0.06)", marginBottom: "28px",
                        }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: "22px", fontWeight: 900, marginBottom: "20px", color: "#0f0e0c",
                            }}>Skills &amp; Tools</h2>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                {freelancer.skills.map((skill) => (
                                    <span key={skill} style={{
                                        padding: "8px 18px", borderRadius: "100px",
                                        background: `${service.accent}12`, color: service.accent,
                                        fontSize: "13px", fontWeight: 600,
                                        border: `1px solid ${service.accent}22`,
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div style={{ marginTop: "24px" }}>
                                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", marginBottom: "12px" }}>Languages</div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    {freelancer.languages.map((lang) => (
                                        <span key={lang} style={{
                                            padding: "6px 14px", borderRadius: "100px",
                                            background: "rgba(0,0,0,0.04)", color: "#444",
                                            fontSize: "13px", fontWeight: 500,
                                        }}>
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div style={{
                            background: "#fff", borderRadius: "28px", padding: "36px",
                            border: "1px solid rgba(0,0,0,0.06)", marginBottom: "28px",
                        }}>
                            <h2 style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontSize: "22px", fontWeight: 900, marginBottom: "20px", color: "#0f0e0c",
                            }}>Portfolio Highlights</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                {freelancer.portfolio.map((item, idx) => (
                                    <div key={idx} style={{
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                        padding: "20px 24px", borderRadius: "18px",
                                        background: `${service.accent}06`, border: `1px solid ${service.accent}15`,
                                        gap: "16px",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                            <div style={{
                                                width: "36px", height: "36px", borderRadius: "50%",
                                                background: `${service.accent}20`, color: service.accent,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontWeight: 800, fontSize: "14px", flexShrink: 0,
                                            }}>
                                                {idx + 1}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: "15px", color: "#0f0e0c", marginBottom: "3px" }}>{item.label}</div>
                                                <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.4)" }}>{item.tech}</div>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: "18px", opacity: 0.3 }}>→</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews preview */}
                        <div style={{
                            background: "#fff", borderRadius: "28px", padding: "36px",
                            border: "1px solid rgba(0,0,0,0.06)",
                        }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                                <h2 style={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontSize: "22px", fontWeight: 900, color: "#0f0e0c", margin: 0,
                                }}>Reviews</h2>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    <span style={{ fontSize: "28px", fontWeight: 900, color: "#0f0e0c" }}>{freelancer.rating.toFixed(1)}</span>
                                    <div>
                                        <div style={{ color: "#F59E0B", fontSize: "16px" }}>{"★".repeat(Math.floor(freelancer.rating))}</div>
                                        <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)" }}>{freelancer.reviews} reviews</div>
                                    </div>
                                </div>
                            </div>
                            {[
                                { author: "P. Hartmann", text: `Exceptional work. ${freelancer.name} delivered beyond expectations with clear communication throughout.`, stars: 5, time: "2 weeks ago" },
                                { author: "R. Singh", text: `Highly professional and technically brilliant. Would absolutely hire again for our next project.`, stars: 5, time: "1 month ago" },
                                { author: "C. Liu", text: `Solid expertise and quick turnaround. The final report was thorough and actionable.`, stars: freelancer.rating >= 4.9 ? 5 : 4, time: "2 months ago" },
                            ].map((review, idx) => (
                                <div key={idx} style={{
                                    paddingBottom: "20px", marginBottom: "20px",
                                    borderBottom: idx < 2 ? "1px solid rgba(0,0,0,0.06)" : "none",
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                        <div style={{ fontWeight: 700, fontSize: "14px" }}>{review.author}</div>
                                        <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.35)" }}>{review.time}</div>
                                    </div>
                                    <div style={{ color: "#F59E0B", fontSize: "13px", marginBottom: "8px" }}>{"★".repeat(review.stars)}</div>
                                    <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.55)", lineHeight: 1.6, margin: 0 }}>{review.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ─── Right: Pricing + Booking ─── */}
                    <aside style={{ width: "400px", flexShrink: 0 }}>
                        <div style={{ position: "sticky", top: "120px", display: "flex", flexDirection: "column", gap: "24px" }}>

                            {/* Price card */}
                            <div style={{
                                background: "#0f0e0c", color: "#fff",
                                borderRadius: "32px", padding: "36px",
                                boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
                            }}>
                                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>Starting from</div>
                                <div style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: "24px" }}>
                                    {freelancer.price}
                                </div>

                                {/* Tier selection */}
                                <div style={{ marginBottom: "24px" }}>
                                    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "12px" }}>Choose Package</div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {service.pricing.map((tier, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedTier(selectedTier === idx ? null : idx)}
                                                style={{
                                                    padding: "14px 18px", borderRadius: "16px", cursor: "pointer",
                                                    border: selectedTier === idx ? `2px solid ${service.accent}` : "2px solid rgba(255,255,255,0.08)",
                                                    background: selectedTier === idx ? `${service.accent}18` : "rgba(255,255,255,0.04)",
                                                    color: "#fff", textAlign: "left",
                                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                                    transition: "border 0.2s, background 0.2s",
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: "14px", marginBottom: "2px" }}>{tier.name}</div>
                                                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{tier.features[0]}</div>
                                                </div>
                                                <div style={{ textAlign: "right" }}>
                                                    <div style={{ fontWeight: 800, fontSize: "16px" }}>{tier.price}</div>
                                                    {tier.popular && <div style={{ fontSize: "10px", color: service.accent, fontWeight: 600 }}>Popular</div>}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Package features reveal */}
                                <AnimatePresence>
                                    {selectedTier !== null && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            style={{ overflow: "hidden", marginBottom: "20px" }}
                                        >
                                            <div style={{
                                                background: "rgba(255,255,255,0.04)", borderRadius: "14px",
                                                padding: "16px 20px", border: "1px solid rgba(255,255,255,0.08)",
                                            }}>
                                                <div style={{ fontSize: "11px", fontWeight: 700, color: service.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "12px" }}>
                                                    {service.pricing[selectedTier].name} Includes:
                                                </div>
                                                {service.pricing[selectedTier].features.map((feat, fIdx) => (
                                                    <div key={fIdx} style={{
                                                        display: "flex", alignItems: "center", gap: "8px",
                                                        fontSize: "13px", color: "rgba(255,255,255,0.65)",
                                                        marginBottom: "8px",
                                                    }}>
                                                        <span style={{ color: service.accent }}>✓</span> {feat}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Book button */}
                                <AnimatePresence mode="wait">
                                    {bookingSubmitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            style={{
                                                textAlign: "center", padding: "20px",
                                                background: `${service.accent}18`, borderRadius: "16px",
                                                border: `1px solid ${service.accent}44`,
                                            }}
                                        >
                                            <div style={{ fontSize: "28px", marginBottom: "8px" }}>🎉</div>
                                            <div style={{ fontWeight: 700, marginBottom: "4px" }}>Request Sent!</div>
                                            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{freelancer.name} will respond {freelancer.response}</div>
                                        </motion.div>
                                    ) : (
                                        <motion.button
                                            key="book"
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => selectedTier !== null && setBookingSubmitted(true)}
                                            disabled={selectedTier === null}
                                            style={{
                                                width: "100%", padding: "18px", borderRadius: "100px",
                                                backgroundColor: selectedTier !== null ? "#fff" : "rgba(255,255,255,0.12)",
                                                color: selectedTier !== null ? "#0f0e0c" : "rgba(255,255,255,0.3)",
                                                fontWeight: 900, fontSize: "14px", border: "none",
                                                cursor: selectedTier !== null ? "pointer" : "not-allowed",
                                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                                transition: "background 0.3s, color 0.3s",
                                            }}
                                        >
                                            {selectedTier !== null
                                                ? `Book ${service.pricing[selectedTier].name} — ${service.pricing[selectedTier].price} →`
                                                : "Select a Package First"}
                                        </motion.button>
                                    )}
                                </AnimatePresence>

                                {/* Trust note */}
                                <div style={{ textAlign: "center", marginTop: "16px", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
                                    Secured by SkillUp smart contract escrow
                                </div>
                            </div>

                            {/* Quick contact */}
                            <div style={{
                                background: "#fff", borderRadius: "24px", padding: "28px",
                                border: "1px solid rgba(0,0,0,0.07)",
                            }}>
                                <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "6px", color: "#0f0e0c" }}>
                                    Have a Question?
                                </div>
                                <div style={{ fontSize: "13px", color: "rgba(0,0,0,0.45)", marginBottom: "18px" }}>
                                    Send {freelancer.name.split(" ")[0]} a quick message before booking.
                                </div>
                                <textarea
                                    rows={3}
                                    placeholder="Hi, I wanted to ask about..."
                                    style={{
                                        width: "100%", borderRadius: "14px", padding: "14px 16px",
                                        border: "1px solid rgba(0,0,0,0.1)", fontSize: "14px",
                                        resize: "none", outline: "none", boxSizing: "border-box",
                                        background: "rgba(0,0,0,0.02)", color: "#0f0e0c",
                                    }}
                                />
                                <button style={{
                                    width: "100%", marginTop: "12px", padding: "13px",
                                    borderRadius: "100px", border: "none",
                                    background: `${service.accent}18`, color: service.accent,
                                    fontWeight: 700, fontSize: "13px", cursor: "pointer",
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                                }}>
                                    Send Message <span style={{ fontSize: "15px" }}>→</span>
                                </button>
                            </div>

                            {/* Other experts */}
                            {freelancers.filter(f => f.id !== freelancer.id).length > 0 && (
                                <div style={{
                                    background: "#fff", borderRadius: "24px", padding: "28px",
                                    border: "1px solid rgba(0,0,0,0.07)",
                                }}>
                                    <div style={{ fontWeight: 700, fontSize: "13px", color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
                                        Other Experts
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {freelancers.filter(f => f.id !== freelancer.id).slice(0, 3).map(f => (
                                            <Link
                                                key={f.id}
                                                href={`/freelancer/${serviceId}/${f.id}`}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: "12px",
                                                    textDecoration: "none", color: "inherit",
                                                    padding: "10px 12px", borderRadius: "14px",
                                                    transition: "background 0.2s",
                                                }}
                                            >
                                                <div style={{
                                                    width: "40px", height: "40px", borderRadius: "50%",
                                                    background: `linear-gradient(135deg, ${service.accent}, ${service.accent}77)`,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontWeight: 800, fontSize: "12px", color: "#fff", flexShrink: 0,
                                                }}>{f.avatar}</div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontWeight: 700, fontSize: "13px", color: "#0f0e0c" }}>{f.name}</div>
                                                    <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)" }}>{f.price} starting</div>
                                                </div>
                                                <span style={{ fontSize: "14px", opacity: 0.3 }}>→</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </aside>
                </div>
            </div>
        </motion.main>
    );
}
