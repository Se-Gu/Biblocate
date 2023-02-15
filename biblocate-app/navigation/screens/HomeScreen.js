import { View, StyleSheet, Image } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";

const StyledButton = ({ title, onPress, color }) => {
  return (
    <Button
      radius={"lg"}
      size="lg"
      containerStyle={{ width: "44%", height: "100%" }}
      buttonStyle={{ height: "100%", opacity: 1 }}
      raised
      title={title}
      onPress={onPress}
      color={color}
    />
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Image
        source={require("biblocate-app/assets/img/bilkent-library.png")}
        style={{ opacity: 1, height: "35%" }}
      />
      <View style={{ height: "65%", backgroundColor: "#5A6EE1" }}>
        <View style={styles.container}>
          <StyledButton
            title="Search a Book"
            onPress={() => navigation.navigate("Search a Book")}
          />
          <StyledButton
            title="Search a Room"
            onPress={() => navigation.navigate("Search a Room")}
          />
        </View>
        <View style={styles.container}>
          <StyledButton
            title="Stationary Store"
            onPress={() => navigation.navigate("Stationary Store")}
          />
          <StyledButton
            title="CoffeeBreak at the Entrance"
            onPress={() => navigation.navigate("CoffeeBreak at the Entrance")}
          />
        </View>
        <View style={styles.container}>
          <StyledButton
            title="CoffeeBreak at the Rooftop"
            onPress={() => navigation.navigate("CoffeeBreak at the Rooftop")}
          />
          <StyledButton
            color="error"
            title="Exit the Library"
            onPress={() => navigation.navigate("Exit the Library")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default HomeScreen;
