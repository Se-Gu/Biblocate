import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { SearchBar, ListItem } from "@rneui/themed";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import Ionicons from "react-native-vector-icons/Ionicons";

const NewBookSearchScreen = () => {
  const [searchValue, setSearchValue] = useState("");
  const [bookList, setBookList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
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
          `https://biblocate.azurewebsites.net/api/Books/SearchBooks/${searchValue}/${page}`
        )
        .then(function (response) {
          setBookList([...bookList, ...response?.data]);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          setSearchLoading(false);
        });
    }
  };

  useEffect(() => {
    handleSubmitSearch();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="Title"
        lightTheme="true"
        value={searchValue}
        onChangeText={handleSearchValueChange}
        onClear={handleEmptySearch}
        platform="ios"
        onSubmitEditing={handleSubmitSearch}
      />
      <FlatList
        style={{ opacity: 1 - searchLoading * 0.5 }}
        pointerEvents={searchLoading ? "none" : "auto"}
        data={bookList}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <ListItem
              key={item?.TitleID}
              containerStyle={styles.listItem}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title onLongPress={handleLongPressTitle}>
                  {item?.Title}
                </ListItem.Title>
                <ListItem.Subtitle>{item?.Author}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        }}
      />
      <View>{searchLoading && <ActivityIndicator size="large" />}</View>
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
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NewBookSearchScreen;
