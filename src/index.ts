import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { projectsRoute } from "./routes/projects";
import { testimonialsRoute } from "./routes/testimonials";

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

Bun.serve({
  fetch: app.fetch,
  port: process.env.PORT || 8080,
});

console.log("Server Running on Port: 8080.");
