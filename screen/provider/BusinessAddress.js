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
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../hooks";
import { shop_set } from "../../redux/actions/provider";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "../../constants";
import { Toast } from "native-base";

const Address = ({ navigation,route }) => {
    const dispatch = useDispatch();
    const { session } = useSelector((state) => state.auth);
    const { pshop } = useSelector((state) => state.provider);

    const [street, setStreet] = useState(pshop ? pshop.street:"");
    const [apartment, setApartment] = useState(pshop ? pshop.apartment:"");
    const [city, setCity] = useState(pshop ? pshop.city:"");
    const [zipCode, setZipCode] = useState(pshop ? pshop.zipCode:"");
    const [location, setLocation] = useState(pshop ? pshop.location:"");
    const [lat, setLat] = useState(pshop ? pshop.lat:37.78825);
    const [lon, setLon] = useState(pshop ? pshop.lon:-122.4324);

    useEffect(()=>{
        if (route.params) {
            setStreet(route.params.street);
            setApartment(route.params.name);
            setCity(route.params.locality);
            setZipCode(route.params.postal_code);
            setLat(route.params.latitude);
            setLon(route.params.longitude);
            setLocation(route.params.label);
        }
    },[route])
    const save = ()=>{
        if (
            street &&
            apartment &&
            city &&
            zipCode 
        ) {
            API.update_business({email:session.email, street, apartment, city, zipCode, geocode : lat+","+lon, location},(data)=>{
                if(data){
                    dispatch(shop_set(data));
                    Toast.show({
                        title: "saved correctly",
                        status: "success",
                    });
                    navigation.navigate('BusinessDetail')
                }
            })
        }else{
            Toast.show({
                title: "Please input valid information",
                status: "danger",
            });
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "space-between" }} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Business Address</Text>
            </View>
            <SafeAreaView>
                <TouchableOpacity onPress={() => navigation.navigate("Map",pshop)}>
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
                    value = {street}
                    onChangeText={(val) => setStreet(val)}
                    style={styles.input}
                    placeholder="Street address & number"
                />
                <TextInput
                    value = {apartment}
                    onChangeText={(val) => setApartment(val)}
                    style={styles.input}
                    placeholder="Apartment or suit number (optional)"
                />
                <TextInput
                    value = {city}
                    onChangeText={(val) => setCity(val)}
                    style={styles.input}
                    placeholder="City"
                />
                <TextInput
                    value = {zipCode}
                    onChangeText={(val) => setZipCode(val)}
                    style={styles.input}
                    placeholder="Zip code"
                />
            </SafeAreaView>
            <TouchableOpacity
                onPress={() => save()}
                style = {{marginBottom : 20}}
            >
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text style={{color: "white", fontWeight : 'bold'}}>Save</Text>
                </LinearGradient>
            </TouchableOpacity>
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
        // marginBottom: 12,
        width: width / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
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
