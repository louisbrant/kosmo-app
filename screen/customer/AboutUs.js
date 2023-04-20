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
import { Images } from "../../constants";

const AboutUs = ({ navigation }) => {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>About Us</Text>
            </View>
            <View style={styles.aboutUs}>
                <View style={styles.content}>
                    <Text style={styles.aboutUsTitle}>Kozmo Cosmetics</Text>
                    <Text style={styles.aboutUsContent}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing ds
                        elit. Aenean commodo ligula eget dolor. Aenean sdf s
                        massa. Cum sociis natoque penatibus et magnis dis dsf
                        Lorem ipsum dolor sit amet, consectetuer adipiscing sdf
                        elit. Aenean commodo ligula eget dolor. Aenean sdfsdfs
                        massa. Cum sociis natoque penatibus et magnis dis
                        sdfsdfs Lorem ipsum dolor sit amet, consectetuer
                        adipiscing s elit. Aenean commodo ligula eget dolor.
                        Aenean massa. Cum sociis natoque penatibus et magnis dis
                    </Text>
                </View>
            </View>
            <View style={styles.divider}>
                <Text>Lorem ipsum dolor sit</Text>
            </View>
            <View style={styles.desciption}>
                <Image
                    source={Images.PROFILE.AVATAR}
                    style={{ width: 128, height: 128 }}
                />
                <Text style={styles.desciptionTitle}>Lorem ipsum</Text>
                <Text style={styles.desciptionSubTitle}>dolor sit amet</Text>
            </View>
            <View style={styles.members}>
                <View style={styles.member}>
                    <Image
                        source={Images.PROFILE.AVATAR}
                        style={styles.memberPhoto}
                    />
                    <Text style={styles.memberPosition}>
                        Lorem ipsum dolor sit amet.
                    </Text>
                </View>
                <View style={styles.member}>
                    <Image
                        source={Images.PROFILE.AVATAR}
                        style={styles.memberPhoto}
                    />
                    <Text style={styles.memberPosition}>
                        Lorem ipsum dolor sit amet.
                    </Text>
                </View>
                <View style={styles.member}>
                    <Image
                        source={Images.PROFILE.AVATAR}
                        style={styles.memberPhoto}
                    />
                    <Text style={styles.memberPosition}>
                        Lorem ipsum dolor sit amet.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default AboutUs;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        height: 56,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    aboutUs: {
        paddingHorizontal: 32,
        width: width,
    },
    aboutUsTitle: {
        fontSize: 30,
        color: "#FFB743",
        fontWeight: "bold",
        textAlign: "center",
    },
    aboutUsContent: {
        fontSize: 12,
        color: "#FFF",
        paddingVertical: 8,
    },
    divider: {
        backgroundColor: "#FFB743",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        marginVertical: 16,
        marginBottom: 0,
    },
    desciption: {
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
    },
    desciptionTitle: {
        fontSize: 30,
        color: "#FFB743",
    },
    desciptionSubTitle: {
        fontSize: 15,
        color: "#B5B5B5",
    },
    members: {
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 24,
    },
    memberPhoto: {
        width: 87,
        height: 87,
    },
    memberPosition: {
        color: "#FFFFFF",
        fontSize: 12,
        width: 87,
        textAlign: "center",
        paddingVertical: 12,
    },
});
