import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Animated, {
    Easing,
    interpolateColor,
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const MAX_WIDTH = 320;
const STEPS_COUNT = 4;
const WIDTH_INCREMENT = MAX_WIDTH / STEPS_COUNT;
const MAX_PERCENT = 100;
const PERCENT_INCREMENT = MAX_PERCENT / STEPS_COUNT;

export default function Animations() {
    const width = useSharedValue(0);
    const [percentValue, setPercentValue] = useState(0);

    const blockAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            width.value,
            [80, 160, 240, 320],
            ["#2c72f4", "#418459", "#53cce7", "#f1c632"]
        ),
    }));

    const handleStart = () => {
        let moveTo = 0;

        if (width.value < MAX_WIDTH) {
            moveTo = width.value + WIDTH_INCREMENT;
        }

        width.value = withTiming(moveTo, {
            duration: 1000,
            easing: Easing.out(Easing.bezierFn(0.56, -0.01, 0.45, 1.04)),
            reduceMotion: ReduceMotion.System,
        });

        setPercentValue((prevValue) => {
            return prevValue < MAX_PERCENT ? prevValue + PERCENT_INCREMENT : 0;
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>

            <View style={styles.loadingContainer}>
                <Animated.View style={styles.loadingBackground} />

                <Animated.View style={[{ width: width }, styles.loadingProgress, blockAnimatedStyle]} />

                <Text style={styles.loadingProgressText}>{percentValue}%</Text>
            </View>

            <Button title="Continue" onPress={handleStart} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 24,
        textAlign: "center",
    },
    loadingContainer: {
        width: 320,
        height: 20,
        margin: 20,
    },

    loadingBackground: {
        width: "100%",
        height: 20,
        backgroundColor: "lightgray",
    },
    loadingProgress: {
        position: "absolute",
        height: 20,
        backgroundColor: "#2c72f4",
    },
    loadingProgressText: {
        position: "absolute",
        width: "100%",
        textAlign: "center",
        color: "white",
    },
});
