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
import { register_shop_store } from "../../redux/actions/provider";
import { API } from "../../hooks";
import { Toast } from "native-base";
import { ServerURL } from "../../constants";

const ProvidingService = ({ navigation }) => {
    const dispatch = useDispatch();
    const { shop } = useSelector((state) => state.provider);

    const [isOpen, setIsOpen] = useState(false);
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [duaration, setDuaration] = useState("");
    const [price, setPrice] = useState("");
    const [services, setServices] = useState([]);
    const [clickstate, setClickState] = useState(0);
    const { username, email, phoneNumber, password } = useSelector(
        (state) => state.provider.shop
    );
    const save = () => {
        const data = services;
        data.push({
            serviceName,
            serviceDescription,
            duaration,
            price,
        });
        setServices(data);
        setIsOpen(false);
        return;
    };
    const addNewService = () => {
        setIsOpen(true);
        return;
    };

    const getImages = (para) => {
        const array = [];
        for(let i in para){
            const uri = para[i].uri;
            const name = uri.split("/").pop();
            const match = /\.(\w+)$/.exec(name);
            const type = match ? `image/${match[1]}` : `image`;
            array.push({
                uri, name, type
            });
        }
        return array;
    }

    const nextStep = () => {
        if (clickstate === 1) {
            return;
        }
        if(!services.length)
        {
            Toast.show({
                title: "You need to add at least one service!",
                status: "danger",
            });
        }
        dispatch(
            register_shop_store({
                services: services,
            })
        );
        let finalData = shop;
        finalData.services = services;
        if (finalData) {
            API.signup(
                { username, email, phone: phoneNumber, password, roles: "provider" },
                (data) => {
                    if (data.status) {
                        setClickState(1);
                        const xhr = new XMLHttpRequest();
                        const formData = new FormData();
                        const photos = getImages(finalData.workPlace)
                        for(let i = 0; i < photos.length; i ++){
                            formData.append("photo", photos[i]);
                        }
                        delete finalData.workPlace;
                        formData.append("shop", JSON.stringify(finalData));
                        xhr.open("POST", `${ServerURL}api/shop/setup-shop`);
                        xhr.setRequestHeader("Content-Type", "multipart/form-data");
                        xhr.upload.onprogress = function (evt) {
                            if (evt.lengthComputable) {
                                var percentage = Math.round((evt.loaded / evt.total) * 100);
                                if (percentage === 100) {
                                    // navigation.navigate("FinalAddingService");
                                }
                            }
                        };
                        xhr.send(formData);
                        navigation.navigate("FinalAddingService",data);
                    } else {
                        Toast.show({
                            title: data.message,
                            status: "danger",
                        });
                    }
                }
            );
        } else {
            Toast.show({
                title: "Something went wrong!",
                status: "danger",
            });
        }
    };
    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        What kind of services are you providing ?
                    </Text>
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
                <TouchableOpacity onPress={() => nextStep()}>
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text>Continue</Text>
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
                <ScrollView style={styles.container}>
                    <View style={styles.header}>
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
                    <View style={styles.buttonGroup}>
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
                                <Text style={styles.buttonText}>Save</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </>
    );
};

export default ProvidingService;

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
        marginTop: 64,
        marginBottom: 32,
        width: width,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
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
