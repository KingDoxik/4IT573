import {
    sqliteTable,
    int,
    text,
  } from "drizzle-orm/sqlite-core"

  export const todoPriorities = ["low", "medium", "high"] as const



  export const todos = sqliteTable("todos", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    done: int({ mode: "boolean" }).notNull(),
    priority: text("priority", { enum: todoPriorities }),
  })

export type Todo = typeof todos.$inferSelect
export type TodoPriority = typeof todoPriorities[number]
  