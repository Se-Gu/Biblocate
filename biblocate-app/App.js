import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tabs = createBottomTabNavigator();

const homeName = "Home";
const searchBooksName = "Search Books";
const settingsName = "Settings";

export default function App() {
  return (
    <NavigationContainer>
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
              case searchBooksName:
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
        <Tabs.Screen name={searchBooksName} component={SearchScreen} />
        <Tabs.Screen name={settingsName} component={SettingsScreen} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
