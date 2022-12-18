import { View, Text, Image, Button } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Image
        source={require("biblocate-app/assets/img/bilkent-library.png")}
        style={{ opacity: 0.7 }}
      />
      <Text>HomeScreen</Text>
      <Button
        title="Search a Book"
        onPress={() => navigation.navigate("Search a Book")}
      />
      <Button
        title="Search a Room"
        onPress={() => navigation.navigate("Search a Room")}
      />
      <Button
        title="Stationary Store"
        onPress={() => navigation.navigate("Stationary Store")}
      />
      <Button
        title="CoffeeBreak at the Entrance"
        onPress={() => navigation.navigate("CoffeeBreak at the Entrance")}
      />
      <Button
        title="CoffeeBreak at the Rooftop"
        onPress={() => navigation.navigate("CoffeeBreak at the Rooftop")}
      />
      <Button
        title="Exit the Library"
        onPress={() => navigation.navigate("Exit the Library")}
      />
    </View>
  );
};

export default HomeScreen;
