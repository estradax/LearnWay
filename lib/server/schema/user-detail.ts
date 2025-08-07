import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const subjectInterest = pgTable("subject_interest", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
});

export const subjectCanTeach = pgTable("subject_can_teach", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
});

export const teachingDocument = pgTable("teaching_document", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  document: text("document").notNull(),
  fileType: text("file_type").notNull(),
  fileName: text("file_name").notNull(),
});
