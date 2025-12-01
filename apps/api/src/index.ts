import { createApp } from "./app";

const PORT = process.env.PORT || 3001;

const app = createApp().listen(PORT);

console.log(
  `🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type { App } from "./app";
