import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useEffect, useState, useCallback, useRef } from "react";
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
        setIsUnityVisible(false);
      };
    }, [])
  );

  return (
    <View>
      <Button onPress={() => navigation.navigate("Map Screen")}>
        Go Back
      </Button>
      {isUnityVisible && <Unity/>}
    </View>
  );
};

export default NavScreen;
