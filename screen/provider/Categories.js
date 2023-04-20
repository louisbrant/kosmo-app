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
import { Toast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { shop_set } from "../../redux/actions/provider";
import { LinearGradient } from "expo-linear-gradient";
import { API } from "../../hooks";

const Categories = ({ navigation }) => {
    const dispatch = useDispatch();
    const { session } = useSelector((state) => state.auth);
    const { pshop } = useSelector((state) => state.provider);

    const defailtstate = {
        Skin: false,
        Teeth: false,
        Nurse: false,
        Hair: false,
        Eye: false,
    };

    const [businessType, setKind] = useState(pshop ? (pshop.businessType === undefined ? defailtstate : pshop.businessType) : defailtstate);

    const stateChange = (key) => {
        setKind((prevState) => {
            prevState[key] = !businessType[key];
            return { ...prevState };
        });
    };

    const save = () => {
        API.update_business({ email: session.email, businessType }, (data) => {
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
        <ScrollView style={styles.container} contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
            </View>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>What kind of business are you?</Text>
            </View>
            <View style={styles.list}>
                {
                    Object.keys(businessType).map((key, i) => (
                        <View style={styles.listItem} key={i}>
                            <Text>{key}</Text>
                            <Checkbox
                                accessibilityLabel="BusinessType"
                                value="orange"
                                colorScheme="orange"
                                onChange={() => stateChange(key)}
                                defaultIsChecked={businessType[key]}
                            >
                            </Checkbox>
                        </View>
                    ))
                }
            </View>
            <TouchableOpacity
                onPress={() => save()}
                style={{ marginBottom: 20 }}
            >
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text style={{ color: "white", fontWeight: 'bold' }}>Save</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Categories;

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
