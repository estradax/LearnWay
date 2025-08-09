import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import {
  lesson as lessonTable,
  lessonLanguage,
  lessonAward,
  lessonCertification,
} from "@/lib/server/schema/lesson";
import { auth } from "@/lib/server/auth";
import { headers } from "next/headers";
import { eq, inArray, and } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lessons = await db
      .select()
      .from(lessonTable)
      .where(eq(lessonTable.creatorId, session.user.id));

    if (!lessons || lessons.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const lessonIds = lessons.map((l) => l.id);

    const [languages, awards, certifications] = await Promise.all([
      db
        .select()
        .from(lessonLanguage)
        .where(inArray(lessonLanguage.lessonId, lessonIds)),
      db
        .select()
        .from(lessonAward)
        .where(inArray(lessonAward.lessonId, lessonIds)),
      db
        .select()
        .from(lessonCertification)
        .where(inArray(lessonCertification.lessonId, lessonIds)),
    ]);

    const languageMap = new Map<number, string[]>();
    for (const row of languages) {
      const list = languageMap.get(row.lessonId) ?? [];
      list.push(row.language);
      languageMap.set(row.lessonId, list);
    }

    const awardMap = new Map<number, string[]>();
    for (const row of awards) {
      const list = awardMap.get(row.lessonId) ?? [];
      list.push(row.award);
      awardMap.set(row.lessonId, list);
    }

    const certificationMap = new Map<number, string[]>();
    for (const row of certifications) {
      const list = certificationMap.get(row.lessonId) ?? [];
      list.push(row.certification);
      certificationMap.set(row.lessonId, list);
    }

    const result = lessons.map((l) => ({
      ...l,
      languages: languageMap.get(l.id) ?? [],
      awards: awardMap.get(l.id) ?? [],
      certifications: certificationMap.get(l.id) ?? [],
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Lesson fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get current session from Better Auth and ensure user is authenticated
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      fullName,
      email,
      primarySubject,
      location,
      description,
      education,
      yearsExperience,
      hourlyRate,
      availability,
      languages,
      awards,
      certifications,
    } = body ?? {};

    // Basic validation for required fields
    const missing: string[] = [];
    if (!fullName) missing.push("fullName");
    if (!email) missing.push("email");
    if (!primarySubject) missing.push("primarySubject");
    if (!location) missing.push("location");
    if (!description) missing.push("description");
    if (!education) missing.push("education");
    if (yearsExperience === undefined || yearsExperience === null)
      missing.push("yearsExperience");
    if (hourlyRate === undefined || hourlyRate === null)
      missing.push("hourlyRate");
    if (!availability) missing.push("availability");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const yearsExperienceInt = Number.parseInt(String(yearsExperience), 10);
    if (Number.isNaN(yearsExperienceInt)) {
      return NextResponse.json(
        { error: "yearsExperience must be an integer" },
        { status: 400 }
      );
    }

    // Store decimals as strings to be safe with PostgreSQL numeric
    const hourlyRateStr =
      typeof hourlyRate === "number" ? String(hourlyRate) : String(hourlyRate);

    // Insert the base lesson
    const inserted = await db
      .insert(lessonTable)
      .values({
        creatorId: session.user.id,
        fullName,
        email,
        primarySubject,
        location,
        description,
        education,
        yearsExperience: yearsExperienceInt,
        hourlyRate: hourlyRateStr,
        availability,
      })
      .returning({ id: lessonTable.id });

    const newLessonId = inserted?.[0]?.id;

    // Insert optional related arrays sequentially (no transaction)
    if (newLessonId && Array.isArray(languages) && languages.length > 0) {
      const rows = languages
        .filter((l: unknown) => typeof l === "string" && l.trim().length > 0)
        .map((language: string) => ({ lessonId: newLessonId, language }));
      if (rows.length > 0) {
        await db.insert(lessonLanguage).values(rows);
      }
    }

    if (newLessonId && Array.isArray(awards) && awards.length > 0) {
      const rows = awards
        .filter((a: unknown) => typeof a === "string" && a.trim().length > 0)
        .map((award: string) => ({ lessonId: newLessonId, award }));
      if (rows.length > 0) {
        await db.insert(lessonAward).values(rows);
      }
    }

    if (
      newLessonId &&
      Array.isArray(certifications) &&
      certifications.length > 0
    ) {
      const rows = certifications
        .filter((c: unknown) => typeof c === "string" && c.trim().length > 0)
        .map((certification: string) => ({
          lessonId: newLessonId,
          certification,
        }));
      if (rows.length > 0) {
        await db.insert(lessonCertification).values(rows);
      }
    }

    return NextResponse.json(
      { message: "Lesson created", id: newLessonId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lesson creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { error: "Missing required parameter: id" },
        { status: 400 }
      );
    }

    const lessonId = Number.parseInt(String(idParam), 10);
    if (Number.isNaN(lessonId)) {
      return NextResponse.json(
        { error: "Invalid id parameter" },
        { status: 400 }
      );
    }

    const existing = await db
      .select({ id: lessonTable.id })
      .from(lessonTable)
      .where(and(eq(lessonTable.id, lessonId), eq(lessonTable.creatorId, session.user.id)))
      .limit(1);

    if (!existing || existing.length === 0) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Delete child rows first, then the lesson
    await db.delete(lessonLanguage).where(eq(lessonLanguage.lessonId, lessonId));
    await db.delete(lessonAward).where(eq(lessonAward.lessonId, lessonId));
    await db
      .delete(lessonCertification)
      .where(eq(lessonCertification.lessonId, lessonId));

    await db.delete(lessonTable).where(eq(lessonTable.id, lessonId));

    return NextResponse.json({ message: "Lesson deleted" }, { status: 200 });
  } catch (error) {
    console.error("Lesson delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
