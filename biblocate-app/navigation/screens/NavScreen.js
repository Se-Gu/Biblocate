import { View, Text } from "react-native";
import { useEffect, useState, useCallback, useRef } from "react";
import BookSearchScreen from "./BookSearchScreen";
import Unity from "../../services/Unity";
import { useFocusEffect } from '@react-navigation/native';


const NavScreen = ({navigation}) => {
  const unityRef = useRef(null);
  const [isUnityVisible, setIsUnityVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // This is called when the screen comes into focus
      setIsUnityVisible(true);

      return () => {
        // This is called when the screen goes out of focus
        setIsUnityVisible(false);
        // Unload unity when the screen goes out of focus
        if (unityRef.current) {
          unityRef.current.unloadUnity();
        }
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {isUnityVisible && <Unity ref={unityRef} />}
    </View>
  );
};

export default NavScreen;
