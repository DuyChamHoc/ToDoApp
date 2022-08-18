import React from "react";
import { View,Text,StyleSheet,Dimensions } from "react-native";
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import  Icon1  from 'react-native-vector-icons/MaterialCommunityIcons'
export default function HeaderLogin({title,type,navigation}){
    return(
        <View style={styles.header}>
            <View>
                    <Text style={styles.headerText}>
                        {title}
                    </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header :{
        flexDirection:"row",
        backgroundColor:"#6BC8FF",
        height:50,
        justifyContent:"center",
        alignItems:"center",
    },
    headerText:{
        marginRight:8,
        marginTop:8,
        color:"white",
        fontSize:21,
        fontWeight:"bold",
        paddingTop:3,
    }
})