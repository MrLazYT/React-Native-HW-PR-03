import { Pressable, StyleSheet, Text } from "react-native";

export default function PrimaryButton({ testID, title, onPress }: CustomButtonProps) {
    return (
        <Pressable testID={testID} style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 1000,
        backgroundColor: "#3255f0",
    },
    text: {
        fontSize: 20,
        fontWeight: 700,
        textAlign: "center",
        color: "white",
    },
});
