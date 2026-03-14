// ─── API: GET /api/services ───────────────────────────────────────────────────
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
    try {
        const { db } = await connectToDatabase();
        const services = await db.collection("services").find({}).toArray();
        return NextResponse.json({ success: true, data: services });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
