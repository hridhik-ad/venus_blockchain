"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
    { id: "01", label: "Smart Contract Audit", icon: "🛡", color: "#E8642C", desc: "Security analysis, formal verification" },
    { id: "02", label: "Product Design", icon: "✨", color: "#4A6FA5", desc: "UX/UI design, prototyping, branding" },
    { id: "03", label: "dApp Development", icon: "⚡", color: "#4A7A40", desc: "Full-stack decentralized apps" },
    { id: "04", label: "Cross-Chain Solutions", icon: "🕸", color: "#C9A96E", desc: "Bridges, CCIP, LayerZero" },
    { id: "05", label: "Graphics & Design", icon: "🎨", color: "#8B5CF6", desc: "Visuals, illustration, motion" },
    { id: "06", label: "Content Creation", icon: "📝", color: "#EC4899", desc: "Articles, whitepapers, copy" },
    { id: "07", label: "Community & Growth", icon: "📣", color: "#F59E0B", desc: "Discord, growth, campaigns" },
    { id: "08", label: "Digital Marketing", icon: "📈", color: "#06B6D4", desc: "SEO, social media, analytics" },
];

const STEPS = [
    { num: 1, label: "Choose Category" },
    { num: 2, label: "Your Profile" },
    { num: 3, label: "Skills & Tools" },
    { num: 4, label: "Portfolio" },
    { num: 5, label: "Pricing" },
];

const SKILL_SUGGESTIONS: Record<string, string[]> = {
    "01": ["Solidity", "Foundry", "Hardhat", "Slither", "Certora", "Echidna", "MythX", "Rust", "Anchor"],
    "02": ["Figma", "Framer", "Sketch", "Motion", "Prototyping", "User Research", "Wireframing", "Lottie"],
    "03": ["React", "Next.js", "Ethers.js", "Wagmi", "Viem", "RainbowKit", "Subgraph", "TypeScript", "IPFS"],
    "04": ["CCIP", "LayerZero", "Axelar", "Wormhole", "IBC", "Bridges", "zkBridge", "Optimism", "Arbitrum"],
    "05": ["Illustrator", "Photoshop", "Blender", "After Effects", "Cinema 4D", "Procreate", "3D"],
    "06": ["Ghost", "SEO", "Copywriting", "Whitepaper", "Technical Writing", "Twitter Threads", "Newsletter"],
    "07": ["Discord", "Community Mod", "Telegram", "Twitter", "Influencer Outreach", "DAO Strategy", "Launch"],
    "08": ["SEO", "Google Ads", "Analytics", "Content Strategy", "Email Marketing", "A/B Testing", "Meta Ads"],
};

type FormData = {
    categoryId: string;
    name: string;
    title: string;
    bio: string;
    location: string;
    walletAddress: string;
    skills: string[];
    languages: string[];
    portfolioItems: { title: string; tech: string; url: string }[];
    packages: { name: string; price: string; description: string; deliverables: string; days: string }[];
};

// ─── Helper Components ────────────────────────────────────────────────────────

function StepProgress({ current, steps }: { current: number; steps: typeof STEPS }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: "60px" }}>
            {steps.map((step, idx) => {
                const done = current > step.num;
                const active = current === step.num;
                return (
                    <React.Fragment key={step.num}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                            <div style={{
                                width: "40px", height: "40px", borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontWeight: 800, fontSize: "14px",
                                background: done ? "#0f0e0c" : active ? "#E8642C" : "rgba(0,0,0,0.06)",
                                color: done || active ? "#fff" : "rgba(0,0,0,0.3)",
                                transition: "all 0.3s",
                                border: active ? "3px solid #E8642C" : "3px solid transparent",
                                boxShadow: active ? "0 0 0 4px rgba(232,100,44,0.2)" : "none",
                            }}>
                                {done ? "✓" : step.num}
                            </div>
                            <div style={{
                                fontSize: "11px", fontWeight: 600,
                                color: active ? "#E8642C" : done ? "#0f0e0c" : "rgba(0,0,0,0.3)",
                                textAlign: "center", whiteSpace: "nowrap",
                            }}>{step.label}</div>
                        </div>
                        {idx < steps.length - 1 && (
                            <div style={{
                                flex: 1, height: "2px", marginBottom: "24px",
                                background: done ? "#0f0e0c" : "rgba(0,0,0,0.08)",
                                transition: "background 0.3s",
                                marginLeft: "4px", marginRight: "4px",
                            }} />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

function inputStyle(focused = false): React.CSSProperties {
    return {
        width: "100%", padding: "14px 18px", borderRadius: "14px",
        border: focused ? "2px solid #E8642C" : "2px solid rgba(0,0,0,0.1)",
        background: "#fff", fontSize: "15px", color: "#0f0e0c",
        outline: "none", boxSizing: "border-box", transition: "border 0.2s",
        fontFamily: "'Inter', sans-serif",
    };
}

function Label({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "8px" }}>
            {children}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>({
        categoryId: "",
        name: "", title: "", bio: "", location: "", walletAddress: "",
        skills: [], languages: [],
        portfolioItems: [{ title: "", tech: "", url: "" }],
        packages: [
            { name: "Basic", price: "", description: "", deliverables: "", days: "" },
            { name: "Standard", price: "", description: "", deliverables: "", days: "" },
            { name: "Premium", price: "", description: "", deliverables: "", days: "" },
        ],
    });
    const [skillInput, setSkillInput] = useState("");
    const [langInput, setLangInput] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const category = CATEGORIES.find(c => c.id === form.categoryId);
    const accentColor = category?.color ?? "#E8642C";

    const update = (field: keyof FormData, value: unknown) =>
        setForm(prev => ({ ...prev, [field]: value }));

    const addSkill = (skill: string) => {
        const trimmed = skill.trim();
        if (trimmed && !form.skills.includes(trimmed)) {
            update("skills", [...form.skills, trimmed]);
        }
        setSkillInput("");
    };

    const addLanguage = (lang: string) => {
        const trimmed = lang.trim();
        if (trimmed && !form.languages.includes(trimmed)) {
            update("languages", [...form.languages, trimmed]);
        }
        setLangInput("");
    };

    const canNext = () => {
        if (step === 1) return !!form.categoryId;
        if (step === 2) return !!(form.name && form.title && form.bio);
        if (step === 3) return form.skills.length >= 2;
        if (step === 4) return !!form.portfolioItems[0].title;
        if (step === 5) return !!form.packages[0].price;
        return true;
    };

    if (submitted) {
        return (
            <main style={{
                fontFamily: "'Inter', sans-serif",
                backgroundColor: "#FAFAF8", minHeight: "100vh",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "120px 60px", boxSizing: "border-box",
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ textAlign: "center", maxWidth: "600px" }}
                >
                    <div style={{
                        width: "100px", height: "100px", borderRadius: "50%",
                        background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "48px", margin: "0 auto 32px",
                        boxShadow: `0 20px 60px ${accentColor}44`,
                    }}>🎉</div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "48px", fontWeight: 900, color: "#0f0e0c",
                        lineHeight: 1.1, marginBottom: "20px",
                    }}>
                        You&apos;re <em style={{ color: accentColor, fontStyle: "italic" }}>Listed!</em>
                    </h1>
                    <p style={{ fontSize: "18px", color: "rgba(0,0,0,0.5)", lineHeight: 1.7, marginBottom: "40px" }}>
                        Welcome, <strong>{form.name}</strong>! Your profile as a <strong>{category?.label}</strong> expert is under review. We&apos;ll verify and publish it within 24 hours.
                    </p>
                    <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
                        <Link href="/services" style={{
                            padding: "16px 32px", borderRadius: "100px",
                            background: "#0f0e0c", color: "#fff",
                            fontWeight: 700, textDecoration: "none",
                        }}>
                            Browse Marketplace →
                        </Link>
                        <Link href="/" style={{
                            padding: "16px 32px", borderRadius: "100px",
                            background: "rgba(0,0,0,0.06)", color: "#0f0e0c",
                            fontWeight: 700, textDecoration: "none",
                        }}>
                            Go Home
                        </Link>
                    </div>
                </motion.div>
            </main>
        );
    }

    return (
        <main style={{
            fontFamily: "'Inter', sans-serif",
            backgroundColor: "#FAFAF8", minHeight: "100vh",
            paddingTop: "120px", paddingBottom: "100px",
            paddingLeft: "60px", paddingRight: "60px",
            boxSizing: "border-box",
        }}>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>

                {/* Header */}
                <div style={{ marginBottom: "48px" }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#E8642C", marginBottom: "12px" }}>
                        Freelancer Onboarding
                    </div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(40px, 5vw, 58px)", fontWeight: 900,
                        lineHeight: 1.08, color: "#0f0e0c", marginBottom: "16px", letterSpacing: "-0.02em",
                    }}>
                        List Your <em style={{ fontStyle: "italic", fontWeight: 400 }}>Services</em>
                    </h1>
                    <p style={{ fontSize: "17px", color: "rgba(0,0,0,0.5)", lineHeight: 1.7, maxWidth: "560px" }}>
                        Join 12,000+ freelancers on SkillUp. Set up your profile, pick a category, and start earning on-chain.
                    </p>
                </div>

                {/* Step progress */}
                <StepProgress current={step} steps={STEPS} />

                {/* Step content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >

                        {/* ── STEP 1: Category ── */}
                        {step === 1 && (
                            <div>
                                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 900, marginBottom: "8px", color: "#0f0e0c" }}>
                                    What do you <em style={{ fontStyle: "italic", fontWeight: 400 }}>specialize in?</em>
                                </h2>
                                <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.45)", marginBottom: "32px" }}>Choose the category that best describes your primary skill set.</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                                    {CATEGORIES.map(cat => {
                                        const isSelected = form.categoryId === cat.id;
                                        return (
                                            <motion.button
                                                key={cat.id}
                                                whileHover={{ y: -3 }}
                                                onClick={() => update("categoryId", cat.id)}
                                                style={{
                                                    padding: "28px 20px", borderRadius: "20px", cursor: "pointer",
                                                    border: isSelected ? `2px solid ${cat.color}` : "2px solid rgba(0,0,0,0.07)",
                                                    background: isSelected ? `${cat.color}10` : "#fff",
                                                    textAlign: "center",
                                                    boxShadow: isSelected ? `0 0 0 4px ${cat.color}18, 0 12px 40px rgba(0,0,0,0.08)` : "0 2px 12px rgba(0,0,0,0.04)",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                <div style={{ fontSize: "32px", marginBottom: "12px" }}>{cat.icon}</div>
                                                <div style={{ fontWeight: 700, fontSize: "13px", color: isSelected ? cat.color : "#0f0e0c", marginBottom: "6px", lineHeight: 1.3 }}>{cat.label}</div>
                                                <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.4)", lineHeight: 1.4 }}>{cat.desc}</div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 2: Profile ── */}
                        {step === 2 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 900, marginBottom: "0", color: "#0f0e0c" }}>
                                    Tell us <em style={{ fontStyle: "italic", fontWeight: 400 }}>about yourself</em>
                                </h2>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                    <div>
                                        <Label>Full Name *</Label>
                                        <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Aryan Mehta" style={inputStyle()} />
                                    </div>
                                    <div>
                                        <Label>Professional Title *</Label>
                                        <input value={form.title} onChange={e => update("title", e.target.value)} placeholder="Senior Solidity Auditor" style={inputStyle()} />
                                    </div>
                                    <div>
                                        <Label>Location</Label>
                                        <input value={form.location} onChange={e => update("location", e.target.value)} placeholder="Berlin, Germany" style={inputStyle()} />
                                    </div>
                                    <div>
                                        <Label>Wallet Address</Label>
                                        <input value={form.walletAddress} onChange={e => update("walletAddress", e.target.value)} placeholder="0xYour...Address" style={inputStyle()} />
                                    </div>
                                </div>

                                <div>
                                    <Label>Professional Bio * (min 80 characters)</Label>
                                    <textarea
                                        rows={5}
                                        value={form.bio}
                                        onChange={e => update("bio", e.target.value)}
                                        placeholder="Describe your experience, key achievements, and what makes you stand out. Be specific — buyers read this carefully."
                                        style={{ ...inputStyle(), resize: "vertical" }}
                                    />
                                    <div style={{ textAlign: "right", fontSize: "12px", color: form.bio.length >= 80 ? "#4A7A40" : "rgba(0,0,0,0.35)", marginTop: "6px" }}>
                                        {form.bio.length} / 80 min characters
                                    </div>
                                </div>

                                {/* Category badge */}
                                {category && (
                                    <div style={{
                                        display: "inline-flex", alignItems: "center", gap: "10px",
                                        padding: "10px 18px", borderRadius: "100px",
                                        background: `${category.color}12`, border: `1px solid ${category.color}30`,
                                        fontSize: "13px", fontWeight: 600, color: category.color, alignSelf: "flex-start",
                                    }}>
                                        <span>{category.icon}</span> {category.label}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── STEP 3: Skills ── */}
                        {step === 3 && (
                            <div>
                                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 900, marginBottom: "8px", color: "#0f0e0c" }}>
                                    Your <em style={{ fontStyle: "italic", fontWeight: 400 }}>Skills &amp; Tools</em>
                                </h2>
                                <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.45)", marginBottom: "24px" }}>Add at least 2 skills. Click suggestions or type your own.</p>

                                {/* Skill suggestions */}
                                <div style={{ marginBottom: "20px" }}>
                                    <Label>Suggested for {category?.label}</Label>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {(SKILL_SUGGESTIONS[form.categoryId] ?? []).map(s => (
                                            <button key={s} onClick={() => addSkill(s)} style={{
                                                padding: "8px 16px", borderRadius: "100px", cursor: "pointer",
                                                border: form.skills.includes(s) ? `2px solid ${accentColor}` : "2px solid rgba(0,0,0,0.1)",
                                                background: form.skills.includes(s) ? `${accentColor}15` : "#fff",
                                                color: form.skills.includes(s) ? accentColor : "#444",
                                                fontWeight: 600, fontSize: "13px", transition: "all 0.15s",
                                            }}>
                                                {form.skills.includes(s) ? "✓ " : ""}{s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom skill input */}
                                <div style={{ marginBottom: "20px" }}>
                                    <Label>Add Custom Skill</Label>
                                    <div style={{ display: "flex", gap: "12px" }}>
                                        <input
                                            value={skillInput}
                                            onChange={e => setSkillInput(e.target.value)}
                                            onKeyDown={e => e.key === "Enter" && addSkill(skillInput)}
                                            placeholder="Type a skill and press Enter"
                                            style={{ ...inputStyle(), flex: 1 }}
                                        />
                                        <button onClick={() => addSkill(skillInput)} style={{
                                            padding: "0 24px", borderRadius: "14px",
                                            background: accentColor, color: "#fff",
                                            border: "none", fontWeight: 700, cursor: "pointer", fontSize: "14px",
                                        }}>+</button>
                                    </div>
                                </div>

                                {/* Selected skills */}
                                {form.skills.length > 0 && (
                                    <div style={{ background: "#fff", borderRadius: "20px", padding: "24px", border: "1px solid rgba(0,0,0,0.07)" }}>
                                        <Label>Your Skills ({form.skills.length})</Label>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                            {form.skills.map(s => (
                                                <span key={s} style={{
                                                    padding: "8px 16px", borderRadius: "100px",
                                                    background: `${accentColor}15`, color: accentColor,
                                                    fontWeight: 600, fontSize: "13px",
                                                    display: "flex", alignItems: "center", gap: "8px",
                                                }}>
                                                    {s}
                                                    <button onClick={() => update("skills", form.skills.filter(x => x !== s))}
                                                        style={{ background: "none", border: "none", cursor: "pointer", color: accentColor, fontWeight: 700, fontSize: "14px", lineHeight: 1, padding: 0 }}>×</button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Languages */}
                                <div style={{ marginTop: "24px" }}>
                                    <Label>Languages</Label>
                                    <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                                        <input value={langInput} onChange={e => setLangInput(e.target.value)}
                                            onKeyDown={e => e.key === "Enter" && addLanguage(langInput)}
                                            placeholder="e.g. English, Spanish" style={{ ...inputStyle(), flex: 1 }} />
                                        <button onClick={() => addLanguage(langInput)} style={{
                                            padding: "0 24px", borderRadius: "14px",
                                            background: "rgba(0,0,0,0.07)", color: "#0f0e0c",
                                            border: "none", fontWeight: 700, cursor: "pointer", fontSize: "14px",
                                        }}>+</button>
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                        {form.languages.map(l => (
                                            <span key={l} style={{
                                                padding: "6px 14px", borderRadius: "100px",
                                                background: "rgba(0,0,0,0.05)", color: "#444",
                                                fontWeight: 600, fontSize: "13px", display: "flex", alignItems: "center", gap: "6px",
                                            }}>
                                                {l}
                                                <button onClick={() => update("languages", form.languages.filter(x => x !== l))}
                                                    style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "14px", lineHeight: 1, padding: 0 }}>×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 4: Portfolio ── */}
                        {step === 4 && (
                            <div>
                                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 900, marginBottom: "8px", color: "#0f0e0c" }}>
                                    Showcase your <em style={{ fontStyle: "italic", fontWeight: 400 }}>Portfolio</em>
                                </h2>
                                <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.45)", marginBottom: "28px" }}>Add past projects that demonstrate your expertise. At least 1 is required.</p>

                                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                    {form.portfolioItems.map((item, idx) => (
                                        <div key={idx} style={{
                                            background: "#fff", borderRadius: "20px", padding: "28px",
                                            border: "1px solid rgba(0,0,0,0.07)",
                                        }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                                <div style={{
                                                    width: "32px", height: "32px", borderRadius: "50%",
                                                    background: accentColor, color: "#fff",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontWeight: 800, fontSize: "13px",
                                                }}>{idx + 1}</div>
                                                {idx > 0 && (
                                                    <button onClick={() => update("portfolioItems", form.portfolioItems.filter((_, i) => i !== idx))}
                                                        style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "20px" }}>×</button>
                                                )}
                                            </div>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                <div style={{ gridColumn: "1 / -1" }}>
                                                    <Label>Project Title *</Label>
                                                    <input value={item.title} onChange={e => {
                                                        const items = [...form.portfolioItems];
                                                        items[idx] = { ...items[idx], title: e.target.value };
                                                        update("portfolioItems", items);
                                                    }} placeholder="Uniswap V4 Hook Audit" style={inputStyle()} />
                                                </div>
                                                <div>
                                                    <Label>Tech Stack Used</Label>
                                                    <input value={item.tech} onChange={e => {
                                                        const items = [...form.portfolioItems];
                                                        items[idx] = { ...items[idx], tech: e.target.value };
                                                        update("portfolioItems", items);
                                                    }} placeholder="Solidity / Foundry" style={inputStyle()} />
                                                </div>
                                                <div>
                                                    <Label>Project URL (optional)</Label>
                                                    <input value={item.url} onChange={e => {
                                                        const items = [...form.portfolioItems];
                                                        items[idx] = { ...items[idx], url: e.target.value };
                                                        update("portfolioItems", items);
                                                    }} placeholder="https://github.com/..." style={inputStyle()} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {form.portfolioItems.length < 5 && (
                                        <button
                                            onClick={() => update("portfolioItems", [...form.portfolioItems, { title: "", tech: "", url: "" }])}
                                            style={{
                                                padding: "18px", borderRadius: "20px",
                                                border: `2px dashed ${accentColor}40`,
                                                background: `${accentColor}06`,
                                                color: accentColor, fontWeight: 700, fontSize: "14px",
                                                cursor: "pointer", transition: "all 0.2s",
                                            }}
                                        >
                                            + Add Another Project
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── STEP 5: Pricing ── */}
                        {step === 5 && (
                            <div>
                                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 900, marginBottom: "8px", color: "#0f0e0c" }}>
                                    Set your <em style={{ fontStyle: "italic", fontWeight: 400 }}>Packages</em>
                                </h2>
                                <p style={{ fontSize: "14px", color: "rgba(0,0,0,0.45)", marginBottom: "28px" }}>Define 1–3 service tiers. Buyers will see these as options when booking you.</p>

                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                                    {form.packages.map((pkg, idx) => {
                                        const tierAccent = idx === 0 ? "rgba(0,0,0,0.6)" : idx === 1 ? accentColor : "#8B5CF6";
                                        return (
                                            <div key={idx} style={{
                                                background: "#fff", borderRadius: "24px", padding: "28px",
                                                border: `2px solid ${tierAccent}25`,
                                                boxShadow: idx === 1 ? `0 8px 40px ${accentColor}18` : "0 2px 12px rgba(0,0,0,0.04)",
                                            }}>
                                                <div style={{
                                                    fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
                                                    letterSpacing: "0.1em", color: tierAccent, marginBottom: "20px",
                                                }}>
                                                    {pkg.name} {idx === 1 ? "⭐ Recommended" : ""}
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                                    <div>
                                                        <Label>Price (USD) *</Label>
                                                        <input value={pkg.price} onChange={e => {
                                                            const pkgs = [...form.packages];
                                                            pkgs[idx] = { ...pkgs[idx], price: e.target.value };
                                                            update("packages", pkgs);
                                                        }} placeholder="$1,200" style={inputStyle()} />
                                                    </div>
                                                    <div>
                                                        <Label>Short Description</Label>
                                                        <input value={pkg.description} onChange={e => {
                                                            const pkgs = [...form.packages];
                                                            pkgs[idx] = { ...pkgs[idx], description: e.target.value };
                                                            update("packages", pkgs);
                                                        }} placeholder="e.g. Up to 1,000 LOC" style={inputStyle()} />
                                                    </div>
                                                    <div>
                                                        <Label>Key Deliverable</Label>
                                                        <input value={pkg.deliverables} onChange={e => {
                                                            const pkgs = [...form.packages];
                                                            pkgs[idx] = { ...pkgs[idx], deliverables: e.target.value };
                                                            update("packages", pkgs);
                                                        }} placeholder="Security report + PoC" style={inputStyle()} />
                                                    </div>
                                                    <div>
                                                        <Label>Delivery Days</Label>
                                                        <input value={pkg.days} onChange={e => {
                                                            const pkgs = [...form.packages];
                                                            pkgs[idx] = { ...pkgs[idx], days: e.target.value };
                                                            update("packages", pkgs);
                                                        }} placeholder="7" style={inputStyle()} type="number" min="1" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Summary preview */}
                                <div style={{ marginTop: "32px", background: "rgba(0,0,0,0.02)", borderRadius: "20px", padding: "28px", border: "1px solid rgba(0,0,0,0.07)" }}>
                                    <div style={{ fontSize: "13px", fontWeight: 700, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>Profile Summary</div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                                        {[
                                            { label: "Name", value: form.name || "—" },
                                            { label: "Category", value: category?.label ?? "—" },
                                            { label: "Location", value: form.location || "—" },
                                            { label: "Skills", value: form.skills.slice(0, 3).join(", ") || "—" },
                                            { label: "Portfolio Items", value: `${form.portfolioItems.filter(p => p.title).length} added` },
                                            { label: "Languages", value: form.languages.join(", ") || "—" },
                                        ].map(({ label, value }) => (
                                            <div key={label}>
                                                <div style={{ fontSize: "11px", fontWeight: 700, color: "rgba(0,0,0,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>{label}</div>
                                                <div style={{ fontSize: "14px", fontWeight: 600, color: "#0f0e0c" }}>{value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginTop: "48px", paddingTop: "32px",
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                }}>
                    <button
                        onClick={() => setStep(s => Math.max(1, s - 1))}
                        disabled={step === 1}
                        style={{
                            padding: "14px 28px", borderRadius: "100px",
                            border: "2px solid rgba(0,0,0,0.12)", background: "#fff",
                            color: step === 1 ? "rgba(0,0,0,0.25)" : "#0f0e0c",
                            fontWeight: 700, fontSize: "14px",
                            cursor: step === 1 ? "not-allowed" : "pointer",
                            display: "flex", alignItems: "center", gap: "8px",
                        }}
                    >
                        ← Previous
                    </button>

                    <div style={{ fontSize: "13px", color: "rgba(0,0,0,0.35)", fontWeight: 500 }}>
                        Step {step} of {STEPS.length}
                    </div>

                    {step < STEPS.length ? (
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => canNext() && setStep(s => s + 1)}
                            style={{
                                padding: "14px 32px", borderRadius: "100px", border: "none",
                                background: canNext() ? accentColor : "rgba(0,0,0,0.1)",
                                color: canNext() ? "#fff" : "rgba(0,0,0,0.3)",
                                fontWeight: 700, fontSize: "14px",
                                cursor: canNext() ? "pointer" : "not-allowed",
                                display: "flex", alignItems: "center", gap: "8px",
                                transition: "background 0.2s",
                            }}
                        >
                            Continue →
                        </motion.button>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => canNext() && setSubmitted(true)}
                            style={{
                                padding: "14px 36px", borderRadius: "100px", border: "none",
                                background: canNext() ? "#0f0e0c" : "rgba(0,0,0,0.1)",
                                color: canNext() ? "#fff" : "rgba(0,0,0,0.3)",
                                fontWeight: 900, fontSize: "14px",
                                cursor: canNext() ? "pointer" : "not-allowed",
                                display: "flex", alignItems: "center", gap: "8px",
                            }}
                        >
                            🚀 Submit Profile
                        </motion.button>
                    )}
                </div>

            </div>
        </main>
    );
}
