import React from "react";
import { View,Text,StyleSheet,Dimensions } from "react-native";
import { color } from "react-native-elements/dist/helpers";
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import  Icon1  from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Header({title,type,navigation}){
    return(
        <View style={styles.header}>
            <View style={{justifyContent:"center",alignItems:"center",marginTop:7}}>
                    <Text style={styles.headerText}>
                        {title}
                    </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header :{
        backgroundColor:"#6BC8FF",
        height:50,
        justifyContent:'space-between'
    },
    headerText:{
        color:"white",
        fontSize:21,
        fontWeight:"bold",
        paddingTop:3,
    }
})