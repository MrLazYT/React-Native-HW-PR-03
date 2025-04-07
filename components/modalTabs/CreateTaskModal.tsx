import Input from "../formElements/Input";
import { useForm } from "react-hook-form";
import PrimaryButton from "../buttons/PrimaryButton";
import PriorityPicker from "../formElements/PriorityPicker";
import { Modal, Text, StyleSheet, View, Alert } from "react-native";
import { notificationService } from "../../services/notificationService";

export default function CreateTaskModal({ onClose, onAddTask, isVisible = false }: CreateTaskModalProps) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            id: 0,
            todo: "",
            completed: false,
            priority: 0,
            notificationId: "",
        },
    });

    const onSubmit = async (task: Task) => {
        if (task.todo != "") {
            const notificationId = await notificationService.remind(task);
            task.notificationId = notificationId;

            await onAddTask(task);
            onClose();
            console.log("Task created!");
        } else {
            Alert.alert("Title cannot be empty", "You need to write title of the task to continue.");
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Creating Task</Text>

                <Input control={control} name="todo" placeholder="Enter Title" />

                <Text>Select priority:</Text>
                <PriorityPicker control={control} />

                <PrimaryButton title="Create Task" onPress={handleSubmit(onSubmit)} />
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
});
