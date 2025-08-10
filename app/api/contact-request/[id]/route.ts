import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";
import { contactRequest as contactRequestTable } from "@/lib/server/schema/contact-request";
import { eq } from "drizzle-orm";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const idNum = Number.parseInt(id, 10);
    if (Number.isNaN(idNum)) {
      return NextResponse.json({ error: "Invalid request id" }, { status: 400 });
    }

    const existing = await db
      .select()
      .from(contactRequestTable)
      .where(eq(contactRequestTable.id, idNum))
      .limit(1);

    if (!existing || existing.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const record = existing[0];

    const body = await request.json().catch(() => ({}));

    // New: allow action-based updates in addition to decision updates
    const { action } = body ?? {};
    if (action === "summary") {
      // Only the tutor can submit a completion summary
      if (record.tutorId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      const summary = (body?.summary ?? "").toString().trim();
      if (!summary) {
        return NextResponse.json({ error: "summary is required" }, { status: 400 });
      }
      await db
        .update(contactRequestTable)
        .set({ completionSummary: summary, updatedAt: new Date() })
        .where(eq(contactRequestTable.id, idNum));
      return NextResponse.json({ message: "Summary saved" }, { status: 200 });
    }
    if (action === "pay") {
      // Only the student who created the request can pay
      if (record.studentId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      if (record.status !== "approved") {
        return NextResponse.json({ error: "Only approved requests can be paid" }, { status: 400 });
      }
      await db
        .update(contactRequestTable)
        .set({ isPaid: true, paymentDate: new Date(), updatedAt: new Date() })
        .where(eq(contactRequestTable.id, idNum));
      return NextResponse.json({ message: "Paid" }, { status: 200 });
    }

    if (action === "complete") {
      if (!record.isPaid) {
        return NextResponse.json({ error: "Cannot complete unpaid request" }, { status: 400 });
      }
      const updates: Partial<typeof record> = {};
      // Student marks finish first
      if (record.studentId === session.user.id) {
        updates.studentCompleted = true;
      } else if (record.tutorId === session.user.id) {
        // Tutor marks finish; require summary and studentCompleted first
        if (!record.studentCompleted) {
          return NextResponse.json({ error: "Student must mark as finished first" }, { status: 400 });
        }
        if (!record.completionSummary) {
          return NextResponse.json({ error: "Please submit a lesson summary before completing" }, { status: 400 });
        }
        updates.tutorCompleted = true;
        updates.completedAt = new Date();
      } else {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const finalCompleted = updates.tutorCompleted ?? record.tutorCompleted;
      const finalStudentCompleted = updates.studentCompleted ?? record.studentCompleted;
      const isCompleted = finalCompleted && finalStudentCompleted;

      await db
        .update(contactRequestTable)
        .set({
          studentCompleted: finalStudentCompleted,
          tutorCompleted: finalCompleted,
          isCompleted,
          completedAt: isCompleted ? new Date() : record.completedAt,
          updatedAt: new Date(),
        })
        .where(eq(contactRequestTable.id, idNum));

      return NextResponse.json({ message: isCompleted ? "Completed" : "Marked" }, { status: 200 });
    }

    // Backward-compatible decision endpoint (tutor only)
    // Only the tutor who received the request can decide
    if (record.tutorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status, fixedDate } = body ?? {};

    if (status !== "approved" && status !== "rejected") {
      return NextResponse.json(
        { error: "status must be 'approved' or 'rejected'" },
        { status: 400 }
      );
    }

    let fixedDateValue: Date | null = null;
    if (status === "approved") {
      if (!fixedDate) {
        return NextResponse.json(
          { error: "fixedDate is required when approving" },
          { status: 400 }
        );
      }
      const d = new Date(String(fixedDate));
      if (Number.isNaN(d.getTime())) {
        return NextResponse.json({ error: "fixedDate must be a valid date" }, { status: 400 });
      }
      fixedDateValue = d;
    }

    await db
      .update(contactRequestTable)
      .set({
        status,
        fixedDate: fixedDateValue,
        updatedAt: new Date(),
      })
      .where(eq(contactRequestTable.id, idNum));

    return NextResponse.json({ message: "Updated" }, { status: 200 });
  } catch (error) {
    console.error("ContactRequest PATCH error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 