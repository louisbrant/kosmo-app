import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProviderStack from "./Provider";
import SetupShopStack from "./SetupShop";
import CustomerStack from "./Customer";

// Import Screens
import OnBoardingScreen from "../screen/customer/OnBoarding";
import LogInScreen from "../screen/customer/LogIn";
import SignUpScreen from "../screen/customer/SignUp";

import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const Router = () => {
    const { session, isSession } = useSelector((state) => state.auth);
    if (isSession) {
        switch (session.roles) {
            case "provider": {
                return (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="ProviderStack"
                            component={ProviderStack}
                            options={{
                                header: () => { },
                            }}
                        />
                    </Stack.Navigator>
                );
            }
            case "customer": {
                return (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="CustomerStack"
                            component={CustomerStack}
                            options={{
                                header: () => { },
                            }}
                        />
                    </Stack.Navigator>
                );
            }
            default: {
                return <></>;
            }
        }
    } else {
        return (
            <Stack.Navigator mode="card">
                <Stack.Screen
                    name="OnBoardingScreen"
                    component={OnBoardingScreen}
                    options={{
                        header: () => { },
                    }}
                />
                <Stack.Screen
                    name="LogIn"
                    component={LogInScreen}
                    options={{
                        header: () => { },
                    }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                        header: () => { },
                    }}
                />
                <Stack.Screen
                    name="SetupShopStack"
                    component={SetupShopStack}
                    options={{
                        title: "",
                        header: () => { },
                        headerTransparent: true,
                    }}
                />
            </Stack.Navigator>
        );
    }

};

export default Router;
