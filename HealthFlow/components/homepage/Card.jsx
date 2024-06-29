import { router } from "expo-router";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
const windowWidth = Dimensions.get("window").width;

export function Card({ data }) {
  const redictLogin = () => {
    router.replace("/login");
  };
  return (
    <TouchableOpacity style={styles.card} onPress={redictLogin}>
      <View>
        <Text>{data.title}</Text>
        <Text style={{ marginTop: 5, color: "#ced6e0" }}>{data.p}</Text>
      </View>
      <Text style={{ marginTop: 5, color: "#7e8080" }}>{data.p1}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 15,
    padding: 15,
    height: 125,
    width: windowWidth / 2 - 25,
    backgroundColor: "white",
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
