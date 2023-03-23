import { View, Text } from "react-native";
import React from "react";
import scan from "../../services/BLE.js";
import { useEffect } from "react";

const CoffeeBreakRooftopScreen = () => {
  useEffect(() => {
    // Update the document title using the browser API
    console.log("boo"); 
    scan();
  }, []);
  return (
    <View>
      <Text>CoffeeBreakRooftopScreen</Text>
    </View>
  );
};

export default CoffeeBreakRooftopScreen;
