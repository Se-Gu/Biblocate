import React, { useState } from "react";
import { DeviceEventEmitter } from "react-native";
import Beacons from "react-native-beacons-manager";

export default function useScanner() {
  let [beacons, setBeacons] = useState(() => []);
  let [scanning, setScanning] = useState(() => true);
  let region = {
    identifier: "Dendrite",
    uuid: "d8881546-3ebd-11eb-a043-1f17d6b26b6b",
  };

  let updateBeacons = (data) => {
    console.log(data);
    setBeacons(() => data.beacons);
  };

  React.useEffect(() => {
    if (scanning) {
      console.log("scanning");
      DeviceEventEmitter.addListener("beaconsDidRange", updateBeacons);
      Beacons.detectIBeacons();

      Beacons.startRangingBeaconsInRegion(region)
        .then(() => console.log(`Beacons ranging started succesfully!`))
        .catch((e) =>
          console.error(`Beacons ranging not started, error: ${error}`)
        );
    } else {
      console.log("not scanning");
      /*
      DeviceEventEmitter.removeListener("beaconsDidRange", updateBeacons);
      Beacons.stopRangingBeaconsInRegion(region)
        .then(() => console.log(`Beacons ranging stopped succesfully!`))
        .then(() => Beacons.removeIBeaconsDetection())
        .catch((e) =>
          console.error(`Beacons ranging not stopped, error: ${e}`)
        );
        */
    }

    return () => {
      console.log("returning from scannin");
      /*
      DeviceEventEmitter.removeListener("beaconsDidRange", updateBeacons);
      return Beacons.stopRangingBeaconsInRegion(region)
        .then(() => console.log(`Beacons ranging stopped succesfully!`))
        .then(() => Beacons.removeIBeaconsDetection())
        .catch((e) =>
          console.error(`Beacons ranging not stopped, error: ${e}`)
        );
        */
    };
  }, [scanning]);

  return [beacons, scanning, setScanning];
}
