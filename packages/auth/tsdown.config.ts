import { defineConfig } from "tsdown";
import path from "path";

const dbPath = path.resolve(__dirname, "../db/src");
const envPath = path.resolve(__dirname, "../env");

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
    "@skaleam/db/schema": `${dbPath}/schema.ts`,
    "@skaleam/db": `${dbPath}/index.ts`,
    "@skaleam/env/server": `${envPath}/server.ts`,
    "@skaleam/env/client": `${envPath}/client.ts`,
  },
});
