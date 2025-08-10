import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; // your drizzle instance
import * as authSchema from "./schema/auth";

export const auth = betterAuth({
  trustedOrigins: [process.env.VERCEL_URL!],
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      firstName: {
        required: true,
        type: "string",
      },
      lastName: {
        required: true,
        type: "string",
      },
      role: {
        required: true,
        type: "string",
      },
      phoneNumber: {
        required: false,
        type: "string",
      },
      location: {
        required: true,
        type: "string",
      },
      learningGoal: {
        required: false,
        type: "string",
      },
      teachingDescription: {
        required: false,
        type: "string",
      },
      educationBackground: {
        required: false,
        type: "string",
      },
      teachingExperience: {
        required: false,
        type: "string",
      },
      hourlyRate: {
        required: false,
        type: "number",
      },
      additionalExperience: {
        required: false,
        type: "string",
      },
    },
  },
});
