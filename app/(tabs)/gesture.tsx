import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export default function App() {
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: offset.value.x }, { translateY: offset.value.y }],
        };
    });

    const gesture = Gesture.Pan()
        .onBegin(() => {})
        .onUpdate((e) => {
            offset.value = {
                x: e.translationX,
                y: e.translationY,
            };
        })
        .onEnd(() => {
            offset.value = {
                x: withDelay(Math.max(offset.value.x, offset.value.x * -1) * 5, withTiming(0, { duration: 300 })),
                y: withDelay(Math.max(offset.value.x, offset.value.x * -1) * 5, withTiming(0, { duration: 300 })),
            };
        });

    return (
        <GestureDetector gesture={gesture}>
            <View style={styles.container}>
                <Animated.View style={[styles.ball, animatedStyles]} />
            </View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    ball: {
        position: "absolute",
        width: 225,
        height: 350,
        backgroundColor: "white",
        borderRadius: 30,
        borderColor: "lightgray",
        borderWidth: 1,
        alignSelf: "center",
    },
});
