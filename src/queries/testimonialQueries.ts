import { eq } from "drizzle-orm";

import { db } from "../models/db/index.ts";
import type { InsertTestimonial } from "../models/testimonialModel.ts";
import { testimonials as testimonialsTable } from "../models/db/schema/testimonialSchema.ts";

export const getAllTestimonials = async () => {
  const result = await db.select().from(testimonialsTable);
  return result;
};

export const getTestimonial = async (id: number) => {
  const result = await db
    .select()
    .from(testimonialsTable)
    .where(eq(testimonialsTable.id, id))
    .limit(1);

  return result[0] || null;
};

export const postTestimonial = async (data: InsertTestimonial) => {
  const result = await db
    .insert(testimonialsTable)
    // @ts-ignore
    .values(data)
    .returning()
    .then((res) => res[0]);

  return result;
};

export const deleteTestimonial = async (id: number) => {
  const result = await db
    .delete(testimonialsTable)
    .where(eq(testimonialsTable.id, id))
    .returning()
    .then((res) => res[0]);

  return result;
};

export const editTestimonial = async (data: InsertTestimonial) => {
  const result = await db
    .update(testimonialsTable)
    .set({
      client_name: data.client_name,
      company: data.company,
      content: data.content,
      designation: data.designation,
      image: data.image,
    })
    .where(eq(testimonialsTable.id, data.id!))
    .returning()
    .then((res) => res[0]);

  return result;
};
