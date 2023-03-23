import { View, Text } from "react-native";
import React from "react";
import Scan from "../../services/BLE-test-2.js";

const CoffeeBreakEntranceScreen = () => {
  return (
    <View>
      <Text>CoffeeBreakEntranceScreen</Text>
      <Scan />
    </View>
  );
};

export default CoffeeBreakEntranceScreen;
