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
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { register_shop_store } from "../../redux/actions/provider";
import { DefaultHours } from "../../constants/config";

const OpeningHours = ({ navigation }) => {
    const dispatch = useDispatch();
    const [openingHours, setOpeningHours] = useState(DefaultHours);

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
    
    const nextStep = () => {
        dispatch(register_shop_store({
            openingHours
        }))
        navigation.navigate("WorkPlace");
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Opening Hours</Text>
                <Text style={styles.subTitle}>
                    When clients can book with you?
                </Text>
            </View>
            <View style={styles.list}>
                {
                    Object.keys(openingHours).map((key, i) => (
                        <View style={styles.listItem} key={i}>
                            <Checkbox.Group accessibilityLabel="choose values">
                                <Checkbox
                                    value="orange"
                                    colorScheme="orange"
                                    onChange={() => stateChange(key)}
                                >
                                    <Text ml={2}>{key}</Text>
                                </Checkbox>
                            </Checkbox.Group>
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
                    onPress={() => nextStep()}
                >
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text>Continue</Text>
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
