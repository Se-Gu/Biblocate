import { View, Text, Image } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-native-paper";

const MapScreen = ({ route, navigation }) => {

  const [shelf, setShelf] = useState(null);

  const [aspectRatio, setAspectRatio] = useState(null);

  const handleImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    const imageAspectRatio = width / height;
    setAspectRatio(imageAspectRatio);
  }

  
  useEffect(() => {
    axios
    .get(
      `https://biblocate.azurewebsites.net/api/Shelves/FindShelf/`+route?.params?.book?.CallNumber
    )
    .then(function (response) {
      setShelf(response?.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [route?.params?.book?.CallNumber])

  return (
    <View>
      <Button onPress={() => navigation.navigate("Search a Book")}>
        Go Back
      </Button>
      {/* <Text>MapScreen</Text> */}
      {shelf && 
        <View style={{}}>
          <Image source={{ uri: 'data:image/jpeg;base64,' + shelf.Image }} 
            style={{
              aspectRatio: aspectRatio,
              width: "100%",
              backgroundColor: "blue"
            }}
            resizeMode="contain"
            onLoad={handleImageLoad}
          />
          <Text>This item is in the following Collection: {shelf.RoomName}</Text>
          <Text>Look for this item: {route?.params?.book?.CallNumber}</Text>
          <Button onPress={() => navigation.navigate("Nav Screen")} style={{backgroundColor: "purple"}}>
            <Text style={{color: "white"}}>
              Navigate to Room
            </Text>
          </Button>
        </View>
    }
    </View>
  );
};

export default MapScreen;
