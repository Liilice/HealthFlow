import { Tabs } from "expo-router";
import React from "react";
import { Image } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabInterfaceLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="accueil"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "home" : "home"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="breakfast"
        options={{
          title: "Breakfast",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="egg-fried" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="lunch"
        options={{
          title: "Lunch",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="lunch-dining" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="extraMeal"
        options={{
          title: "Extra Meal",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6 name="apple-whole" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="dinner"
        options={{
          title: "Dinner",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="lunch-dining" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
