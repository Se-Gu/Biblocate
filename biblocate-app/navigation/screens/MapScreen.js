import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import BookSearchScreen from "./BookSearchScreen";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-native-paper";
import { color } from "react-native-reanimated";

const MapScreen = ({ route, navigation }) => {
  console.log(route?.params?.book?.CallNumber);
  const dummyCN = "a1";

  const [img, setImg] = useState(null);

  const [aspectRatio, setAspectRatio] = useState(null);

  const handleImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    const imageAspectRatio = width / height;
    setAspectRatio(imageAspectRatio);
  }

  useEffect(() => {
    axios
    .get(
      `https://biblocate.azurewebsites.net/api/Shelves/39`
    )
    .then(function (response) {
      setImg(response?.data?.Left_Image);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return (
    <View>
      <Button onPress={() => navigation.navigate("Search a Book")}>
        Go Back
      </Button>
      {/* <Text>MapScreen</Text> */}
      <View style={{}}>
        <Image source={{ uri: 'data:image/jpeg;base64,' + img }} 
          style={{
            aspectRatio: aspectRatio,
            width: "100%",
            backgroundColor: "blue"
          }}
          resizeMode="contain"
          onLoad={handleImageLoad}
        />
        <Button onPress={() => navigation.navigate("Nav Screen")} style={{backgroundColor: "purple"}}>
          <Text style={{color: "white"}}>
            Navigate to Book
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default MapScreen;
