import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/InfoScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import InfoScreen from "./screens/InfoScreen";

const Tabs = createBottomTabNavigator();

const homeName = "Home";
const infoName = "Info";

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
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 10,
        },
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      })}
    >
      <Tabs.Screen name={homeName} component={HomeScreen} />
      <Tabs.Screen name={infoName} component={InfoScreen} />
    </Tabs.Navigator>
  );
};

export default Navbar;
