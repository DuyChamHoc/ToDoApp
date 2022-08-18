import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import React from 'react'
import auth from "@react-native-firebase/auth"
import HeaderLogin from "./HeaderLogin";
import HeaderRegister from "./HeaderRegister";
export default function Register({ navigation }) {
    const [getemail, setemail] = React.useState("");
    const [getpassword, setpassword] = React.useState("");
    async function signup() {
        try {
            if (getemail.length == 0 || getpassword.length == 0) {
                Alert.alert("Thông báo", "Bạn chưa nhập đủ thông tin")
            }
            else {
                await auth().createUserWithEmailAndPassword(getemail, getpassword);
                console.log("USER ACCOUNT CREATED")
                navigation.navigate("login")
            }
        }
        catch (error) {
            console.log("USER ACCOUNT NOT CREATED")
            if (error.code == 'auth/email-already-in-use') {
                console.log("Email already in use")
            }
            if (error.code == 'auth/invalid-email') {
                console.log("Invalid email")
            }
            else {
                console.log('NOT CREATED')
            }
        }
    }
    return (
        <View style={styles.container}>
              <HeaderRegister title="ĐĂNG KÝ" navigation={navigation} />
            <View style={styles.container1}>
                <Text style={{fontSize: 20 }}>Đăng ký tài khoản của bạn</Text>
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
                <TouchableOpacity
                    style={{ marginTop: 30, width: '90%',borderRadius: 15, height: 50,backgroundColor:"#6BC8FF"}}
                    onPress={() => signup()}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 12 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20,color:'white' }} >Đăng ký</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    container1: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 40,
    },
    container2: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 100,
        alignItems: 'center',
    },
    container3: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginTop: 50,
    },
});