import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height } = Dimensions.get("window");

export default function BreakfastSreen() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      const { data, errors } = await supabase
        .from("Ingredients")
        .select("image")
        .eq("id", 3)
        .single();
      if (data) {
        setData(data.image);
        console.log("image ", data.image);
      }
      console.log(token);
    };
    getData();
  }, []);
  const showDate = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const redirectAccueil = () => {
    router.replace("/accueil");
  };
  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.flex}>
        <TouchableOpacity onPress={() => redirectAccueil()}>
          <TabBarIcon name={"arrow-back"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDate("date")} style={styles.input}>
          <Text>{}</Text>
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
      </View>
      <View>
        {data && <Image source={{ uri: `${data}` }} />}
        {/* {data &&
          data.map((elem) => (
            <Text>{elem.image}</Text>
            // <Image source={{ uri: elem.image }} style={styles.image} />
          ))} */}
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
  flex: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
