import {
  View,
  SafeAreaView,
  ScrollView,
  Keyboard,
  Button,
  Text,
} from "react-native";
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
import { Card, Title } from "react-native-paper";
import axios from "axios";

const BookSearchScreen = () => {
  const [clicked, setClicked] = useState(true);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [details, setDetails] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [responseText, setResponseText] = useState("nothing");

  // axios
  //   .get(
  //     "http://139.179.30.27:8080/symws/rest/standard/searchInfoDesk?clientID=SymWSTestClient&customInfoDesk=CALD&json=true&prettyprint=true"
  //   )
  //   .then(function (response) {
  //     setResponseText(JSON.stringify(response.data.HitlistTitleInfo));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  axios
    .get("https://192.168.1.8:8082/api/Books")
    .then(function (response) {
      setResponseText(JSON.stringify(response.data.HitlistTitleInfo));
    })
    .catch(function (error) {
      console.log(error);
    });

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
              <Card>
                <Text>{responseText}</Text>
              </Card>
            </ScrollView>
          </Animated.View>
        </View>
      )}
    </Animated.View>
  );
};

export default BookSearchScreen;
