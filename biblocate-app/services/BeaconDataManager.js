class MeasurementLog {
  constructor(time, rssi) {
    this.time = time;
    this.rssi = rssi;
  }
}

BeaconInitInformation = [
  {
    id: "F7:42:89:CC:3F:A7",
    name: "Beacon 1",
    location: {
      x: 0,
      y: 0,
      area: "1",
    },
  },
];

const dataExpirationTime = 5000; // 5 seconds
const minMeasurementWeight = 0.3;

class BeaconDataManager {
  constructor() {
    this.BeaconData = {};

    BeaconInitInformation.forEach((element) => {
      this.BeaconData[element.id] = {
        name: element.name,
        location: element.location,
        log: [],
        current: null,
        active: false,
      };
    });

    this.addBeaconData = (beacon, rssi) => {
      if (beacon in this.BeaconData) {
        var measuredBeacon = this.BeaconData[beacon];
        var measurement = new MeasurementLog(new Date(), rssi);
        /*
        measuredBeacon.log.unshift(measurement);
        */
        /*
        console.log(
          measuredBeacon.name,
          " -- RSSI: ",
          measurement.rssi,
          " time: ",
          measurement.time
        );
        */

        if (!measuredBeacon.active) {
          measuredBeacon.active = true;
          measuredBeacon.current = measurement;
        } else {
          measuredBeacon.current = calculateCurrentValue(
            (oldMeasurement = measuredBeacon.current),
            (newMeasurement = measurement)
          );
          console.log("Current beacon value: ", measuredBeacon.current.rssi);
        }
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

function calculateCurrentValue(oldMeasurement, newMeasurement) {
  var weight = measurementWeight(newMeasurement.time, oldMeasurement.time);
  var newRSSI =
    newMeasurement.rssi * weight + oldMeasurement.rssi * (1 - weight);
  newMeasurement.rssi = newRSSI;
  //console.log("weight: ", weight);
  return newMeasurement;
}

function measurementWeight(newTime, oldTime) {
  //console.log("new time - old time:", newTime - oldTime);
  return (
    ((1 - minMeasurementWeight) / dataExpirationTime) * (newTime - oldTime) +
    minMeasurementWeight
  );
}

export default BeaconDataManager;
