import { defineConfig } from "tsdown";
import { resolve } from "path";

const root = process.cwd();
const dbPath = resolve(root, "../db/src");
const envPath = resolve(root, "../env");

export default defineConfig({
  entry: [
    "src/auth.ts",
    "src/auth-client.ts",
    "src/utils/send-invitation-email.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  outDir: "dist",
  tsconfig: "tsconfig.build.json",
  noExternal: [/@skaleam\/.*/],
  alias: {
    "@skaleam/db/schema": resolve(dbPath, "schema.ts"),
    "@skaleam/db": resolve(dbPath, "index.ts"),
    "@skaleam/env/server": resolve(envPath, "server.ts"),
    "@skaleam/env/client": resolve(envPath, "client.ts"),
  },
});
