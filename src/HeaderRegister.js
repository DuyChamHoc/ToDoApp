import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
export default function HeaderRegister({ title, type, navigation }) {
    return (
        <View style={styles.header}>
            <View style={{ marginLeft: 20 }}>
                <Icon
                    name='arrow-left'
                    color='white'
                    size={28}
                    onPress={() => { navigation.goBack() }}
                />
            </View>
            <View >
                <Text style={styles.headerText}>
                    {title}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: "#6BC8FF",
        height: 60,
        justifyContent: "space-between",
        alignItems:'center',
    },
    headerText: {
        color: 'white',
        fontSize: 21,
        fontWeight: "bold",
        paddingTop: 3,
        marginLeft:-250
    }
})