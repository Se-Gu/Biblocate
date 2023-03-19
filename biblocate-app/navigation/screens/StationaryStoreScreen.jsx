import { View, Text } from "react-native";
import React from "react";

const StationaryStoreScreen = () => {
  return (
    <View>
      <Text>StationaryStoreScreen</Text>

      <Button
        onPress={CreateBluetooth}
        title="Create bluetooth"
        color="#841584"
        accessibilityLabel="Create bluetooth"
      />
    </View>
  );
};

async function CreateBluetooth() {
  var { createBluetooth } = require("node-ble");
  var { bluetooth, destroy } = createBluetooth();
  var adapter = await bluetooth.defaultAdapter();
  if (!(await adapter.isDiscovering())) {
    await adapter.startDiscovery();
  }

  console.log(adapter.devices());
  await delay(1000);
  console.log(adapter.devices());
  await delay(1000);
  console.log(adapter.devices());
  await delay(1000);
  console.log(adapter.devices());
  await delay(1000);
  console.log(adapter.devices());
  await delay(1000);
  console.log(adapter.devices());
  await delay(1000);
  console.log(adapter.devices());
  await delay(1000);
  console.log(adapter.devices());
  await delay(1000);

  //const device = await adapter.waitDevice("00:00:00:00:00:00");
  //await device.connect();
  //const gattServer = await device.gatt();
}

export default StationaryStoreScreen;
