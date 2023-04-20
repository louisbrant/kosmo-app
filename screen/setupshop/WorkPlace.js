import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { register_shop_store } from "../../redux/actions/provider";
import { Images } from "../../constants";
import DropdownAlert from 'react-native-dropdownalert';

const WorkPlace = ({ navigation }) => {
    let dropDownAlertRef = useRef();
    const dispatch = useDispatch();
    const [images, setImages] = useState({});

    const nextStep = () => {
        if (Object.keys(images).length === 0) {
            dropDownAlertRef.alertWithType('error', 'You have to select image at least one');
        } else {
            dispatch(
                register_shop_store({
                    workPlace: images,
                })
            );
            navigation.navigate("BusinessType");
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImages((prevState) => {
                return {
                    ...prevState,
                    [Object.keys(images).length + 1]: result,
                };
            });
        }
    };

    return (
        <ScrollView style={styles.container}>
            <DropdownAlert
                ref={(ref) => {
                    if (ref) {
                        dropDownAlertRef = ref;
                    }
                }}
            />
            <View style={styles.header}>
                <Text style={styles.title}>Show off your workplace</Text>
                <Text style={styles.subTitle}>
                    Photo will be displayed on your profile.
                </Text>
            </View>
            {Object.values(images).map((item, idx) => {
                return (
                    <Image
                        key={idx}
                        source={{ uri: item.uri }}
                        style={styles.image}
                    />
                );
            })}
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.workPlace}>
                    <Image source={Images.ICONS.ADD} style={styles.addIcon} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => nextStep()}>
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text>Continue</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default WorkPlace;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 32,
    },
    header: {
        height: 56,
        marginTop: 64,
        marginBottom: 32,
        width: width,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
    },
    subTitle: {
        fontSize: 14,
    },
    workPlace: {
        height: 150,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.5)",
        borderStyle: "dashed",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: width - 64,
        height: 150,
        marginBottom: 16,
        resizeMode: "cover",
        borderRadius: 28,
    },
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
        marginBottom: 32,
    },
});
