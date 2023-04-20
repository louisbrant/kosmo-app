import React from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";

import { Images, ServerURL } from "../../constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { destroy_session } from "../../redux/actions/auth";

const More = ({ navigation }) => {
    const dispatch = useDispatch();

    const { session } = useSelector((state) => state.auth);
    const Mlist = [
        { url: 'AccountDetail', text: 'Account Details' },
        { url: 'BusinessDetail', text: 'Business Details' },
        { url: 'TermCondition', text: 'Term & Conditions' },
        { url: 'AboutUs', text: 'About Us' }
    ];
    const logout = () => {
        dispatch(destroy_session());
        return;
    };
    const avatar = session ? !session.avatar || session.avatar === "" ? Images.PROFILE.AVATAR1 : { uri: `${ServerURL}users/${session.avatar}` } : null;

    return (
        <View style={styles.container}
            
        >
            <View 
                style={[
                    { alignItems: "center", flexDirection: "row", margin: 30 }
                ]}
            >
                <Image
                    source={avatar}
                    style={[styles.appointmentAvatar]}
                />
                <View
                    style={[styles.appointmentUserInfo]}
                >
                    <Text style={{ fontSize: 15, marginBottom: 5 }}>
                        {session ? session.username : null}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: "#797979",
                        }}
                    >
                        {session ? session.email : null}
                    </Text>
                </View>
            </View>
            <SafeAreaView>
                {
                    Mlist.map((list, ids) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate(list.url)} key={ids}>
                                <View style={styles.goto}>

                                    <Text style={styles.gotoText}>{list.text}</Text>
                                    <Image
                                        source={Images.ICONS.RIGHT_ARROW_CARET}
                                        style={styles.gotoIcon}
                                    />
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
                <TouchableOpacity onPress={() => logout()}>
                    <View style={styles.goto}>

                        <Text style={styles.gotoText}>Log Out</Text>
                        <Image
                            source={Images.ICONS.RIGHT_ARROW_CARET}
                            style={styles.gotoIcon}
                        />
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

export default More;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: "space-evenly",
    },
    appointmentAvatar: {
        width: 70,
        height: 70,
        // resizeMode: "contain",
        borderRadius: 150,
        marginRight: 20,
        marginLeft: - width / 4
    },
    locationIcon: {
        width: 13,
        height: 16,
        resizeMode: "contain",
    },
    gotoText: {
        fontSize: 13,
        color: "#000000",
        flexGrow: 1,
        paddingHorizontal: 12,
    },
    gotoIcon: {
        width: 13,
        height: 13,
        resizeMode: "contain",
    },
    goto: {
        height: 49,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
        marginVertical: 4,
        backgroundColor: "#fff",
        width: width - 64,
        borderRadius: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        marginBottom: 5,
    },
});
