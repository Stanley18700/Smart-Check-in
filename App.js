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
          headerStyle: { backgroundColor: "#1E3A8A", elevation: 0, shadowOpacity: 0 },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "800", fontSize: 18 },
          headerBackTitle: "Back", // Show "Back" text explicitly
          headerBackTitleVisible: true,
          headerLeftContainerStyle: { paddingLeft: 8 },
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
          options={{
            title: "Smart Check-in Dashboard",
            headerLeft: () => null, // Lock user in dashboard so they can't go back to Welcome
            gestureEnabled: false, // Prevent swipe back on iOS
          }}
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
