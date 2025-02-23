import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { projectsRoute } from "./routes/projects.ts";
import { testimonialsRoute } from "./routes/testimonials.ts";
import { createServer } from "http";

const app = new Hono();
const baseApiRouter = app.basePath("/api");

// Middleware
app.use("*", logger());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
baseApiRouter.route("/projects", projectsRoute);
baseApiRouter.route("/testimonials", testimonialsRoute);

// Create an HTTP server using Node.js
const PORT = process.env.PORT || 8080;
const server = createServer(app.fetch as any); // `as any` fixes TypeScript type issues

server.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
