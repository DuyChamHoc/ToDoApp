import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Login';
import Register from '../Register';
const Auth= createNativeStackNavigator()
export default function AuthStack() {
  return (
    <Auth.Navigator>
        <Auth.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Auth.Screen name="register" component={Register} options={{ headerShown: false }} />
    </Auth.Navigator>
  )
}