import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { contactRequest } from "./contact-request";
import { user } from "./auth";

export const chatMessage = pgTable("chat_message", {
  id: serial("id").primaryKey(),
  contactRequestId: integer("contact_request_id")
    .notNull()
    .references(() => contactRequest.id, { onDelete: "cascade" }),
  senderId: text("sender_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  type: text("type").notNull().default("text"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}); 