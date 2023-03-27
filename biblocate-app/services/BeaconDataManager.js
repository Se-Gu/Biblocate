class MeasurementLog {
  constructor(time, rssi) {
    this.time = time;
    this.rssi = rssi;
  }
}

BeaconInitInformation = [
  {
    id: "F7:42:89:4B:B9:AA",
    name: "Beacon 1",
    location: {
      x: 0,
      y: 0,
      area: "1",
    },
  },
];

class BeaconDataManager {
  constructor() {
    this.dataExpirationTime = 5000; // 5 seconds
    this.BeaconData = {};

    forEach((element) => {
      this.BeaconData[element.id] = {
        name: element.name,
        location: element.location,
        log: [],
        active: false,
      };
    });

    this.addBeaconData = (beacon, rssi) => {
      if (beacon in this.BeaconData) {
        var measuredBeacon = this.BeaconData[beacon];
        var measurement = new MeasurementLog(new Date(), rssi);
        measuredBeacon.log.unshift(measurement);
        measuredBeacon.active = true;
        console.log(
          measuredBeacon.name,
          " -- RSSI: ",
          measurement.rssi,
          " time: ",
          measurement.time
        );
      } else {
      }
    };

    this.getBeaconData = (beacon) => {
      if (beacon in this.BeaconData) {
        return this.BeaconData[beacon];
      }

      this.activateBeacon = (beacon) => {};
    };
  }
}

export default BeaconDataManager;
