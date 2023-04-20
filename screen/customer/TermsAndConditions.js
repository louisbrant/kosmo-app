import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TermsAndConditions = ({ navigation }) => {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ flex: 1, justifyContent: "flex-start" }}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Terms & Conditions</Text>
                <Text style={styles.subTitle}>Kozmo Cosmetics Master</Text>
            </View>
            <View style={styles.termsList}>
                <View style={styles.terms}>
                    <Text style={styles.termsTitle}>
                        1. Lorem ipsum dolor sit amet
                    </Text>
                    <Text style={styles.termsContent}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa.
                        Cum sociis natoque penatibus et magnis dis
                    </Text>
                </View>
                <View style={styles.terms}>
                    <Text style={styles.termsTitle}>
                        2. Lorem ipsum dolor sit amet
                    </Text>
                    <Text style={styles.termsContent}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa.
                        Cum sociis natoque penatibus et magnis dis Lorem ipsum
                        dolor sit amet, consectetuer adipiscing elit. Aenean
                        commodo ligula eget dolor. Aenean massa. Cum sociis
                        natoque penatibus et magnis dis
                    </Text>
                </View>
                <View style={styles.terms}>
                    <Text style={styles.termsTitle}>
                        3. Lorem ipsum dolor sit amet
                    </Text>
                    <Text style={styles.termsContent}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa.
                        Cum sociis natoque penatibus et magnis dis
                    </Text>
                </View>
                <View style={styles.terms}>
                    <Text style={styles.termsTitle}>
                        4. Lorem ipsum dolor sit amet
                    </Text>
                    <Text style={styles.termsContent}>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa.
                        Cum sociis natoque penatibus et magnis dis
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default TermsAndConditions;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        color: "#000",
    },
    subTitle: {
        fontSize: 12,
        color: "#222",
    },
    termsList: {
        paddingHorizontal: 32,
        width: width,
    },
    termsTitle: {
        fontSize: 12,
        color: "#FFB743",
        fontWeight: "bold",
    },
    termsContent: {
        fontSize: 11,
        color: "#000",
        paddingVertical: 8,
    },
    modal: {
        width: width,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonGroup: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 109,
        height: 32,
        borderWidth: 1,
        borderColor: "#707070",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginVertical: 8,
    },
    black: {
        color: "#000000",
    },
    buttonText: {
        color: "#FFFFFF",
    },
    borderNone: {
        borderColor: "#FFB743",
    },
});
