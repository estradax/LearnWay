import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { auth } from "@/lib/server/auth";

export const { signIn, signUp, useSession, signOut } = createAuthClient({
  baseURL: '',
  plugins: [inferAdditionalFields<typeof auth>()],
});
