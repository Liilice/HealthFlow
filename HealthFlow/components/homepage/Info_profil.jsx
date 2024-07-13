import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";

export function Info_profil() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const [date, setDate] = useState(new Date());

  const showDate = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  return (
    <ThemedView style={styles.titleContainer}>
      <View>
        <Text>fdsdfvsd</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Weight in kg"
          onChangeText={(text) => setWeight(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Height like 1.75m"
          onChangeText={(text) => setHeight(text)}
        />
        <TextInput
          style={styles.input}
          value={date.toLocaleDateString()}
          placeholder="Birthday"
          onPress={() => showDate("date")}
        />
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => signUp()}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
          Send Profil
        </Text>
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
  input: {
    height: 60,
    width: 250,
    backgroundColor: "#ced6e0",
    borderRadius: 50,
    paddingLeft: 25,
    marginBottom: 20,
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
  picker: {
    borderStyle: "solid",
    borderColor: "red",
    borderWidth: 3,
    left: 0,
    right: 0,
  },
});
