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

async function addTask(task: typeof tasks.$inferSelect) {
    await db.insert(tasks).values([
        {
            todo: task.todo,
            completed: Number(task.completed),
            priority: Number(task.priority),
            notificationId: task.notificationId,
        },
    ]);
}

async function updateTaskCompleteStatus(id: number, completed: boolean) {
    await db
        .update(tasks)
        .set({ completed: Number(completed) })
        .where(eq(tasks.id, id));
}

async function updateTask(newTask: Task) {
    await db
        .update(tasks)
        .set({
            todo: newTask.todo,
            completed: Number(newTask.completed),
            priority: newTask.priority,
            notificationId: newTask.notificationId,
        })
        .where(eq(tasks.id, newTask.id));
}

async function updateTaskNotificationId(id: number, notificationId: string) {
    await db.update(tasks).set({ notificationId: notificationId }).where(eq(tasks.id, id));
}

async function deleteTask(id: number) {
    await db.delete(tasks).where(eq(tasks.id, id));
}

async function clearTasks() {
    await db.delete(tasks);
}

export {
    useDatabase,
    getTasks,
    addTask,
    updateTask,
    updateTaskCompleteStatus,
    updateTaskNotificationId,
    deleteTask,
    clearTasks,
};
