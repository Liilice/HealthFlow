import {
  Dimensions,
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/lib/supabase";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function CalculAccueil(data) {
  const [eatMeal, setEatMeal] = useState([]);
  const [name, setName] = useState("");
  const [calorie, setCalorie] = useState(0);
  useEffect(() => {
    setEatMeal(data.data.data);
    setName(data.data.name);
    const calculateTotalCalories = () => {
      const total = data.data.data.reduce((sum, item) => sum + item.calorie, 0);
      setCalorie(total);
    };

    calculateTotalCalories();
  }, [data]);
  return (
    <ThemedView style={styles.food_container}>
      <View>
        <View style={styles.flex}>
          <Text>{name}</Text>
          <Text>{calorie} Calorie</Text>
        </View>
        {eatMeal.length > 0 &&
          eatMeal.map((elem) => (
            <View style={styles.flex_spacze}>
              <View style={styles.flex_Normal}>
                <Image
                  source={{ uri: elem.Ingredient.image }}
                  style={styles.image}
                />
                <View style={styles.flex_space}>
                  <Text>{elem.Ingredient.name}</Text>
                  <Text>{elem.calorie} Kcal</Text>
                </View>
                <TouchableOpacity>
                  <AntDesign
                    name="minus"
                    size={24}
                    color="green"
                    style={{ marginLeft: 125 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex_Normal: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  flex: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  food_container: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    padding: 10,
    height: "auto",
  },
  image: { width: 60, height: 60, borderRadius: 15 },
  flex_space: {
    display: "flex",
    // flexDirection: "row",
    // justifyContent: "space-between",
  },
});
