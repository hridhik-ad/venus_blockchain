"use client";

import Link from "next/link";
import { Gig } from "@/lib/dummyData";

export default function GigCard({ gig, delay = 0 }: { gig: Gig; delay?: number }) {
    const shortAddr = `${gig.freelancer_address.slice(0, 6)}...${gig.freelancer_address.slice(-4)}`;

    return (
        <Link href={`/gig/${gig.id}`} className="no-underline">
            <div
                className="tilt-card group bg-white rounded-[20px] p-8 border border-border-c cursor-pointer transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(15,14,12,0.1)] relative overflow-hidden"
            >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 relative" style={{ background: gig.iconBg }}>
                    <span>{gig.icon}</span>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-cream2 rounded-full font-ui text-[9px] font-extrabold text-muted flex items-center justify-center">
                        {String(gig.id).padStart(2, "0")}
                    </div>
                </div>

                {/* Name */}
                <h3 className="font-ui font-extrabold text-lg text-ink mb-2.5 leading-tight">{gig.title}</h3>
                <p className="text-[13px] text-muted leading-relaxed mb-6">{gig.description}</p>

                {/* Footer */}
                <div className="flex justify-between items-center">
                    <span className="font-ui text-xs font-bold text-accent">{gig.gigCount} gigs</span>
                    <div className="w-9 h-9 rounded-full border-[1.5px] border-border-c flex items-center justify-center text-sm text-muted transition-all duration-200 group-hover:bg-ink group-hover:border-ink group-hover:text-cream group-hover:-rotate-45">
                        →
                    </div>
                </div>
            </div>
        </Link>
    );
}
