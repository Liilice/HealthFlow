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
import DateTimePicker from "@react-native-community/datetimepicker";
import CircularProgress from "react-native-circular-progress-indicator";
import * as Progress from "react-native-progress";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { FileObject } from "@supabase/storage-js";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { Line } from "react-native-svg";

const { height } = Dimensions.get("window");

export default function AccueilScreen() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showForm, setShowForm] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [categorie, setCategorie] = useState("");
  const [data, setData] = useState([]);
  const [calorie, setCalorie] = useState("");
  const [image, setImage] = useState(null);
  const [getImage, setGetImage] = useState("");
  const [files, setFiles] = useState([]);
  const [carbohydrate, setCarbohydrate] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      const { data, error } = await supabase
        .from("Categorie")
        .select("id, name");
      if (data) {
        setData(data);
      }
    };
    getData();
    loadImages();
  }, []);

  const loadImages = async () => {};
  const showDate = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const redirectSettings = () => {
    router.replace("/settings");
  };

  const uploadData = () => {
    console.log("upload");
    setShowForm(true);
  };
  const close = () => {
    setShowForm(false);
  };

  const handleSlidingCompleteCarbohydrate = (val) => {
    const roundedValue = Math.round(val * 100) / 100;
    setCarbohydrate(roundedValue);
  };

  const handleSlidingCompleteProtein = (val) => {
    const roundedValue = Math.round(val * 100) / 100;
    setProtein(roundedValue);
  };
  const handleSlidingCompleteFat = (val) => {
    const roundedValue = Math.round(val * 100) / 100;
    setFat(roundedValue);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result && !result.canceled) {
      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `${new Date().getTime()}.${
        img.type === "image" ? "png" : "mp4"
      }`;
      const contentType = img.type === "image" ? "image/png" : "video/mp4";

      const { data, error } = await supabase.storage
        .from("files")
        .upload(filePath, decode(base64), { contentType });

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        console.log("File uploaded successfully:", data);
        setImage(
          `https://tvudmxokkdxjcxoeaveh.supabase.co/storage/v1/object/public/${data.fullPath}`
        );
      }
    } else {
      console.log("Image selection cancelled or failed");
    }
  };

  const handleSubmit = async () => {
    const { error } = await supabase.from("Ingredients").insert({
      image: image,
      name: ingredient,
      calorie: calorie,
      categorie_id: categorie,
      carbohydrate: carbohydrate,
      protein: protein,
      fat: fat,
    });
    if (error == null) {
      setImage("");
      setIngredient("");
      setCalorie("");
      setCategorie("");
      setShowForm(false);
    }
  };
  return (
    <View>
      <Modal
        transparent={true}
        visible={showForm}
        onRequestClose={close}
        animationType="slide"
        style={styles.modalOverlay}
      >
        <View style={styles.modalOverlay}>
          <TabBarIcon
            name={"close"}
            style={{
              fontSize: 50,
              color: "black",
              position: "relative",
              zIndex: 1,
              top: 10,
            }}
            onPress={close}
          />
          <ThemedView style={styles.titleContainerModal}>
            <View style={styles.modalContainer}>
              <Text
                style={{ marginBottom: 20, fontSize: 17, fontWeight: "bold" }}
              >
                Ingredients not found? You can add here
              </Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={categorie}
                  onValueChange={(itemValue) => setCategorie(itemValue)}
                >
                  <Picker.Item
                    label="Select a category"
                    value=""
                    enabled={false}
                  />
                  {data &&
                    data.map((elem) => (
                      <Picker.Item label={elem.name} value={elem.id} />
                    ))}
                </Picker>
              </View>
              <TextInput
                style={styles.inputForm}
                placeholder="Name"
                value={ingredient}
                onChangeText={(text) => setIngredient(text)}
              />
              <Text>Calorie per 100g: {calorie}</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={0}
                maximumValue={900}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#b9e4c9"
                step={1}
                value={calorie}
                onValueChange={(value) => setCalorie(value)}
              />
              <Text>Carbohydrate per 100g: {carbohydrate}</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={0}
                maximumValue={50}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#b9e4c9"
                step={0.1}
                value={carbohydrate}
                onValueChange={handleSlidingCompleteCarbohydrate}
              />
              <Text>Protein per 100g: {protein}</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={0}
                maximumValue={50}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#b9e4c9"
                step={0.1}
                value={protein}
                onValueChange={handleSlidingCompleteProtein}
              />
              <Text>Fat per 100g: {fat}</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={0}
                maximumValue={50}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#b9e4c9"
                step={0.1}
                value={fat}
                onValueChange={handleSlidingCompleteFat}
              />
              <View style={styles.containerModal}>
                <Button
                  title="Pick an image from camera roll"
                  onPress={pickImage}
                />
                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
              </View>
              <Button title="Add Ingredients" onPress={() => handleSubmit()} />
            </View>
          </ThemedView>
        </View>
      </Modal>

      <ThemedView style={styles.titleContainer}>
        <View style={styles.flex}>
          <TouchableOpacity onPress={() => showDate("date")}>
            <TabBarIcon name={"arrow-back"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showDate("date")}
            style={styles.input}
          >
            <Text>Today</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TouchableOpacity onPress={() => uploadData()}>
            <TabBarIcon name={"cloud-upload-sharp"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirectSettings()}>
            <TabBarIcon name={"settings"} />
          </TouchableOpacity>
        </View>
        <ThemedView style={styles.container}>
          <View style={styles.flex}>
            <Text>
              Dietary{"\n"}intake{"\n"}0
            </Text>
            <CircularProgress
              value={1333}
              radius={55}
              duration={2000}
              progressValueColor={"#ecf0f1"}
              maxValue={1333}
              title={"Still edible"}
              titleColor={"black"}
              titleStyle={{ fontWeight: "bold" }}
            />
            <Text>
              Exercise{"\n"}consumption{"\n"}0
            </Text>
          </View>
          <View style={styles.flex}>
            <Text>
              Carbohydrate{"\n"}
              <Progress.Bar progress={0.3} width={50} />
            </Text>
            <Text>
              Protein
              {"\n"}
              <Progress.Bar progress={0.3} width={50} />
            </Text>
            <Text>
              Fat {"\n"}
              <Progress.Bar progress={0.3} width={50} />
            </Text>
          </View>
        </ThemedView>
        <ThemedView style={styles.food_container}>
          <View style={styles.flex}>
            <Text>Breakfast</Text>
            <Text>0 Calorie</Text>
          </View>
          <View style={styles.flex_Normal}>
            <Image
              source={require("@/assets/images/logo-color.png")}
              style={styles.image}
            />
            {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
            <View style={styles.flex}>
              <View>
                <Text>Title</Text>
                <Text>Gramme</Text>
              </View>
              <Text>Calorie</Text>
            </View>
          </View>
        </ThemedView>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "#f5f6fa",
    height: height,
    marginTop: 40,
    gap: 8,
  },
  titleContainerModal: {
    backgroundColor: "#f5f6fa",
    height: height,
    marginTop: 10,
    gap: 8,
  },
  flex: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  flex_Normal: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#ced6e0",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 30,
  },
  container: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    height: 200,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  containerModal: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 20,
    height: 150,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContainer: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  picker: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    left: 0,
    right: 0,
    width: 250,
  },
  inputForm: {
    height: 60,
    width: 250,
    backgroundColor: "#ced6e0",
    borderRadius: 50,
    paddingLeft: 25,
    marginBottom: 20,
    justifyContent: "center",
  },
});
