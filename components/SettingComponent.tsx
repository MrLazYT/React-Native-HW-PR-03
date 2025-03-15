import { View, Text, Switch } from "react-native";

export default function SettingComponent({ title }: SettingTypeComponentProps) {
    return (
        <View>
            <Text>{title}</Text>
            <Switch />
        </View>
    );
}
