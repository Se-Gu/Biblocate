import React, { useState } from "react";
import { Text, View, StyleSheet, Button, ScrollView } from "react-native";
import { Card, Title } from "react-native-paper";
import InputField from "./InputField";

const AdvancedSearch = ({ advancedSearch, setAdvancedSearch }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const fields = [
    {
      textInput: author,
      setTextInput: setAuthor,
      textInputDescription: "Author",
    },
    {
      textInput: title,
      setTextInput: setTitle,
      textInputDescription: "Title",
    },
    {
      textInput: year,
      setTextInput: setYear,
      textInputDescription: "Year",
    },
  ];

  return (
    <ScrollView>
      <Card style={styles.card}>
        <Title style={styles.title}>Advanced Search</Title>
        {fields.map((field, index) => {
          return <InputField key={index} {...field} />;
        })}
        <Button
          onPress={() => {
            setAdvancedSearch(!advancedSearch);
          }}
          title="Search"
        ></Button>
      </Card>
    </ScrollView>
  );
};

export default AdvancedSearch;

const styles = StyleSheet.create({
  button: {
    marginBottom: 200,
  },
  card: {
    margin: 7,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    paddingTop: 10,
    marginBottom: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "green",
    alignSelf: "center",
  },
  container: {
    margin: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
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
    width: "90%",
    alignItems: "stretch",
  },
});
