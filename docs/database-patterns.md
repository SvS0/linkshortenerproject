# Database Patterns

## Overview

All database access in this application uses **Drizzle ORM** with a **Neon PostgreSQL** serverless database. No other ORM or database library should be used.

## Core Rules

### 1. Drizzle ORM Exclusivity

- **ONLY use Drizzle ORM** for all database queries and schema management
- Never use raw SQL strings, Prisma, Sequelize, or any other ORM
- All schema definitions must live in `db/schema.ts`

### 2. Database Connection

The database client is exported from `db/index.ts` and imported via the `@/db` alias:

```ts
// db/index.ts
import { drizzle } from "drizzle-orm/neon-http";

const db = drizzle(process.env.DATABASE_URL!);
export default db;
```

Import the client like this:

```ts
import db from "@/db";
```

### 3. Schema Definition

Define all tables in `db/schema.ts` using Drizzle's schema builder:

```ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  slug: text("slug").notNull().unique(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### 4. Environment Variables

The database URL must be provided via the `DATABASE_URL` environment variable. Never hard-code connection strings:

```ts
// Correct
const db = drizzle(process.env.DATABASE_URL!);

// Incorrect
const db = drizzle("postgresql://user:pass@host/db");
```

### 5. Migrations

Use `drizzle-kit` to generate and run migrations. Configuration is in `drizzle.config.ts`:

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

Run migrations with:

```bash
npx drizzle-kit generate   # Generate migration files
npx drizzle-kit migrate    # Apply migrations
npx drizzle-kit push       # Push schema changes directly (development only)
```

## Common Patterns

### Querying Records

```ts
import db from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

// Find all links for a user
const userLinks = await db
  .select()
  .from(links)
  .where(eq(links.userId, userId));

// Find a single link by slug
const link = await db
  .select()
  .from(links)
  .where(eq(links.slug, slug))
  .limit(1);
```

### Inserting Records

```ts
import db from "@/db";
import { links } from "@/db/schema";

await db.insert(links).values({
  url: "https://example.com",
  slug: "example",
  userId: userId,
});
```

### Updating Records

```ts
import db from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

await db
  .update(links)
  .set({ url: "https://new-url.com" })
  .where(eq(links.id, linkId));
```

### Deleting Records

```ts
import db from "@/db";
import { links } from "@/db/schema";
import { eq } from "drizzle-orm";

await db.delete(links).where(eq(links.id, linkId));
```

### Exporting Schema Types

Drizzle infers TypeScript types directly from the schema:

```ts
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { links } from "@/db/schema";

export type Link = InferSelectModel<typeof links>;
export type NewLink = InferInsertModel<typeof links>;
```

## What NOT to Do

❌ **Never** use raw SQL strings for queries  
❌ **Never** hard-code database credentials  
❌ **Never** define schema outside of `db/schema.ts`  
❌ **Never** use a different ORM (Prisma, Sequelize, etc.)  
❌ **Never** import the database client using a relative path  

## What TO Do

✅ **Always** import the db client from `@/db`  
✅ **Always** define schema in `db/schema.ts`  
✅ **Always** use `drizzle-kit` for migrations  
✅ **Always** use environment variables for credentials  
✅ **Always** use Drizzle's type inference for TypeScript types  
