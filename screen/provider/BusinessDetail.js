import React, { useEffect, useState } from "react";

import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
} from "react-native";

import { Images } from "../../constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { shop_set } from "../../redux/actions/provider";
import { API } from "../../hooks";

const BusinessDetail = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { session } = useSelector((state) => state.auth);
    const BDlist = [
        { url: 'BusinessInformation', text: 'Business Information' },
        { url: 'BusinessAddress', text: 'Business Address' },
        { url: 'OpeningHours', text: 'Opening Hours' },
        { url: 'Categories', text: 'Categories' },
        { url: 'Services', text: 'Services' },
        { url: 'WorkPlace', text: 'WorkPlace' }
    ];
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            API.getShopList({ email: session.email }, (data) => {
                if (data) {
                    dispatch(shop_set(data[0]));
                }
            });
        });
        return unsubscribe;
    }, [navigation, route]);

    return (
        <View style={styles.container}>
            <Text style={[{ color: "#061128", fontSize: 18, marginBottom: 30 }]}>
                {`Business Profile`}
            </Text>
            <SafeAreaView>
                {
                    BDlist.map((list, ids) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate(list.url)} key={ids}>
                                <View style={styles.goto}>

                                    <Text style={styles.gotoText}>{list.text}</Text>
                                    <Image
                                        source={Images.ICONS.RIGHT_ARROW_CARET}
                                        style={styles.gotoIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </SafeAreaView>
        </View>
    );
};

export default BusinessDetail;

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#F7F7F7'
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8F8F7",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 0,
    },
    appointmentAvatar: {
        width: 70,
        height: 70,
        resizeMode: "contain",
        borderRadius: 50,
        marginRight: 20,
        marginLeft: - width / 4
    },
    locationIcon: {
        width: 13,
        height: 16,
        resizeMode: "contain",
    },
    gotoText: {
        fontSize: 13,
        color: "#000000",
        flexGrow: 1,
        paddingHorizontal: 12,
    },
    gotoIcon: {
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
    goto: {
        height: 49,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
        marginVertical: 4,
        backgroundColor: "#fff",
        width: width - 64,
        borderRadius: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        marginBottom: 5,
    },
});
