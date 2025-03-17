import * as SQLite from "expo-sqlite";

async function getDbObject() {
    return await SQLite.openDatabaseAsync("tasks.db");
}

async function init() {
    const db = await getDbObject();

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY NOT NULL,
            todo TEXT NOT NULL,
            completed BIT,
            priority INTEGER);
        
        INSERT INTO tasks (todo, completed, priority) VALUES ('task1', FALSE, 2);
        `);
}

async function getTasks(): Promise<Task[]> {
    const db = await getDbObject();
    const result = db.getAllAsync<Task>("SELECT * FROM tasks");

    return result;
}

async function addTask(task: Task) {
    const db = await getDbObject();

    await db.runAsync(
        "INSERT INTO tasks (todo, completed, priority) VALUES (?, ?, ?)",
        task.todo,
        task.completed,
        Number(task.priority)
    );
}

export { init, getTasks, addTask };
