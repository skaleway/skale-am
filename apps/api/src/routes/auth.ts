import { Elysia } from "elysia";
import { auth } from "@skaleam/auth/auth";

/**
 * Auth routes for Elysia with Better Auth
 *
 * Better Auth automatically handles these endpoints at /api/auth/*:
 * - POST /api/auth/sign-up/email - Email/password registration
 * - POST /api/auth/sign-in/email - Email/password login
 * - POST /api/auth/sign-in/social - Social provider login (Google, etc.)
 * - POST /api/auth/sign-out - Logout
 * - GET /api/auth/session - Get current session
 * - GET /api/auth/callback/:provider - OAuth callback
 *
 * This file provides additional custom auth-related endpoints
 */
export const authRoutes = new Elysia({ prefix: "/auth" })
  .get("/me", async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return {
        authenticated: false,
        user: null,
        session: null,
      };
    }

    return {
      authenticated: true,
      user: session.user,
      session: session.session,
    };
  })
  .get("/providers", () => {
    return {
      providers: ["google"],
      emailPassword: true,
    };
  });
