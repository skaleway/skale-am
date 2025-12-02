import { Elysia, t } from "elysia";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/login",
    ({ body }) => {
      // TODO: Implement login logic
      return {
        message: "Login endpoint",
        email: body.email,
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 8 }),
      }),
    }
  )
  .post(
    "/register",
    ({ body }) => {
      // TODO: Implement registration logic
      return {
        message: "Register endpoint",
        email: body.email,
        name: body.name,
      };
    },
    {
      body: t.Object({
        email: t.String({ format: "email" }),
        password: t.String({ minLength: 8 }),
        name: t.String({ minLength: 2 }),
      }),
    }
  )
  .post("/logout", () => {
    // TODO: Implement logout logic
    return { message: "Logged out successfully" };
  })
  .get("/me", () => {
    // TODO: Get current user from session
    return { message: "Get current user endpoint" };
  });
