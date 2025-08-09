CREATE TABLE "chat_message" (
	"id" serial PRIMARY KEY NOT NULL,
	"contact_request_id" integer NOT NULL,
	"sender_id" text NOT NULL,
	"content" text NOT NULL,
	"type" text DEFAULT 'text' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact_request" ADD COLUMN "is_paid" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "contact_request" ADD COLUMN "payment_date" timestamp;--> statement-breakpoint
ALTER TABLE "contact_request" ADD COLUMN "is_completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_contact_request_id_contact_request_id_fk" FOREIGN KEY ("contact_request_id") REFERENCES "public"."contact_request"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chat_message" ADD CONSTRAINT "chat_message_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;