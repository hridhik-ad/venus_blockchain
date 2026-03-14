export interface Gig {
    id: string;
    title: string;
    description: string;
    price: number;
    freelancer_address: string;
    freelancer_name: string;
    freelancer_initials: string;
    freelancer_role: string;
    freelancer_bio: string;
    image_url: string;
    category: string;
    rating: number;
    reviews: number;
    icon: string;
    iconBg: string;
    gigCount: string;
    skills: string[];
    gradient: string;
}

export const DUMMY_GIGS: Gig[] = [
    {
        id: "1", title: "Smart Contract Dev", description: "Solidity, Rust, and Move developers ready to build audited, gas-optimized contracts for DeFi, NFTs, and more.",
        price: 80, freelancer_address: "0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF12", freelancer_name: "Kaito Ryu", freelancer_initials: "KR", freelancer_role: "Smart Contract Engineer", freelancer_bio: "Former Uniswap v3 contributor. Builds secure, gas-optimized smart contracts with 3 CVEs disclosed and zero exploits in production.",
        image_url: "", category: "Blockchain", rating: 4.99, reviews: 312, icon: "⬡", iconBg: "rgba(232,100,44,0.1)", gigCount: "1,240", skills: ["Solidity", "Foundry", "EVM", "DeFi", "Auditing"], gradient: "linear-gradient(135deg,#e8642c,#c9a96e)",
    },
    {
        id: "2", title: "Web3 Design", description: "UI/UX designers specializing in dApps, NFT platforms, DeFi dashboards, and token launch sites.",
        price: 40, freelancer_address: "0x2B3c4D5e6F7890AbCdEf1234567890aBcDeF1234", freelancer_name: "Sofia Reyes", freelancer_initials: "SR", freelancer_role: "Web3 UX Designer", freelancer_bio: "10 years designing crypto products. Built UI for 3 top-20 DeFi protocols. Figma master + frontend-fluent.",
        image_url: "", category: "Design", rating: 4.95, reviews: 187, icon: "◈", iconBg: "rgba(201,169,110,0.12)", gigCount: "870", skills: ["Figma", "React", "dApp UI"], gradient: "linear-gradient(135deg,#0d1b3e,#4a6fa5)",
    },
    {
        id: "3", title: "Token Engineering", description: "Tokenomics design, whitepaper writing, and economic modeling for your next protocol launch.",
        price: 120, freelancer_address: "0x3c4D5e6F7890AbCdEf1234567890aBcDeF123456", freelancer_name: "Alex Marchetti", freelancer_initials: "AM", freelancer_role: "ZK Proof Engineer", freelancer_bio: "Circom and Noir specialist. PhD-level cryptography. Active zkEVM contributor and researcher.",
        image_url: "", category: "Research", rating: 4.97, reviews: 89, icon: "◎", iconBg: "rgba(184,201,176,0.2)", gigCount: "420", skills: ["Circom", "Noir", "zkEVM"], gradient: "linear-gradient(135deg,#b8c9b0,#4a7a40)",
    },
    {
        id: "4", title: "Security Audits", description: "On-chain verified audit reports from top-ranked security researchers. Protect your protocol.",
        price: 150, freelancer_address: "0x4D5e6F7890AbCdEf1234567890aBcDeF12345678", freelancer_name: "Li Jun", freelancer_initials: "LJ", freelancer_role: "Security Researcher", freelancer_bio: "Audit lead at Trail of Bits alumni. Found critical vulnerabilities in 5 major DeFi protocols.",
        image_url: "", category: "Security", rating: 5.0, reviews: 64, icon: "🛡", iconBg: "rgba(13,27,62,0.07)", gigCount: "310", skills: ["Slither", "Foundry", "Echidna"], gradient: "linear-gradient(135deg,#f2d4c2,#e8642c)",
    },
    {
        id: "5", title: "Frontend dApps", description: "React devs fluent in ethers.js, wagmi, RainbowKit and wallet integrations for modern dApps.",
        price: 50, freelancer_address: "0x5e6F7890AbCdEf1234567890aBcDeF1234567890", freelancer_name: "Priya Sharma", freelancer_initials: "PS", freelancer_role: "Frontend Developer", freelancer_bio: "Builds blazing-fast dApp frontends with Next.js, wagmi hooks, and OnchainKit. 3+ years in Web3.",
        image_url: "", category: "Web Dev", rating: 4.9, reviews: 231, icon: "💻", iconBg: "rgba(242,212,194,0.4)", gigCount: "980", skills: ["React", "Next.js", "wagmi", "ethers.js"], gradient: "linear-gradient(135deg,#e8642c,#f2d4c2)",
    },
    {
        id: "6", title: "Community & Growth", description: "Discord management, community building, influencer campaigns & launch strategy for Web3 projects.",
        price: 35, freelancer_address: "0x6F7890AbCdEf1234567890aBcDeF12345678ABCD", freelancer_name: "Aisha Kamau", freelancer_initials: "AK", freelancer_role: "Growth Strategist", freelancer_bio: "Scaled 4 NFT communities from 0 to 50K members. Twitter/X growth specialist and Discord architect.",
        image_url: "", category: "Marketing", rating: 4.85, reviews: 142, icon: "📣", iconBg: "rgba(232,100,44,0.08)", gigCount: "660", skills: ["Discord", "Twitter/X", "Telegram"], gradient: "linear-gradient(135deg,#c9a96e,#0d1b3e)",
    },
];
