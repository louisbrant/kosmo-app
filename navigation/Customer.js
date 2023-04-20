import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screen/customer/Home";
import ExploreScreen from "../screen/customer/Explore";
import AppointmentsScreen from "../screen/customer/Appointments";
import FavouritesScreen from "../screen/customer/Favourites";
import ProfileScreen from "../screen/customer/Profile";
import HomeDetailScreen from "../screen/customer/HomeDetail";
import BookAppointmentScreen from "../screen/customer/BookAppointment";
import AppointmentConfirmScreen from "../screen/customer/AppointmentConfirm";
import AppointmentDetailScreen from "../screen/customer/AppointmentDetail";
import AppointmentRescheduleScreen from "../screen/customer/AppointmentReschedule";
import ReBookScreen from "../screen/customer/ReBook";
import TermsAndConditionsScreen from "../screen/customer/TermsAndConditions";
import AboutUsScreen from "../screen/customer/AboutUs";
import AccountDetailScreen from "../screen/customer/AccountDetail";
import AccountEditScreen from "../screen/customer/AccountEdit";

// Import Components
import { Image, StyleSheet } from "react-native";
import { Images } from "../constants";

// Define Navigatorsd
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = (props) => {
    return (
        <Stack.Navigator mode="card">
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="Detail"
                component={HomeDetailScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="BookAppointment"
                component={BookAppointmentScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="AppointmentConfirm"
                component={AppointmentConfirmScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};

const ExploreStack = (props) => {
    return (
        <Stack.Navigator mode="card">
            <Stack.Screen
                name="Explore"
                component={ExploreScreen}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="Detail"
                component={HomeDetailScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};


const FavStack = (props) => {
    return (
        <Stack.Navigator mode="card">
            <Stack.Screen
                name="Favourites"
                component={FavouritesScreen}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="Detail"
                component={HomeDetailScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="BookAppointment"
                component={BookAppointmentScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="AppointmentConfirm"
                component={AppointmentConfirmScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="AccountDetail"
                component={AccountDetailScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="AccountEdit"
                component={AccountEditScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditionsScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="AboutUs"
                component={AboutUsScreen}
                options={{
                    header: () => { },
                }}
            />
        </Stack.Navigator>
    );
};

const AppointmentsStack = () => {
    return (
        <Stack.Navigator mode="card">
            <Stack.Screen
                name="Appointments"
                component={AppointmentsScreen}
                options={{
                    header: () => { },
                }}
            />
            <Stack.Screen
                name="AppointmentDetail"
                component={AppointmentDetailScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="AppointmentReschedule"
                component={AppointmentRescheduleScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="ReBook"
                component={ReBookScreen}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};

const CustomerStack = (props) => {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#000000",
                inactiveTintColor: "#959595",
                style: {
                    height: 64,
                },
                tabStyle: {
                    height: 64,
                    paddingVertical: 12,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.HOME_ACTIVE}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.HOME}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Explore"
                component={ExploreStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.EXPLORE_ACTIVE}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.EXPLORE}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Appointments"
                component={AppointmentsStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.APPOINTMENTS_ACTIVE}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.APPOINTMENTS}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Favourites"
                component={FavStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.FAVOURITES_ACTIVE}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.FAVOURITES}
                                />
                            );
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.PROFILE_ACTIVE}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.PROFILE}
                                />
                            );
                        }
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default CustomerStack;

const styles = StyleSheet.create({
    tabBarIcon: {
        height: 24,
        width: 24,
        resizeMode: "contain",
        marginBottom: 8,
    },
});
