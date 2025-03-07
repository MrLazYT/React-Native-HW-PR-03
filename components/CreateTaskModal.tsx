import { useState } from "react";
import { Button, Modal, Text, TextInput, StyleSheet, View, Pressable } from "react-native";
import { Task } from "../App";

export default function CreateTaskModal({ onClose, onAddTask, isVisible = false }: any) {
    const [taskTitle, setTaskTitle] = useState<string>("");

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Creating Task</Text>
                <TextInput style={styles.input} onChangeText={setTaskTitle} placeholder="Enter title" />

                <Pressable
                    style={styles.btn}
                    onPress={() => {
                        const task: Task = {
                            todo: taskTitle,
                            complited: false,
                        };

                        onClose();
                        onAddTask(task);
                    }}
                >
                    <Text style={styles.btnTitle}>Create Task</Text>
                </Pressable>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    title: {
        textAlign: "center",
        fontSize: 42,
        fontWeight: 700,
    },

    input: {
        margin: 10,
        padding: 5,
        width: 250,
        height: 50,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 7,
        borderColor: "lightgray",
        backgroundColor: "#e8e8e8",
    },

    btn: {
        marginTop: 10,
        padding: 10,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 12,
        backgroundColor: "#3255f0",
    },

    btnTitle: {
        fontSize: 24,
        color: "white",
    },
});
