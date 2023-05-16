class MeasurementLog {
  constructor(time, rssi) {
    this.time = time;
    this.rssi = rssi;
  }
}

BeaconInitInformation = [
  {
    id: "F7:42:89:CC:3F:A7",
    unityId: 0,
    name: "Beacon 1",
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
        log: [],
        current: null,
        active: false,
      };
    });

    this.setUnityFunction = (inputFunction) => {
      this.updateUnityFunction = inputFunction;
    }

    this.addBeaconData = (beacon, rssi) => {
      if (!(beacon in this.BeaconData)) 
        return;

      let measuredBeacon = this.BeaconData[beacon];
      let measurement = new MeasurementLog(new Date(), rssi);

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

      beaconDataManager.sendUnityData();

      // When beacon data is added, we would like to send a message to Unity.
    };

    this.getBeaconData = (beacon) => {
      if (beacon in this.BeaconData) {
        return this.BeaconData[beacon];
      }
    };

    this.getTwoLargestMeasurements = () => {
      let largestBeacons = [null, null];
      let largestRSSIs = [-Infinity, -Infinity];

      BeaconInitInformation.forEach((beaconInfo) => {
        const beaconData = this.BeaconData[beaconInfo.id];

        beaconData.log.forEach((measurement) => {
          if (measurement.rssi > largestRSSIs[0]) {
            // This measurement is larger than both of the current largest
            largestRSSIs[1] = largestRSSIs[0];
            largestBeacons[1] = largestBeacons[0];

            largestRSSIs[0] = measurement.rssi;
            largestBeacons[0] = beaconInfo;
          } else if (measurement.rssi > largestRSSIs[1]) {
            // This measurement is only larger than the second largest
            largestRSSIs[1] = measurement.rssi;
            largestBeacons[1] = beaconInfo;
          }
        });
      });

      if(largestBeacons[0] && largestBeacons[1]) {
        const ratioOfMeasurements = largestRSSIs[0] / largestRSSIs[1];
        return `${largestBeacons[0].unityId},${largestBeacons[1].unityId},${ratioOfMeasurements}`;
      } else {
        return null;
      }
    }

    this.sendUnityData = () => {
      if(this.updateUnityFunction) {
        this.updateUnityFunction("BeaconManager", "BeaconManager", getTwoLargestMeasurements())
      }
    }
  }
}

function calculateCurrentValue(oldMeasurement, newMeasurement) {
  let weight = measurementWeight(newMeasurement.time, oldMeasurement.time);
  let newRSSI = newMeasurement.rssi * weight + oldMeasurement.rssi * (1 - weight);
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
