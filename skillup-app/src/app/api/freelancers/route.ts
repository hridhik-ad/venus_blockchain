// ─── API: GET /api/freelancers?serviceId=01 ───────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const serviceId = searchParams.get("serviceId");
        const { db } = await connectToDatabase();
        const query = serviceId ? { serviceId } : {};
        const freelancers = await db.collection("freelancers").find(query).toArray();
        return NextResponse.json({ success: true, data: freelancers });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
