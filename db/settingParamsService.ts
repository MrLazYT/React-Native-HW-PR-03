import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { settingParams } from "./schema";
import { eq } from "drizzle-orm";

const expo = SQLite.openDatabaseSync("tasks.db");
const db = drizzle(expo);

async function init() {
    await db.insert(settingParams).values([
        {
            name: "darkMode",
            status: 0,
        },
    ]);
}

async function getSettingParams() {
    const settingParamList = await db.select().from(settingParams);

    return settingParamList;
}

async function getSettingParam(name: string) {
    const settingParam = await db.select().from(settingParams).where(eq(settingParams.name, name));

    return settingParam[0];
}

async function updateSettingParam(id: Number, status: boolean) {
    await db
        .update(settingParams)
        .set({ status: Number(status) })
        .where(eq(settingParams.id, Number(id)));
}

export { init, getSettingParams, getSettingParam, updateSettingParam };
