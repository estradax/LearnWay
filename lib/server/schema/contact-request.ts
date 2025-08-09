import { pgTable, serial, text, timestamp, integer, boolean, decimal } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const contactRequest = pgTable("contact_request", {
  id: serial("id").primaryKey(),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  tutorId: text("tutor_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  // Snapshot of student-provided contact info
  studentName: text("student_name").notNull(),
  studentEmail: text("student_email").notNull(),
  studentPhone: text("student_phone"),

  subject: text("subject").notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  preferredDate: timestamp("preferred_date"),
  timeSlot: text("time_slot"),
  message: text("message"),

  wantsNegotiation: boolean("wants_negotiation").notNull().default(false),
  proposedPrice: decimal("proposed_price", { precision: 10, scale: 2 }),
  priceReason: text("price_reason"),

  status: text("status").notNull().default("pending"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}); 