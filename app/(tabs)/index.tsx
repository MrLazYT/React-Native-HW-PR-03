import { tasks } from "../../db/schema";
import { useDispatch } from "react-redux";
import { plus } from "../slices/menuSlice";
import { useEffect, useState } from "react";
import TaskCard from "../../components/TaskCard";
import CreateTaskModal from "../../components/CreateTaskModal";
import { addTask, getTasks, useDatabase } from "../../db/tasksService";
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text } from "react-native";

export default function Settings() {
    const { success, error } = useDatabase();
    const [items, setItems] = useState<(typeof tasks.$inferSelect)[] | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();

    async function update() {
        const taskList = await getTasks();

        setItems(taskList);
    }

    function updateUncompletedTaskCount() {
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
    }, []);

    if (error) {
        return (
            <SafeAreaView>
                <Text>Migration error: {error.message}</Text>
            </SafeAreaView>
        );
    }
    if (!success) {
        return (
            <SafeAreaView>
                <Text>Migration is in progress...</Text>
            </SafeAreaView>
        );
    }

    const addTaskHandler = async (task: Task) => {
        await addTask(task);
        await update();

        dispatch(plus());
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>TODO List</Text>
            <Text style={styles.subtitle}>6th March 2025</Text>
            {items !== null && items!.length !== 0 ? (
                <FlatList
                    style={styles.scrollView}
                    data={items}
                    renderItem={({ item }) => <TaskCard task={item} />}
                    keyExtractor={(_, index) => index.toString()}
                />
            ) : (
                <Text style={styles.emptyTaskList}>There's no tasks yet. Let's create one.</Text>
            )}

            <Pressable style={styles.btn} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.btnTitle}>+</Text>
            </Pressable>

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

    scrollView: {
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
    },

    btn: {
        width: 60,
        height: 60,
        marginTop: -50,
        borderRadius: "50%",
        backgroundColor: "#3255f0",
    },

    btnTitle: {
        fontSize: 40,
        textAlign: "center",
        verticalAlign: "middle",
        color: "white",
    },

    emptyTaskList: {
        flex: 1,
        fontSize: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
});
