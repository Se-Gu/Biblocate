import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { SearchBar, ListItem, Icon } from "@rneui/themed";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Clipboard from "expo-clipboard";
import Ionicons from "react-native-vector-icons/Ionicons";

const NewBookSearchScreen = ({ navigation }) => {
  const [searchValue, setSearchValue] = useState("");
  const [bookList, setBookList] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);
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
    setPage(1);
    if (searchValue == "") handleEmptySearch();
    else {
      setSearchLoading(true);
      axios
        .get(
          `https://biblocate.azurewebsites.net/api/Books/SearchBooks/${searchValue}/1`
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

  const loadNextPage = () => {
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
    page !== 1 && loadNextPage();
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
        style={{ opacity: 1 - searchLoading * 0.7 }}
        pointerEvents={searchLoading ? "none" : "auto"}
        data={bookList}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        renderItem={({ item, index }) => {
          return (
            <View>
              <ListItem.Accordion
                key={item?.TitleID}
                containerStyle={styles.listItem}
                bottomDivider
                isExpanded={expandedIndex === index && expanded}
                onPress={() => {
                  setExpanded(expandedIndex === index ? false : true);
                  setExpandedIndex(expandedIndex === index ? -1 : index);
                }}
                content={
                  <>
                    <Icon name="book" type="material-community" color="white" />
                    <ListItem.Content>
                      <ListItem.Title onLongPress={handleLongPressTitle}>
                        {item?.Title}
                      </ListItem.Title>
                      <ListItem.Subtitle>{item?.Author}</ListItem.Subtitle>
                    </ListItem.Content>
                  </>
                }
              >
                <ListItem
                  containerStyle={{ backgroundColor: "grey", marginBottom: 8 }}
                >
                  <ListItem.Content>
                    <ListItem.Subtitle>
                      Material Type: {item?.MaterialType}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      Publication Year: {item?.YearOfPublication}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      Edition: {item?.Edition}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>
                      Copies on Order: {item?.CopiesOnOrder}
                    </ListItem.Subtitle>
                    <ListItem.Subtitle>ISBN: {item?.ISBN}</ListItem.Subtitle>
                    <ListItem.Subtitle>
                      Call Number: {item?.CallNumber}
                    </ListItem.Subtitle>
                    <Icon
                      name="book"
                      type="material-community"
                      color="white"
                      onPress={() =>
                        navigation.navigate("Map Screen", { book: item })
                      }
                    />
                  </ListItem.Content>
                </ListItem>
              </ListItem.Accordion>
            </View>
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
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
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
