import { useState } from "react";
import { View, Text, Switch } from "react-native";
import { updateSettingParam } from "../../db/settingParamsService";

type SettingComponentProps = {
    settingParam: {
        id: number;
        name: string;
        status: number;
    };
};

export default function SettingComponent({ settingParam }: SettingComponentProps) {
    const [status, setStatus] = useState<boolean>(!!settingParam.status);

    const onStatusChangeHandler = async () => {
        setStatus(!status); // Оновлення статусу
        await updateSettingParam(settingParam!.id, !status);
    };

    return (
        <View>
            <Text>{settingParam.name}</Text>
            <Switch
                onChange={() => {
                    onStatusChangeHandler();
                }}
                value={status}
            />
        </View>
    );
}
