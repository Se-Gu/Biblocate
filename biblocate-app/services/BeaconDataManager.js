class MeasurementLog {
  constructor(time, rssi) {
    this.time = time;
    this.rssi = rssi;
  }
}

class BeaconDataManager {
  constructor() {
    this.BeaconData = {
      "F7:42:89:4B:B9:AA": {
        name: "Beacon 1",
        log: [],
      },
    };

    this.addBeaconData = (beacon, rssi) => {
      if (beacon in this.BeaconData) {
        var measurement = new MeasurementLog(new Date(), rssi);
        this.BeaconData[beacon].log.unshift(measurement);
        console.log(
          this.BeaconData[beacon].name,
          " -- RSSI: ",
          measurement.rssi,
          " time: ",
          measurement.time
        );
      } else {
      }
    };

    this.getBeaconData = (beacon) => {
      // Check if any of the active beacons has expired
      // If yes, remove it from the list

      if (beacon in this.BeaconData) {
        return this.BeaconData[beacon];
      }
    };
  }
}
export default BeaconDataManager;
