import React, { useState } from "react";
import { StatusBar, Image, LogBox } from "react-native";
import { Asset } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { Images } from "./constants";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { LinearGradient } from 'expo-linear-gradient'
import { extendTheme, NativeBaseProvider } from "native-base"

// Import Screens
import Router from "./navigation/Router";
// Import Providers
import { Provider } from "react-redux";

// ** Initialize Store
import configureStore from "./redux/store";

const config = {
    dependencies: { 'linear-gradient': LinearGradient }
}

LogBox.ignoreLogs([`Unexpected HTTP code Response`, `Can't perform a React`, `source.uri should`, `Node of type`, `Image URL`, `Please pass alt`, `VirtualizedLists should`, `The contrast ratio of`, `Online fetched source`])

const App = () => {
    const store = configureStore({});
    // Define States
    const [isLoading, setIsLoading] = useState(true);
    // Import Assets
    const assetImages = [Images.BASE.LOGO];
    // Define Actions
    const cacheImages = (images) => {
        return images.map((image) => {
            if (typeof image === "string") {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    };
    const _loadResourcesAsync = async () => {
        return await Promise.all([
            ...cacheImages(assetImages),
            Font.loadAsync({
                MontserratBold: require("./assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
                Montserrat: require("./assets/fonts/Montserrat/Montserrat-Regular.ttf"),
            }),
        ]);
    };
    const _handleLoadingError = (error) => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };
    const _handleFinishLoading = () => {
        setIsLoading(false);
    };
    const theme = extendTheme({
        components: {
            Toast: {
                baseStyle: {
                    margin: "20px"
                },
                defaultProps: {},
                variants: {},
                sizes: {},
            }
        }
    })
    // Render App
    if (isLoading) {
        return (
            <AppLoading
                startAsync={_loadResourcesAsync}
                onError={_handleLoadingError}
                onFinish={_handleFinishLoading}
            />
        );
    } else {
        return (
            <NativeBaseProvider config={config} theme={theme}>
                <NavigationContainer>
                    <Provider store={store}>
                        <StatusBar barStyle="default" />
                        <Router />
                    </Provider>
                </NavigationContainer>
            </NativeBaseProvider>
        );
    }
};
export default App;
