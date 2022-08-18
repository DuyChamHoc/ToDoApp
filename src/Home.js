import React, { useState, useEffect,useContext } from "react";
import { StyleSheet, View, SafeAreaView, Text, Modal, FlatList, Alert, TextInput, TouchableOpacity } from "react-native";
import auth from '@react-native-firebase/auth'
import firestore, { firebase } from '@react-native-firebase/firestore';
import Icon from "react-native-vector-icons/AntDesign";
import Icon1 from "react-native-vector-icons/Entypo";
import HeaderLogin from "./HeaderLogin";
import Header from "./Header";
import { SignInContext } from "./contexts/authContexts";
export default function Home({ navigation }) {
    const {dispatchSignedIn}=useContext(SignInContext);
    function signOut() {
        try {
            auth()
                .signOut()
                .then(
                    () => {
                        dispatchSignedIn({ type: "UPDATE_SIGN_IN", payload: { userToken: null } })
                    })
        } catch (errot) {
            Alert.alert(
                error.name,
                error.message
            )
        }
    }
    const [description, setdescription] = useState('')
    const [isModalvisible, setisModalvisible] = useState(false)
    const [isModalvisible1, setisModalvisible1] = useState(false)
    const user = auth().currentUser;
    const [data, setdata] = useState([])
    const [getdoc, setdoc] = useState([]);
    const item = [];
    const [check, getcheck] = useState(false)
    const [getreplay, setreplay] = useState('')
    const [getid, setid] = useState(1)
    const onPressItem = () => {
        setisModalvisible(true);
    }
    const huy=()=>{
        setisModalvisible(false)
        load()
    }
    const addtodo = () => {
        if (description == '') {
            Alert.alert('Vui lòng nhập ghi chú')
        }
        else {
            const db = firebase.firestore();
            db.collection(user.uid)
                .add({
                    items: description,
                    id: Math.random(),
                })
                .then(() => {
                    console.log('User added!');
                });
            setisModalvisible(false)
            load();
        }
    }
    useEffect(() => {
        getcheck(false)
        firestore()
            .collection(user.uid).onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                    if (snapshot.size == 1) {
                        getcheck(true)
                        setdata(doc.data())
                    }
                    else {
                        item.push(doc.data())
                    }
                });
            });
    }, [getdoc]);
    const deleteitem = (id) => {
        firestore()
            .collection(user.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().id == id) {
                        deletecart(documentSnapshot.id);
                    }
                });
            });
    }
    const deletecart = (item) => {
        firestore()
            .collection(user.uid)
            .doc(item)
            .delete()
            .then(() => {
                console.log('deleted!');
                load();
            });
    }
    const updateitem = (id, title) => {
        setreplay(title)
        setid(id)
        setisModalvisible1(true)
    }
    const update = (id) => {
        firestore()
            .collection(user.uid)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot.data().id == id) {
                        updateend(documentSnapshot.id);
                    }
                });
            });
    }
    const updateend = (item) => {
        if (description == '') {
            Alert.alert('Vui lòng nhập ghi chú')
        }
        else {
            firestore()
                .collection(user.uid)
                .doc(item)
                .update({
                    items: description,
                })
                .then(() => {
                    console.log('updated!');
                    setisModalvisible1(false)
                    load();
                });
        }
    }
    const renderItem = (item) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginLeft: 30, flexDirection: 'row', justifyContent: "space-between", marginRight: 30, marginTop: 10, borderWidth: 1, height: 60, alignItems: 'center', borderRadius: 10, borderColor: "#6BC8FF" }}>
                    <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.items}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Icon
                            name="delete"
                            size={30}
                            color="red"
                            onPress={() => {
                                deleteitem(item.id)
                            }} />
                        <View style={{ marginLeft: 15 }}>
                            <Icon1
                                name="pencil"
                                size={30}
                                color="red"
                                onPress={() => {
                                    updateitem(item.id, item.items)
                                }} />
                        </View>

                    </View>
                </View>
            </View>
        )
    }
    const ListItem = ({ item }) => {
        return (
            <View style={{ marginLeft: 30, flexDirection: 'row', justifyContent: "space-between", marginRight: 30, marginTop: 10, borderWidth: 1, height: 60, alignItems: 'center', borderRadius: 10, borderColor: "#6BC8FF" }}>
                <Text style={{ marginLeft: 10, fontSize: 20 }}>{item.items}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Icon
                        name="delete"
                        size={30}
                        color="red"
                        onPress={() => {
                            deleteitem(item.id)
                        }} />
                    <View style={{ marginLeft: 15 }}>
                        <Icon1
                            name="pencil"
                            size={30}
                            color="red"
                            onPress={() => {
                                updateitem(item.id, item.items)
                            }} />
                    </View>

                </View>
            </View>
        )
    }
    const load = (() => {
        setreplay('')
        setdescription('')
        setid(1)
        setdoc(Math.random())
        if (check)
            getcheck(false)
    })
    return (
        <SafeAreaView
            style={{ flex: 1 }}
        >
            <HeaderLogin title="TO DO APP" navigation={navigation} />
            <View style={{ justifyContent: "center", alignItems: "center", margin: 20 }}>
                <Text style={{ color: 'black', fontSize: 20 }}>Danh sách vừa tạo</Text>
            </View>
            {check ?
                (
                    renderItem(data)
                )
                : (<FlatList data={item}
                    renderItem={({ item, index }) => <ListItem item={item} />}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />)}
            <View style={{ alignItems: "flex-start", marginHorizontal: 20, marginTop: 20 }}>
                <TouchableOpacity
                    style={{ borderRadius: 20, width: 100, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: "#6BC8FF" }}
                    onPress={() => { signOut() }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: "flex-end", marginHorizontal: 20, marginTop: -40 }}>
                <TouchableOpacity
                    style={{ borderRadius: 20, width: 100, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: "#6BC8FF" }}
                    onPress={onPressItem}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Thêm</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                visible={isModalvisible}
                onRequestClose={() => setisModalvisible(false)}
            >
                <View style={styles.container}>
                    {/* <View style={{ alignItems: "center",backgroundColor:"#6BC8FF",height:50,justifyContent:'center'}}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20,color:'white'}}>Thêm thông tin</Text>
                    </View> */}
                    <Header title="Thêm thông tin" navigation={navigation} />
                    <View style={{ marginTop: 30 }}>
                        <View>
                            <TextInput style={styles.textinput2}
                                onChangeText={description => setdescription(description)}
                                placeholder="Ghi chú"
                            />
                        </View>
                    </View>
                    <View>
                        <View style={{ alignItems: "flex-start", marginHorizontal: 20, marginTop: 20 }}>
                            <TouchableOpacity
                                style={{ borderWidth: 1, borderRadius: 20, width: 100, height: 40, justifyContent: "center", alignItems: "center" }}
                                onPress={() =>  huy()}>
                                <Text>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: "flex-end", marginHorizontal: 20,marginTop:-40 }}>
                            <TouchableOpacity
                                style={{ borderWidth: 1, borderRadius: 20, width: 100, height: 40, justifyContent: "center", alignItems: "center" }}
                                onPress={() => addtodo()}>
                                <Text>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                visible={isModalvisible1}
                onRequestClose={() => setisModalvisible1(false)}
            >
                <View style={styles.container}>
                    <View style={{ marginTop: 20, alignItems: "center" }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Chỉnh sửa thông tin</Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View>
                            <TextInput style={styles.textinput2}
                                onChangeText={description => setdescription(description)}
                                placeholder={getreplay}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: "flex-end", marginHorizontal: 20, marginTop: 20 }}>
                        <TouchableOpacity
                            style={{ borderWidth: 1, borderRadius: 20, width: 100, height: 40, justifyContent: "center", alignItems: "center" }}
                            onPress={() => update(getid)}>
                            <Text>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    inputContainer: {
        elevation: 40,
        flex: 1,
        height: 50,
        marginVertical: 20,
        marginRight: 20,
        borderRadius: 30,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
    },

    textinput1: {
        borderWidth: 1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    textinput2: {
        borderWidth: 1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
    },
    textinput3: {
        borderWidth: 1,
        borderColor: "#86939e",
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 20,
        width: 135

    },
    createButton: {
        backgroundColor: "white",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#1db0e3",
        height: 40,
        paddingHorizontal: 20
    },
    createButtonTittle: {
        color: "#1db0e3",
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -3
    },
    iconContainer: {
        height: 50,
        width: 50,
        borderRadius: 25,
        elevation: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    actionIcon: {
        height: 25,
        width: 25,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        borderRadius: 3,
    },
    ListItem: {
        padding: 20,
        flexDirection: "row",
        elevation: 12,
        borderRadius: 7,
        marginVertical: 10,
    },
})