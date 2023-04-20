import React, { useEffect, useState } from "react";
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
import { useDispatch,useSelector } from "react-redux";
import { register_shop_store } from "../../redux/actions/provider";
import { Images, ServerURL } from "../../constants";
import { Toast } from "native-base";

const WorkPlace = ({ navigation }) => {
    const dispatch = useDispatch();

    const { session } = useSelector((state) => state.auth);
    const { pshop } = useSelector((state) => state.provider);

    const [images, setImages] = useState({});

    const save = () => {
        if (Object.keys(images).length === 0) {
            Toast.show({
                title: "You have to select image at least one",
                status: "danger",
            });
        } else {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();
            const photos = getImages(images)
            for (let i = 0; i < photos.length; i++) {
                formData.append("photo", photos[i]);
            }
            formData.append("email", session.email);
            formData.append("type", JSON.stringify(pshop.workPlace));
            xhr.open("POST", "http://192.168.114.48:10040/api/shop/update_shop");
            xhr.setRequestHeader("Content-Type", "multipart/form-data");
            xhr.send(formData);
            navigation.navigate("BusinessDetail", '123');
        }
    };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert(
                        "Sorry, we need camera roll permissions to make this work!"
                    );
                }
            }
        })();
    }, []);

    const getImages = (para) => {
        const array = [];
        for (let i in para) {
            const uri = para[i].uri;
            const name = uri.split("/").pop();
            const match = /\.(\w+)$/.exec(name);
            const type = match ? `image/${match[1]}` : `image`;
            array.push({
                uri, name, type
            });
        }
        return array;
    }

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
            <View style={styles.header}>
                <Text style={styles.title}>Work Place</Text>
            </View>
            <View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>Show off your workplace</Text>
            </View>
            
            {pshop ? pshop.workPlace.map((item, idx) => {
                return (
                    <Image
                        key={idx}
                        source={{ uri: `${ServerURL}shop/${item}` }}
                        style={styles.image}
                    />
                );
            }) : null }
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
            <TouchableOpacity onPress={() => save()}>
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>Save</Text>
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
        // marginBottom: 12,
        width: width / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
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
