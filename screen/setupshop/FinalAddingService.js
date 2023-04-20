import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "../../constants";
import { useDispatch } from "react-redux";
import { session_store } from "../../redux/actions/auth";

const FinalAddingService = ({ route}) => {
    const dispatch = useDispatch();

    const finalStep = () => {
        dispatch(session_store(route.params))
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}></View>
                <Image
                    source={Images.HOME.CONFIRM}
                    style={styles.confirmImage}
                />
                <Text style={[styles.mainText, { marginTop: 16 }]}>
                    Congratulations!
                </Text>
                <Text style={styles.mainText}>You are all set!</Text>
                <Text style={styles.subText}>
                    Your profile is now available for clients, you can invite
                    them to book with you online!
                </Text>
            </View>
            <TouchableOpacity onPress={() => finalStep()}>
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text>Continue</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

export default FinalAddingService;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#F8F8F8",
        justifyContent: "space-between",
        paddingHorizontal: 32,
    },
    header: {
        height: 56,
        marginTop: 64,
        width: width - 64,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center",
    },
    button: {
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
        marginBottom: 32,
    },
    content: {
        justifyContent: "center",
        alignItems: "center",
    },
    mainText: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subText: {
        marginTop: 16,
        fontSize: 16,
        color: "#222",
        textAlign: "center",
    },
});
