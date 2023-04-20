import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Images } from "../constants";

const LogoHeader = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Image source={Images.BASE.LOGO} style={{ height : 20, resizeMode : "contain"}} /> 
        </View>
    )
}

export default LogoHeader;

const { width } = Dimensions.get('screen');
const styles = StyleSheet.create({
    container : {
        width : width,
        alignItems : "center"
    }
})