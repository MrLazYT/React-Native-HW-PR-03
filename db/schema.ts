import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("tasks", {
    id: int().primaryKey({ autoIncrement: true }),
    todo: text().notNull(),
    completed: int().notNull(),
    priority: int().notNull(),
    notificationId: text(),
});

export const settingParams = sqliteTable("settingParams", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    status: int().notNull().default(0),
});
