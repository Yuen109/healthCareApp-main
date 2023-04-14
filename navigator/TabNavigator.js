import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { Entypo } from "@expo/vector-icons";
import CustomersScreen from "../src/screens/CustomersScreen";
import MenuScreen from "../src/screens/MenuScreen";
import CommunityScreen from "../src/screens/CommunityScreen";
import Dashboard from "../src/screens/DashboardScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // tabBarActiveTinColor: "#EB6A7C",
        // tabBarInactiveTintColor: "Gray",
        tabBarIcon: ({ focused }) => {
          if (route.name === "Menu") {
            return (
              <Icon
                name="text"
                type="entypo"
                color={focused ? "#8FBAF3" : "gray"}
              />
            );
          } else if (route.name === "Dashboard") {
            return (
              <Icon
                name="home"
                type="entypo"
                color={focused ? "#8FBAF3" : "gary"}
              />
            );
          } else if (route.name === "Customers") {
            return (
              <Icon
                name="users"
                type="entypo"
                color={focused ? "#8FBAF3" : "gary"}
              />
            );
          } else {
            return (
              <Icon
                name="chat"
                type="entypo"
                color={focused ? "#8FBAF3" : "gary"}
              />
            );
          }
        },
      })}
    >
      {/* Show taps bar */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Entypo
              onPress={() => navigation.navigate("Create New Topic")}
              name="plus"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Customer Expenditure"
        component={CustomersScreen}
        // options={{ headerShown: false }}
      />
      <Tab.Screen name="Menu" component={MenuScreen} />
      {/* <Tab.Screen name='Chat' component={ChartScreen} options={{headerShown: false}}/> */}
    </Tab.Navigator>
  );
};

export default TabNavigator;
