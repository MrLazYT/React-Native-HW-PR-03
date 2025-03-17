import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { Button, Modal, Text, TextInput, StyleSheet, View, Pressable, Alert } from "react-native";

export default function CreateTaskModal({ onClose, onAddTask, isVisible = false }: any) {
    const [taskTitle, setTaskTitle] = useState<string>("");
    const { control, handleSubmit } = useForm({
        defaultValues: {
            todo: "",
            completed: false,
            priority: 0,
        },
    });

    const onSubmit = async (task: Task) => {
        if (task.todo != "") {
            await onAddTask(task);
            onClose();
        } else {
            Alert.alert("Title cannot be empty", "You need to write title of the task to continue.");
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Creating Task</Text>

                <Controller
                    control={control}
                    name="todo"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            placeholder="Enter title"
                            value={value}
                        />
                    )}
                />

                <Text>Select priority:</Text>
                <Controller
                    control={control}
                    name="priority"
                    render={({ field: { onChange, value } }) => (
                        <Picker style={styles.picker} selectedValue={value} onValueChange={onChange}>
                            <Picker.Item label="Not Specified" value="0" />
                            <Picker.Item label="Medium Priority" value="1" />
                            <Picker.Item label="High Priority" value="2" />
                        </Picker>
                    )}
                />

                <Pressable style={styles.btn} onPress={handleSubmit(onSubmit)}>
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

    picker: {
        width: 200,
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
