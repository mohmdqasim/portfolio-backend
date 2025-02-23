import { eq } from "drizzle-orm";

import { db } from "../models/db";
import type { InsertProject } from "../models/projectModel";
import { projects as projectsTable } from "../models/db/schema/projectSchema";

export const getAllProjects = async () => {
  const result = await db.select().from(projectsTable);
  return result;
};

export const getProject = async (id: number) => {
  const result = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.id, id))
    .limit(1);

  return result[0] || null;
};

export const postProject = async (data: InsertProject) => {
  const result = await db
    .insert(projectsTable)
    // @ts-ignore
    .values(data)
    .returning()
    .then((res) => res[0]);

  return result;
};

export const deleteProject = async (id: number) => {
  const result = await db
    .delete(projectsTable)
    .where(eq(projectsTable.id, id))
    .returning()
    .then((res) => res[0]);

  return result;
};

export const editProject = async (data: InsertProject) => {
  const result = await db
    .update(projectsTable)
    .set({
      link: data.link,
      company: data.company,
      start_year: data.start_year,
      features: `${data?.features}`,
      project_name: data.project_name,
    })
    .where(eq(projectsTable.id, data.id!))
    .returning()
    .then((res) => res[0]);

  return result;
};
