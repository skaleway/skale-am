import { Elysia } from "elysia";
import { authRoutes } from "./auth.js";
import { userRoutes } from "./users.js";
import { healthRoutes } from "./health.js";

export const routes = new Elysia()
  .use(authRoutes)
  .use(userRoutes)
  .use(healthRoutes);
