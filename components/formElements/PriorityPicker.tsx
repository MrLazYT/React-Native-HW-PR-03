import { Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet } from "react-native";

export default function PriorityPicker({ control }: FormElementProps) {
    return (
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
    );
}

const styles = StyleSheet.create({
    picker: {
        width: 200,
    },
});
