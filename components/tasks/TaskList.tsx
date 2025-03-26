import { FlatList, StyleSheet, Text, View } from "react-native";
import TaskCard from "../tasks/TaskCard";
import { TaskListProps } from "../../types/dbComponentPropsTypes";

export default function TaskList({ tasks }: TaskListProps) {
    return (
        <FlatList
            style={styles.scrollView}
            data={tasks}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(_, index) => index.toString()}
        />
    );
}

const styles = StyleSheet.create({
    scrollView: {
        width: "100%",
        marginTop: 20,
        marginBottom: 20,
    },
});
