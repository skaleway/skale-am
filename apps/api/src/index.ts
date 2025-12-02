import app from "./app";

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT);

console.log(
  `🦊 Elysia server is running at http://${server.server?.hostname}:${server.server?.port}`
);

export type { App } from "./app";
export default app;
