import { Elysia, t } from "elysia";
import { env } from "@skaleam/env/server";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(
    cors({
      origin: (request) => {
        const origin = request.headers.get("origin") ?? "";
        return env.TRUSTED_ORIGINS.includes(origin);
      },
    })
  )
  .get("/", () => ({
    message: "Welcome to Skale AM API",
    version: "0.0.1",
    timestamp: new Date().toISOString(),
  }))
  .get("/health", () => ({
    status: "healthy",
    uptime: process.uptime(),
  }))
  .get("/user/:id", ({ params }) => ({
    userId: params.id,
    message: `User ${params.id} retrieved`,
  }))
  .post(
    "/user",
    ({ body: { age, name } }) => {
      return {
        name,
        age,
      };
    },
    {
      body: t.Object({
        name: t.String(),
        age: t.Number(),
      }),
    }
  );

export type App = typeof app;

export default app;
