import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const testimonials = pgTable("testimonials", {
  image: text("image"),
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  content: text("content").notNull(),
  designation: text("designation").notNull(),
  client_name: text("client_name").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials, {
  image: z.string().optional(),
  company: z
    .string()
    .min(3, { message: "Company Name Must be atleast 3 characters!" }),
  content: z
    .string()
    .min(10, { message: "Content Must be atleast 10 characters!" }),
  designation: z
    .string()
    .min(3, { message: "Designation Must be atleast 3 characters!" }),
  client_name: z
    .string()
    .min(3, { message: "Client Name Must be atleast 3 characters!" }),
});
