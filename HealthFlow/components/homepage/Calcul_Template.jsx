import {
  Dimensions,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Calcul_Template(data) {
  const [prevision, setPrevision] = useState("");
  useEffect(() => {
    if (data.data.data.length > 0) {
      setPrevision(data.data.data[0].prévision);
    }
  }, [data]);
  const redirectInterface = () => {
    router.replace("/accueil");
  };
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity onPress={redirectInterface}>
        <Text>Diet and exercise records</Text>
        <View style={styles.flex_border}>
          <Text>
            Still edible (Kcal){"\n"}
            {prevision}
          </Text>
          <Text> = </Text>
          <Text>
            Budget{"\n"}
            {prevision}
          </Text>
          <Text> - </Text>
          <Text>Diet{"\n"}0</Text>
          <Text> + </Text>
          <Text>Sport{"\n"}0</Text>
        </View>
        <View style={styles.flex}>
          <Text>
            <MaterialCommunityIcons name="egg-fried" size={24} color="black" />
            {"\n"}Breakfast
          </Text>
          <Text>
            <MaterialIcons name="lunch-dining" size={24} color="black" />
            {"\n"}Lunch
          </Text>
          <Text>
            <FontAwesome6 name="apple-whole" size={24} color="black" />
            {"\n"}Extra meal
          </Text>
          <Text>
            <MaterialIcons name="lunch-dining" size={24} color="black" />
            {"\n"}Dinner
          </Text>
          <Text>
            <MaterialCommunityIcons
              name="shoe-sneaker"
              size={24}
              color="black"
            />
            {"\n"}Sports
          </Text>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  icones: {
    color: "black",
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    padding: 15,
    borderRadius: 20,
    elevation: 1,
  },
  flex_border: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E4FBEC",
    padding: 15,
    borderRadius: 20,
  },
  flex: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
