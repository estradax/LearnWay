import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import { user } from "@/lib/server/schema/auth";
import {
  subjectInterest,
  subjectCanTeach,
  teachingDocument,
} from "@/lib/server/schema/user-detail";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const {
      userId,
      role,
      subjectInterestData,
      subjectCanTeachData,
      teachingDocumentData,
    } = await request.json();

    // Validate required fields
    if (!userId || !role) {
      return NextResponse.json(
        { error: "userId and role are required" },
        { status: 400 }
      );
    }

    // Update user role in the user table
    await db.update(user).set({ role }).where(eq(user.id, userId));

    // Insert subject interests
    if (subjectInterestData && Array.isArray(subjectInterestData)) {
      const interestRecords = subjectInterestData.map((subject: string) => ({
        id: nanoid(),
        userId,
        subject,
      }));

      if (interestRecords.length > 0) {
        await db.insert(subjectInterest).values(interestRecords);
      }
    }

    // Insert subjects they can teach (for teachers)
    if (
      role === "teacher" &&
      subjectCanTeachData &&
      Array.isArray(subjectCanTeachData)
    ) {
      const canTeachRecords = subjectCanTeachData.map((subject: string) => ({
        id: nanoid(),
        userId,
        subject,
      }));

      if (canTeachRecords.length > 0) {
        await db.insert(subjectCanTeach).values(canTeachRecords);
      }
    }

    // Insert teaching documents (for teachers)
    if (
      role === "teacher" &&
      teachingDocumentData &&
      Array.isArray(teachingDocumentData)
    ) {
      const documentRecords = teachingDocumentData.map((doc: any) => ({
        id: nanoid(),
        userId,
        document: doc.document,
        fileType: doc.fileType,
        fileName: doc.fileName,
      }));

      if (documentRecords.length > 0) {
        await db.insert(teachingDocument).values(documentRecords);
      }
    }

    return NextResponse.json(
      { message: "Registration completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
