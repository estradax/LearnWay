import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const lesson = pgTable("lessons", {
  id: serial("id").primaryKey(),
  creatorId: text("creator_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  primarySubject: text("primary_subject").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  education: text("education").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }).notNull(),
  availability: text("availability").notNull(),
  image: text("image"), // Profile image URL
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonLanguage = pgTable("lesson_language", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull().references(() => lesson.id, { onDelete: "cascade" }),
  language: text("language").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonAward = pgTable("lesson_award", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull().references(() => lesson.id, { onDelete: "cascade" }),
  award: text("award").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const lessonCertification = pgTable("lesson_certification", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull().references(() => lesson.id, { onDelete: "cascade" }),
  certification: text("certification").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
