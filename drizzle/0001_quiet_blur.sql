CREATE TABLE "subject_can_teach" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"subject" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subject_interest" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"subject" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teaching_document" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"document" text NOT NULL,
	"file_type" text NOT NULL,
	"file_name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "first_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "last_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "location" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "learning_goal" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "teaching_description" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "education_background" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "teaching_experience" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "hourly_rate" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "additional_experience" text;--> statement-breakpoint
ALTER TABLE "subject_can_teach" ADD CONSTRAINT "subject_can_teach_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subject_interest" ADD CONSTRAINT "subject_interest_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teaching_document" ADD CONSTRAINT "teaching_document_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;