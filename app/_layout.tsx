import { Stack } from "expo-router";
// import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
    return (
        // <SQLiteProvider databaseName="tasks.db" onInit={migrateDbIfNeeded}>
        <Provider store={store}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: "modal" }} />
                <Stack.Screen name="+not-found" />
            </Stack>
        </Provider>
        // </SQLiteProvider>
    );
}

// async function migrateDbIfNeeded(db: SQLiteDatabase) {
//     const DATABASE_VERSION = 1;
//     let { user_version: currentDbVersion } = await db.getFirstAsync<any>("PRAGMA user_version");
//     if (currentDbVersion >= DATABASE_VERSION) {
//         return;
//     }
//     if (currentDbVersion === 0) {
//         await db.execAsync(`
//     PRAGMA journal_mode = 'wal';
//     CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
//     `);
//         await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "hello", 1);
//         await db.runAsync("INSERT INTO todos (value, intValue) VALUES (?, ?)", "world", 2);
//         currentDbVersion = 1;
//     }

//     await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
// }
