import { Elysia } from "elysia";
import { authRoutes } from "./auth";
import { userRoutes } from "./users";
import { healthRoutes } from "./health";

export const routes = new Elysia()
  .use(authRoutes)
  .use(userRoutes)
  .use(healthRoutes);
