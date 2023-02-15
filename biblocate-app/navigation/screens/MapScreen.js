import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import BookSearchScreen from "./BookSearchScreen";
import { useEffect } from "react";
import { Button } from "react-native-paper";

const PaintedImage = () => {
  return (
    <View style={{ position: "relative", flexDirection: "row" }}>
      <Image
        source={require("biblocate-app/assets/img/rooms/ARTROOM.jpg")}
        style={{
          flex: 1,
          aspectRatio: (2892 / 2223)
        }}
      />
      <View
        style={{
          backgroundColor: "blue",
          width: (84 * 100 / 2892) + "%",
          aspectRatio: 84 / 452,
          position: "absolute",
          top: 146 * Dimensions.get('window').width / 2892, 
          left: (946 * 100 / 2892) + "%",
          zIndex: 1,
        }}
      ></View>
    </View>
  );
};

const MapScreen = ({ route, navigation }) => {
  console.log(route?.params?.book?.CallNumber);
  return (
    <View>
      <Button onPress={() => navigation.navigate("Search a Book")}>
        Go Back
      </Button>
      <Text>MapScreen</Text>
      <View>
        <PaintedImage />
      </View>
    </View>
  );
};

export default MapScreen;
