import React, { useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "../../constants";
import { session_store } from "../../redux/actions/auth";
import { API } from "../../hooks";
import { useDispatch } from "react-redux";
import { Toast } from "native-base";
import isEmail from "validator/lib/isEmail";

const SignUp = ({ navigation }) => {
    const dispatch = useDispatch();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
   
    const signup = async () => {
        const isValidEmail = isEmail(email);
        if (isValidEmail) {
            API.signup({ username, email, phone, password, roles: "customer" }, (data) => {
                if (data.status) {
                    dispatch(session_store(data));
                } else {
                    Toast.show({
                        title: data.message,
                        status: "danger",
                    });
                }
            });

        } else {
            Toast.show({
                title: "Email is invalid!",
                status: "danger",
            });
        }
    };
    return (
        <View style={styles.container}>
            <Image source={Images.BASE.LOGO} style={styles.logo} />
            <View style={styles.alignCenter}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subTitle}>Create your Kozmo account</Text>
            </View>
            <SafeAreaView>
                <TextInput
                    onChangeText={(val) => setUserName(val)}
                    style={styles.input}
                    placeholder="Your Name"
                />
                <TextInput
                    onChangeText={(val) => setEmail(val)}
                    style={styles.input}
                    placeholder="Email"
                />
                <TextInput
                    onChangeText={(val) => setPhone(val)}
                    style={styles.input}
                    placeholder="Phone Number"
                />
                <TextInput
                    onChangeText={(val) => setPassword(val)}
                    style={styles.input}
                    placeholder="Choose Password"
                    secureTextEntry
                />
                <TouchableOpacity onPress={() => signup()}>
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text>Create Account</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeAreaView>
            <TouchableOpacity
                onPress={() => navigation.navigate("SetupShopStack")}
            >
                <View style={styles.goto}>
                    <Text style={styles.gotoText}>
                        Are You Shop Owner ? Setup your Shop
                    </Text>
                    <Image
                        source={Images.BASE.RIGHTARROW}
                        style={styles.gotoIcon}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default SignUp;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 32,
        paddingVertical: 24,
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        width: 194.98,
        height: 34.42,
        resizeMode: "contain",
    },
    alignCenter: {
        alignItems: "center",
    },
    title: {
        fontSize: 18,
    },
    subTitle: {
        fontSize: 14,
    },
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 64,
        paddingHorizontal: 24,
        height: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    button: {
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
        marginVertical: 24,
    },
    buttonGroup: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 8,
    },
    goto: {
        backgroundColor: "#000000",
        height: 40,
        width: width - 64,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    gotoText: {
        fontSize: 13,
        color: "#fff",
    },
    gotoIcon: {
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
});
