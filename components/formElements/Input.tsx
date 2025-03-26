import { Controller } from "react-hook-form";
import { StyleSheet, TextInput } from "react-native";

export default function Input({ control, name, placeholder }: FormElementProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <TextInput style={styles.input} onChangeText={onChange} placeholder={placeholder} value={value} />
            )}
        />
    );
}

const styles = StyleSheet.create({
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
});
