import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AboutShopScreen from "../screen/setupshop/AboutShop";
import AddressScreen from "../screen/setupshop/Address";
import MapScreen from "../screen/setupshop/Map";
import OpeningHoursScreen from "../screen/setupshop/OpeningHours";
import WorkPlaceScreen from "../screen/setupshop/WorkPlace";
import BusinessTypeScreen from "../screen/setupshop/BusinessType";
import ProvidingServiceScreen from "../screen/setupshop/ProvidingService";
import FinalAddingServiceScreen from "../screen/setupshop/FinalAddingService";

const Stack = createStackNavigator();

const SetupShopStack = () => {
    return (
        <Stack.Navigator mode="card">
            <Stack.Screen
                name="AboutShop"
                component={AboutShopScreen}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="Address"
                component={AddressScreen}
                options={{
                    header: () => {},
                }}  
            />
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="OpeningHours"
                component={OpeningHoursScreen}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="WorkPlace"
                component={WorkPlaceScreen}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="BusinessType"
                component={BusinessTypeScreen}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="ProvidingService"
                component={ProvidingServiceScreen}
                options={{
                    header: () => {},
                }}
            />
            <Stack.Screen
                name="FinalAddingService"
                component={FinalAddingServiceScreen}
                options={{
                    header: () => {},
                }}
            />
        </Stack.Navigator>
    );
};

export default SetupShopStack;