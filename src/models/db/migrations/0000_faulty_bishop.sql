CREATE TABLE IF NOT EXISTS "projects" (
	"image" text,
	"features" text DEFAULT ARRAY[]::text[] NOT NULL,
	"link" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"start_year" integer NOT NULL,
	"project_name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testimonials" (
	"image" text,
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"content" text NOT NULL,
	"designation" text NOT NULL,
	"client_name" text NOT NULL
);
