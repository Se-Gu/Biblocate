import { View, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import BookSearchScreen from "./BookSearchScreen";
import Unity from "../../services/Unity";
import { useFocusEffect } from '@react-navigation/native';


const NavScreen = ({navigation}) => {
  const [isUnityVisible, setIsUnityVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // This is called when the screen comes into focus
      setIsUnityVisible(true);

      return () => {
        // This is called when the screen goes out of focus
        setIsUnityVisible(false);
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {isUnityVisible && <Unity />}
    </View>
  );
};

export default NavScreen;
