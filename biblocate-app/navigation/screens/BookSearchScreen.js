import { View, SafeAreaView, ScrollView, Keyboard, Button } from "react-native";
import React, { useState } from "react";
import BookList from "../../components/BookList";
import SearchBar from "../../components/SearchBar";
import Animated, {
  FadeInUp,
  FadeInDown,
  Easing,
  Layout,
} from "react-native-reanimated";
import AdvancedSearch from "../../components/AdvancedSearch";
import { Title } from "react-native-paper";

const BookSearchScreen = () => {
  const [clicked, setClicked] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [details, setDetails] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);

  return (
    <Animated.View
      layout={Layout.duration(400).easing(Easing.out(Easing.poly(3)))}
    >
      {advancedSearch ? (
        <AdvancedSearch
          advancedSearch={advancedSearch}
          setAdvancedSearch={setAdvancedSearch}
        />
      ) : (
        <View>
          <Button
            onPress={() => {
              setAdvancedSearch(!advancedSearch);
              console.log(advancedSearch);
            }}
            title="Advanced"
          />
          <SearchBar
            clicked={clicked}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            setClicked={setClicked}
            setDetails={setDetails}
          />
          <Animated.View
            layout={FadeInUp.duration(400).easing(Easing.out(Easing.poly(3)))}
          >
            <ScrollView
              style={{ marginBottom: 290 }}
              onScrollBeginDrag={() => {
                Keyboard.dismiss();
              }}
              keyboardShouldPersistTaps="handled"
            >
              <BookList details={details} setDetails={setDetails}></BookList>
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </Animated.View>
  );
};

export default BookSearchScreen;
