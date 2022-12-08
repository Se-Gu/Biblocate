import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View>
      <Image
        source={require("biblocate-app/assets/img/bilkent-library.png")}
        style={{ opacity: 0.7 }}
      />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
