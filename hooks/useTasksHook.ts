import { useEffect, useState } from "react";
import { tasks } from "../db/schema";
import { getTasks } from "../db/tasksService";
import { useNavigation } from "expo-router";

export default function useTasks() {
    const [items, setItems] = useState<(typeof tasks.$inferSelect)[] | null>(null);
    const navigation = useNavigation();
    const isFocused = navigation.isFocused();

    async function update() {
        const taskList = await getTasks();

        setItems(taskList);
    }

    useEffect(() => {
        (async () => {
            await update();
        })();
    }, [isFocused]);

    return items;
}
