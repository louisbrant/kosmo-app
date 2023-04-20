import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import { Toast } from "native-base";
import moment from "moment";
import { API } from "../../hooks";

const BookAppointment = ({ navigation, route }) => {
    let Dt = new Date();
    Dt.setDate(Dt.getDate() + 1);
    const [selectedDay, setSelectedDay] = useState(new Date().toJSON().slice(0, 10));
    const [markedDates, setMarkedDates] = useState({
        [new Date().toJSON().slice(0, 10)]: {
            selected: true,
        },
    });

    const getDaysInMonth = (month, year, days) => {
        let pivot = moment().month(month).year(year).startOf('month')
        const end = moment().month(month).year(year).endOf('month')

        let dates = {}
        const disabled = { disabled: true }
        while (pivot.isBefore(end)) {
            days.forEach((day) => {
                dates[pivot.day(day).format("YYYY-MM-DD")] = disabled
            })
            pivot.add(7, 'days')
        }

        return dates
    }

    const confirm = () => {
        let bookDate = Object.assign(route.params.bookData, { serviceDate: selectedDay });;

        API.book(bookDate, (data) => {
            if (data.status) {
                navigation.navigate("AppointmentConfirm", {
                    bookData: bookDate,
                });
                return;
            } else {
                Toast.show({
                    title: data.message,
                    status: "danger",
                });
                return;
            }
        });
        return;
    };

    useEffect(() => {
        API.getShopList({ _id: route.params.bookData.serviceid }, (data) => {
        });
    }, [route])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Book an Appointment</Text>
            </View>
            <View style={styles.calendar}>
                <Calendar
                    minDate={new Date().toJSON()}
                    current={selectedDay}
                    enableSwipeMonths={true}
                    showWeekNumbers={false}
                    markedDates={markedDates}
                    theme={{
                        backgroundColor: "transparent",
                        calendarBackground: "transparent",
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                        selectedDayBackgroundColor: "#FFB743",
                    }}
                    onDayPress={(day) => {
                        setMarkedDates({
                            [day.dateString]: {
                                selected: true,
                            },
                        });
                        setSelectedDay(day.dateString);
                    }}
                />
            </View>
            <View style={styles.noteContainer}>
                <Text style={styles.noteText}>Services Book Detail</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceType}>
                    {route.params.bookData.serviceName}
                </Text>
                <View>
                    <Text style={styles.priceValue}>
                        {route.params.bookData.servicePrice}
                    </Text>
                    <Text style={styles.priceTime}>
                        {route.params.bookData.serviceDuaration}
                    </Text>
                </View>
            </View>
            <View style={styles.bookButtonContainer}>
                <TouchableOpacity onPress={() => confirm()}>
                    <LinearGradient
                        colors={["#FFB743", "#FFB743"]}
                        style={styles.bookButton}
                    >
                        <Text style={styles.buttonText}>Book</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default BookAppointment;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 56,
        width: width,
        marginTop: 28,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
    },
    calendar: {
        width: width,
        paddingHorizontal: 32,
    },
    buttonGroup: {
        justifyContent: "flex-start",
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 16,
        width: width - 32,
    },
    button: {
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        marginRight: 8,
        height: 27,
    },
    navButton: {
        backgroundColor: "#fff",
        borderColor: "#707070",
        borderWidth: 1,
        borderRadius: 21,
    },
    navButtonText: {
        fontSize: 10,
        paddingHorizontal: 2,
    },
    buttonWithIcon: {
        flexDirection: "row",
        alignItems: "center",
    },
    active: {
        color: "#FFFFFF",
    },
    noteContainer: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginTop: 16,
        borderTopColor: "rgba(112, 112, 112, 0.2)",
        borderTopWidth: 1,
        borderBottomColor: "rgba(112, 112, 112, 0.2)",
        borderBottomWidth: 1,
    },
    noteText: {
        fontSize: 12,
        textAlign: "center",
        color: "rgba(0, 0, 0, .5)",
    },
    priceContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 40,
        paddingVertical: 16,
    },
    priceType: {
        fontSize: 16,
    },
    priceValue: {
        fontSize: 16,
    },
    priceTime: {
        fontSize: 11,
    },
    bookButtonContainer: {
        marginTop: 16,
        marginBottom: 16,
    },
    bookButton: {
        width: width - 64,
        height: 44,
        marginHorizontal: 32,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
});
