// ─── API: GET /api/talent ─────────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const talent = await db.collection("talent").find({}).toArray();
        return NextResponse.json({ success: true, data: talent });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
