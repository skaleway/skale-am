import { Elysia, t } from "elysia";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", () => {
    return { message: "List users endpoint" };
  })
  .get(
    "/:id",
    ({ params }) => {
      // TODO: Implement get user by ID
      return {
        message: "Get user endpoint",
        userId: params.id,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    ({ params, body }) => {
      // TODO: Implement update user
      return {
        message: "Update user endpoint",
        userId: params.id,
        updates: body,
      };
    },
    {
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
    ({ params }) => {
      // TODO: Implement delete user
      return {
        message: "Delete user endpoint",
        userId: params.id,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
