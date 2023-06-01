import React from "react";
import BeaconScanner from "../../services/BeaconScanner";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const StationaryStoreScreen = () => {
  // const { requestPermissions, scanForPeripherals, distance } = BeaconScanner();

  // const scanForDevices = () => {
  //   console.log("scanForDevices is called");
  //   requestPermissions((isGranted) => {
  //     if (isGranted) {
  //       scanForPeripherals();
  //     }
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        <Text style={{ fontSize: 50, color: "black" }}>Meters</Text>
      </View>
      {/* <TouchableOpacity onPress={scanForDevices} style={styles.ctaButton}> */}
      {/*   <Text style={styles.ctaButtonText}>FIND THE DISTANCE</Text> */}
      {/* </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "purple",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default StationaryStoreScreen;
