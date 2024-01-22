import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { getItem } from "../../utils/asyncStorage";
import AddChatRoom from "../screens/AddChatRoom";
import ChatScreen from "../screens/ChatScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import StaffDetailsScreen from "../screens/StaffDetailsScreen";
const Stack = createStackNavigator();
const AppNavigation = () => {
  const [showonboarding, setShowonboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);
  const checkIfAlreadyOnboarded = async () => {
    let onboared = await getItem("onboarded");
    console.log(onboared);
    if (onboared == 1) {
      // already onboarded
      setShowonboarding(false);
    } else {
      // has not onboarded
      setShowonboarding(true);
    }
  };
  if (showonboarding == null) return null;
  if (showonboarding) {
    return (
      <Stack.Navigator initialRouteName="OnboardingScreen">
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AddChatRoom" component={AddChatRoom} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="StaffDetails"
          component={StaffDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChatRoom" component={AddChatRoom} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="StaffDetails"
          component={StaffDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }
};

export default AppNavigation;
