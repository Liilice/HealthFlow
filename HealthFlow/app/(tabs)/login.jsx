import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { router } from "expo-router";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import React, { useState } from "react";
const { height } = Dimensions.get("window");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectHome = () => {
    router.replace("/");
  };
  const handelSubmit = () => {};

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText
        type="title"
        style={{ color: "#ced6e0", paddingTop: 15, paddingBottom: 15 }}
      >
        <TabBarIcon
          name={"close"}
          style={{ fontSize: 50 }}
          onPress={redirectHome}
        />
      </ThemedText>
      <View style={styles.flex}>
        <ThemedText type="title">Welcome back</ThemedText>
        <Text style={{ paddingLeft: 10, paddingRight: 10, lineHeight: 19 }}>
          Unregistred email will automatically create a HealthFlow account{" "}
        </Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity onPress={handelSubmit} style={styles.button}>
          <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>
        <View style={styles.underline}></View>
        <Text>Forgot password ?</Text>
      </View>
      <View style={styles.flex_row}>
        <TabBarIcon
          name={"logo-google"}
          style={{ fontSize: 40, marginRight: 15 }}
        />
        <TabBarIcon
          name={"logo-instagram"}
          style={{ fontSize: 40, marginRight: 15 }}
        />
        <TabBarIcon name={"logo-facebook"} style={{ fontSize: 40 }} />
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: height - 200,
  },
  input: {
    height: 60,
    width: 250,
    backgroundColor: "#ced6e0",
    borderRadius: 50,
    paddingLeft: 25,
    marginBottom: 20,
  },
  flex_row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 60,
    width: 250,
    backgroundColor: "#20bf6b",
    borderRadius: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  underline: {
    borderStyle: "solid",
    borderColor: "#ced6e0",
    width: 250,
    borderWidth: 1,
  },
});
