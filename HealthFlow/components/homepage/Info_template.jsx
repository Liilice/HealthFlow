import { StyleSheet, Dimensions, View, Image, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
const { height } = Dimensions.get("window");

export function Info_template({ data }) {
  const [info, setInfo] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function find_image(name) {
    if (name.startsWith("16")) {
      setImage(require("@/assets/images/16+8.jpg"));
    } else if (name.startsWith("Cal")) {
      setImage(require("@/assets/images/apport.jpg"));
    } else if (name.startsWith("Scien")) {
      setImage(require("@/assets/images/scientific medication.jpg"));
    } else {
      setImage("");
    }
  }
  useEffect(() => {
    setName(data.name);
    setInfo([data.data[data.name]]);
    find_image(data.name);
  }, []);

  return (
    <ThemedView style={styles.template_box}>
      <ScrollView>
        <Text style={styles.title}>{name}</Text>
        <Image source={image} style={styles.image} />
        {info[0] &&
          info[0].description.map((elem, index) => (
            <Text
              key={index}
              style={{ marginLeft: 20, marginRight: 20, marginBottom: 5 }}
            >
              {elem}
            </Text>
          ))}
        {info[0] && (
          <View style={styles.box}>
            <Text>● {info[0].Advantages}</Text>
            <Text>○ {info[0].Disadvantages}</Text>
          </View>
        )}
        <View style={{ marginTop: 25, marginRight: 20, marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Key points for use
          </Text>
          {info[0] &&
            info[0].Key_points.map((elem, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Text style={{ fontSize: 9, paddingTop: 4 }}>●</Text>
                <Text
                  style={{ marginLeft: 10, marginRight: 15, marginBottom: 5 }}
                >
                  {elem}
                </Text>
              </View>
            ))}
        </View>
        <View style={{ marginTop: 25, marginRight: 20, marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Suitable for the crowd
          </Text>
          {info[0] && (
            <Text>
              {info[0].Suitable_for_the_crowd.description}
              {"\n"}
            </Text>
          )}
          <View style={{ marginBottom: 100 }}>
            {info[0] &&
              info[0].Suitable_for_the_crowd.people.map((elem, index) => (
                <View
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: 9, paddingTop: 4 }}>●</Text>
                  <Text
                    style={{ marginLeft: 10, marginRight: 15, marginBottom: 5 }}
                  >
                    {elem}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  template_box: {
    width: "100%",
    height: height,
    backgroundColor: "white",
    marginTop: 25,
    borderRadius: 10,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    textAlign: "center",
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },
  box: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    backgroundColor: "#f1f2f6",
    borderRadius: 12,
    padding: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
