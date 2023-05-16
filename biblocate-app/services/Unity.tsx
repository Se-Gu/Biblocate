import React, { useRef, useEffect } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { View, Text } from 'react-native';
import BeaconScanner from './BeaconScanner'

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

const Unity = () => {
  const unityRef = useRef<UnityView>(null);

  const { requestPermissions, scanForPeripherals, setUnityFunction} = BeaconScanner();

  const scanForDevices = () => {
    console.log("scanForDevices is called");
    requestPermissions((isGranted) => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  useEffect(() => {
    if (unityRef?.current) {
      const message: IMessage = {
        gameObject: 'gameObject',
        methodName: 'methodName',
        message: 'message',
      };
      unityRef.current.postMessage(message.gameObject, message.methodName, message.message);
      setUnityFunction(unityRef.current.postMessage);
      scanForDevices();
    }
  }, []);

  return (
    <View>
      <Text style={{backgroundColor: "blue"}}>Hey</Text>
      <UnityView
        ref={unityRef}
        style={{backgroundColor: "blue", height: "100%", width: "100%"}}
        onUnityMessage={(result) => {
          console.log('onUnityMessage', result.nativeEvent.message)
        }}
      />
    </View>
  );
};

export default Unity;
