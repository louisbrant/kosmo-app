import React, { useEffect, useState } from "react";
import CalendarStrip from "react-native-calendar-strip";
import { Box, View } from "native-base";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { API } from "../../hooks";
import { useSelector } from "react-redux";
import { Images, ServerURL } from "../../constants";

const AppointmentHome = ({ navigation, route }) => {
    const { session } = useSelector((state) => state.auth);
    var Dt = new Date();
    Dt.setDate(Dt.getDate() + 1);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointments, setAppointsments] = useState([]);
    useEffect(() => {
        const date = selectedDate.toJSON().slice(0, 10);
        API.getAppointments({ date: date, email: session.email }, (data) => {
            setAppointsments(data);
        });
    }, [selectedDate, route]);

    return (
        <Box flex={1} height={'100%'}>
            <CalendarStrip
                calendarAnimation={{ type: "sequence", duration: 30 }}
                daySelectionAnimation={{
                    type: "border",
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: "white",
                }}
                style={{ height: 130, paddingTop: 10, paddingBottom: 10 }}
                calendarHeaderStyle={{
                    color: "#000",
                    fontWeight: "100",
                    fontSize: 14,
                }}
                calendarHeaderContainerStyle={{
                    borderBottomColor: "#EEEEED",
                    borderBottomWidth: 1,
                    paddingVertical: 10,
                    marginBottom: 10,
                    paddingBottom: 15,
                }}
                calendarColor={"#FFFFFF"}
                dateNumberStyle={{
                    color: "#000",
                    fontWeight: "100",
                    fontSize: 14,
                    marginVertical: 10,
                }}
                dateNameStyle={{ color: "#000", fontSize: 10 }}
                highlightDateNumberStyle={{
                    backgroundColor: "#000",
                    color: "#FFF",
                    margin: 5,
                    borderRadius: 50,
                    padding: 5,
                    fontSize: 14,
                    width: 30,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                }}
                highlightDateNameStyle={{ color: "#000" }}
                scrollable={true}
                markedDatesStyle={{ backgroundColor: "black" }}
                disabledDateOpacity={1}
                iconLeftStyle={{ width: 0 }}
                onDateSelected={(val) => setSelectedDate(val)}
                selectedDate={selectedDate}
                iconRightStyle={{ width: 0 }}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate("All")}
                style={[styles.row, styles.allComponent]}
            >
                <Text style={{ fontSize: 12 }}>View all Appointments</Text>
                <Entypo
                    name="chevron-small-right"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.filterIcon]}>
                <Ionicons name="ios-options" size={18} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Notifications")}
                style={[styles.bellIcon]}
            >
                <SimpleLineIcons name="bell" size={18} color="black" />
            </TouchableOpacity>
            <View style={[styles.appointmentsContent]}>
                {appointments.map((item, i) =>
                    item.status == "confirmed" ? (
                        <View
                            style={[
                                styles.appointmentCard,
                                styles.boxShadow,
                                { backgroundColor: "#FFFFFF" },
                            ]}
                            key={i}
                        >
                            <View
                                style={[styles.row, styles.appointmentInfo]}
                            >
                                <View
                                    style={[
                                        styles.row,
                                        { alignItems: "center" },
                                    ]}
                                >
                                    <Image
                                        source={item.useravatar === "" ? Images.PROFILE.AVATAR1 : { uri: `${ServerURL}users/${item.useravatar}` }}
                                        style={[styles.appointmentAvatar]}
                                    />
                                    <View
                                        style={[styles.appointmentUserInfo]}
                                    >
                                        <Text style={{ fontSize: 12 }}>
                                            {item.username}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: "#797979",
                                            }}
                                        >
                                            {item.serviceName}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12 }}>
                                        {'8:30 AM'}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: "space-between",
                                        paddingTop: 10,
                                    },
                                ]}
                            >
                                <View style={styles.row}>
                                    <TouchableOpacity>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#797979",
                                            }}
                                        >
                                            Call now
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "Detail",
                                                item
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#797979",
                                            }}
                                        >
                                            View Appointment
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "#21BE13",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.status.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    ) : item.status == "completed" ? (
                        <View
                            style={[
                                styles.appointmentCard,
                                styles.boxShadow,
                                { backgroundColor: "#00BC00" },
                            ]}
                            key={i}
                        >
                            <View
                                style={[styles.row, styles.appointmentInfo]}
                            >
                                <View
                                    style={[
                                        styles.row,
                                        { alignItems: "center" },
                                    ]}
                                >
                                    <Image
                                        source={item.useravatar === "" ? Images.PROFILE.AVATAR1 : { uri: `${ServerURL}users/${item.useravatar}` }}
                                        style={[styles.appointmentAvatar]}
                                    />
                                    <View
                                        style={[styles.appointmentUserInfo]}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {item.username}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {item.serviceName}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: "#FFFFFF",
                                            fontSize: 12,
                                        }}
                                    >
                                        {'8:30 AM'}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: "space-between",
                                        paddingTop: 10,
                                    },
                                ]}
                            >
                                <View style={styles.row}>
                                    <TouchableOpacity>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#80DE80",
                                            }}
                                        >
                                            Call now
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "Detail",
                                                item
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#80DE80",
                                            }}
                                        >
                                            View Appointment
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.status.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    ) : item.status == "rescheduled" ? (
                        <View
                            style={[
                                styles.appointmentCard,
                                styles.boxShadow,
                                { backgroundColor: "#22d3ee" },
                            ]}
                            key={i}
                        >
                            <View
                                style={[styles.row, styles.appointmentInfo]}
                            >
                                <View
                                    style={[
                                        styles.row,
                                        { alignItems: "center" },
                                    ]}
                                >
                                    <Image
                                        source={item.useravatar === "" ? Images.PROFILE.AVATAR1 : { uri: `${ServerURL}users/${item.useravatar}` }}
                                        style={[styles.appointmentAvatar]}
                                    />
                                    <View
                                        style={[styles.appointmentUserInfo]}
                                    >
                                        <Text style={{ fontSize: 12, color: "#fff" }}>
                                            {item.username}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: "#fff",
                                            }}
                                        >
                                            {item.serviceName}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, color: "#fff" }}>
                                        {'8:30 AM'}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: "space-between",
                                        paddingTop: 10,
                                    },
                                ]}
                            >
                                <View style={styles.row}>
                                    <TouchableOpacity>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#fff",
                                            }}
                                        >
                                            Call now
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "Detail",
                                                item
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#fff",
                                            }}
                                        >
                                            View Appointment
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "#131ABE",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.status.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    ) : item.status == "cancelled" ? (
                        <View
                            style={[
                                styles.appointmentCard,
                                styles.boxShadow,
                                { backgroundColor: "#FF4646" },
                            ]}
                            key={i}
                        >
                            <View
                                style={[styles.row, styles.appointmentInfo]}
                            >
                                <View
                                    style={[
                                        styles.row,
                                        { alignItems: "center" },
                                    ]}
                                >
                                    <Image
                                        source={item.useravatar === "" ? Images.PROFILE.AVATAR1 : { uri: `${ServerURL}users/${item.useravatar}` }}
                                        style={[styles.appointmentAvatar]}
                                    />
                                    <View
                                        style={[styles.appointmentUserInfo]}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {item.username}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: "#FFFFFF",
                                            }}
                                        >
                                            {item.serviceName}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text
                                        style={{
                                            color: "#FFFFFF",
                                            fontSize: 12,
                                        }}
                                    >
                                        {'8:30 AM'}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: "space-between",
                                        paddingTop: 10,
                                    },
                                ]}
                            >
                                <View style={styles.row}>
                                    <TouchableOpacity>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#FFA3A3",
                                            }}
                                        >
                                            Call now
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "Detail",
                                                item
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#FFA3A3",
                                            }}
                                        >
                                            View Appointment
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "#FFFFFF",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.status.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    ) : item.status == "upcoming" ? (
                        <View
                            style={[
                                styles.appointmentCard,
                                styles.boxShadow,
                                { backgroundColor: "#fbbf24" },
                            ]}
                            key={i}
                        >
                            <View
                                style={[styles.row, styles.appointmentInfo]}
                            >
                                <View
                                    style={[
                                        styles.row,
                                        { alignItems: "center" },
                                    ]}
                                >
                                    <Image
                                        source={item.useravatar === "" ? Images.PROFILE.AVATAR1 : { uri: `${ServerURL}users/${item.useravatar}` }}
                                        style={[styles.appointmentAvatar]}
                                    />
                                    <View
                                        style={[styles.appointmentUserInfo]}
                                    >
                                        <Text style={{ fontSize: 12, color: "#fff" }}>
                                            {item.username}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: "#fff",
                                            }}
                                        >
                                            {item.serviceName}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12, color: "#fff", }}>
                                        {'8:30 AM'}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: "space-between",
                                        paddingTop: 10,
                                    },
                                ]}
                            >
                                <View style={styles.row}>
                                    <TouchableOpacity>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#fff",
                                            }}
                                        >
                                            Call now
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate(
                                                "Detail",
                                                item
                                            )
                                        }
                                        style={{ marginLeft: 10 }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                color: "#fff",
                                            }}
                                        >
                                            View Appointment
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        fontSize: 12,
                                        color: "#21BE13",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {"PENDING".toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.appointmentCard,
                                styles.boxShadow,
                                { backgroundColor: "#FFFFFF" },
                            ]}
                            key={i}
                        >
                            <View
                                style={[styles.row, styles.appointmentInfo]}
                            >
                                <View
                                    style={[
                                        styles.row,
                                        { alignItems: "center" },
                                    ]}
                                >
                                    <View
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 50,
                                            backgroundColor: "#F7F7F7",
                                        }}
                                    ></View>
                                    <View
                                        style={[styles.appointmentUserInfo]}
                                    >
                                        <Text style={{ fontSize: 12 }}>
                                            {item.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 11,
                                                color: "#797979",
                                            }}
                                        >
                                            {item.type}
                                        </Text>
                                    </View>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 12 }}>
                                        {item.time}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    styles.row,
                                    {
                                        justifyContent: "space-between",
                                        paddingTop: 10,
                                    },
                                ]}
                            >
                                <View style={styles.row}></View>
                                <Text>{""}</Text>
                            </View>
                        </View>
                    )
                )}
            </View>
        </Box>
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
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    allComponent: {
        padding: 5,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderBottomColor: "#EEEEED",
        borderBottomWidth: 1,
        borderTopColor: "#EEEEED",
        borderTopWidth: 1,
        alignItems: "center",
    },
    appointmentsContent: {
        padding: 20,
    },
    appointmentCard: {
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginVertical: 10,
    },
    appointmentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    appointmentUserInfo: {
        marginLeft: 10,
    },
    appointmentInfo: {
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#F1F1F1",
        paddingBottom: 10,
    },
    filterIcon: {
        position: "absolute",
        top: 20,
        left: 20,
    },
    bellIcon: {
        position: "absolute",
        top: 20,
        right: 20,
    },
});

export default AppointmentHome;
