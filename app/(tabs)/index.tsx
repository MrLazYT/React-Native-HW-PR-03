import { tasks } from "../../db/schema";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { plus } from "../slices/menuSlice";
import MigrationError from "../../components/migrations/MigrationError";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import CreateTaskModal from "../../components/modalTabs/CreateTaskModal";
import CreateButton from "../../components/buttons/CreateButton";
import MigrationLoading from "../../components/migrations/MigrationLoading";
import TaskListOrEmptyText from "../../components/tasks/TaskListOrEmptyText";
import { addTask, useDatabase } from "../../db/tasksService";
import useTasks from "../../hooks/useTasksHook";
import useUpdateItems from "../../hooks/useUpdateItemsHook";

export default function Settings() {
    const { success, error } = useDatabase();
    const items = useTasks();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();

    useUpdateItems(items!, (item: typeof tasks.$inferSelect) => item.completed !== 1);

    if (error) {
        return <MigrationError error={error} />;
    }
    if (!success) {
        return <MigrationLoading />;
    }

    const addTaskHandler = async (task: typeof tasks.$inferSelect) => {
        await addTask(task);

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
