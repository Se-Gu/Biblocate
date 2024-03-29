import React, { useRef, useEffect, useCallback, useState, useImperativeHandle, forwardRef } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { View, Text } from 'react-native';
import BeaconScanner from './BeaconScanner'
import { Button } from 'react-native-paper';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

const Unity = () => {
  const unityRef = useRef<UnityView>(null);

  const { requestPermissions, scanForPeripherals, setUnityFunction } = BeaconScanner();

  const scanForDevices = () => {
    console.log("scanForDevices is called");
    requestPermissions((isGranted) => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  const logMessageInUnity = useCallback((message) => {
    if (unityRef?.current) {
      console.log(message)
      unityRef.current.postMessage("BeaconManager", "SendData", message);
    }
  }, []);

  useEffect(() => {
    if (unityRef?.current) {
      const message: IMessage = {
        gameObject: 'BeaconManager',
        methodName: 'SendData',
        message: '0,1,10',
      };
      unityRef.current.postMessage(message.gameObject, message.methodName, message.message);
      setUnityFunction(logMessageInUnity);
      scanForDevices();
    }
  }, []);

  const handlePress = () => {
    const randomNumber = Math.floor(Math.random() * 101);
    const message: IMessage = {
      gameObject: 'BeaconManager',
      methodName: 'SendData',
      message: '0,1,' + randomNumber,
    };
    unityRef.current.postMessage(message.gameObject, message.methodName, message.message);
  };

  return (
    <View>
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
