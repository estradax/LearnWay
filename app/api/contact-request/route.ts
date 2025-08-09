import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/server/db";
import { auth } from "@/lib/server/auth";
import { contactRequest as contactRequestTable } from "@/lib/server/schema/contact-request";
import { user as userTable } from "@/lib/server/schema/auth";
import { eq, inArray } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const asParam = url.searchParams.get("as");
    const asTutor = asParam === "tutor";

    if (asTutor) {
      // Requests addressed to me as a tutor (incoming requests)
      const rows = await db
        .select()
        .from(contactRequestTable)
        .where(eq(contactRequestTable.tutorId, session.user.id));

      if (!rows || rows.length === 0) {
        return NextResponse.json([], { status: 200 });
      }

      const studentIds = Array.from(new Set(rows.map((r) => r.studentId)));
      const students = await db
        .select({
          id: userTable.id,
          name: userTable.name,
          firstName: userTable.firstName,
          lastName: userTable.lastName,
          email: userTable.email,
          role: userTable.role,
          location: userTable.location,
          image: userTable.image,
        })
        .from(userTable)
        .where(inArray(userTable.id, studentIds));

      const studentById = new Map<string, (typeof students)[number]>();
      for (const s of students) studentById.set(s.id, s);

      const result = rows.map((r) => ({
        ...r,
        student: studentById.get(r.studentId) || null,
      }));

      return NextResponse.json(result, { status: 200 });
    }

    // Default: requests created by me as a student (outgoing requests)
    const rows = await db
      .select()
      .from(contactRequestTable)
      .where(eq(contactRequestTable.studentId, session.user.id));

    if (!rows || rows.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const tutorIds = Array.from(new Set(rows.map((r) => r.tutorId)));
    const tutors = await db
      .select({
        id: userTable.id,
        name: userTable.name,
        firstName: userTable.firstName,
        lastName: userTable.lastName,
        email: userTable.email,
        role: userTable.role,
        location: userTable.location,
        image: userTable.image,
      })
      .from(userTable)
      .where(inArray(userTable.id, tutorIds));

    const tutorById = new Map<string, (typeof tutors)[number]>();
    for (const t of tutors) tutorById.set(t.id, t);

    const result = rows.map((r) => ({
      ...r,
      tutor: tutorById.get(r.tutorId) || null,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("ContactRequest GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      tutorId,
      studentName,
      studentEmail,
      studentPhone,
      subject,
      durationMinutes,
      preferredDate, // ISO string
      timeSlot,
      message,
      wantsNegotiation,
      proposedPrice, // number or string
      priceReason,
    } = body ?? {};

    const missing: string[] = [];
    if (!tutorId) missing.push("tutorId");
    if (!studentName) missing.push("studentName");
    if (!studentEmail) missing.push("studentEmail");
    if (!subject) missing.push("subject");
    if (durationMinutes === undefined || durationMinutes === null) missing.push("durationMinutes");

    if (missing.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
    }

    // Prevent contacting own lesson (self-contact)
    if (String(tutorId) === session.user.id) {
      return NextResponse.json({ error: "You cannot contact yourself" }, { status: 400 });
    }

    const durationInt = Number.parseInt(String(durationMinutes), 10);
    if (Number.isNaN(durationInt)) {
      return NextResponse.json({ error: "durationMinutes must be an integer" }, { status: 400 });
    }

    const proposedPriceStr =
      proposedPrice === undefined || proposedPrice === null
        ? null
        : typeof proposedPrice === "number"
        ? String(proposedPrice)
        : String(proposedPrice);

    const values = {
      studentId: session.user.id,
      tutorId: String(tutorId),
      studentName: String(studentName),
      studentEmail: String(studentEmail),
      studentPhone: studentPhone ? String(studentPhone) : null,
      subject: String(subject),
      durationMinutes: durationInt,
      preferredDate: preferredDate ? new Date(preferredDate) : null,
      timeSlot: timeSlot ? String(timeSlot) : null,
      message: message ? String(message) : null,
      wantsNegotiation: Boolean(wantsNegotiation),
      proposedPrice: proposedPriceStr,
      priceReason: priceReason ? String(priceReason) : null,
      status: "pending" as const,
    };

    // Validate tutor exists to avoid FK violation
    const tutorExists = await db
      .select({ id: userTable.id })
      .from(userTable)
      .where(eq(userTable.id, values.tutorId))
      .limit(1);
    if (!tutorExists || tutorExists.length === 0) {
      return NextResponse.json({ error: "Tutor not found" }, { status: 400 });
    }

    const inserted = await db
      .insert(contactRequestTable)
      .values(values)
      .returning({ id: contactRequestTable.id });
    const newId = inserted?.[0]?.id;

    return NextResponse.json({ message: "Contact request created", id: newId }, { status: 201 });
  } catch (error) {
    console.error("ContactRequest POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 