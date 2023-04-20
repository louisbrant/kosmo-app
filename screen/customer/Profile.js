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
import { Images, ServerURL } from "../../constants";

import { useDispatch } from "react-redux";
import { destroy_session } from "../../redux/actions/auth";
import { useSelector } from "react-redux";
const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(destroy_session());
        return;
    };
    const { session } = useSelector((state) => state.auth);
    const avatar = session ? session.avatar === "" || !session.avatar ? { uri: "https://dr5dymrsxhdzh.cloudfront.net/blog/images/ac33086e6/2017/01/exemption-1.jpg" } : { uri: `${ServerURL}users/${session.avatar}` } : null;

    return (
        <View style={styles.profileContainer}>
            <Image
                source={avatar}
                style={styles.avatar}
            />
            <View style={styles.content}>
                <Text style={styles.name}>{session ? session.username : null}</Text>
                <Text style={styles.phoneNumber}>{session ? session.phone : null}</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AccountDetail")}
                >
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text style={{ color: "#FFFFFF" }}>
                            Account Details
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.menuList}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("TermsAndConditions")
                        }
                    >
                        <View style={styles.menuItem}>
                            <Image
                                source={Images.ICONS.DOC}
                                style={[
                                    styles.menuIcon,
                                    {
                                        width: 22,
                                        height: 22,
                                        marginLeft: 6,
                                    },
                                ]}
                            />
                            <Text style={styles.menuText}>
                                Terms & Conditions
                            </Text>
                            <Image source={Images.ICONS.RIGHT_ARROW} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("AboutUs")}
                    >
                        <View style={styles.menuItem}>
                            <Image
                                source={Images.ICONS.INFORMATION}
                                style={[
                                    styles.menuIcon,
                                    {
                                        width: 22,
                                        height: 22,
                                        marginLeft: 6,
                                    },
                                ]}
                            />
                            <Text style={styles.menuText}>About Us</Text>
                            <Image source={Images.ICONS.RIGHT_ARROW} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => logout()}>
                        <View style={styles.menuItem}>
                            <Image
                                source={Images.ICONS.POWEROFF}
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuText}>Log Out</Text>
                            <Image source={Images.ICONS.RIGHT_ARROW} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Profile;

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    content: {
        width: width - 64,
        marginHorizontal: 32,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderRadius: 8,
        marginTop: -150,
        marginBottom: 10,
        alignItems: "center"
    },
    avatar: {
        width: width,
        height: height / 2,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 4,
    },
    phoneNumber: {
        fontSize: 12,
    },
    button: {
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64 - 32,
        height: 43,
        marginVertical: 16,
    },
    menuList: {
        width: width - 64 - 32,
        paddingHorizontal: 8,
    },
    menuItem: {
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    menuText: {
        flexGrow: 1,
        fontSize: 14,
        paddingHorizontal: 16,
    },
    menuIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },
});
