import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Image,
  Text,
  Modal,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import data from "@/assets/json/info_file.json";
import { Info_template } from "@/components/homepage/Info_template";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

const { height } = Dimensions.get("window");

export function Template() {
  const [selectCalcul, setSelectCalcul] = useState(false);
  const [name, setName] = useState("");

  const print_info = (nom) => {
    setName(nom);
    setSelectCalcul(true);
  };

  const close = () => {
    setName("");
    setSelectCalcul(false);
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={selectCalcul}
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
              top: 75,
            }}
            onPress={close}
          />
          <Info_template data={{ name: name, data: data }} />
        </View>
      </Modal>

      <ThemedView style={styles.template_box}>
        <Text style={{ marginBottom: 10, fontSize: 19, fontWeight: "bold" }}>
          Select template
        </Text>
        <View style={styles.flex}>
          <TouchableOpacity onPress={() => print_info("Calculate calories")}>
            <Image
              source={require("@/assets/images/apport.jpg")}
              style={styles.image}
            />
            <Text>Calculate {"\n"}calories</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => print_info("16:8 Light fasting")}>
            <Image
              source={require("@/assets/images/16+8.jpg")}
              style={styles.image}
            />
            <Text>16:8 Light {"\n"}fasting</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => print_info("Scientific medication")}>
            <Image
              source={require("@/assets/images/scientific medication.jpg")}
              style={styles.image}
            />
            <Text>Scientific {"\n"}medication</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  template_box: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    padding: 10,
    borderRadius: 20,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    borderBlockColor: "red",
  },
  image: {
    height: 75,
    width: 97,
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
