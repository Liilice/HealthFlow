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
            title: "饮食运动记录",
            p: "轻松空热量 健康吃瘦",
            p1: "饮食摄入 0千卡",
          }}
        />
        <Card
          data={{
            title: "记录体重",
            p: "每天多瘦瘦一点",
            p1: "-- 公斤",
          }}
        />
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
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
  },
});
