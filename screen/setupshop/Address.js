import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { register_shop_store } from "../../redux/actions/provider";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "../../constants";

const Address = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const [street, setStreet] = useState("");
    const [apartment, setApartment] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [lat, setLat] = useState(37.78825);
    const [lon, setLon] = useState(-122.4324);
    const nextStep = () => {
        dispatch(register_shop_store({
            street, apartment, city, zipCode, geocode: lat + "," + lon, location
        }))
        navigation.navigate("OpeningHours");
    }

    useEffect(() => {
        if (route.params) {
            setStreet(route.params.street);
            setApartment(route.params.name);
            setCity(route.params.locality);
            setZipCode(route.params.postal_code);
            setLat(route.params.latitude);
            setLon(route.params.longitude);
            setLocation(route.params.label);
        }
    }, [route])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Address</Text>
                <Text style={styles.subTitle}>Where client can find you ?</Text>
            </View>
            <SafeAreaView>
                <TouchableOpacity onPress={() => navigation.navigate("Map")}>
                    <View style={styles.goto}>
                        <Image
                            source={Images.ICONS.LOCATION}
                            style={styles.locationIcon}
                        />
                        <Text style={styles.gotoText}>Choose from Map</Text>
                        <Image
                            source={Images.ICONS.RIGHT_ARROW_CARET}
                            style={styles.gotoIcon}
                        />
                    </View>
                </TouchableOpacity>
                <TextInput
                    value={street}
                    onChangeText={(val) => setStreet(val)}
                    style={styles.input}
                    placeholder="Street address & number"
                />
                <TextInput
                    value={apartment}
                    onChangeText={(val) => setApartment(val)}
                    style={styles.input}
                    placeholder="Apartment or suit number (optional)"
                />
                <TextInput
                    value={city}
                    onChangeText={(val) => setCity(val)}
                    style={styles.input}
                    placeholder="City"
                />
                <TextInput
                    value={zipCode}
                    onChangeText={(val) => setZipCode(val)}
                    style={styles.input}
                    placeholder="Zip code"
                />
                <TouchableOpacity
                    onPress={() => nextStep()}
                >
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.button}
                    >
                        <Text>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
};

export default Address;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 32,
    },
    header: {
        height: 56,
        marginTop: 64,
        marginBottom: 32,
        width: width,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
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
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
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
        marginBottom: 32,
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
});
