import type { InferInsertModel } from "drizzle-orm";
import { insertTestimonialSchema } from "./db/schema/testimonialSchema";
import { testimonials as testimonialsTable } from "./db/schema/testimonialSchema";

export const insertTestimonial = insertTestimonialSchema.omit({
  id: true,
});

export type InsertTestimonial = InferInsertModel<typeof testimonialsTable>;
