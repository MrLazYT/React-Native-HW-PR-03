import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { updateTask } from "../db/tasksService";
import { useDispatch } from "react-redux";
import { minus, plus } from "../app/slices/menuSlice";

export default function TaskCard({ task }: any) {
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const dispatch = useDispatch();

    const completeHandle = () => {
        setIsCompleted(!isCompleted);
        updateTask(task.id, !isCompleted);

        if (isCompleted) {
            dispatch(plus());
        } else {
            dispatch(minus());
        }
    };

    return (
        <View>
            <Pressable
                style={
                    task.priority == 0 || task.priority == undefined
                        ? styles.container
                        : task.priority == 1
                        ? styles.container1
                        : styles.container2
                }
                onPress={() => {
                    completeHandle();
                }}
            >
                {isCompleted ? <Text style={styles.textChecked}>✔</Text> : <Text>⠀⠀</Text>}
                <Text style={styles.text}>{task.todo}</Text>
            </Pressable>
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
