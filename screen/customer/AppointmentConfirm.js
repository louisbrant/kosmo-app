import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import { Images } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";

const AppointmentConfirm = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Image source={Images.HOME.CONFIRM} style={styles.confirmImage} />
            <Text style={styles.title}>Appointment Confirmed</Text>
            <Text style={styles.name}>{route.params.bookData.serviceName}</Text>
            <Text style={styles.time}>{route.params.bookData.serviceDate}</Text>
            <View style={styles.greetings}>
                <Text style={styles.content}>
                    You're done ! We'll send you a reminder before your
                    appointment
                </Text>
            </View>
            <View style={styles.finalButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.finalButton}
                    >
                        <Text style={styles.finalButtonText}>OK, GOT IT</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AppointmentConfirm;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
    },
    confirmImage: {
        width: 81,
        height: 81,
        resizeMode: "contain",
        marginBottom: 16,
    },
    title: {
        fontSize: 21,
        paddingVertical: 8,
        fontWeight: "bold",
    },
    name: {
        fontSize: 16,
        marginVertical: 4
    },
    time: {
        fontSize: 14,
        marginVertical: 4
    },
    addCalendar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 16,
    },
    addCalendarIcon: {
        width: 14,
        height: 14,
        resizeMode: "contain",
    },
    addCalendarText: {
        paddingLeft: 8,
    },
    serviceCard: {
        width: width - 64,
        marginVertical: 16,
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    serviceImage: {
        width: "100%",
        height: 120,
        borderRadius: 10,
    },
    serviceDescription: {
        flexDirection: "row",
        paddingHorizontal: 8,
        justifyContent: "space-between",
        alignItems: "center",
    },
    serviceDescTitle: {
        fontSize: 12,
        marginTop: 8,
        paddingVertical: 4,
    },
    serviceDescType: {
        fontSize: 10,
        color: "#979797",
        paddingVertical: 2,
    },
    serviceDescWithIcon: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8,
    },
    serviceDescIcon: {
        width: 7,
        height: 9,
        resizeMode: "contain",
    },
    serviceDescContact: {
        fontSize: 9,
        color: "#979797",
        paddingHorizontal: 4,
    },
    serviceImageContainer: {
        position: "relative",
    },
    ratingContainer: {
        position: "absolute",
        bottom: 8,
        right: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#413E3C",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    ratingIcon: {
        width: 10.5,
        height: 10.5,
        resizeMode: "contain",
    },
    ratingValue: {
        fontSize: 11,
        paddingHorizontal: 3,
    },
    greetings: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
        paddingHorizontal: 32,
    },
    content: {
        fontSize: 13,
        textAlign: "center",
        paddingHorizontal: 32,
    },
    greeting: {
        fontSize: 21,
        paddingVertical: 16,
        color: "#D97C2B",
    },
    finalButtonContainer: {
        marginTop: 32,
        paddingHorizontal: 16,
    },
    finalButton: {
        height: 51,
        borderRadius: 25,
        paddingHorizontal: 32,
        justifyContent: "center",
        alignItems: "center",
    },
});
