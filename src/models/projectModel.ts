import type { InferInsertModel } from "drizzle-orm";
import { insertProjectSchema } from "./db/schema/projectSchema";
import { projects as projectsTable } from "./db/schema/projectSchema";

// For zValidator Middleware for Request Body Type Validation
export const insertProject = insertProjectSchema.omit({
  id: true,
});

// For Project Insertion Query Data Parameter
export type InsertProject = Omit<
  InferInsertModel<typeof projectsTable>,
  "features"
> & {
  features?: [string, ...string[]] | undefined;
};
