// ─── API: GET /api/gigs ───────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const gigs = await db.collection("gigs").find({}).toArray();
        return NextResponse.json({ success: true, data: gigs });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
