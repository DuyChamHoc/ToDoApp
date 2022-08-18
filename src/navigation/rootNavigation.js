import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { SignInContext } from '../contexts/authContexts'
import { NavigationContainer } from '@react-navigation/native'
export default function RootNavigation() {
    const { signedIn } = useContext(SignInContext);
    return (
        <NavigationContainer>
            {
                signedIn.userToken === null ? (<AuthStack />) : (<AppStack />)
            }
        </NavigationContainer>
    )
}