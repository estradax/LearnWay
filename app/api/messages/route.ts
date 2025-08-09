import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { chatMessage } from "@/lib/server/schema/chat-message";
import { contactRequest as contactRequestTable } from "@/lib/server/schema/contact-request";
import { and, desc, eq } from "drizzle-orm";

// GET /api/messages?contactRequestId=123
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const contactRequestIdParam = url.searchParams.get("contactRequestId");
    if (!contactRequestIdParam) {
      return NextResponse.json({ error: "Missing contactRequestId" }, { status: 400 });
    }
    const contactRequestId = Number.parseInt(contactRequestIdParam, 10);
    if (Number.isNaN(contactRequestId)) {
      return NextResponse.json({ error: "Invalid contactRequestId" }, { status: 400 });
    }

    const reqRows = await db
      .select()
      .from(contactRequestTable)
      .where(eq(contactRequestTable.id, contactRequestId))
      .limit(1);
    const conversation = reqRows[0];
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Ensure the user is participant (student or tutor)
    if (
      conversation.studentId !== session.user.id &&
      conversation.tutorId !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const rows = await db
      .select()
      .from(chatMessage)
      .where(eq(chatMessage.contactRequestId, contactRequestId))
      .orderBy(desc(chatMessage.createdAt));

    return NextResponse.json(rows.reverse(), { status: 200 });
  } catch (error) {
    console.error("Messages GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/messages { contactRequestId, content }
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const { contactRequestId, content, type } = body ?? {};

    if (!contactRequestId || !content) {
      return NextResponse.json({ error: "contactRequestId and content are required" }, { status: 400 });
    }

    const contactRequestIdNum = Number.parseInt(String(contactRequestId), 10);
    if (Number.isNaN(contactRequestIdNum)) {
      return NextResponse.json({ error: "Invalid contactRequestId" }, { status: 400 });
    }

    const reqRows = await db
      .select()
      .from(contactRequestTable)
      .where(eq(contactRequestTable.id, contactRequestIdNum))
      .limit(1);
    const conversation = reqRows[0];
    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Ensure the user is participant (student or tutor)
    if (
      conversation.studentId !== session.user.id &&
      conversation.tutorId !== session.user.id
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const inserted = await db
      .insert(chatMessage)
      .values({
        contactRequestId: contactRequestIdNum,
        senderId: session.user.id,
        content: String(content),
        type: type ? String(type) : "text",
      })
      .returning({ id: chatMessage.id });

    return NextResponse.json({ message: "Sent", id: inserted?.[0]?.id }, { status: 201 });
  } catch (error) {
    console.error("Messages POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 