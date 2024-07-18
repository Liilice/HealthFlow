import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useEffect, useState } from "react";
import CalculInterface from "./CalculInterface";
const { height } = Dimensions.get("window");

export default function Flatlist_item(data) {
  const [ingredient, setIngredient] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [elemInfo, setElemInfo] = useState([]);
  useEffect(() => {
    setIngredient(data.data);
  }, [data]);

  const addFood = (elem) => {
    console.log("elem", elem);
    setElemInfo(elem);
    setActiveModal(true);
  };

  const close = () => {
    setActiveModal(false);
    setElemInfo([]);
  };
  return (
    <>
      <Modal
        transparent={true}
        visible={activeModal}
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
          <CalculInterface data={elemInfo} />
        </View>
      </Modal>
      <FlatList
        data={ingredient}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addFood(item)}>
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
    </>
  );
}
const styles = StyleSheet.create({
  image: { width: 60, height: 60, borderRadius: 15 },
  flex_normal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  titleContainerModal: {
    backgroundColor: "#f5f6fa",
    height: height,
    marginTop: 10,
    gap: 8,
  },
  modalContainer: {
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
});
