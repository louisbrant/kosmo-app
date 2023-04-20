import React, { useEffect, useState } from "react";
import { ScrollView } from "native-base";
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { API } from "../../hooks";
import { appoint_set } from "../../redux/actions/provider";
import { useDispatch } from "react-redux";

const Appointments = ({ navigation }) => {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);
    const { session } = useSelector((state) => state.auth);
    const { apdata } = useSelector((state) => state.provider);
    const [books, setBooks] = useState([]);

    const handleActiveTab = (newActiveTab) => {
        setActiveTab(newActiveTab);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            API.getBooks({ serviceUser: session.email }, (data) => {
                dispatch(appoint_set(data.data));
            });
        });
        if (apdata !== undefined) {
            setBooks(apdata);
        }
        return unsubscribe;
    }, [apdata, navigation])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Appointments</Text>
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity onPress={() => handleActiveTab(0)}>
                    <View
                        style={[styles.tab, activeTab === 0 && styles.active]}
                    >
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === 0 && styles.activeTabLabel,
                            ]}
                        >
                            Upcoming
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActiveTab(1)}>
                    <View
                        style={[styles.tab, activeTab === 1 && styles.active]}
                    >
                        <Text
                            style={[
                                styles.tabLabel,
                                activeTab === 1 && styles.activeTabLabel,
                            ]}
                        >
                            Completed
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <View style={[styles.appointments, activeTab !== 0 && styles.hide]}>
                    {books.map((item, idx) => {
                        var idate = new Date(item.serviceDate);
                        idate.setDate(idate.getDate() + 1);
                        idate.setMonth(idate.getMonth() + 1);
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={
                                    item.status === "completed" ?
                                        { display: "none" } : {}
                                }
                                onPress={() =>
                                    navigation.navigate("AppointmentDetail", item)
                                }
                            >
                                <View style={styles.appointment}>
                                    <View style={styles.appointmentDate}>
                                        <Text style={styles.appointmentDateDay}>
                                            {idate.getDate()}
                                        </Text>
                                        <Text style={styles.appointmentDateTime}>
                                            {idate.getFullYear()}{" "}
                                            -{" "}
                                            {idate.getMonth()}
                                        </Text>
                                    </View>
                                    <View style={styles.appointmentDetail}>
                                        <Text style={styles.appointmentDetailTitle}>
                                            {item.serviceCompany}
                                        </Text>
                                        <Text
                                            style={styles.appointmentDetailAddress}
                                        >
                                            {item.serviceLocation}
                                        </Text>
                                        <Text style={styles.appointmentDetailType}>
                                            {item.serviceName}
                                        </Text>
                                        <Text
                                            style={[styles.appointmentDetailStatus, item.status == "cancelled" ? { color: 'red' } : { color: '#21BE13' }]}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                <View style={[styles.appointments, activeTab !== 1 && styles.hide]}>
                    {books.map((item, idx) => {
                        var idate = new Date(item.serviceDate);
                        idate.setDate(idate.getDate() + 1);
                        idate.setMonth(idate.getMonth() + 1);
                        return (
                            <TouchableOpacity
                                key={idx}
                                style={
                                    item.status !== "completed" ?
                                        { display: "none" } : {}
                                }
                                onPress={() =>
                                    navigation.navigate("ReBook", item)
                                }
                            >
                                <View style={styles.appointment}>
                                    <View style={styles.appointmentDate}>
                                        <Text style={styles.appointmentDateDay}>
                                            {idate.getDate()}
                                        </Text>
                                        <Text style={styles.appointmentDateTime}>
                                            {idate.getFullYear()}{" "}
                                            -{" "}
                                            {idate.getMonth()}
                                        </Text>
                                    </View>
                                    <View style={styles.appointmentDetail}>
                                        <Text style={styles.appointmentDetailTitle}>
                                            {item.serviceCompany}
                                        </Text>
                                        <Text
                                            style={styles.appointmentDetailAddress}
                                        >
                                            {item.serviceLocation}
                                        </Text>
                                        <Text style={styles.appointmentDetailType}>
                                            {item.serviceName}
                                        </Text>
                                        <Text
                                            style={[styles.appointmentDetailStatus]}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

export default Appointments;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
    },
    header: {
        height: 70,
        width: width - 64,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
    },
    hide: {
        display: "none",
    },
    tabContainer: {
        width: width - 64,
        backgroundColor: "#E0E0E0",
        padding: 4,
        borderRadius: 30,
        flexDirection: "row",
        height: 43,
        alignItems: "center",
    },
    tab: {
        width: (width - 64 - 8) / 2,
        justifyContent: "center",
        alignItems: "center",
        height: 35,
    },
    active: {
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
    },
    tabLabel: {
        fontSize: 12,
        color: "rgba(0, 0, 0, .5)",
    },
    activeTabLabel: {
        color: "#000000",
    },
    appointments: {
        paddingVertical: 32,
    },
    appointment: {
        borderRadius: 10,
        padding: 8,
        backgroundColor: "#fff",
        flexDirection: "row",
        marginBottom: 16,
    },
    appointmentDate: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#EFEFEF",
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    appointmentDateDay: {
        fontSize: 19,
    },
    appointmentDateMonth: {
        fontSize: 9,
    },
    appointmentDateTime: {
        fontSize: 7,
    },
    appointmentDetail: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        justifyContent: "space-between",
    },
    appointmentDetailTitle: {
        fontSize: 11,
    },
    appointmentDetailAddress: {
        fontSize: 8,
        color: "#797979",
    },
    appointmentDetailType: {
        fontSize: 8,
        color: "#797979",
    },
    appointmentDetailStatus: {
        fontSize: 8,
        fontWeight: "800",
        color: "#21BE13",
    },
});
