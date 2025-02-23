import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import {
  postProject,
  editProject,
  deleteProject,
  getAllProjects,
  getProject,
} from "../queries/projectQueries.ts";
import { insertProject } from "../models/projectModel.ts";
import { insertProjectSchema } from "../models/db/schema/projectSchema.ts";

export const projectsRoute = new Hono()
  .get("/", async (c) => {
    try {
      const projects = await getAllProjects();

      return c.json({
        success: true,
        message: "Projects Fetched Successfully!",
        data: projects,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Projects Fetch Failed!",
        data: error,
      });
    }
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));

    try {
      const project = await getProject(id);

      return c.json({
        success: true,
        message: "Project Fetched Successfully!",
        data: project,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Project Fetch Failed!",
        data: error,
      });
    }
  })
  .post("/", zValidator("json", insertProject), async (c) => {
    const project = c.req.valid("json");
    const validatedProject = insertProjectSchema.parse(project);

    try {
      const result = await postProject(validatedProject);

      c.status(201);
      return c.json({
        success: true,
        message: "Project Added Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Failed to Add Project!",
        data: error,
      });
    }
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = parseInt(c.req.param("id"));

    try {
      const result = await deleteProject(id);

      if (!result) {
        return c.notFound();
      }

      c.status(200);
      return c.json({
        success: 1,
        message: "Project Deleted Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Failed to Delete Project!",
        data: error,
      });
    }
  })
  .put("/:id{[0-9]+}", zValidator("json", insertProject), async (c) => {
    const project = c.req.valid("json");
    const id = parseInt(c.req.param("id"));
    const validatedProject = insertProjectSchema.parse(project);

    try {
      const result = await editProject({
        id,
        ...validatedProject,
      });

      c.status(201);
      return c.json({
        success: true,
        message: "Project Updated Successfully!",
        data: result,
      });
    } catch (error) {
      return c.json({
        success: false,
        message: "Failed to Updated Project!",
        data: error,
      });
    }
  });
