import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Image,
} from "react-native";
import { Images, ServerURL } from "../../constants";
import { API } from "../../hooks";
import { useSelector } from "react-redux";

const Favourites = ({ navigation }) => {
    const [FavBooks, setBooks] = useState([]);
    const { session } = useSelector((state) => state.auth);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            API.getFavData({ email: session.email }, (data) => {
                setBooks(data);
            });
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Favourites</Text>
            </View>
            <ScrollView style={styles.serviceList} showsVerticalScrollIndicator={false}>
                {FavBooks.map((item, idx) => {
                    return (
                        <View style={styles.serviceCard} key={idx}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Detail", item)}
                            >
                                <View style={styles.serviceImageContainer}>
                                    <Image
                                        source={{
                                            uri: `${ServerURL}shop/${item.workPlace[0]}`,
                                        }}
                                        style={styles.serviceImage}
                                    />

                                </View>
                                <View style={styles.serviceDescription}>
                                    <View>
                                        <Text style={styles.serviceDescTitle}>
                                            {item.businessName}
                                        </Text>
                                        <Text style={styles.serviceDescType}>
                                            ABC Facial treatment Clinic
                                        </Text>
                                        <View style={styles.serviceDescWithIcon}>
                                            <Image
                                                source={Images.ICONS.LOCATION}
                                                style={styles.serviceDescIcon}
                                            />
                                            <Text style={styles.serviceDescContact}>
                                                {`${item.city}, ${item.street}, ${item.apartment}`}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.serviceLikeIconContainer}>
                                        <Image
                                            style={styles.rightIcon}
                                            source={Images.ICONS.HEART}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )
                })}
                {/* <View style={styles.serviceCard}>
                    <View style={styles.serviceImageContainer}>
                        <Image
                            source={Images.HOME.SERVICE02}
                            style={styles.serviceImage}
                        />
                        <View style={styles.ratingContainer}>
                            <Image
                                source={Images.ICONS.STAR}
                                style={styles.ratingIcon}
                            />
                            <Text style={styles.ratingValue}>4.5</Text>
                        </View>
                    </View>
                    <View style={styles.serviceDescription}>
                        <View>
                            <Text style={styles.serviceDescTitle}>
                                Haircare Clinic
                            </Text>
                            <Text style={styles.serviceDescType}>
                                Hair loss treatment
                            </Text>
                            <View style={styles.serviceDescWithIcon}>
                                <Image
                                    source={Images.ICONS.LOCATION}
                                    style={styles.serviceDescIcon}
                                />
                                <Text style={styles.serviceDescContact}>
                                    Shakhbout City, Abu Dhabi. - 4.5KM
                                </Text>
                            </View>
                        </View>
                        <View style={styles.serviceLikeIconContainer}>
                            <Image
                                style={styles.rightIcon}
                                source={Images.ICONS.HEART}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.serviceCard}>
                    <View style={styles.serviceImageContainer}>
                        <Image
                            source={Images.HOME.SERVICE03}
                            style={styles.serviceImage}
                        />
                        <View style={styles.ratingContainer}>
                            <Image
                                source={Images.ICONS.STAR}
                                style={styles.ratingIcon}
                            />
                            <Text style={styles.ratingValue}>4.5</Text>
                        </View>
                    </View>
                    <View style={styles.serviceDescription}>
                        <View>
                            <Text style={styles.serviceDescTitle}>
                                William Car Spa
                            </Text>
                            <Text style={styles.serviceDescType}>
                                Auto Mobile
                            </Text>
                            <View style={styles.serviceDescWithIcon}>
                                <Image
                                    source={Images.ICONS.LOCATION}
                                    style={styles.serviceDescIcon}
                                />
                                <Text style={styles.serviceDescContact}>
                                    Shakhbout City, Abu Dhabi. - 4.5KM
                                </Text>
                            </View>
                        </View>
                        <View style={styles.serviceLikeIconContainer}>
                            <Image
                                style={styles.rightIcon}
                                source={Images.ICONS.HEART}
                            />
                        </View>
                    </View>
                </View> */}
            </ScrollView>
        </View>
    );
};

export default Favourites;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        height: 70,
        width: width - 32,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
    },
    serviceList: {
        width: width - 32,
        marginTop: 8,
        paddingVertical: 0,
    },
    serviceCard: {
        marginBottom: 16,
        marginHorizontal: 4,
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    serviceImage: {
        width: "100%",
        height: 120
    },
    serviceDescription: {
        flexDirection: "row",
        paddingHorizontal: 8,
        justifyContent: "space-between",
        alignItems: "center",
    },
    serviceDescTitle: {
        fontSize: 12,
        marginTop: 8,
        paddingVertical: 4,
    },
    serviceDescType: {
        fontSize: 10,
        color: "#979797",
        paddingVertical: 2,
    },
    serviceDescWithIcon: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8,
    },
    serviceDescIcon: {
        width: 7,
        height: 9,
        resizeMode: "contain",
    },
    serviceDescContact: {
        fontSize: 9,
        color: "#979797",
        paddingHorizontal: 4,
    },
    serviceLikeIconContainer: {
        width: 31,
        height: 31,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 116,
        borderWidth: 1,
        borderColor: "#D6D5D5",
    },
    serviceImageContainer: {
        position: "relative",
    },
    ratingContainer: {
        position: "absolute",
        bottom: 8,
        right: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#413E3C",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    ratingIcon: {
        width: 10.5,
        height: 10.5,
        resizeMode: "contain",
    },
    ratingValue: {
        fontSize: 11,
        color: "#FFFFFF",
        paddingHorizontal: 3,
    },
    rightIcon: {
        width: 16,
        height: 16,
        resizeMode: "contain",
    },
});
