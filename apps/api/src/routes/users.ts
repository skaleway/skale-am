import { Elysia, t } from "elysia";
import { betterAuthPlugin } from "../plugins/better-auth.js";

/**
 * User routes with authentication protection
 * Uses the betterAuth macro to require authentication and inject user/session
 */
export const userRoutes = new Elysia({ prefix: "/users" })
  .use(betterAuthPlugin)
  .get(
    "/",
    ({ user }) => {
      return {
        message: "List users endpoint",
        requestedBy: user.id,
      };
    },
    { auth: true }
  )
  .get(
    "/me",
    ({ user, session }) => {
      return {
        user,
        session,
      };
    },
    { auth: true }
  )
  .get(
    "/:id",
    ({ params, user }) => {
      return {
        message: "Get user endpoint",
        userId: params.id,
        requestedBy: user.id,
      };
    },
    {
      auth: true,
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    ({ params, body, user }) => {
      return {
        message: "Update user endpoint",
        userId: params.id,
        updates: body,
        updatedBy: user.id,
      };
    },
    {
      auth: true,
      params: t.Object({
        id: t.String(),
      }),
      body: t.Object({
        name: t.Optional(t.String()),
        email: t.Optional(t.String({ format: "email" })),
      }),
    }
  )
  .delete(
    "/:id",
    ({ params, user }) => {
      return {
        message: "Delete user endpoint",
        userId: params.id,
        deletedBy: user.id,
      };
    },
    {
      auth: true,
      params: t.Object({
        id: t.String(),
      }),
    }
  );
