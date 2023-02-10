import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import { SearchBar, ListItem } from "@rneui/themed";
import { useState } from "react";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";

const NewBookSearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [bookList, setBookList] = useState([]);
  const makeAxiosCall = () => {};
  const handleSearchValueChange = (search) => {
    setSearchValue(search);
  };
  const handleSubmitSearch = () => {
    axios
      .get(
        `https://biblocate.azurewebsites.net/api/Books/SearchBooks/${searchValue}/100`
      )
      .then(function (response) {
        setBookList(response?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Title"
        lightTheme="true"
        value={searchValue}
        onChangeText={handleSearchValueChange}
        platform="ios"
        onSubmitEditing={handleSubmitSearch}
      />
      <ScrollView style={styles.scrollView}>
        {bookList.map((book) => {
          return (
            <ListItem
              key={book.TitleID}
              containerStyle={styles.listItem}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{book.Title}</ListItem.Title>
                <ListItem.Subtitle>{book.Author}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "#5A6EE1",
  },
  listItem: {
    backgroundColor: "yellow",
  },
});

export default NewBookSearchScreen;
