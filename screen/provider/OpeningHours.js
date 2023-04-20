import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Checkbox, Text } from "native-base";
import { Toast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { shop_set } from "../../redux/actions/provider";
import { LinearGradient } from "expo-linear-gradient";
import { API } from "../../hooks";
import { DefaultHours } from "../../constants/config";

const OpeningHours = ({ navigation }) => {
    const dispatch = useDispatch();

    const { session } = useSelector((state) => state.auth);
    const { pshop } = useSelector((state) => state.provider);

    const [openingHours, setOpeningHours] = useState(pshop ? (pshop.openingHours === undefined ? DefaultHours : pshop.openingHours) : DefaultHours);

    const fromChange = (key, val) => {
        console.log(key, val)
        setOpeningHours((prevState) => {
            prevState[key].from = val;
            return { ...prevState };
        });
        return;
    };

    const toChange = (key, val) => {
        setOpeningHours((prevState) => {
            prevState[key].to = val;
            return { ...prevState };
        });
        return;
    };

    const stateChange = (key) => {
        setOpeningHours((prevState) => {
            prevState[key].status = !openingHours[key].status;
            return { ...prevState };
        });
        return;
    };

    const save = () => {
        API.update_business({ email: session.email, openingHours }, (data) => {
            if (data) {
                dispatch(shop_set(data));
                Toast.show({
                    title: "saved correctly",
                    status: "success",
                });
                navigation.navigate('BusinessDetail')
            }
        })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Opening Hours</Text>
            </View>
            <View style={styles.list}>
                {
                    Object.keys(openingHours).map((key, i) => (
                        <View style={styles.listItem} key={i}>
                            <Checkbox
                                value="orange"
                                colorScheme="orange"
                                onChange={() => stateChange(key)}
                                defaultIsChecked={openingHours[key].status}
                            >
                                <Text ml={2}>{key}</Text>
                            </Checkbox>
                            <View style={styles.inputGroup}>
                                <TextInput
                                    value={openingHours[key].from}
                                    style={styles.input}
                                    onChangeText={(val) => fromChange(key, val)}
                                    placeholder="00:00"
                                />
                                <TextInput
                                    value={openingHours[key].to}
                                    style={styles.input}
                                    onChangeText={(val) => toChange(key, val)}
                                    placeholder="00:00"
                                />
                            </View>
                        </View>
                    ))
                }
                <TouchableOpacity
                    onPress={() => save()}
                >
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text style={{ color: "white", fontWeight: 'bold' }}>Save</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default OpeningHours;
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
    inputGroup: {
        flexDirection: "row"
    },
    input: {
        width: 60,
    },
    checkBox: {
        margin: -15,
        marginRight: 15,
        width: 18,
        height: 18,
        borderColor: "#222",
        borderWidth: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
        marginBottom: 32
    },
});
