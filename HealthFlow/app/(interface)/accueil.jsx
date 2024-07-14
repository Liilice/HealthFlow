import {
  Dimensions,
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
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

const { height } = Dimensions.get("window");

export default function AccueilScreen() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");

  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
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

  return (
    <ThemedView style={styles.titleContainer}>
      <View style={styles.flex}>
        <TouchableOpacity onPress={() => showDate("date")}>
          <TabBarIcon name={"arrow-back"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDate("date")} style={styles.input}>
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
        <TouchableOpacity onPress={() => showDate("date")}>
          <TabBarIcon name={"cloud-upload-sharp"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => showDate("date")}>
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
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
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
  food_container: {
    marginTop: 10,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    padding: 10,
    height: "auto",
  },
  image: { marginBottom: 15, width: 60, height: 60, borderRadius: 15 },
});
