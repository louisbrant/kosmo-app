import React from "react";
import { View } from "native-base";
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "../../constants";
import { Entypo } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");

const AppointmentAll = ({ navigation }) => {
    const clearAll = () => {

    }

    return (
        <View bg={"#F8F8F7"} height={height}>
            <View style={[styles.header, styles.boxShadow]}>
                <StatusBar barStyle="dark-content" backgroundColor="#F8F8F7" />
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Entypo
                        name="chevron-thin-left"
                        size={12}
                        color="#6B6864"
                        style={[{ width: 30, marginLeft: 10 }]}
                    />
                </TouchableOpacity>
                <Text style={[{ color: "#061128", fontSize: 18 }]}>
                    {`View Appointments`}
                </Text>
                <View style={{ width: 32 }}></View>
            </View>
            <View style={styles.content}>
                <View style={styles.filterByContent}>
                    <TouchableOpacity
                        style={[
                            styles.filterByItem,
                            styles.row,
                            { justifyContent: "space-between" },
                        ]}
                    >
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <Image
                                source={Images.ICONS.CHECK_GOLD}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <View
                                style={[
                                    {
                                        padding: 20,
                                        backgroundColor: "#FFF",
                                        flex: 1,
                                        marginHorizontal: 2,
                                        borderRadius: 50,
                                    },
                                    styles.boxShadow3,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    All
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterByItem,
                            styles.row,
                            { justifyContent: "space-between" },
                        ]}
                    >
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <View
                                style={[
                                    {
                                        padding: 15,
                                        backgroundColor: "#FFF",
                                        flex: 1,
                                        marginHorizontal: 2,
                                        borderRadius: 50,
                                        alignItems: "center",
                                    },
                                    styles.boxShadow3,
                                    styles.row,
                                ]}
                            >
                                <Image
                                    source={Images.PROFILE.AVATAR1}
                                    style={{ width: 38, height: 38 }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={[
                                            styles.filterByItemText,
                                            { color: "#000" },
                                        ]}
                                    >
                                        Cherry Blossom (You)
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: "#7C7C7B",
                                        }}
                                    >
                                        Owner
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterByItem,
                            styles.row,
                            { justifyContent: "space-between" },
                        ]}
                    >
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <View
                                style={[
                                    {
                                        padding: 15,
                                        backgroundColor: "#FFF",
                                        flex: 1,
                                        marginHorizontal: 2,
                                        borderRadius: 50,
                                        alignItems: "center",
                                    },
                                    styles.boxShadow3,
                                    styles.row,
                                ]}
                            >
                                <Image
                                    source={Images.PROFILE.AVATAR2}
                                    style={{ width: 38, height: 38 }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={[
                                            styles.filterByItemText,
                                            { color: "#000" },
                                        ]}
                                    >
                                        Chris Anthemum
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: "#7C7C7B",
                                        }}
                                    >
                                        Owner
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filterByItem,
                            styles.row,
                            { justifyContent: "space-between" },
                        ]}
                    >
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <View
                                style={[
                                    {
                                        padding: 15,
                                        backgroundColor: "#FFF",
                                        flex: 1,
                                        marginHorizontal: 2,
                                        borderRadius: 50,
                                        alignItems: "center",
                                    },
                                    styles.boxShadow3,
                                    styles.row,
                                ]}
                            >
                                <Image
                                    source={Images.PROFILE.AVATAR3}
                                    style={{ width: 38, height: 38 }}
                                />
                                <View style={{ marginLeft: 10 }}>
                                    <Text
                                        style={[
                                            styles.filterByItemText,
                                            { color: "#000" },
                                        ]}
                                    >
                                        Zoya
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            color: "#7C7C7B",
                                        }}
                                    >
                                        Owner
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => clearAll()}>
                    <LinearGradient
                        colors={["#FFFFFF", "#FFFFFF"]}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>CLEAR ALL</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Home")}
                >
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text style={[styles.buttonText, styles.black]}>
                            APPLY
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
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
    boxShadow3: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    header: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8F8F7",
        padding: 10
    },
    content: {
        padding: 20,
        backgroundColor: "#F8F8F7",
    },
    filterByText: {
        color: "#7C7C7B",
        fontSize: 13,
        marginBottom: 20,
        marginLeft: 5,
    },
    filterByContent: {
        width: "100%",
        flexDirection: "column",
    },
    filterByItem: {
        alignItems: "center",
        width: "100%",
        marginBottom: 15,
    },
    filterByItemText: {
        fontSize: 12,
        color: "#7C7C7B",
    },
    buttonGroup: {
        justifyContent: "space-between",
        margin: width / 11,
        flexDirection: "row",
        paddingVertical: 8,
        marginBottom: 16,
        width: width - 64,
    },
    button: {
        width: (width - 64) / 2 - 4,
        alignItems: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
    socialButton: {
        width: 137,
        height: 41,
        backgroundColor: "#fff",
        borderColor: "#707070",
        borderWidth: 1,
        borderRadius: 21,
        fontSize: 15,
        fontWeight: "100",
    },
    socialButtonText: {
        paddingHorizontal: 6,
    },
    black: {
        color: "#000000",
    },
    buttonText: {
        fontSize: 12,
        color: "rgba(0, 0, 0, .5)",
    },
});

export default AppointmentAll;
