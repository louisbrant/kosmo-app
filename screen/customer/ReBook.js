import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity } from "react-native";
import { Button, View, Modal, Spinner, Text, TextArea, Toast, HStack } from "native-base"
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { Images, MapStyles } from "../../constants";
import { Rating } from 'react-native-ratings';
import { API } from "../../hooks";
import { useSelector } from "react-redux";

const modalStyles = {
    bottom: {
        marginBottom: 0,
        marginTop: "auto",
    },
}
const AppointmentDetail = ({ navigation, route }) => {
    route.params.type = 'rebook';
    const [open, setOpen] = useState(false)
    const [rate, setRate] = useState(5)
    const [loading, setLoading] = useState(false)
    const [review, setReview] = useState("")
    const [myreview, setMyreview] = useState()
    const { session } = useSelector((state) => state.auth);

    const ReviewSave = () => {
        if (review) {
            setLoading(true)
            API.createReview({ review, rate, bookid: route.params._id, serviceid: route.params.serviceid, writer: session.username, writer_email: session.email }, (data) => {
                setOpen(false)
                if (data.status) {
                    Toast.show({
                        title: data.message,
                        status: "success",
                        placement: "top",
                        position: "absolute"
                    })
                    loadReview()
                } else {
                    Toast.show({
                        title: data.message,
                        status: "error",
                        placement: "top",
                        position: "absolute"
                    })
                }
                setLoading(false)
            })
        }
    }

    const loadReview = () => {
        API.getReview({ bookid: route.params._id }, ({ data }) => {
            if (data.length) {
                setMyreview(data[0])
            }
        })
    }


    useEffect(() => {
        loadReview()
    }, [navigation])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>19 March 2020, 8:30 AM</Text>
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.status}>{route.params.status.toLocaleUpperCase()}</Text>
            </View>
            <View style={styles.service}>
                <View style={styles.mapContainer}>
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0032,
                            longitudeDelta: 0.0031,
                        }}
                        customMapStyle={MapStyles.MapStyle1}
                    >
                        <Marker
                            coordinate={{
                                latitude: 37.78815, longitude: -122.4324
                            }}
                        >
                            <Image source={Images.ICONS.SERVICE_LOCATION} />
                        </Marker>
                    </MapView>
                </View>
                <View style={styles.serviceDescription}>
                    <View>
                        <Text style={styles.serviceDescTitle}>ABC Facial treatment Clinic</Text>
                        <Text style={styles.serviceDescType}>Plastic surgery</Text>
                        <View style={styles.serviceDescWithIcon}>
                            <Image source={Images.ICONS.LOCATION} style={styles.serviceDescIcon} />
                            <Text style={styles.serviceDescContact}>
                                Shakhbout City, Abu Dhabi.  - 4.5KM
                            </Text>
                        </View>
                    </View>
                    <View style={styles.serviceLikeIconContainer}>
                        <Image source={Images.ICONS.GOTO_MAP} />
                    </View>
                </View>
            </View>
            <View style={styles.serviceDivider}>
                <Text style={styles.serviceDividerText}>Booked Services</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceType}>
                    Plastic surgery
                </Text>
                <View>
                    <Text style={styles.priceValue}>$600</Text>
                    <Text style={styles.priceTime}>27 Sep 8:30 AM</Text>
                </View>
            </View>
            <View style={styles.noteContainer}>
                <Text style={styles.noteTitle}>Note :</Text>
                <Text style={styles.noteContent}>Successful organizations depend on feedback, whether it comes from customers, the public, your own employees or for your events. Thanks to feedback forms, you can gather information and use it to build a better working environment, increase the efficiency of your company, and provide more a valuable service</Text>
            </View>
            {
                myreview && (
                    <View mb={8}>
                        <HStack alignItems={"center"} space={2}>
                            <Text style={styles.noteTitle}>My Review :</Text>
                            <Rating
                                type='custom'
                                ratingCount={5}
                                imageSize={15}
                                readonly={true}
                                startingValue={myreview.rate}
                                tintColor={'#f4f4f5'}
                            />
                        </HStack>
                        <Text style={styles.noteContent}>{myreview.review}</Text>
                    </View>
                )
            }
            <View style={styles.buttonGroup}>
                <TouchableOpacity disabled={myreview ? true : false} onPress={() => setOpen(true)}>
                    <LinearGradient
                        colors={["#FFFFFF", "#FFFFFF"]}
                        style={styles.button}
                    >
                        <Text style={[styles.buttonText, styles.black]}>LEAVE REVIEW</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("AppointmentReschedule", route.params)}>
                    <LinearGradient
                        colors={['#FFB743', '#FFB743']}
                        style={styles.button}
                    >
                        <Text style={[styles.buttonText, styles.black]}>BOOK AGAIN</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Modal isOpen={open} onClose={() => setOpen(false)} size="full">
                <Modal.Content maxWidth="400px" borderTopRadius={20} borderBottomRadius={0} {...modalStyles["bottom"]}>
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Text fontSize="lg" color={"black"} bold textAlign="center">Write Review</Text>
                        <Text fontSize="xs" color="gray.700" textAlign="center">Rate and review about your experience.</Text>
                        <Rating
                            style={{ marginTop: 15, marginBottom: 15 }}
                            ratingCount={5}
                            imageSize={40}
                            startingValue={5}
                            onFinishRating={setRate}
                        />
                        <TextArea
                            bg={"white"}
                            value={review}
                            onChangeText={setReview}
                            placeholderTextColor="#cccccc"
                            size="sm"
                            textAlignVertical='top'
                            _focus={{ borderColor: "gray.200" }}
                            h={48}
                            borderRadius={20}
                            placeholder="Write here..."
                            my={3}
                            _light={{ padding: 5 }}
                        />
                        <Button
                            variant="ghost"
                            mt={6}
                            mb={6}
                            bg={"#FFB743"}
                            onPress={ReviewSave}
                            h={50}
                            colorScheme="orange"
                            borderRadius={"full"}
                            disabled={loading}
                        >
                            {
                                loading ?
                                    <Spinner size="sm" />
                                    :
                                    <Text fontSize="md" color={"white"}>Save</Text>
                            }
                        </Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </ScrollView>
    )
}

export default AppointmentDetail;

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    header: {
        height: 56,
        width: width - 32,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 16
    },
    statusContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
        marginBottom: 16
    },
    status: {
        fontSize: 14,
        color: "#21BE13"
    },
    mapContainer: {
        height: 150,
        width: width - 32 - 16,
        borderRadius: 12,
        overflow: "hidden",
    },
    map: {
        width: width - 32 - 16,
        height: 150,
        flex: 1,
    },
    service: {
        width: width - 32,
        padding: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
    },
    serviceDescription: {
        flexDirection: "row",
        paddingHorizontal: 8,
        justifyContent: "space-between",
        alignItems: "center"
    },
    serviceDescTitle: {
        fontSize: 12,
        marginTop: 8,
        paddingVertical: 4
    },
    serviceDescType: {
        fontSize: 10,
        color: "#979797",
        paddingVertical: 2
    },
    serviceDescWithIcon: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8
    },
    serviceDescIcon: {
        width: 7,
        height: 9,
        resizeMode: "contain",
    },
    serviceDescContact: {
        fontSize: 9,
        color: "#979797",
        paddingHorizontal: 4
    },
    serviceLikeIconContainer: {
        width: 31,
        height: 31,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 116,
        backgroundColor: "#000000"
    },
    priceContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 16
    },
    priceType: {
        fontSize: 16
    },
    priceValue: {
        fontSize: 16
    },
    priceTime: {
        fontSize: 11
    },
    serviceDivider: {
        marginTop: 24,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#707070"
    },
    serviceDividerText: {
        fontSize: 11,
        color: "rgba(0, 0, 0, .5)"
    },
    noteContainer: {
        marginVertical: 8,
        marginBottom: 10
    },
    noteTitle: {
        fontSize: 11,
        paddingVertical: 8,
        fontWeight: "bold"
    },
    noteContent: {
        fontSize: 11,
        fontWeight: "100"
    },
    buttonGroup: {
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingVertical: 8,
        width: width - 32,
        marginBottom: 15
    },
    button: {
        width: (width - 32) / 2 - 4,
        alignItems: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
    black: {
        color: "#000000"
    },
    buttonText: {
        fontSize: 12,
        color: "rgba(0, 0, 0, .5)"
    },
})