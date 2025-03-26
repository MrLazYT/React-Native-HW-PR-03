import { StyleSheet, Text, View } from "react-native";
import { TaskListProps } from "../../types/dbComponentPropsTypes";
import TaskList from "./TaskList";

export default function TaskListOrEmptyText({ tasks }: TaskListProps) {
    return (
        <View style={styles.container}>
            {tasks !== null && tasks!.length !== 0 ? (
                <TaskList tasks={tasks} />
            ) : (
                <Text style={styles.emptyTaskList}>There's no tasks yet. Let's create one.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white",
    },

    emptyTaskList: {
        flex: 1,
        fontSize: 20,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },
});
