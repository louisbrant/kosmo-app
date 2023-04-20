import React, { useState, useRef } from "react";
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
import isEmail from "validator/lib/isEmail";
import DropdownAlert from 'react-native-dropdownalert';

const LogIn = ({ navigation }) => {
    let dropDownAlertRef = useRef();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        const isValidEmail = isEmail(email);
        if (isValidEmail) {
            API.login({ email, password }, (data) => {
                if (data.status) {
                    dropDownAlertRef.alertWithType('success', 'Success');
                    dispatch(session_store(data));
                } else {
                    dropDownAlertRef.alertWithType('error', data.message);
                }
            });
        } else {
            dropDownAlertRef.alertWithType('warn', 'Email is invalid!');
        }
    };
    
    return (
        <View style={styles.container}>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
            <Image source={Images.BASE.LOGO} style={styles.logo} />
            <View style={styles.alignCenter}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subTitle}>Login to your account</Text>
            </View>
            <SafeAreaView>
                <TextInput
                    onChangeText={(val) => setEmail(val)}
                    style={styles.input}
                    placeholder="Email or Phone Number"
                />
                <TextInput
                    onChangeText={(val) => setPassword(val)}
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                />
                <View style={styles.forgetPassword}>
                    <Text style={styles.forgetPasswordText}>
                        Forget Password?
                    </Text>
                </View>
                <TouchableOpacity onPress={() => login()}>
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text>Log in</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.separateContainer}>
                    <Text style={styles.separateText}>or Log in with</Text>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={["#fff", "#fff"]}
                            style={[styles.button, styles.socialButton]}
                        >
                            <View style={styles.buttonWithIcon}>
                                <Image
                                    source={Images.LOGIN.GOOGLE}
                                    style={styles.icon}
                                />
                                <Text style={styles.socialButtonText}>
                                    Google
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={["#fff", "#fff"]}
                            style={[styles.button, styles.socialButton]}
                        >
                            <View style={styles.buttonWithIcon}>
                                <Image
                                    source={Images.LOGIN.FACEBOOK}
                                    style={styles.icon}
                                />
                                <Text style={styles.socialButtonText}>
                                    Facebook
                                </Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <View style={styles.gotoSignUp}>
                    <Text style={styles.gotoSignUpText}>
                        Don't have an account? Create now
                    </Text>
                    <Image
                        source={Images.BASE.RIGHTARROW}
                        style={styles.gotoSignUpIcon}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};
export default LogIn;

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
    icon: {
        width: 15,
        height: 15,
    },
    buttonWithIcon: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonGroup: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 8,
    },
    separateContainer: {
        paddingVertical: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    separateText: {
        fontSize: 11,
        fontWeight: "100",
    },
    forgetPassword: {
        paddingVertical: 16,
        paddingHorizontal: 4,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    forgetPasswordText: {
        fontSize: 13,
        fontWeight: "100",
    },
    gotoSignUp: {
        backgroundColor: "#000000",
        height: 40,
        width: width - 64,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    gotoSignUpText: {
        fontSize: 13,
        color: "#fff",
    },
    gotoSignUpIcon: {
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
});
