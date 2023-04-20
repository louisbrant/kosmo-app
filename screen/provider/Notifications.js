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
import { Images } from "../../constants";
import { Entypo } from "@expo/vector-icons";

const Notifications = ({ navigation }) => {
    return (
        <View>
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
                <Text
                    style={[{ color: "#061128", fontSize: 18 }]}
                >{`Notifications`}</Text>
                <View style={{ width: 32 }}></View>
            </View>
            <View style={styles.content}>
                <TouchableOpacity
                    style={[
                        styles.filterByItem,
                        styles.row,
                        { justifyContent: "space-between" },
                    ]}
                >
                    <View style={[styles.row, { alignItems: "center" }]}>
                        <View
                            style={[
                                {
                                    padding: 15,
                                    paddingVertical: 10,
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
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={Images.ICONS.NOTIFICATION}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Notification title
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#7C7C7B" }}
                                >
                                    Short description
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
                        <View
                            style={[
                                {
                                    padding: 15,
                                    paddingVertical: 10,
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
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={Images.ICONS.NOTIFICATION}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Notification title
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#7C7C7B" }}
                                >
                                    Short description
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
                        <View
                            style={[
                                {
                                    padding: 15,
                                    paddingVertical: 10,
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
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={Images.ICONS.NOTIFICATION}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Notification title
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#7C7C7B" }}
                                >
                                    Short description
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
                        <View
                            style={[
                                {
                                    padding: 15,
                                    paddingVertical: 10,
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
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={Images.ICONS.NOTIFICATION}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Notification title
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#7C7C7B" }}
                                >
                                    Short description
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
                        <View
                            style={[
                                {
                                    padding: 15,
                                    paddingVertical: 10,
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
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={Images.ICONS.NOTIFICATION}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Notification title
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#7C7C7B" }}
                                >
                                    Short description
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
                        <View
                            style={[
                                {
                                    padding: 15,
                                    paddingVertical: 10,
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
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={Images.ICONS.NOTIFICATION}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Notification title
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#7C7C7B" }}
                                >
                                    Short description
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
                        <View
                            style={[
                                {
                                    padding: 15,
                                    paddingVertical: 10,
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
                            <View
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    borderColor: "#EFEFEF",
                                    borderWidth: 1,
                                }}
                            >
                                <Image
                                    source={Images.ICONS.NOTIFICATION}
                                    style={{ width: 20, height: 20 }}
                                />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Notification title
                                </Text>
                                <Text
                                    style={{ fontSize: 10, color: "#7C7C7B" }}
                                >
                                    Short description
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get("screen");
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
        paddingHorizontal: 20,
        backgroundColor: "#F8F8F7",
    },
    filterByText: {
        color: "#7C7C7B",
        fontSize: 13,
        marginBottom: 20,
        marginLeft: 5,
    },
    filterByItem: {
        alignItems: "center",
        width: "100%",
        marginVertical: 8,
    },
    filterByItemText: {
        fontSize: 12,
        color: "#7C7C7B",
    },
});

export default Notifications;
