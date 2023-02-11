import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { SearchBar, ListItem } from "@rneui/themed";
import { useState } from "react";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import Ionicons from "react-native-vector-icons/Ionicons";

const NewBookSearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [bookList, setBookList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const handleSearchValueChange = (search) => {
    setSearchValue(search);
  };
  const handleLongPressTitle = async (e) => {
    let bookTitle = e?._targetInst?.child?.memoizedProps;
    alert("Copied to clipboard");
    await Clipboard.setStringAsync(bookTitle);
  };
  const handleEmptySearch = () => setBookList([]);

  const handleSubmitSearch = () => {
    if (searchValue == "") handleEmptySearch();
    else {
      setSearchLoading(true);
      axios
        .get(
          `https://biblocate.azurewebsites.net/api/Books/SearchBooks/${searchValue}/1`
        )
        .then(function (response) {
          setBookList(response?.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setSearchLoading(false);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        showLoading={searchLoading}
        placeholder="Title"
        lightTheme="true"
        value={searchValue}
        onChangeText={handleSearchValueChange}
        onClear={handleEmptySearch}
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
              <Ionicons
                name="location"
                color="white"
                style={{ size: "large" }}
              />
              <ListItem.Content>
                <ListItem.Title onLongPress={handleLongPressTitle}>
                  {book.Title}
                </ListItem.Title>
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
    backgroundColor: "#9999ff",
    marginBottom: 8,
  },
});

export default NewBookSearchScreen;
