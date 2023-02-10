import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import InfoScreen from "./screens/InfoScreen";
import BookSearchScreen from "./screens/BookSearchScreen";
import NewBookSearchScreen from "./screens/NewBookSearchScreen";
import CoffeeBreakEntranceScreen from "./screens/CoffeeBreakEntranceScreen";
import CoffeeBreakRooftopScreen from "./screens/CoffeeBreakRooftopScreen";
import LibraryExitScreen from "./screens/LibraryExitScreen";
import RoomSearchScreen from "./screens/RoomSearchScreen";
import StationaryStoreScreen from "./screens/StationaryStoreScreen";

const Tabs = createBottomTabNavigator();

const homeName = "Home";
const infoName = "Info";
const searchBookName = "Search a Book";
const coffeeBreakEntranceName = "CoffeeBreak at the Entrance";
const coffeeBreakRooftopName = "CoffeeBreak at the Rooftop";
const libraryExitName = "Exit the Library";
const searchRoomName = "Search a Room";
const stationaryStoreName = "Stationary Store";

const Navbar = () => {
  return (
    <Tabs.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          switch (rn) {
            case homeName:
              iconName = focused ? "home" : "home-outline";
              break;
            case infoName:
              iconName = focused ? "help-circle" : "help-circle-outline";
              break;
            default:
              iconName = "home";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { position: "absolute" },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarStyle: [
          {
            display: "flex",
            backgroundColor: "#5A6EE1",
          },
          null,
        ],
      })}
    >
      <Tabs.Screen name={homeName} component={HomeScreen} />
      <Tabs.Screen name={infoName} component={InfoScreen} />
      <Tabs.Screen
        name={searchBookName}
        component={NewBookSearchScreen}
        options={{
          tabBarButton: () => null, //like this
        }}
      />
      <Tabs.Screen
        name={coffeeBreakEntranceName}
        component={CoffeeBreakEntranceScreen}
        options={{
          tabBarButton: () => null, //like this
        }}
      />
      <Tabs.Screen
        name={coffeeBreakRooftopName}
        component={CoffeeBreakRooftopScreen}
        options={{
          tabBarButton: () => null, //like this
        }}
      />
      <Tabs.Screen
        name={libraryExitName}
        component={LibraryExitScreen}
        options={{
          tabBarButton: () => null, //like this
        }}
      />
      <Tabs.Screen
        name={searchRoomName}
        component={BookSearchScreen}
        options={{
          tabBarButton: () => null, //like this
        }}
      />
      <Tabs.Screen
        name={stationaryStoreName}
        component={StationaryStoreScreen}
        options={{
          tabBarButton: () => null, //like this
        }}
      />
    </Tabs.Navigator>
  );
};

export default Navbar;
