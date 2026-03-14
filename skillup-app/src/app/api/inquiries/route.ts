// ─── API: POST /api/inquiries ─────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, description, freelancerId, serviceId, packageName } = body;

        if (!name || !email) {
            return NextResponse.json({ success: false, error: "name and email are required" }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const result = await db.collection("inquiries").insertOne({
            name, email, description, freelancerId, serviceId, packageName,
            status: "pending",
            createdAt: new Date(),
        });
        return NextResponse.json({ success: true, id: result.insertedId });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
