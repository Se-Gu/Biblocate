import BeaconConfig from './BeaconConfig';

const dataExpirationTime = 5000; // 5 seconds
const minMeasurementWeight = 0.3;

class MeasurementLog {
  constructor(time, rssi) {
    this.time = time;
    this.rssi = rssi;
  }
}

class BeaconDataManager {
  constructor() {
    this.BeaconData = {};

    BeaconConfig.forEach((element) => {
      this.BeaconData[element.id] = {
        name: element.name,
        log: [],
        current: null,
        active: false,
        unityId: element.unityId
      };
    });
  }

  setUnityFunction (inputFunction) {
    this.updateUnityFunction = inputFunction;
  }

  addBeaconData (beacon, rssi) {
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
      console.log(`Current beacon value: ${measuredBeacon.current.rssi} Name: ${measuredBeacon.unityId}`);
    }

    this.sendUnityData();

    // When beacon data is added, we would like to send a message to Unity.
  }

  getBeaconData (beacon) {
    if (beacon in this.BeaconData) {
      return this.BeaconData[beacon];
    }
  }

  getTwoLargestMeasurements () {
    let largestBeacons = [null, null];
    let largestRSSIs = [-Infinity, -Infinity];

    //console.log("this.bd" + JSON.stringify(this.BeaconData));

    Object.values(this.BeaconData).filter((beaconData) => beaconData.active).forEach((beaconData) => {
      //const beaconData = this.BeaconData[beaconInfo.id];
        //console.log("bd:" + JSON.stringify(beaconData));
        if (beaconData.current.rssi > largestRSSIs[0]) {
          // This measurement is larger than both of the current largest
          largestRSSIs[1] = largestRSSIs[0];
          largestBeacons[1] = largestBeacons[0];

          largestRSSIs[0] = beaconData.current.rssi;
          largestBeacons[0] = beaconData;
        } else if (beaconData.current.rssi > largestRSSIs[1]) {
          // This measurement is only larger than the second largest
          largestRSSIs[1] = beaconData.current.rssi;
          largestBeacons[1] = beaconData;
        }
    });

    if(largestBeacons[0] && largestBeacons[1]) {
      const ratio = largestRSSIs[1] / largestRSSIs[0];
      console.log(`Ratio: ${ratio}`);
      const calculation = 166 * Math.log10(2 * ratio);
      console.log(`Calculation: ${calculation}`);
      const ratioOfMeasurements = calculation < 100 ? Math.floor(calculation) : 100;
      return `${largestBeacons[1].unityId},${largestBeacons[0].unityId},${ratioOfMeasurements}`;
    } else {
      return null;
    }
  }

  sendUnityData () {
    if(this.updateUnityFunction) {
      this.updateUnityFunction(this.getTwoLargestMeasurements())
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
