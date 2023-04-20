import React, { useState, useEffect } from "react";
import {
    Text,
    Image,
    View,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Images, MapStyles, ServerURL } from "../../constants";
import MapView, { Marker } from "react-native-maps";
import { API } from "../../hooks";
import { Toast } from "native-base";
import { Fragment } from "react";

const Explore = ({ navigation }) => {
    const [shop, setShops] = useState([]);
    const [searchKey, setSearchKey] = useState();
    const [Lat, setLatitude] = useState(37.78825);
    const [Lon, setLongitude] = useState(-122.4324);
    const [LatDelta, setLatDelta] = useState(100);
    const [LonDelta, setLonDelta] = useState(100);
    useEffect(() => {
        API.getShopList({}, (data) => {
            setShops(data);
        });
    }, [API]);

    const SearchShop = (key) => {
        var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (format.test(key)) {
            return Toast.show({
                title: "Only characters A-Z, a-z and 0-9 are allowed!",
                status: "danger",
            });
        }
        setSearchKey(key);
        var lat = [];
        var lon = [];
        for (let i = 0; i < shop.length; i++) {
            if ((shop[i].location).toLowerCase().search(key.toLowerCase()) !== -1 || shop[i].businessName.toLowerCase().search(key.toLowerCase()) !== -1) {
                lat.push(Number(shop[i].geocode.split(",")[0]));
                lon.push(Number(shop[i].geocode.split(",")[1]));
            }
        }
        if (lat.length !== 0) {
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            setLatitude(lat.reduce(reducer) / lat.length);
            setLongitude(lon.reduce(reducer) / lon.length);
            setLatDelta(Math.max(...lat) - Math.min(...lat) + 0.07);
            setLonDelta(Math.max(...lon) - Math.min(...lon) + 0.07);
            if (lat.length === shop.length) {
                setLatDelta(Math.max(...lat) - Math.min(...lat) + (key ? 30 : 100));
                setLonDelta(Math.max(...lon) - Math.min(...lon) + (key ? 30 : 100));
            }
        }
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: Lat,
                    longitude: Lon,
                    latitudeDelta: LatDelta,
                    longitudeDelta: LonDelta,
                }}
                initialRegion={{
                    latitude: Lat,
                    longitude: Lon,
                    latitudeDelta: LatDelta,
                    longitudeDelta: LonDelta,
                }}
            // customMapStyle={MapStyles.MapStyle1}
            >
                <Marker
                    coordinate={{
                        latitude: 37.79025,
                        longitude: -122.4304,
                    }}
                >
                    <Image
                        source={Images.ICONS.MARKER1}
                        style={{ display: 'none' }}
                    />
                </Marker>
                {
                    shop.map((item, index) => {
                        return <Marker key={index}
                            coordinate={{
                                latitude: ((item.geocode.split(","))[0]) * 1,
                                longitude: ((item.geocode.split(","))[1]) * 1,
                            }}
                            onPress={() => navigation.navigate("Detail", item)}
                        >
                            {
                                (item.location).toLowerCase().search(searchKey) !== -1 || item.businessName.toLowerCase().search(searchKey) !== -1 ? (
                                    <Fragment>
                                        <Image
                                            source={Images.ICONS.MARKER2}
                                            style={styles.marker2}
                                        />
                                    </Fragment>
                                )
                                    : <Image
                                        source={Images.ICONS.MARKER2}
                                        style={{ display: "none" }}
                                    />
                            }

                        </Marker>
                    })
                }
            </MapView>
            <View style={styles.searchContainer}>
                <SafeAreaView style={styles.inputRoot}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search Service"
                        onChangeText={SearchShop}
                    />
                    <Image
                        source={Images.ICONS.SEARCH}
                        style={styles.inputIcon}
                    />
                </SafeAreaView>
                {/* <View style={styles.buttonGroup}>
                    <TouchableOpacity>
                    <LinearGradient
                        colors={["#FFFFFF", "#FFFFFF"]}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>When?</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <LinearGradient
                        colors={["#FFFFFF", "#FFFFFF"]}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>
                            New York, 80001
                        </Text>
                    </LinearGradient>
                    </TouchableOpacity>
                </View> */}
            </View>
            {/* <View style={styles.filterContainer}>
                <View style={styles.filterTag}>
                    <Image
                        source={Images.ICONS.LIST}
                        style={styles.filterIcon}
                    />
                    <Text style={styles.filterText}>Filter</Text>
                </View>
            </View> */}
        </View>
    );
};

export default Explore;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
    },
    map: {
        width: width,
        height: height,
    },
    searchContainer: {
        position: "absolute",
        top: 8,
        paddingHorizontal: 16,
    },
    inputRoot: {
        position: "relative",
        padding: 0,
    },
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 32,
        paddingHorizontal: 24,
        paddingLeft: 48,
        height: 43,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    inputIcon: {
        position: "absolute",
        width: 16,
        height: 16,
        top: 51 / 2 - 8,
        left: 18,
        zIndex: 2,
    },
    buttonGroup: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 8,
        width: width - 32,
    },
    button: {
        width: (width - 32) / 2 - 16,
        alignItems: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
    buttonText: {
        fontSize: 12,
        color: "rgba(0, 0, 0, .5)",
    },
    filterContainer: {
        position: "absolute",
        bottom: 16,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width: width,
    },
    filterTag: {
        width: 77,
        height: 26,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
    },
    filterIcon: {
        width: 10,
        height: 7,
    },
    filterText: {
        paddingHorizontal: 3,
        fontSize: 11,
    },
    marker1: {
        width: 101.5,
        height: 101.5,
        resizeMode: "contain",
    },
    marker2: {
        width: 27.78,
        height: 51.96,
        resizeMode: "contain",
    },
});
