import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'

async function scan(){
    // Tells the library to detect iBeacons
    Beacons.detectIBeacons()

    // Start detecting all iBeacons in the nearby
    try {
    await Beacons.startRangingBeaconsInRegion('REGION1')
    console.log(`Beacons ranging started succesfully!`)
    } catch (err) {
    console.log(`Beacons ranging not started, error: ${error}`)
    }

    // Print a log of the detected iBeacons (1 per second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
    console.log('Found beacons!', data.beacons)
    Beacons.stopRangingBeaconsInRegion('REGION1');
    })

};

export default scan;