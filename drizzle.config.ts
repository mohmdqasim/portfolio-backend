import type { Config } from "drizzle-kit";

export default {
  schema: "./src/models/db/schema/*",
  out: "./src/models/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `${process.env.DATABASE_URL}`,
  },
} satisfies Config;
