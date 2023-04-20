import React, { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";
import { Calendar } from 'react-native-calendars';
import { useDispatch } from "react-redux";
import { appoint_set } from "../../redux/actions/provider";
import { API } from "../../hooks";
import DropdownAlert from 'react-native-dropdownalert';
import { View } from "native-base";
const { width } = Dimensions.get('screen');

const AppointmentReschedule = ({ navigation, route }) => {
    let dropDownAlertRef = useRef();
    const dispatch = useDispatch();
    const [selectedDay, setSelectedDay] = useState(route.params.serviceDate);
    const { session } = useSelector((state) => state.auth);
    const [markedDates, setMarkedDates] = useState({
        [route.params.serviceDate]: {
            selected: true
        }
    });

    const changebook = () => {
        let bookData = route.params;
        bookData.serviceDate = selectedDay;
        bookData.serviceUser = session.email;

        switch (route.params.type) {
            case "rebook":
                bookData.status = 'rescheduled';
                delete bookData._id;
                API.book(bookData, (data) => {
                    if (data.status) {
                        dropDownAlertRef.alertWithType('success', 'Successfully rescheduled');
                        navigation.navigate("Appointments");
                        return;
                    } else {
                        dropDownAlertRef.alertWithType('error', data.message);
                        return;
                    }
                })
                break;
            case "cancel":
                bookData.status = 'upcoming';
                API.changebook(bookData, (data) => {
                    dropDownAlertRef.alertWithType('success', 'Successfully rescheduled');
                    dispatch(appoint_set(data))
                    navigation.navigate("Appointments");
                })
                break;

            default:
                bookData.status = 'completed';
                break;
        }



    }

    return (
        <View style={styles.container}>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Reschedule Appointment</Text>
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
                            }
                        });
                        setSelectedDay(day.dateString);
                    }}
                />
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={() => changebook()}>
                    <LinearGradient
                        colors={['#FFB743', '#FFB743']}
                        style={styles.continueButton}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AppointmentReschedule;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        justifyContent: "space-between"
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
    buttonGroup: {
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingVertical: 16,
        width: width - 32
    },
    continueButton: {
        width: width - 32,
        alignItems: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
    buttonText: {
        color: "white",
    }
});