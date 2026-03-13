import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import CheckInScreen from "./screens/CheckInScreen";
import FinishClassScreen from "./screens/FinishClassScreen";
import HistoryScreen from "./screens/HistoryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: { backgroundColor: "#1E3A8A" }, // Academic Navy
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }} // No header on welcome screen
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Smart Check-in Dashboard" }}
        />
        <Stack.Screen
          name="CheckIn"
          component={CheckInScreen}
          options={{ title: "Class Check-in" }}
        />
        <Stack.Screen
          name="FinishClass"
          component={FinishClassScreen}
          options={{ title: "Finish Class" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ title: "My Records" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
