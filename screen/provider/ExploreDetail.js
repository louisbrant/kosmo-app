import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Swiper from "react-native-web-swiper";
import { useSelector } from "react-redux";
import { Images, MapStyles, ServerURL } from "../../constants";
import MapView, { Marker } from "react-native-maps";
import { API } from "../../hooks";
import { Badge, HStack, Stack, Text } from "native-base";
import { Rating } from "react-native-ratings";

const ExploreDetail = ({ navigation, route }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [reviews, setReviews] = useState([])
    const { session } = useSelector((state) => state.auth);

    const handleActiveTab = (newActiveTab) => {
        setActiveTab(newActiveTab);
    };
    const addfavourite = () => {
        API.addfav({ _id: route.params._id, email: session.email })
    };
    const loadReview = () => {
        API.getReview({ serviceid: route.params._id }, ({ data }) => {
            if (data.length) {
                setReviews(data)
            }
        })
    }

    useEffect(() => {
        loadReview()
    }, [])
    return (
        <ScrollView style={styles.container}>
            <View style={styles.slideContainer}>
                <Swiper>
                    {route.params.workPlace.map((item, idx) => {
                        return (
                            <View key={idx}>
                                <Image
                                    source={{
                                        uri: `${ServerURL}shop/${item}`,
                                    }}
                                    style={styles.slideImage}
                                />
                            </View>
                        );
                    })}
                </Swiper>
            </View>
            <View style={styles.serviceDescription}>
                <View>
                    <Text style={styles.serviceDescTitle}>
                        {route.params.businessName}
                    </Text>
                    <View style={styles.serviceDescWithIcon}>
                        <Image
                            source={Images.ICONS.LOCATION}
                            style={styles.serviceDescIcon}
                        />
                        <Text style={styles.serviceDescContact}>
                            {route.params.location}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => addfavourite()}>
                    <View style={styles.serviceLikeIconContainer}>
                        <Image
                            style={styles.rightIcon}
                            source={Images.ICONS.HEART}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.tabList}>
                <TouchableOpacity onPress={() => handleActiveTab(0)}>
                    <View
                        style={[
                            styles.tab,
                            activeTab === 0 && styles.activeTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === 0 && styles.activeTabLabel,
                            ]}
                        >
                            Services
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActiveTab(1)}>
                    <View
                        style={[
                            styles.tab,
                            activeTab === 1 && styles.activeTab,
                        ]}
                    >
                        {/* <Badge
                            colorScheme="danger"
                            rounded="full"
                            zIndex={1}
                            mb={-4}
                            mr={-6}
                            variant="solid"
                            alignSelf="flex-end"
                            _text={{
                                fontSize: 10,
                            }}
                        >
                            {reviews.length}
                        </Badge> */}
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === 1 && styles.activeTabLabel,
                            ]}
                        >
                            Reviews
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActiveTab(2)}>
                    <View
                        style={[
                            styles.tab,
                            activeTab === 2 && styles.activeTab,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === 2 && styles.activeTabLabel,
                            ]}
                        >
                            Details
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.tabPanelContainer}>
                <View style={activeTab !== 0 && styles.hide}>
                    <View style={styles.content}>
                        {route.params.services.map((item, idx) => {
                            return (
                                <View key={idx} style={styles.serviceDetail}>
                                    <View>
                                        <View style={styles.serviceDetailTitle}>
                                            <Text
                                                style={
                                                    styles.serviceDetailTitleLabel
                                                }
                                            >
                                                {item.serviceName}
                                            </Text>
                                            <Image
                                                style={
                                                    styles.serviceDetailTitleIcon
                                                }
                                                source={Images.ICONS.INFO}
                                            />
                                        </View>
                                        <View
                                            style={styles.serviceDetailContent}
                                        >
                                            <Text
                                                style={
                                                    styles.serviceDetailContentPrice
                                                }
                                            >
                                                {item.price}
                                            </Text>
                                            <Text
                                                style={
                                                    styles.serviceDetailContentTime
                                                }
                                            >
                                                {item.duaration}
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            );
                        })}
                    </View>
                </View>
                <View style={activeTab !== 1 && styles.hide}>
                    <Stack space={5}>
                        {
                            reviews.map((review, i) => (
                                <Stack key={i} space={1}>
                                    <HStack alignItems={"center"} space={3}>
                                        <Text fontSize={"sm"} fontWeight={"bold"}>{review.writer}</Text>
                                        <Rating
                                            type='custom'
                                            ratingCount={5}
                                            imageSize={16}
                                            readonly={true}
                                            startingValue={review.rate}
                                            tintColor={'#f4f4f5'}
                                        />
                                    </HStack>
                                    <Text fontSize={"xs"}>
                                        {review.review}
                                    </Text>
                                </Stack>
                            ))
                        }
                    </Stack>
                </View>
                <View style={activeTab !== 2 && styles.hide}>
                    <View style={styles.mapContainer}>
                        {activeTab === 2 && (
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: ((route.params.geocode.split(","))[0]) * 1,
                                    longitude: ((route.params.geocode.split(","))[1]) * 1,
                                    latitudeDelta: 0.0032,
                                    longitudeDelta: 0.0031,
                                }}
                                customMapStyle={MapStyles.MapStyle1}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: ((route.params.geocode.split(","))[0]) * 1,
                                        longitude: ((route.params.geocode.split(","))[1]) * 1,
                                    }}
                                >
                                    <Image
                                        source={Images.ICONS.SERVICE_LOCATION}
                                    />
                                </Marker>
                            </MapView>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default ExploreDetail;

const { height, width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slideContainer: {
        height: 254,
    },
    slideImage: {
        width: width,
        height: 254,
    },
    hide: {
        display: "none",
    },
    serviceDescription: {
        flexDirection: "row",
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    serviceDescTitle: {
        fontSize: 17,
        paddingVertical: 4,
    },
    serviceDescType: {
        fontSize: 11,
        color: "#979797",
        paddingVertical: 4,
    },
    serviceDescWithIcon: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    serviceDescIcon: {
        width: 7,
        height: 9,
        resizeMode: "contain",
    },
    serviceDescContact: {
        fontSize: 11,
        color: "#333333",
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
    tabList: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderBottomColor: "#EEEEEE",
        borderBottomWidth: 3,
        paddingHorizontal: 16,
        marginVertical: 8,
        marginTop: 16,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    tabLabel: {
        fontSize: 12,
        color: "#979797",
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: "#000000",
    },
    activeTabLabel: {
        color: "#000000",
    },
    tabPanelContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 43,
    },
    content: {
        paddingBottom: 16,
    },
    itemText: {
        fontSize: 12,
    },
    itemIcon: {
        width: 10,
        height: 5,
    },
    serviceDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 2,
        width: width - 32,
        borderColor: "#E2E2E2",
        borderWidth: 1,
        borderRadius: 23,
        paddingHorizontal: 24,
        paddingVertical: 4,
        marginBottom: 8,
    },
    serviceDetailTitle: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 2,
    },
    serviceDetailTitleLabel: {
        fontSize: 12,
        paddingRight: 8,
    },
    serviceDetailTitleIcon: {
        width: 10,
        height: 10,
        resizeMode: "contain",
    },
    serviceDetailContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 2,
    },
    serviceDetailContentPrice: {
        fontSize: 9,
        paddingRight: 8,
    },
    serviceDetailContentTime: {
        fontSize: 9,
        color: "#C8C8C8",
    },
    button: {
        height: 28,
        width: 57,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 9,
    },
    gridContainer: {
        paddingVertical: 8,
    },
    gridRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
    },
    mapContainer: {
        height: 200,
        width: width - 32,
        borderRadius: 16,
        overflow: "hidden",
    },
    map: {
        width: width - 32,
        height: 200,
        flex: 1,
    },
    rightIcon: {
        width: 16,
        height: 16,
        resizeMode: "contain",
    },
});
