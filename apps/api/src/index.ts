import { resolve } from "node:path";
import { config } from "dotenv";

// Load .env BEFORE importing app (which imports env validation)
config({ path: resolve(import.meta.dirname, "../../../.env") });

// Dynamic import to ensure dotenv runs first
const { default: app } = await import("./app");

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT);

// console.log(
//   `🦊 Elysia server is running at http://${server.server?.hostname}:${server.server?.port}`
// );

export type { App } from "./app";

export default app;
