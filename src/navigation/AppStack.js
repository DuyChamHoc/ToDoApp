import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Home';
const App= createNativeStackNavigator();
export default function AppStack() {
  return (
    <App.Navigator>
        <App.Screen name="home" component={Home} options={{ headerShown: false }} />
    </App.Navigator>
  )
}