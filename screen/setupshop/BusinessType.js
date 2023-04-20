import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Checkbox } from "native-base";
import { useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { register_shop_store } from "../../redux/actions/provider";

const BusinessType = ({ navigation }) => {
    const dispatch = useDispatch();
    const [kind, setKind] = useState({
        Skin: false,
        Teeth: false,
        Nurse: false,
        Hair: false,
        Eye: false,
    });

    const stateChange = (key) => {
        setKind((prevState) => {
            prevState[key] = !kind[key];
            return { ...prevState };
        });
    };

    const nextStep = () => {
        dispatch(register_shop_store({
            businessType: kind
        }));
        navigation.navigate("ProvidingService")
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    What kind of business are you ?
                </Text>
            </View>
            <View style={styles.list}>
                {
                    Object.keys(kind).map((key, i) => (
                        <View style={styles.listItem} key={i}>
                            <Text>{key}</Text>
                            <Checkbox
                                accessibilityLabel="BusinessType"
                                value="orange"
                                colorScheme="orange"
                                onChange={() => stateChange(key)}
                            >
                            </Checkbox>
                        </View>
                    ))
                }
            </View>
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
        </ScrollView>
    );
};

export default BusinessType;

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
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
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
});
