import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tabs = createBottomTabNavigator();

const homeName = "Home";
const searchName = "Search";
const settingsName = "Settings";

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
            case searchName:
              iconName = focused ? "search" : "search-outline";
              break;
            case settingsName:
              iconName = focused ? "settings" : "settings-outline";
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
      <Tabs.Screen name={searchName} component={SearchScreen} />
      <Tabs.Screen name={settingsName} component={SettingsScreen} />
    </Tabs.Navigator>
  );
};

export default Navbar;
