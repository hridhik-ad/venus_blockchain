// ─── API: /api/seller/gigs ────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

// GET /api/seller/gigs?seller=email@example.com
export async function GET(req: NextRequest) {
    try {
        const seller = req.nextUrl.searchParams.get("seller");
        if (!seller) {
            return NextResponse.json({ success: false, error: "seller email is required" }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const gigs = await db.collection("seller_gigs").find({ sellerEmail: seller }).sort({ createdAt: -1 }).toArray();
        return NextResponse.json({ success: true, data: gigs });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

// POST /api/seller/gigs — create a new seller gig
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, category, price, skills, sellerEmail, sellerName } = body;

        if (!title || !description || !price || !sellerEmail || !sellerName) {
            return NextResponse.json(
                { success: false, error: "title, description, price, sellerEmail, and sellerName are required" },
                { status: 400 }
            );
        }

        const { db } = await connectToDatabase();

        const gig = {
            title,
            description,
            category: category || "General",
            price: Number(price),
            skills: skills || [],
            sellerEmail,
            sellerName,
            sellerInitials: sellerName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2),
            rating: 0,
            reviews: 0,
            status: "active",
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db.collection("seller_gigs").insertOne(gig);

        // Update the user record to mark them as having posted gigs
        await db.collection("users").updateOne(
            { email: sellerEmail },
            { $set: { hasPostedGigs: true, updatedAt: new Date() } }
        );

        return NextResponse.json({ success: true, data: { ...gig, _id: result.insertedId } });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}

// DELETE /api/seller/gigs?id=...
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        if (!id) {
            return NextResponse.json({ success: false, error: "gig id is required" }, { status: 400 });
        }
        const { db } = await connectToDatabase();
        const { ObjectId } = await import("mongodb");
        const result = await db.collection("seller_gigs").deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
