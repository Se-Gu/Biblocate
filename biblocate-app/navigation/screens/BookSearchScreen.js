import {
    View,
    SafeAreaView,
    ScrollView,
    Keyboard,
  } from "react-native";
  import React, { useState } from "react";
  import BookList from "../../components/BookList";
  import SearchBar from "../../components/SearchBar";
  import Animated, {
    FadeInUp,
    Easing,
  } from "react-native-reanimated";
  
  const BookSearchScreen = () => {
    const [clicked, setClicked] = useState(true);
    const [searchPhrase, setSearchPhrase] = useState("");
    const [details, setDetails] = useState(false);
  
    return (
      <SafeAreaView>
        <Animated.View
          layout={FadeInUp.duration(400).easing(Easing.out(Easing.poly(3)))}
        > 
            <SearchBar
            clicked={clicked}
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            setClicked={setClicked}
            setDetails={setDetails}
            ></SearchBar>
        </Animated.View>
        <ScrollView
        onScrollBeginDrag={() => {
            Keyboard.dismiss();
        }}
        keyboardShouldPersistTaps="handled"
        >
            <BookList
                details={details}
                setDetails={setDetails}
            ></BookList>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default BookSearchScreen;
  