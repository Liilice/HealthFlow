import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
const { height } = Dimensions.get("window");

export default function CalculInterface(data) {
  const [elem, setElem] = useState([]);
  const [weight, setWeight] = useState("100.0");
  const [valueTmp, setValueTmp] = useState("");
  const [calorie, setCalorie] = useState("");
  const [carbohydrate, setCarbohydrate] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [calorieInitial, setCalorieInitial] = useState("");
  const [carbohydrateInitial, setCarbohydrateInitial] = useState("");
  const [proteinInitial, setProteinInitial] = useState("");
  const [fatInitial, setFatInitial] = useState("");

  useEffect(() => {
    setCalorie(data.data.calorie);
    setCarbohydrate(data.data.carbohydrate);
    setProtein(data.data.protein);
    setFat(data.data.fat);
    setCalorieInitial(data.data.calorie);
    setCarbohydrateInitial(data.data.carbohydrate);
    setProteinInitial(data.data.protein);
    setFatInitial(data.data.fat);
    setElem(data.data);
  }, []);

  const handlePress = (elem) => {
    if (elem === "x" || elem === "+" || elem === "-" || elem === " ") {
    } else if (elem === "Save") {
      insertData();
    } else if (elem === "<-") {
      if (valueTmp.length > 0) {
        const newValueTmp = valueTmp.substring(0, valueTmp.length - 1);
        setValueTmp(newValueTmp);
        updateNutrientValues(newValueTmp);
      }
    } else if (valueTmp.length >= 4) {
    } else {
      const newValueTmp = valueTmp + elem.toString();
      setValueTmp(newValueTmp);
      updateNutrientValues(newValueTmp);
    }
  };

  const updateNutrientValues = (newValueTmp) => {
    const parsedWeight = parseFloat(newValueTmp);
    if (!isNaN(parsedWeight)) {
      setWeight(parsedWeight);
      setCalorie(
        ((parsedWeight * parseFloat(calorieInitial)) / 100).toFixed(2)
      );
      setCarbohydrate(
        ((parsedWeight * parseFloat(carbohydrateInitial)) / 100).toFixed(2)
      );
      setProtein(
        ((parsedWeight * parseFloat(proteinInitial)) / 100).toFixed(2)
      );
      setFat(((parsedWeight * parseFloat(fatInitial)) / 100).toFixed(2));
    }
  };

  const insertData = async () => {
    console.log(calorie, carbohydrate, protein, fat, elem.id);
    const token = await AsyncStorage.getItem("token");
    const { error } = await supabase.from("Breakfast").insert({
      indredient: parseInt(elem.id),
      calorie: calorie,
      user: token,
      carbohydrate: carbohydrate,
      protein: protein,
      fat: fat,
    });
    if (error == null) {
      router.replace("/accueil");
    }
    console.log(error);
  };
  return (
    <ThemedView style={styles.titleContainerModal}>
      <View style={styles.modalContainer}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text
            style={{
              marginBottom: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {new Date().toLocaleDateString("fr-FR")} - BreakFast
          </Text>
          <Image source={{ uri: elem.image }} style={styles.image} />
          <Text>{elem.name}</Text>
        </View>
        <ThemedView style={styles.template_box}>
          <View style={styles.flex}>
            <View>
              <Text>Calorie (kcal) </Text>
              <Text style={{ fontWeight: "bold" }}>{calorie}</Text>
            </View>
            <View>
              <Text>Carbohydrate</Text>
              <Text style={{ fontWeight: "bold" }}>{carbohydrate}</Text>
            </View>
            <View>
              <Text>Protein</Text>
              <Text style={{ fontWeight: "bold" }}>{protein}</Text>
            </View>
            <View>
              <Text>Fat</Text>
              <Text style={{ fontWeight: "bold" }}>{fat}</Text>
            </View>
          </View>
        </ThemedView>
        <View style={styles.flex}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#03B674",
              paddingBottom: 10,
              width: 100,
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                color: "#03B674",
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center",
              }}
            >
              {weight}
            </Text>
          </View>
          <Text>Appraisal of weight</Text>
        </View>
        <View style={styles.container}>
          {[1, 2, 3, "<-", 4, 5, 6, "+", 7, 8, 9, "-", " ", 0, ".", "Save"].map(
            (number, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => handlePress(number)}
              >
                <Text style={styles.buttonText}>{number}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  image: { width: 125, height: 125, borderRadius: 15 },
  titleContainerModal: {
    backgroundColor: "#f5f6fa",
    height: height,
    marginTop: 10,
    gap: 8,
  },
  modalContainer: {
    marginTop: 10,
    height: 150,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  template_box: {
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 25,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D7D9DE",
  },
  button: {
    width: 70,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#FFFFFF",
  },
  buttonText: {
    fontSize: 24,
  },
});
