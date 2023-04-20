import React, { useEffect, useState } from "react";
import { HStack, Stack, View } from "native-base";
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { Images, ServerURL } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { API } from "../../hooks";
import { Toast } from "native-base";
import { Rating } from "react-native-ratings";

const AppointmentDetailAdmin = ({ navigation, route }) => {
    var Dt = new Date(route.params.serviceDate);
    Dt.setDate(Dt.getDate() + 1);
    const [reviews, setReviews] = useState()
    const { session } = useSelector((state) => state.auth);

    const changeState = () => {
        API.updateBookStatus({ _id: route.params._id, email: session.email, status: 'confirmed' }, (data) => {
            Toast.show({
                title: "Changed correctly",
                status: "success",
            });
            navigation.navigate('Home', route.params)
        })
    }

    const loadReview = () => {
        API.getReview({ bookid: route.params._id }, ({ data }) => {
            if (data.length) {
                setReviews(data[0])
            }
        })
    }

    useEffect(() => {
        loadReview()
    }, [])

    return (
        <View>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F8F7" />
            <View style={styles.content}>
                <Text
                    style={[{ textAlign: "center", margin: 20, color: "#061128", fontSize: 18 }]}
                >{Dt.toDateString()}</Text>
                <Text style={styles.appointmentStatus}>
                    {String("confirmed").toUpperCase()}
                </Text>
                <View style={[styles.appointmentInfoCard, styles.boxShadow3]}>
                    <View style={styles.appointmentInfoCardHeader}>
                        <Image
                            source={route.params.useravatar === "" ? Images.PROFILE.AVATAR1 : { uri: `${ServerURL}users/${route.params.useravatar}` }}
                            style={{ width: 56, height: 56, borderRadius: 50 }}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.userName}>{route.params.username}</Text>
                            <Text style={styles.userPhone}>
                                {route.params.userphone}
                            </Text>
                            <Text style={styles.userPhone}>
                                {route.params.serviceUser}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.appointmentInfoCardFooter}>
                        <View
                            style={[
                                styles.row,
                                { alignItems: "center", marginBottom: 10 },
                            ]}
                        >
                            <MaterialIcons
                                name="cake"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                12 Jan 1996
                            </Text>
                        </View>
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <MaterialIcons
                                name="location-on"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                {route.params.serviceLocation}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.serviceInfoCard}>
                    <View style={styles.serviceInfoCardHeader}>
                        <Text style={{ color: "#7F7F7F", marginVertical: 10 }}>
                            Booked Service:
                        </Text>
                    </View>
                    <View style={styles.serviceInfoCardFooter}>
                        <Text style={{ fontWeight: "600" }}>
                            {route.params.serviceName}
                        </Text>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={{ fontWeight: "600" }}>{route.params.servicePrice}</Text>
                            <Text style={{ fontSize: 11, marginTop: 5 }}>
                                27 Sep 8:30 AM
                            </Text>
                        </View>
                    </View>
                </View>
                {
                    reviews &&
                    <Stack space={1} mt={5}>
                        <HStack alignItems={"center"} space={3}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>{reviews.writer}</Text>
                            <Rating
                                type='custom'
                                ratingCount={5}
                                imageSize={16}
                                readonly={true}
                                startingValue={reviews.rate}
                                tintColor={'#f4f4f5'}
                            />
                        </HStack>
                        <Text fontSize={"xs"}>
                            {reviews.review}
                        </Text>
                    </Stack>
                }
                {route.params.status !== 'completed' && route.params.status !== 'cancelled' && route.params.status !== 'confirmed' ?
                    <TouchableOpacity style={styles.footerButton} onPress={() => changeState()}>
                        <Text style={{ textAlign: "center", color: "white", fontWeight: 'bold' }}>
                            {'CONFIRM'}
                        </Text>
                    </TouchableOpacity> : null

                }
            </View>
        </View>
    );
};

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 0,
    },
    boxShadow3: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8F8F7",
    },
    content: {
        height,
        padding: 20,
        paddingTop: 0,
        backgroundColor: "#F8F8F7",
    },
    appointmentStatus: {
        color: "#21BE13",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
    },
    appointmentInfoCard: {
        borderRadius: 15,
        marginVertical: 20,
        backgroundColor: "#FFFFFF",
        marginHorizontal: 2,
    },
    appointmentInfoCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#E9E9E9",
        borderBottomWidth: 1,
        padding: 15,
    },
    appointmentInfoCardFooter: {
        padding: 15,
    },
    userName: {
        fontSize: 14,
    },
    userPhone: {
        fontSize: 12,
        color: "#7F7F7F",
    },
    serviceInfoCard: {
    },
    serviceInfoCardHeader: {
        borderBottomColor: "#E9E9E9",
        borderBottomWidth: 1,
    },
    serviceInfoCardFooter: {
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 5,
        flexDirection: "row",
    },
    footerButton: {
        marginTop: 40,
        padding: 15,
        borderRadius: 50,
        borderColor: "#E9E9E9",
        borderWidth: 1,
        backgroundColor: "#FFB743",
    },
});

export default AppointmentDetailAdmin;
