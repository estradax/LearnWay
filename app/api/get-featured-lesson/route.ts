import { NextResponse } from "next/server";
import { db } from "@/lib/server/db";
import {
  lesson as lessonTable,
  lessonLanguage,
  lessonAward,
  lessonCertification,
} from "@/lib/server/schema/lesson";
import { user as userTable } from "@/lib/server/schema/auth";
import { inArray, type InferSelectModel } from "drizzle-orm";

export async function GET() {
  try {
    const lessons = await db.select().from(lessonTable);

    if (!lessons || lessons.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    const lessonIds = lessons.map((l) => l.id);
    const creatorIds = Array.from(new Set(lessons.map((l) => l.creatorId)));

    const [languages, awards, certifications, creators] = await Promise.all([
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
      db.select().from(userTable).where(inArray(userTable.id, creatorIds)),
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

    type UserRow = InferSelectModel<typeof userTable>;
    type Creator = Pick<
      UserRow,
      | "id"
      | "name"
      | "firstName"
      | "lastName"
      | "email"
      | "role"
      | "location"
      | "image"
    >;

    const creatorMap = new Map<string, Creator>();
    for (const u of creators as UserRow[]) {
      creatorMap.set(u.id, {
        id: u.id,
        name: u.name,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        location: u.location,
        image: u.image,
      });
    }

    const result = lessons.map((l) => ({
      ...l,
      languages: languageMap.get(l.id) ?? [],
      awards: awardMap.get(l.id) ?? [],
      certifications: certificationMap.get(l.id) ?? [],
      creator: creatorMap.get(l.creatorId) ?? null,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Featured lessons fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
