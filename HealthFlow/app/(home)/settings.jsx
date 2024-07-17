import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
const { height } = Dimensions.get("window");

export default function SettingsSreen() {
  const removeStorage = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        await AsyncStorage.removeItem("token");
        router.replace("/");
      }
    } catch (e) {
      router.replace("/");
    }
  };
  return (
    <ThemedView style={styles.titleContainer}>
      <TouchableOpacity onPress={removeStorage}>
        <Text>Logout</Text>
      </TouchableOpacity>
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
});
