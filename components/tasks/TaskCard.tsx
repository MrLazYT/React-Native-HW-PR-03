import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { updateTaskCompleteStatus, updateTaskNotificationId } from "../../db/tasksService";
import { useDispatch } from "react-redux";
import { minus, plus } from "../../app/slices/menuSlice";
import { notificationService } from "../../services/notificationService";
import { Link } from "expo-router";

export default function TaskCard({ task }: any) {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const dispatch = useDispatch();

    const completeHandle = async () => {
        setIsCompleted(!isCompleted);
        updateTaskCompleteStatus(task.id, !isCompleted);

        if (isCompleted) {
            dispatch(plus());
            const notificationId = await notificationService.remind(task);
            task.notificationId = notificationId;
            updateTaskNotificationId(task.id, notificationId);
        } else {
            dispatch(minus());
            await notificationService.cancel(task.notificationId);
        }
    };

    return (
        <View>
            <Link
                href={{
                    pathname: "/modal",
                    params: { task: JSON.stringify(task) },
                }}
                asChild>
                <Pressable
                    style={
                        task.priority == 0 || task.priority == undefined
                            ? styles.container
                            : task.priority == 1
                            ? styles.container1
                            : styles.container2
                    }
                    // onPress={async () => {
                    //     await completeHandle();
                    // }}
                >
                    {isCompleted ? <Text style={styles.textChecked}>✔</Text> : <Text>⠀⠀</Text>}
                    <Text style={styles.text}>{task.todo}</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        borderColor: "lightgray",
        borderWidth: 2,
        borderRadius: 7,
    },

    container1: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        borderColor: "yellow",
        borderWidth: 2,
        borderRadius: 7,
    },

    container2: {
        flex: 1,
        flexDirection: "row",
        margin: 5,
        borderColor: "red",
        borderWidth: 2,
        borderRadius: 7,
    },

    text: {
        fontSize: 16,
        padding: 15,
        paddingLeft: 10,
        paddingRight: 20,
    },

    textChecked: {
        padding: 15,
        paddingLeft: 10,
        paddingRight: 0,
        fontSize: 16,
        verticalAlign: "middle",
        color: "green",
    },
});
