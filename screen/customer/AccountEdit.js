import React, { useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    Image,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Images, ServerURL } from "../../constants";
import isEmail from "validator/lib/isEmail";
import { useDispatch } from "react-redux";
import { session_store } from "../../redux/actions/auth";
import { API } from "../../hooks";
import { Toast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";

const AccountEdit = ({ navigation }) => {
    const { session } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [photo, setPhoto] = useState(session ? (!session.avatar || session.avatar === "" ? { photo: Images.PROFILE.AVATAR1 } : { photo: { uri: `${ServerURL}users/${session.avatar}` } }) : { photo: Images.PROFILE.AVATAR1 });
    const [name, setName] = useState(session.username);
    const [password, setPass] = useState('');
    const [phone, setPhone] = useState(session.phone);
    const [saveState, setsaveState] = useState(0);
    const validatePassword = (password) => {
        if (password === "" || password.length <= 8) {
            return false;
        } else {
            return true;
        }
    };
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            return setPhoto({
                photo: result,
            });
        }
    };

    const save = () => {
        if (saveState === 1) {
            return;
        }
        const isValidPassword = validatePassword(password);
        if (name === '') {
            Toast.show({
                title: "Name is invalid!",
                status: "danger",
            });
            return;
        }

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        if (typeof (photo.photo) === 'object') {
            const photos = getImages(photo)
            for (let i = 0; i < photos.length; i++) {
                formData.append("photo", photos[i]);
            }
        }
        if (password !== "") {
            if (isValidPassword) {
                formData.append("password", password);
            } else {
                Toast.show({
                    title: "Password should be more than 8 digit",
                    status: "danger",
                });
                return;
            }
        }
        formData.append("username", name);
        formData.append("phone", phone);
        formData.append("email", session.email);
        xhr.open("POST", `${ServerURL}api/users/editacount`);
        xhr.setRequestHeader("Content-Type", "multipart/form-data");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                API.editacount({ email: session.email }, (data) => {
                    dispatch(session_store(data));
                    navigation.navigate("AccountDetail");
                })
            }
        }
        xhr.send(formData);
        setsaveState(1);

    }

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

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                flex: 1,
                paddingBottom: 32,
                justifyContent: "space-between",
            }}
        >
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>Edit Account</Text>
                </View>
                <View style={styles.avatarParent}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={photo.photo}
                            style={styles.avatar}
                        />
                        <View style={styles.cameraContainer}>
                            <TouchableOpacity onPress={() => pickImage()}>
                                <Image
                                    source={Images.ICONS.CAMERA}
                                    style={styles.camera}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
            <SafeAreaView>
                <TextInput style={styles.input} onChangeText={val => setName(val)} value={name} placeholder="Your Name" />
                <TextInput style={styles.input} onChangeText={val => setPhone(val)} value={phone} placeholder="Phone Number" />
                <TextInput style={styles.input} onChangeText={val => setPass(val)} secureTextEntry placeholder="New Password" />
            </SafeAreaView>
            <TouchableOpacity
                onPress={() => save()}
            >
                <LinearGradient
                    colors={["#FFB743", "#FFB743"]}
                    style={styles.button}
                >
                    <Text style={[styles.buttonText]}>Save</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AccountEdit;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F7",
    },
    header: {
        height: 56,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
    },
    avatarParent: {
        justifyContent: "center",
        alignItems: "center",
    },
    avatarContainer: {
        position: "relative",
        paddingBottom: 24,
    },
    avatar: {
        width: 152,
        height: 152,
        borderRadius: 150
    },
    cameraContainer: {
        width: 37,
        height: 37,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        borderRadius: 37,
        left: 152 / 2 - 37 / 2,
        bottom: -37 / 2 + 24,
        zIndex: 2,
        borderColor: "#E2E2E2",
        borderWidth: 1,
    },
    camera: {
        width: 17.75,
        height: 14.52,
        resizeMode: "contain",
    },
    statusContainer: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 4,
        marginBottom: 16,
    },
    status: {
        fontSize: 14,
        color: "#21BE13",
        textTransform: "uppercase",
    },
    button: {
        height: 46,
        width: width - 32,
        marginHorizontal: 16,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 32,
        paddingHorizontal: 24,
        marginHorizontal: 16,
        height: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
});
