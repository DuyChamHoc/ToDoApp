import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import register from "./src/Register";
import login from "./src/Login";
import Home from "./src/Home";
import React from 'react';
import { SignInContextProvider } from "./src/contexts/authContexts";
import RootNavigation from "./src/navigation/rootNavigation";
import AppStack from "./src/navigation/AppStack";
import AuthStack from "./src/navigation/AuthStack";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SignInContextProvider>
      <RootNavigation/>
    </SignInContextProvider>
  );
}

