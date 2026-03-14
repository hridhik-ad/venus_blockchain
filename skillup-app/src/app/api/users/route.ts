// ─── API: /api/users ──────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET /api/users?email=...
export async function GET(req: NextRequest) {
    try {
        const email = req.nextUrl.searchParams.get("email");
        if (!email) {
            return NextResponse.json({ success: false, error: "email is required" }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

// POST /api/users — create or update user profile
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, name, role, address, title, skills, bio } = body;

        if (!email || !name || !role) {
            return NextResponse.json({ success: false, error: "email, name, and role are required" }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const result = await db.collection("users").updateOne(
            { email },
            {
                $set: {
                    name,
                    role,
                    address: address || "",
                    ...(role === "seller" ? { title: title || "", skills: skills || [], bio: bio || "" } : {}),
                    updatedAt: new Date(),
                },
                $setOnInsert: {
                    createdAt: new Date(),
                },
            },
            { upsert: true }
        );

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
