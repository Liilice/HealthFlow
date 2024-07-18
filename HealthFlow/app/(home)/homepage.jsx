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
import Calcul_Template from "@/components/homepage/Calcul_Template";
import Weight_box from "@/components/homepage/Weight_box";
import { Card } from "@/components/homepage/Card";
import { supabase } from "@/lib/supabase";

const { height } = Dimensions.get("window");

export default function HomepageScreen() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const token = await AsyncStorage.getItem("token");
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", token);
      if (data) {
        setData(data);
      }
    };
    getData();
  }, []);
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
      <Calcul_Template data={{ data }} />
      <Weight_box data={{ data }} />
      <View style={styles.grid}>
        <Card
          data={{
            title: "喝水记录",
            p: "喝对水 组燃烧",
            p1: "还要喝 -- 毫升",
          }}
        />
        <Card
          data={{
            title: "感受记录",
            p: "及时反馈 贴心陪伴",
            p1: "现在感觉如何",
          }}
        />
        <Card
          data={{
            title: "步数记录",
            p: "趣味挑战 轻松燃脂",
            p1: "-- 步",
          }}
        />
        <Card
          data={{
            title: "近期记录",
            p: "姨妈助手 暖心陪伴",
            p1: "第 -- 天",
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
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    padding: 15,
    borderRadius: 20,
    height: 125,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    elevation: 1,
  },
  flex: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
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
