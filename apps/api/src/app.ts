import { Elysia } from "elysia";
import { env } from "@skaleam/env/server";
import { cors } from "@elysiajs/cors";
import { routes } from "./routes/index";

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
  .group("/api", (app) => app.use(routes));

export type App = typeof app;

export default app;
