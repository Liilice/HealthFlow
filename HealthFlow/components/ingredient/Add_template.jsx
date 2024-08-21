import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome6 } from "@expo/vector-icons";
import Flatlist_item from "./Flatlist_item";
const { height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;

export default function Add_template(data) {
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [classActive, setClassActive] = useState(null);
  const [ingredient, setIngredient] = useState([]);
  const [ingredientByCategory, setIngredientByCategory] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      const { data: categoryData, error: categoryError } = await supabase
        .from("Categorie")
        .select("id, name")
        .order("id", { ascending: true });
      if (categoryData) {
        setCategory(categoryData);
      }

      const { data: ingredientData, error: ingredientError } = await supabase
        .from("Ingredients")
        .select("*")
        .order("id", { ascending: true });
      if (ingredientData) {
        setIngredient(ingredientData);
      }
    };
    getData();
  }, [ingredient, classActive]);

  const active = async (id) => {
    setClassActive(id);
    const {
      data: ingredientInCategoryData,
      error: ingredientInCategoryDataError,
    } = await supabase
      .from("Ingredients")
      .select("*")
      .eq("categorie_id", id)
      .order("id", { ascending: true });
    if (ingredientInCategoryData) {
      setIngredientByCategory(ingredientInCategoryData);
    }
  };

  function handelSearch(test) {
    setSearch(test);
    let array = [];
    ingredient.map((elem) => {
      if (elem.name.toLowerCase().includes(test.toLowerCase())) {
        array.push(elem);
      }
    });
    console.log(array);
    setIngredientByCategory(array);
  }
  return (
    <>
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
          onChangeText={(text) => handelSearch(text)}
        />
      </View>
      <View style={styles.flex_container}>
        <View style={styles.asideContainer}>
          {category &&
            category.map((elem, index) => (
              <TouchableOpacity key={elem.id} onPress={() => active(elem.id)}>
                <Text
                  key={index}
                  style={
                    classActive === elem.id
                      ? styles.active
                      : { marginBottom: 40 }
                  }
                >
                  {elem.name}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={styles.mainContainer}>
          {ingredientByCategory.length > 0 ? (
            <Flatlist_item
              data={{
                ingredient: ingredientByCategory,
                name: data.data,
              }}
            />
          ) : (
            <Flatlist_item data={{ ingredient: ingredient, name: data.data }} />
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#ced6e0",
    borderRadius: 50,
    paddingLeft: 25,
    marginLeft: 10,
    marginRight: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flex_container: {
    display: "flex",
    flexDirection: "row",
  },
  asideContainer: {
    height: height,
    paddingTop: 20,
    padding: 7,
    width: windowWidth / 2 - 45,
    backgroundColor: "#ced6e0",
    borderTopRightRadius: 30,
  },
  mainContainer: {
    marginLeft: 10,
    height: height - 175,
    width: windowWidth / 2 + 45,
    paddingLeft: 15,
    paddingRight: 15,
  },
  active: {
    backgroundColor: "white",
    marginBottom: 40,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 8,
    borderRadius: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
