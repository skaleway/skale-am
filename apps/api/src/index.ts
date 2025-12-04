import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(import.meta.dirname, "../../../.env") });

const { default: app } = await import("./app.js");

export type { App } from "./app.js";
//nothing
export default app;
