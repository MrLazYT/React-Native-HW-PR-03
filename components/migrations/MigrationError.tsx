import { SafeAreaView, Text } from "react-native";

export default function MigrationError({ error }: MigrationErrorProps) {
    return (
        <SafeAreaView>
            <Text>Migration error: {error.message}</Text>
        </SafeAreaView>
    );
}
