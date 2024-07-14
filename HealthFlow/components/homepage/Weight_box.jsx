import {
  Dimensions,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useState, useEffect } from "react";

export default function Weight_box(data) {
  const [weight, setWeight] = useState("");
  useEffect(() => {
    if (data.data.data.length > 0) {
      setWeight(data.data.data[0].weight);
    }
  }, [data]);
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.flex}>
        <View>
          <Text>Weight record</Text>
          <Text style={{ marginTop: 5, color: "#ced6e0" }}>Update at</Text>
        </View>
        <Text>
          <TabBarIcon name={"add"} color="#40CD98" />
        </Text>
      </View>
      <View>
        <Text style={{ marginTop: 5, color: "black" }}>
          {weight}kg
          <TabBarIcon name={"eye"} color="#40CD98" />
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
