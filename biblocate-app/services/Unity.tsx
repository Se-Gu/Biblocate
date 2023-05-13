import React, { useRef, useEffect } from 'react';
import UnityView from '@azesmway/react-native-unity';
import { View, Text } from 'react-native';

interface IMessage {
  gameObject: string;
  methodName: string;
  message: string;
}

const Unity = () => {
  const unityRef = useRef<UnityView>(null);

  useEffect(() => {
    if (unityRef?.current) {
      const message: IMessage = {
        gameObject: 'gameObject',
        methodName: 'methodName',
        message: 'message',
      };
      unityRef.current.postMessage(message.gameObject, message.methodName, message.message);
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