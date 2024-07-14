import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button, Input } from "@rneui/themed";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { differenceInYears, parseISO } from "date-fns";

const { height } = Dimensions.get("window");

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [date, setDate] = useState(new Date());
  const [errorAge, setErrorAge] = useState("");

  const showDate = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const redirectHome = () => {
    router.replace("/");
  };

  const close = () => {
    setShowModal(false);
  };

  const signUp = async () => {
    setPassword("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      const { data } = await supabase
        .from("Users")
        .select("email")
        .eq("email", email);
      if (data.length === 0) {
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        setShowModal(true);
      } else {
        setShowModal(false);
        await AsyncStorage.setItem("token", email);
        router.replace("/homepage");
      }
    } else {
      await AsyncStorage.setItem("token", email);
      router.replace("/homepage");
    }
  };
  const handleSlidingCompleteHeight = (val) => {
    const roundedValue = Math.round(val * 100) / 100;
    setHeight(roundedValue);
  };
  const handleSlidingCompleteWeight = (val) => {
    const roundedValue = Math.round(val * 100) / 100;
    setWeight(roundedValue);
  };

  const handleSubmit = async () => {
    if (
      gender != null &&
      username !== null &&
      email !== null &&
      date !== null &&
      weight !== null &&
      height !== null
    ) {
      const now = new Date();
      const age = differenceInYears(now, date);
      console.log(age);
      if (age < 16) {
        return setErrorAge("too young");
      } else {
        const newHeight = height.toString().replace(".", "");
        let calcul;
        if (gender == "Madame") {
          calcul = (
            9.99 * weight +
            6.25 * parseInt(newHeight) -
            4.92 * age -
            161
          ).toFixed(2);
        } else {
          calcul = (
            9.99 * weight +
            6.25 * parseInt(newHeight) -
            4.92 * age +
            5
          ).toFixed(2);
        }
        const { error } = await supabase.from("Users").insert({
          gender: gender,
          username: username,
          email: email,
          birthday: date,
          prévision: calcul,
          weight: weight,
          height: height,
        });
        await AsyncStorage.setItem("token", email);
        setEmail("");
        setPassword("");
        router.replace("/homepage");
      }
    } else {
      setErrorAge("Please complete all fields");
    }
  };

  return (
    <>
      <Modal
        transparent={true}
        visible={showModal}
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
              top: 5,
            }}
            onPress={close}
          />
          <ThemedView style={styles.titleContainer}>
            <View style={styles.container}>
              <View style={styles.picker}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue) => setGender(itemValue)}
                >
                  <Picker.Item label="Monsieur" value={"Monsieur"} />
                  <Picker.Item label="Madame" value={"Madame"} />
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
              />
              <TouchableOpacity
                style={styles.input}
                onPress={() => showDate("date")}
              >
                <Text>{date.toLocaleDateString()}</Text>
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
              <Text>Weight: {weight}</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={40}
                maximumValue={150}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#b9e4c9"
                value={weight}
                onValueChange={handleSlidingCompleteWeight}
              />
              <Text>Height: {height}</Text>
              <Slider
                style={{ width: 250, height: 40 }}
                minimumValue={1.4}
                maximumValue={2.5}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                thumbTintColor="#b9e4c9"
                step={0.01}
                value={height}
                onValueChange={handleSlidingCompleteHeight}
              />
            </View>
            <Button title="Send Profile" onPress={() => handleSubmit()} />
            {errorAge ? <Text>{errorAge}</Text> : ""}
          </ThemedView>
        </View>
      </Modal>
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
            Unregistered email will automatically create a HealthFlow account{" "}
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
          <TouchableOpacity
            disabled={loading}
            onPress={() => signUp()}
            style={styles.button}
          >
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.underline}></View>
          <Text>Forgot password?</Text>
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
    </>
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
    justifyContent: "center",
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
  picker: {
    borderStyle: "solid",
    // borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    left: 0,
    right: 0,
    width: 250,
  },
  container: {
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
