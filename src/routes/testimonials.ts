import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import {
  postTestimonial,
  getAllTestimonials,
  deleteTestimonial,
  editTestimonial,
  getTestimonial,
} from "../queries/testimonialQueries.ts";
import { insertTestimonial } from "../models/testimonialModel.ts";
import { insertTestimonialSchema } from "../models/db/schema/testimonialSchema.ts";

export const testimonialsRoute = new Hono()
  .get("/", async (c) => {
    try {
      const testimonials = await getAllTestimonials();

      return c.json({
        success: true,
        message: "Testimonials Fetched Successfully!",
        data: testimonials,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Testimonials Fetch Failed!",
        data: error,
      });
    }
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));

    try {
      const testimonial = await getTestimonial(id);

      return c.json({
        success: true,
        message: "Testimonial Fetched Successfully!",
        data: testimonial,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Testimonial Fetch Failed!",
        data: error,
      });
    }
  })
  .post("/", zValidator("json", insertTestimonial), async (c) => {
    const testimonial = c.req.valid("json");
    const validatedTestimonial = insertTestimonialSchema.parse(testimonial);

    try {
      const result = await postTestimonial(validatedTestimonial);

      c.status(201);
      return c.json({
        success: true,
        message: "Testimonial Added Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Failed to Add Testimonial!",
        data: error,
      });
    }
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));

    try {
      const result = await deleteTestimonial(id);

      if (!result) {
        return c.notFound();
      }

      c.status(200);
      return c.json({
        success: 1,
        message: "Testimonial Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Failed to Delete Testimonial!",
        data: error,
      });
    }
  })
  .put("/:id{[0-9]+}", zValidator("json", insertTestimonial), async (c) => {
    const testimonial = c.req.valid("json");
    const id = parseInt(c.req.param("id"));
    const validatedTestimonial = insertTestimonialSchema.parse(testimonial);

    try {
      const result = await editTestimonial({
        id,
        ...validatedTestimonial,
      });

      if (!result) {
        return c.notFound();
      }

      c.status(200);
      return c.json({
        success: 1,
        message: "Testimonial Updated Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Failed to Updated Testimonial!",
        data: error,
      });
    }
  });
