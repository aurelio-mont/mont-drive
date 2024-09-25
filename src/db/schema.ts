import { AnySQLiteColumn, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id_user: text("id_user", { length: 36 }).primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password", { length: 60 }).notNull(),
});

export const foldersTable = sqliteTable("folders", {
  id_folder: text("id_folder", { length: 36 }).primaryKey(),
  id_parent: text("id_parent", { length: 36 }).references(
    ():AnySQLiteColumn => foldersTable.id_folder,
    { onDelete: "cascade", onUpdate: "cascade" }
  ),
  id_user: text("id_user", { length: 36 }).references(
    ():AnySQLiteColumn => usersTable.id_user,
    { onDelete: "cascade", onUpdate: "cascade" }
  ).notNull(),
  folder_name: text("folder_name").notNull(),
});

export const filesTable = sqliteTable("files", {
  id_file: text("id_file", { length: 36 }).primaryKey(),
  id_folder: text("id_folder", { length: 36 }).references(
    ():AnySQLiteColumn => foldersTable.id_folder,
    { onDelete: "cascade", onUpdate: "cascade" }
  ),
  file_name: text("file_name").notNull(),
  url: text("url").notNull(),
  aws_key: text("aws_key").notNull(),
});

