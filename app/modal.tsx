import React, { useState } from "react";
import { deleteTask, updateTask, updateTaskCompleteStatus, updateTaskNotificationId } from "../db/tasksService";
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import DangerButton from "../components/buttons/DangerButton";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { notificationService } from "../services/notificationService";
import SuccessButton from "../components/buttons/SuccessButton";

const ModalScreen = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    let task;

    try {
        task = JSON.parse(params.task as string);
    } catch (error) {
        console.error("Failed to parse task:", error);
        task = null;
    }
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const [notificationId, setNotificationId] = useState(task.notificationId);

    const createNotification = async () => {
        const notificationId = await notificationService.remind(task);
        setNotificationId(notificationId);
        task.notificationId = notificationId;
    };

    const cancelNotification = async () => {
        await notificationService.cancel(notificationId);
        setNotificationId(null);
        task.notificationId = null;
        await updateTask(task);
    };

    const markAsCompleteOnPress = async () => {
        if (isCompleted) {
            await createNotification();
        } else {
            await cancelNotification();
        }

        setIsCompleted(!isCompleted);
        task.completed = !isCompleted;
        await updateTask(task);
    };

    const saveChangesOnPress = async () => {
        await updateTask(task);
    };

    const deleteTaskOnPress = async () => {
        if (task.notificationId !== null) {
            await notificationService.cancel(task.notificationId);
        }

        await deleteTask(task.id);
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                {isCompleted ? <Text style={styles.textChecked}>✔</Text> : <Text>⠀⠀</Text>}
                <Text style={styles.text}>{task.todo}</Text>
            </View>

            <View style={styles.btnGroup}>
                {!isCompleted ? (
                    <SuccessButton title="Mark as Complete" onPress={markAsCompleteOnPress} />
                ) : (
                    <DangerButton title="Unmark as Complete" onPress={markAsCompleteOnPress} />
                )}
                <PrimaryButton title="Save Changes" onPress={saveChangesOnPress} />
                <DangerButton
                    title="Delete Task"
                    onPress={async () => {
                        await deleteTaskOnPress();
                    }}
                />
            </View>
        </View>
    );
};

export default ModalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "white",
    },
    titleContainer: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
    },
    text: {
        fontSize: 24,
        fontWeight: 700,
        paddingLeft: 10,
        paddingRight: 20,
    },
    textChecked: {
        paddingLeft: 10,
        paddingRight: 0,
        fontSize: 24,
        fontWeight: 700,
        // verticalAlign: "middle",
        color: "green",
    },
    btnGroup: {
        gap: 10,
    },
});
