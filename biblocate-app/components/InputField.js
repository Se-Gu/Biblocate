// SearchBar.js
import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Button,
  Text,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const InputField = ({ textInputDescription, textInput, setTextInput }) => {
  inputReference = useRef(null);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {});
    return () => {
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{textInputDescription}</Text>
      <View style={styles.searchBar__clicked}>
        {/* Input field */}
        <TextInput
          ref={inputReference}
          style={styles.input}
          placeholder={textInputDescription}
          value={textInput}
          onChangeText={setTextInput}
          onFocus={() => {}}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {textInput.trim().length !== 0 && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ marginLeft: "auto", marginRight: 3 }}
            onPress={() => {
              setTextInput("");
              inputReference.current.focus();
            }}
          />
        )}
      </View>
    </View>
  );
};
export default InputField;

//
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginBottom: 3,
  },
  container: {
    margin: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    borderRadius: 7,
    alignItems: "right",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#d9dbda",
    borderRadius: 7,
    alignItems: "stretch",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    overflow: "auto",
    width: "90%",
    alignItems: "stretch",
  },
});
