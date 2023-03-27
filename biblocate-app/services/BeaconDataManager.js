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
        this.BeaconData[beacon].log.push(measurement);
        console.log(measurement.time, " ", measurement.rssi);
      } else {
      }
    };

    this.getBeaconData = (beacon) => {
      // Check if any of the active beacons has expired
      if (beacon in this.BeaconData) {
        return this.BeaconData[beacon];
      }
    };
  }
}
export default BeaconDataManager;
