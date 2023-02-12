import { View, Text, Image } from "react-native";
import React from "react";
import BookSearchScreen from "./BookSearchScreen";
import { useEffect } from "react";
import { Button } from "react-native-paper";

const PaintedImage = () => {
  return (
    <View style={{ transform: [{ scale: 0.3 }], backgroundColor: "green" }}>
      <Image
        source={require("biblocate-app/assets/img/rooms/ARTROOM.jpg")}
        style={{
          resizeMode: "stretch",
          marginTop: "50%",
        }}
      />
      <View
        style={{
          backgroundColor: "blue",
          width: 10,
          height: 50,
          position: "absolute",
          top: 0,
          left: 50,
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
