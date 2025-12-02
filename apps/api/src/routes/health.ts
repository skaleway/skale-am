import { Elysia } from "elysia";

export const healthRoutes = new Elysia({ prefix: "/health" })
  .get("/", () => ({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }))
  .get("/ready", () => {
    // TODO: Add database/redis connection checks
    return {
      status: "ready",
      checks: {
        database: "ok",
        cache: "ok",
      },
    };
  });
