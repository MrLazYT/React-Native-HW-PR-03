import { View, StyleSheet, FlatList } from "react-native";
import SettingComponent from "../../components/SettingComponent";
import { useEffect, useState } from "react";
import { getSettingParams, init } from "../../db/settingParamsService";
import { settingParams } from "../../db/schema";

export default function Settings() {
    const [settingParamList, setSettingParams] = useState<(typeof settingParams.$inferSelect)[] | null>();

    const setup = async () => {
        const items = await getSettingParams();
        setSettingParams(items);
    };

    useEffect(() => {
        setup(); // Викликайте функцію безпосередньо
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={settingParamList}
                renderItem={({ item }) => <SettingComponent settingParam={item} />}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
});
