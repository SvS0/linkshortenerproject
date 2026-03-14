import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  index,
  unique,
} from "drizzle-orm/pg-core";

export const links = pgTable(
  "links",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: text("user_id").notNull(),
    originalUrl: text("original_url").notNull(),
    shortCode: varchar("short_code", { length: 10 }).notNull(),
    clicks: integer("clicks").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    unique("unique_short_code").on(table.shortCode),
    index("user_id_idx").on(table.userId),
    index("short_code_idx").on(table.shortCode),
  ],
);

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
