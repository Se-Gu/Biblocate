// SearchBar.js
import React, {useEffect, useRef} from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked, setDetails}) => {
  inputReference = useRef(null);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setClicked(false);
    });
    return () => {
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={
            styles.searchBar__clicked
        }
      >
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          ref={inputReference}
          returnKeyType="search"
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
            setDetails(false);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {searchPhrase.trim().length !== 0 && (
          <Entypo name="cross" size={20} color="black" style={{ padding: 1 }} onPress={() => {
              setSearchPhrase("");
              inputReference.current.focus();
          }}/>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

//
const styles = StyleSheet.create({
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
      borderRadius: 15,
      alignItems: "center",
    },
    searchBar__clicked: {
      padding: 10,
      flexDirection: "row",
      width: "100%",
      backgroundColor: "#d9dbda",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "start",
    },
    input: {
      fontSize: 20,
      marginLeft: 10,
      width: "85%",
    },
  }); 