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
const { height } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;

export default function Add_template() {
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
            category.map((elem) => (
              <TouchableOpacity key={elem.id} onPress={() => active(elem.id)}>
                <Text
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
            <FlatList
              data={ingredientByCategory}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={styles.flex_normal}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View>
                      <Text>{item.name}</Text>
                      <Text>{item.calorie}/100g</Text>
                    </View>
                    <View>
                      <Text>
                        <TabBarIcon name={"add"} color="#40CD98" />
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
            />
          ) : (
            <FlatList
              data={ingredient}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <View style={styles.flex_normal}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <View>
                      <Text>{item.name}</Text>
                      <Text>{item.calorie}/100g</Text>
                    </View>
                    <View>
                      <Text>
                        <TabBarIcon name={"add"} color="#40CD98" />
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
            />
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
    borderColor: "red",
    borderWidth: 3,
    height: height - 175,
    width: windowWidth / 2 + 45,
    paddingLeft: 15,
    paddingRight: 15,
  },
  image: { width: 60, height: 60, borderRadius: 15 },
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
  flex_normal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
