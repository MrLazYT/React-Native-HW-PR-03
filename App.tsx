import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import TaskCard from "./components/TaskCard";
import CreateTaskModal from "./components/CreateTaskModal";
import axios from "axios";

export type Task = {
    todo: string;
    completed: boolean;
    priority: Number;
};

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/todos")
            .then((response) => {
                setTasks((prevTasks) => [...prevTasks, ...response.data.todos]); // Оновлюємо стан
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    }, []);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const addTask = (task: Task) => {
        setTasks([...tasks, task]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>TODO List</Text>
            <Text style={styles.subtitle}>6th March 2025</Text>

            <FlatList
                style={styles.scrollView}
                data={tasks}
                renderItem={({ item }) => <TaskCard task={item} />}
                keyExtractor={(item, index) => index.toString()}
            />

            <Pressable style={styles.btn} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.btnTitle}>+</Text>
            </Pressable>

            <CreateTaskModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onAddTask={addTask} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 50,
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
});
