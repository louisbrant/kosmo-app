import React from "react";
import { Container, Content, Header, Icon, View } from "native-base";
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
import { LinearGradient } from "expo-linear-gradient";

const AppointmentHome = ({ navigation }) => {
    return (
        <Container>
            <Header style={[styles.header, styles.boxShadow]}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
                <Entypo
                    name="chevron-thin-left"
                    size={12}
                    color="#6B6864"
                    style={[{ width: 30, marginLeft: 10 }]}
                />
                <Text
                    style={[{ color: "#061128", fontSize: 18 }]}
                >{`Filters`}</Text>
                <View style={{ width: 30 }}></View>
            </Header>
            <Content style={styles.content}>
                <View>
                    <Text style={styles.filterByText}>Filter By Clients</Text>
                    <View style={styles.filterByContent}>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>
                                All Clients
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterByItem,
                                styles.row,
                                { justifyContent: "space-between" },
                            ]}
                        >
                            <View
                                style={[styles.row, { alignItems: "center" }]}
                            >
                                <Image
                                    source={Images.ICONS.CHECK_GOLD}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10,
                                    }}
                                />
                                <Text
                                    style={[
                                        styles.filterByItemText,
                                        { color: "#000" },
                                    ]}
                                >
                                    Selected Clients(1)
                                </Text>
                            </View>
                            <Entypo
                                name="chevron-thin-right"
                                size={12}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.filterByText}>Filter By Status</Text>
                    <View style={styles.filterByContent}>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK_GOLD}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text
                                style={[
                                    styles.filterByItemText,
                                    { color: "#000" },
                                ]}
                            >
                                Confirmed
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>
                                Finished
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>
                                Modified
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>No Show</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>
                                You Must Confirm
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>
                                Client Must Confirm
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>
                                Cancelled
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterByItem, styles.row]}
                        >
                            <Image
                                source={Images.ICONS.CHECK}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={styles.filterByItemText}>
                                Rescheduled
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.buttonGroup, { marginBottom: 20 }]}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={["#fff", "#fff"]}
                            style={[styles.button, styles.socialButton]}
                        >
                            <View style={styles.buttonWithIcon}>
                                <Text
                                    style={[
                                        styles.socialButtonText,
                                        { color: "#7C7C7B" },
                                    ]}
                                >
                                    CLAER ALL
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={["#FFB743", "#FFB743"]}
                            style={[
                                styles.button,
                                styles.socialButton,
                                { borderWidth: 0 },
                            ]}
                        >
                            <View style={styles.buttonWithIcon}>
                                <Text style={styles.socialButtonText}>
                                    APPLY
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Content>
        </Container>
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
    header: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
    },
    content: {
        padding: 20,
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
        fontSize: 16,
        color: "#7C7C7B",
    },
    buttonGroup: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 8,
    },
    button: {
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
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
});

export default AppointmentHome;
