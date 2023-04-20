import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { shop_set } from "../../redux/actions/provider";
import { API } from "../../hooks";
import { Toast } from "native-base";

const Services = ({ navigation }) => {
    const dispatch = useDispatch();
    
    const { session } = useSelector((state) => state.auth);
    const { pshop } = useSelector((state) => state.provider);
    
    const [isOpen, setIsOpen] = useState(false);
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [duaration, setDuaration] = useState("");
    const [price, setPrice] = useState("");
    const [services, setServices] = useState(pshop ? pshop.services : []);
    const save = () => {
        if (
            serviceName &&
            serviceDescription &&
            duaration &&
            price
        ) {
            var tem = services;
            tem.push({serviceName, serviceDescription, duaration, price});
            API.update_business({email:session.email,services},(data)=>{
                if(data){
                    dispatch(shop_set(data));
                    Toast.show({
                        title: "saved correctly",
                        status: "success",
                    });
                    setIsOpen(false);
                }
            })
        }else{
            Toast.show({
                title: "Please input valid information",
                status: "danger",
            });
        }
    };
    const addNewService = () => {
        setIsOpen(true);
        return;
    };


    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Services</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' ,marginBottom:20}}>What kind of services are you providing?</Text>
                </View>
                <View style={styles.list}>
                    {services.map((item, idx) => {
                        return (
                            <View key={idx} style={styles.listItem}>
                                <Text>{item.serviceName}</Text>
                                <Text>{item.duaration}</Text>
                                <Text>{item.price}</Text>
                            </View>
                        );
                    })}
                </View>
                <TouchableOpacity onPress={() => addNewService()}>
                    <View style={styles.addService}>
                        <EvilIcons name="plus" size={24} color="black" />
                        <Text>Add a service</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("BusinessDetail")}>
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text style={{color: "white", fontWeight : 'bold'}}>Back</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                animationType="slide"
                visible={isOpen}
                style={styles.modal}
                onRequestClose={() => {
                    alert("Modal has been closed.");
                }}
                
            >
                <ScrollView style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
                    <View style={[styles.header,{marginTop:30}]}>
                        <Text style={styles.title}>Add New Service</Text>
                        <Text style={styles.subTitle}>
                            You can add more details of the service later.
                        </Text>
                    </View>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            placeholder="Service Name"
                            onChangeText={(val) => setServiceName(val)}
                        />
                        <TextInput
                            multiline
                            numberOfLines={8}
                            style={styles.input}
                            placeholder="Service Description"
                            onChangeText={(val) => setServiceDescription(val)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Duaration"
                            onChangeText={(val) => setDuaration(val)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            onChangeText={(val) => setPrice(val)}
                        />
                    </SafeAreaView>
                    <View style={styles.buttonGroup} >
                        <TouchableOpacity onPress={() => setIsOpen(false)}>
                            <LinearGradient
                                colors={["#FFFFFF", "#FFFFFF"]}
                                style={styles.modalButton}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => save()}>
                            <LinearGradient
                                colors={["#FFB743", "#FFB743"]}
                                style={styles.modalButton}
                            >
                                <Text style={{color: "white", fontWeight : 'bold'}}>Save</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
            
        </>
    );
};

export default Services;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 32,
    },
    header: {
        height: 56,
        // marginBottom: 12,
        width: width / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        color: "#000000",
    },
    subTitle: {
        fontSize: 14,
    },
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
        marginBottom:20
    },
    listItem: {
        borderRadius: 24,
        borderWidth: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 12,
        width: width - 64,
        paddingHorizontal: 24,
        height: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    addService: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {},
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 64,
        paddingHorizontal: 24,
        minHeight: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    buttonGroup: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 16,
    },
    modalButton: {
        width: (width - 64) / 2 - 16,
        alignItems: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
});
