import { tasks } from "../../db/schema";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { clear, plus } from "../slices/menuSlice";
import MigrationError from "../../components/migrations/MigrationError";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CreateTaskModal from "../../components/modalTabs/CreateTaskModal";
import CreateButton from "../../components/buttons/CreateButton";
import MigrationLoading from "../../components/migrations/MigrationLoading";
import TaskListOrEmptyText from "../../components/tasks/TaskListOrEmptyText";
import { addTask, getTasks, useDatabase } from "../../db/tasksService";

export default function Settings() {
    const { success, error } = useDatabase();
    const [items, setItems] = useState<(typeof tasks.$inferSelect)[] | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = navigation.isFocused();

    async function update() {
        const taskList = await getTasks();

        setItems(taskList);
    }

    function updateUncompletedTaskCount() {
        dispatch(clear());

        for (let task of items!) {
            if (task.completed !== 1) {
                dispatch(plus());
            }
        }
    }

    useEffect(() => {
        (async () => {
            await update();
            updateUncompletedTaskCount();
        })();
    }, [isFocused]);

    if (error) {
        return <MigrationError error={error} />;
    }
    if (!success) {
        return <MigrationLoading />;
    }

    const addTaskHandler = async (task: typeof tasks.$inferSelect) => {
        await addTask(task);
        await update();

        dispatch(plus());
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>TODO List</Text>
            <Text style={styles.subtitle}>6th March 2025</Text>
            <TaskListOrEmptyText tasks={items} />
            <CreateButton onPress={() => setIsModalVisible(true)} />

            <CreateTaskModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onAddTask={addTaskHandler}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        padding: 20,
    },

    title: {
        textAlign: "center",
        fontSize: 42,
        fontWeight: 700,
    },

    subtitle: {
        fontSize: 24,
        marginTop: 40,
        marginBottom: 40,
    },
});
