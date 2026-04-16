import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const accountsTable = pgTable("accounts", {
  guild: text().primaryKey(),
  token: text().notNull(),
});

export const serversTable = pgTable("servers", {
  guild: text().references(() => accountsTable.guild),
  id: integer().primaryKey(),
  address: text(),
  status: text(),
  path: text(),

  name: text(),
  slots: integer(),
  players: integer(),
});
