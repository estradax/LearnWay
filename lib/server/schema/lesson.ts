import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const lesson = pgTable("lessons", {
  id: serial("id").primaryKey(),
  creatorId: text("creator_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  primarySubject: text("primary_subject").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  education: text("education").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }).notNull(),
  availability: text("availability").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonLanguage = pgTable("lesson_language", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  language: text("language").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonAward = pgTable("lesson_award", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  award: text("award").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonCertification = pgTable("lesson_certification", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull(),
  certification: text("certification").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
