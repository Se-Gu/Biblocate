import { View, Text } from "react-native";
import React from "react";
import BookSearchScreen from "./BookSearchScreen";
import Unity from "../../services/Unity";

const InfoScreen = () => {
  return (
    <View>
      <Text>InfoScreen</Text>
      <Unity/>
    </View>
  );
};

export default InfoScreen;
