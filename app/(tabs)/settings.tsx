import { View, StyleSheet } from "react-native";
import SettingComponent from "../../components/SettingComponent";

export default function Settings() {
    return (
        <View style={styles.container}>
            <SettingComponent title="DarkMode" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
});
