import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { selectNotifications } from "../slices/menuSlice";
import { useAppSelector } from "../hooks";

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const notifications = useAppSelector(selectNotifications);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#3255f0",
                tabBarStyle: {
                    position: "absolute",
                    height: 60,
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    elevation: 0,
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                    tabBarBadge: notifications === 0 ? undefined : notifications,
                }}
            />

            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
                }}
            />

            <Tabs.Screen
                name="animation"
                options={{
                    title: "Animations",
                    tabBarIcon: ({ color }) => <TabBarIcon name="circle" color={color} />,
                }}
            />
        </Tabs>
    );
}
