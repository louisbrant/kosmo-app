import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StyleSheet,
    Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "../../constants";

const OnBoarding = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ImageBackground source={Images.ONBOARDING.BG01} style={styles.bg}>
                <ImageBackground
                    source={Images.ONBOARDING.GRADIENT}
                    style={[styles.bg, styles.gradient]}
                >
                    <View>
                        <Text style={styles.title}>Welcome to Kozmo</Text>
                        <Text style={styles.subTitle}>Cosmetic Services</Text>
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("LogIn")}
                        >
                            <LinearGradient
                                colors={["#FFB743", "#FFB743"]}
                                style={styles.button}
                            >
                                <Text>Log in</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("SignUp")}
                        >
                            <LinearGradient
                                colors={["#fff", "#fff"]}
                                style={styles.button}
                            >
                                <Text>Sign up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <Text style={styles.tag}>Skip</Text>
            </ImageBackground>
        </View>
    );
};
export default OnBoarding;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bg: {
        flex: 1,
    },
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 40,
        paddingTop: "30%",
    },
    tag: {
        position: "absolute",
        top: 16,
        right: 16,
        color: "#fff",
        backgroundColor: "#413E3C",
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,
    },
    title: {
        fontSize: 22,
        color: "#fff",
    },
    subTitle: {
        fontSize: 16,
        color: "rgba(255,255,255,.8)",
    },
    buttonGroup: {
        flexDirection: "row",
    },
    button: {
        borderRadius: 26,
        marginHorizontal: (width - 164 * 2) / 4,
        justifyContent: "center",
        alignItems: "center",
        width: 164,
        height: 52,
    },
});
