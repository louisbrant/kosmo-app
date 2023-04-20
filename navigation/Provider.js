import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Screens
import AppointmentHome from "../screen/provider/AppointmentHome";
import AppointmentFilter from "../screen/provider/AppointmentFilter";
import AppointmentDetailAdmin from "../screen/provider/AppointmentDetailAdmin";
import AppointmentFilterChooseClient from "../screen/provider/AppointmentFilterChooseClient";
import AppointmentAll from "../screen/provider/AppointmentAll";
import Notifications from "../screen/provider/Notifications";
import Explore from "../screen/provider/Explore";
import ExploreDetail from "../screen/provider/ExploreDetail";
import More from "../screen/provider/More";
import AccountDetail from "../screen/customer/AccountDetail";
import AccountEdit from "../screen/customer/AccountEdit";
import TermCondition from "../screen/customer/TermsAndConditions";
import AboutUs from "../screen/customer/AboutUs";
import BusinessDetail from "../screen/provider/BusinessDetail";
import BusinessInformation from "../screen/provider/BusinessInformation";
import BusinessAddress from "../screen/provider/BusinessAddress";
import OpeningHours from "../screen/provider/OpeningHours";
import Categories from "../screen/provider/Categories";
import Services from "../screen/provider/Services";
import Map from "../screen/provider/Map";
import WorkPlace from "../screen/provider/WorkPlace";

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
                component={AppointmentHome}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="Detail"
                component={AppointmentDetailAdmin}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Filter"
                component={AppointmentFilter}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="FilterChooseClient"
                component={AppointmentFilterChooseClient}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="All"
                component={AppointmentAll}
                options={{
                    header: () => {},
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
                component={Explore}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="ExploreDetail"
                component={ExploreDetail}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};

const MoreStack = (props) => {
    return (
        <Stack.Navigator mode="card">
            <Stack.Screen
                name="MORE"
                component={More}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="AccountDetail"
                component={AccountDetail}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="AccountEdit"
                component={AccountEdit}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="BusinessDetail"
                component={BusinessDetail}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="TermCondition"
                component={TermCondition}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="BusinessInformation"
                component={BusinessInformation}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="BusinessAddress"
                component={BusinessAddress}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="OpeningHours"
                component={OpeningHours}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Categories"
                component={Categories}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Services"
                component={Services}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="Map"
                component={Map}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
            <Stack.Screen
                name="WorkPlace"
                component={WorkPlace}
                options={{
                    title: "",
                    headerTransparent: true,
                }}
            />
        </Stack.Navigator>
    );
};


const ProviderStack = () => {
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
                name="Appointments"
                component={HomeStack}
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
                name="MORE"
                component={MoreStack}
                options={{
                    tabBarIcon: ({ focused, color, size }) => {
                        if (focused) {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.MORE_ACTIVE}
                                />
                            );
                        } else {
                            return (
                                <Image
                                    style={styles.tabBarIcon}
                                    source={Images.ICONS.MORE}
                                />
                            );
                        }
                    },
                }}
            />
        </Tab.Navigator>
    );
};

export default ProviderStack;

const styles = StyleSheet.create({
    tabBarIcon: {
        height: 24,
        width: 24,
        resizeMode: "contain",
        marginBottom: 8
    },
});
