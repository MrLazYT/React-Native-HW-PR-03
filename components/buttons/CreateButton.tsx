import { Pressable, StyleSheet, Text } from "react-native";

export default function CreateButton({ onPress }: CreateButtonProps) {
    return (
        <Pressable style={styles.btn} onPress={onPress}>
            <Text style={styles.btnTitle}>+</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: 60,
        height: 60,
        marginBottom: 50,
        borderRadius: 30,
        backgroundColor: "#3255f0",
        justifyContent: "center",
        alignItems: "center",
    },

    btnTitle: {
        fontSize: 40,
        textAlign: "center",
        verticalAlign: "middle",
        color: "white",
    },
});
