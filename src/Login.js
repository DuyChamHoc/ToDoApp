import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useRef, useContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/Fontisto";
import Header from "./Header";
import { SignInContext } from "./contexts/authContexts";
export default function Login({ navigation }) {
    const [getemail, setemail] = React.useState("");
    const [getpassword, setpassword] = React.useState("");
    const { dispatchSignedIn } = useContext(SignInContext);
    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: "signed-in" } })
            }
            else {
                dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } })
            }
        })
    }, [])
    async function signin() {
        try {
            if (getemail.length == 0 || getpassword.length == 0) {
                Alert.alert("Thông báo", "Bạn chưa nhập đủ thông tin")
            }
            else {
                const user = await auth().signInWithEmailAndPassword(getemail, getpassword)
                if (user) {
                    dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: "signed-in" } })
                }
                else {
                    Alert.alert("Thông báo", "Vui long nhap lai")
                }
            }
        }
        catch (error) {
            Alert.alert(
                error.name,
                error.message
            )
        }
    }
    return (
        <View style={styles.container}>
            <Header title="ĐĂNG NHẬP" navigation={navigation} />
            <View style={styles.container1}>
                <Text style={{ fontSize: 18 }}>Đăng nhập tài khoản của bạn</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    autoCapitalize="none"
                    style={{ width: '90%', borderWidth: 1, borderColor: '#000', borderRadius: 15 }}
                    placeholder="Tài khoản"
                    onChangeText={(txt) => setemail(txt)}
                />
                <TextInput
                    autoCapitalize="none"
                    style={{ width: '90%', borderWidth: 1, borderColor: '#000', borderRadius: 15, marginTop: 30 }}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    onChangeText={(txt) => setpassword(txt)}
                />
            </View>

            <View style={styles.container3}>
                <TouchableOpacity style={{ width: "90%", borderRadius: 20, height: 50, backgroundColor: "#6BC8FF" }}
                    onPress={() => signin()}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>Đăng nhập</Text>
                    </View>
                </TouchableOpacity>

                <View style={{ alignItems: "center", marginTop: 15 }}>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ ...styles.text1, textDecorationLine: "underline" }} > Quên mật khẩu ?</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center", marginTop: 20, marginBottom: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>OR</Text>
                </View>

                <TouchableOpacity
                    style={{ marginTop: 10, width: '90%', borderWidth: 1, borderRadius: 20, height: 50, borderColor: "#6BC8FF" }}
                    onPress={() => navigation.navigate('register')}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, color: "#6BC8FF" }} >Đăng ký</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    text1: {
        color: "#5E6977",
        fontSize: 16

    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container1: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 30,
    },
    container2: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 40,
        alignItems: 'center',
    },
    container3: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 30,
    },
});