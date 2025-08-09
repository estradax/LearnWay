CREATE TABLE "contact_request" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"tutor_id" text NOT NULL,
	"student_name" text NOT NULL,
	"student_email" text NOT NULL,
	"student_phone" text,
	"subject" text NOT NULL,
	"duration_minutes" integer NOT NULL,
	"preferred_date" timestamp,
	"time_slot" text,
	"message" text,
	"wants_negotiation" boolean DEFAULT false NOT NULL,
	"proposed_price" numeric(10, 2),
	"price_reason" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contact_request" ADD CONSTRAINT "contact_request_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact_request" ADD CONSTRAINT "contact_request_tutor_id_user_id_fk" FOREIGN KEY ("tutor_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;