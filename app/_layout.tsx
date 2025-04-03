import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <Provider store={store}>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </Provider>
        </GestureHandlerRootView>
    );
}
