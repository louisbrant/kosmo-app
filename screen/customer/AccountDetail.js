import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Images, ServerURL } from "../../constants";
import { useSelector } from "react-redux";

const AccountDetail = ({ navigation }) => {
    const { session } = useSelector((state) => state.auth);
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                flex: 1,
                paddingBottom: 35,
                justifyContent: "space-between",
            }}
        >
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Account Detail</Text>
                </View>
                <View style={styles.avatarParent}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={ !session.avatar || session.avatar === "" ? Images.PROFILE.AVATAR1 : {uri : `${ServerURL}users/${session.avatar}`}}
                            style={styles.avatar}
                        />
                        <View style={styles.cameraContainer}>
                            <Image
                                source={Images.ICONS.CAMERA}
                                style={styles.camera}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.accountDetail}>
                <View style={styles.accountDetailListItem}>
                    <Text style={styles.fieldName}>Your Name</Text>
                    <Text style={styles.fieldValue}>{session.username}</Text>
                </View>
                <View style={styles.accountDetailListItem}>
                    <Text style={styles.fieldName}>Email</Text>
                    <Text style={styles.fieldValue}>{session.email}</Text>
                </View>
                <View style={styles.accountDetailListItem}>
                    <Text style={styles.fieldName}>Phone Number</Text>
                    <Text style={styles.fieldValue}>{session.phone}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("AccountEdit")}
            >
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text style={[styles.buttonText]}>Edit Profile</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AccountDetail;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F7",
    },
    header: {
        height: 56,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
    avatarParent: {
        justifyContent: "center",
        alignItems: "center",
    },
    avatarContainer: {
        position: "relative",
        paddingBottom: 24,
    },
    avatar: {
        width: 152,
        height: 152,
        borderRadius : 152
    },
    cameraContainer: {
        width: 37,
        height: 37,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        borderRadius: 37,
        left: 152 / 2 - 37 / 2,
        bottom: -37 / 2 + 24,
        zIndex: 2,
        borderColor: "#E2E2E2",
        borderWidth: 1,
    },
    camera: {
        width: 17.75,
        height: 14.52,
        resizeMode: "contain",
    },
    accountDetail: {
        width: width - 52,
        marginHorizontal: 26,
        borderRadius: 22,
        borderColor: "#E2E2E2",
        borderWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    accountDetailListItem: {
        paddingVertical: 13,
        borderBottomColor: "#E9E9E9",
        borderBottomWidth: 1,
    },
    fieldName: {
        fontSize: 12,
        color: "rgba(0,0,0,.5)",
    },
    fieldValue: {
        fontWeight: "100",
        color: "rgba(0,0,0, .8)",
    },
    button: {
        height: 46,
        width: width - 52,
        marginHorizontal: 26,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});
