import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { tasks } from "./schema";
import { eq } from "drizzle-orm";

const expo = SQLite.openDatabaseSync("tasks.db");
const db = drizzle(expo);

function useDatabase() {
    return useMigrations(db, migrations);
}

async function getTasks() {
    const taskList = await db.select().from(tasks);

    return taskList;
}

async function addTask(task: Task) {
    await db.insert(tasks).values([
        {
            todo: task.todo,
            completed: Number(task.completed),
            priority: Number(task.priority),
        },
    ]);
}

async function updateTask(id: Number, completed: boolean) {
    await db
        .update(tasks)
        .set({ completed: Number(completed) })
        .where(eq(tasks.id, Number(id)));
}

async function clearTasks() {
    await db.delete(tasks);
}

export { useDatabase, getTasks, addTask, updateTask, clearTasks };
