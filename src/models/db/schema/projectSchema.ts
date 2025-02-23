import { z } from "zod";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  image: text("image"),
  features: text("features")
    .default(sql`ARRAY[]::text[]`)
    .notNull(),
  link: text("link").notNull(),
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  start_year: integer("start_year").notNull(),
  project_name: text("project_name").notNull(),
});

// To Validate Request Body According to DB Schema
export const insertProjectSchema = createInsertSchema(projects, {
  link: z
    .string()
    .regex(
      /^(https?:\/\/)?([\w\-]+\.){1,}[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
      {
        message: "Please Enter a Valid Link!",
      }
    ),
  company: z
    .string()
    .min(3, { message: "Company Name Must be atleast 3 characters!" }),
  start_year: z.number().min(2010, { message: "Year Must be 2010 or above!" }),
  project_name: z
    .string()
    .min(3, { message: "Project Name Must be atleast 3 characters!" }),
  features: z
    .array(z.string())
    .nonempty({ message: "Features array must not be empty!" }),
  image: z.string().optional(),
});
