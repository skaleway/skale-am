import { Elysia } from "elysia";

const app = new Elysia()
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
  .post("/json", ({ body }) => ({
    received: body,
  }));

export type App = typeof app;

export default app;
