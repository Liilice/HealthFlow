import { Dimensions, TextInput, View, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { Card } from "@/components/homepage/Card";
import { Template } from "@/components/homepage/Template";
import { FontAwesome6 } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.input}>
        <FontAwesome6
          style={styles.icone}
          name="magnifying-glass"
          size={25}
          color="green"
        />
        <TextInput
          placeholder="Search"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <Template />
      <View style={styles.grid}>
        <Card
          data={{
            title: "Diet and exsercise records",
            p: "Control your diet",
            p1: " -- Calories left",
          }}
        />
        <Card
          data={{
            title: "Record weight",
            p: "Lose weight every day",
            p1: "-- Kilogram",
          }}
        />
        <Card
          data={{
            title: "Daily Hydration",
            p: "Drinking water helps burn calories.",
            p1: "-- cl remaining",
          }}
        />
        <Card
          data={{
            title: "My Feelings",
            p: "Personalized support according to your feelings. ",
            p1: "",
          }}
        />
        <Card
          data={{
            title: "Daily Steps",
            p: "Little effort make you burn a lot of calories.",
            p1: "-- step",
          }}
        />
        <Card
          data={{
            title: "Monstrual Period",
            p: "Anticipate and organize your life easier",
            p1: " -- Day(s) remaining",
          }}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "#f5f6fa",
    height: height,
    marginTop: 40,
    gap: 8,
  },
  icone: {
    paddingTop: 18,
    paddingRight: 10,
  },
  input: {
    height: 60,
    backgroundColor: "#ced6e0",
    borderRadius: 50,
    paddingLeft: 25,
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
  },
});
