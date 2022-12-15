import React, {useState} from 'react'
import {Text, View, StyleSheet, Button} from 'react-native'
import { Title } from 'react-native-paper';
import InputField from './InputField'

const AdvancedSearch = ({advancedSearch, setAdvancedSearch}) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const fields = [
    {
      textInput: author,
      setTextInput: setAuthor,
      placeHolderText: "Author",
    },
    {
      textInput: title,
      setTextInput: setTitle,
      placeHolderText: "Title",
    },
    {
      textInput: year,
      setTextInput: setYear,
      placeHolderText: "Year",
    },
  ]

  return (
    <View>
      <Title style={styles.title}>Advanced Search</Title>
      { fields.map( (field, index) => {
        return(
          <InputField key={index} {...field} />
        )
      })}
      <Button 
      title='Search'
      onPress={setAdvancedSearch(false)}
      ></Button>
    </View>
  )
}

export default AdvancedSearch;

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: '500',
      color: "green",
      alignSelf: "center"
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
      alignItems: "stretch"
    },
    input: {
      fontSize: 20,
      marginLeft: 10,
      overflow: "auto",
      width: "90%",
      alignItems: "stretch"
    },
  }); 