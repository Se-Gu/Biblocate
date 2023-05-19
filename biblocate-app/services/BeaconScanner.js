/* eslint-disable no-bitwise */
import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, ScanMode } from "react-native-ble-plx";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";
import DeviceInfo from "react-native-device-info";
import BeaconDataManager from "./BeaconDataManager";

const bleManager = new BleManager();
const distanceBuffer = [-1, -1, -1];
let numOfSamples = 0;

function BeaconScanner() {
  // const [distance, setDistance] = useState(-1);
  const beaconDataManager = new BeaconDataManager();

  const setUnityFunction = (inputFunction) => {
    beaconDataManager.setUnityFunction(inputFunction);
  }

  const requestPermissions = async (cb) => {
    if (Platform.OS === "android") {
      const apiLevel = await DeviceInfo.getApiLevel();

      console.log("asking for permissions");
      if (apiLevel < 31) {
        console.log("api level < 31");
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonNeutral: "Ask Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        cb(granted === PermissionsAndroid.RESULTS.GRANTED);
        console.log(
          "Permissions are granted: ",
          granted === PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        console.log("api level >= 31");
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ]);

        const isGranted =
          result["android.permission.BLUETOOTH_CONNECT"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.BLUETOOTH_SCAN"] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          result["android.permission.ACCESS_FINE_LOCATION"] ===
            PermissionsAndroid.RESULTS.GRANTED;

        console.log("Permissions are granted: ", isGranted);
        cb(isGranted);
      }
    } else {
      cb(true);
    }
  };

  const scanForPeripherals = () => {
    bleManager.startDeviceScan(
      null,
      {
        allowDuplicates: true,
        scanMode: ScanMode.LowLatency,
      },
      (error, device) => {
        beaconDataManager.addBeaconData(device.id, device.rssi);
      }
    );
  }

  return {
    scanForPeripherals,
    requestPermissions,
    setUnityFunction,
  };
}

export default BeaconScanner;
