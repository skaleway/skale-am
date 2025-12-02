import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(import.meta.dirname, "../../../.env") });

const { default: app } = await import("./app");

export type { App } from "./app";

export default app;
