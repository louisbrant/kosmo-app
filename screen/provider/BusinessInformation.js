import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Images, ServerURL } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { shop_set } from "../../redux/actions/provider";
import { API } from "../../hooks";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, Toast } from "native-base";

const ProvidingService = ({ navigation }) => {
    const dispatch = useDispatch();

    const { session } = useSelector((state) => state.auth);
    const { pshop } = useSelector((state) => state.provider);

    const [photo, setServicePhoto] = useState(pshop ? (pshop.photo === "" ? { photo: Images.PROFILE.AVATAR1 } : { photo: { uri: `${ServerURL}shop/${pshop.photo}` } }) : { photo: Images.PROFILE.AVATAR1 });
    const [businessName, setBusinessName] = useState(pshop ? pshop.businessName : "");
    const [businessPhoneNumber, setPhoneNumber] = useState(pshop ? pshop.businessPhoneNumber : "");
    const [Description, setBusinessDescription] = useState(pshop ? pshop.Description : "");
    const [Website, setBusinessWebsite] = useState(pshop ? pshop.Website : "");
    const [FacebookURL, setBusinessFacebookURL] = useState(pshop ? pshop.FacebookURL : "");
    const [TwitterURL, setBusinessTwitterURL] = useState(pshop ? pshop.TwitterURL : "");
    const [InstagramURL, setBusinessInstagramURL] = useState(pshop ? pshop.InstagramURL : "");
    const [MedicalLicense, setBusinessMedicalLicense] = useState(pshop ? pshop.MedicalLicense : "");
    const [ValidDate, setBusinessValidDate] = useState(pshop ? pshop.ValidDate : "");
    const [Credentials, setBusinessCredentials] = useState(pshop ? pshop.Credentials : "");
    const [BoardAccredited, setBusinessBoardAccredited] = useState(pshop ? pshop.BoardAccredited : "");

    const save = () => {
        if (
            businessName &&
            businessPhoneNumber &&
            Description &&
            Website &&
            FacebookURL &&
            TwitterURL &&
            InstagramURL &&
            MedicalLicense &&
            ValidDate &&
            Credentials &&
            BoardAccredited
        ) {

            API.update_business({ email: session.email, businessName, businessPhoneNumber, Description, Website, FacebookURL, TwitterURL, InstagramURL, MedicalLicense, ValidDate, Credentials, BoardAccredited }, (data) => {
                if (data) {
                    if (typeof (photo.photo) === 'object') {
                        const xhr = new XMLHttpRequest();
                        const formData = new FormData();
                        const photos = getImages(photo)
                        for (let i = 0; i < photos.length; i++) {
                            formData.append("photo", photos[i]);
                        }
                        formData.append("email", session.email);
                        xhr.open("POST", "${ServerURL}api/shop/update_shop");
                        xhr.setRequestHeader("Content-Type", "multipart/form-data");
                        xhr.upload.onprogress = function (evt) {
                            if (evt.lengthComputable) {
                                var percentage = Math.round((evt.loaded / evt.total) * 100);
                                if (percentage === 100) {
                                    dispatch(shop_set(data));
                                    Toast.show({
                                        title: "saved correctly",
                                        status: "success",
                                    });
                                    navigation.navigate('BusinessDetail', '321')
                                }
                            }
                        };
                        xhr.send(formData);
                    } else {
                        dispatch(shop_set(data));
                        Toast.show({
                            title: "saved correctly",
                            status: "success",
                        });
                        navigation.navigate('BusinessDetail', '321');
                    }
                }
            })
            return;



        } else {
            Toast.show({
                title: "Please input valid information",
                status: "danger",
            });
        }
    };

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
            return setServicePhoto({
                photo: result,
            });
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.header}>
                        <Text style={styles.title}>Business Information</Text>
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
                    <TextInput
                        value={businessName}
                        style={styles.input}
                        placeholder="What is the name of your business?"
                        onChangeText={(val) => setBusinessName(val)}
                    />
                    <TextInput
                        value={businessPhoneNumber}
                        style={styles.input}
                        placeholder="What is your phone number?"
                        onChangeText={(val) => setPhoneNumber(val)}
                    />
                    <TextInput
                        value={Description}
                        multiline
                        numberOfLines={5}
                        style={styles.input}
                        placeholder="About business"
                        onChangeText={(val) => setBusinessDescription(val)}
                    />
                    <TextInput
                        value={Website}
                        style={styles.input}
                        placeholder="Website"
                        onChangeText={(val) => setBusinessWebsite(val)}
                    />
                    <TextInput
                        value={FacebookURL}
                        style={styles.input}
                        placeholder="Facebook URL"
                        onChangeText={(val) => setBusinessFacebookURL(val)}
                    />
                    <TextInput
                        value={TwitterURL}
                        style={styles.input}
                        placeholder="Twitter URL"
                        onChangeText={(val) => setBusinessTwitterURL(val)}
                    />
                    <TextInput
                        value={InstagramURL}
                        style={styles.input}
                        placeholder="Instagram URL"
                        onChangeText={(val) => setBusinessInstagramURL(val)}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput
                            value={MedicalLicense}
                            style={[styles.input, { width: '48%' }]}
                            placeholder="Medical license"
                            onChangeText={(val) => setBusinessMedicalLicense(val)}
                        />
                        <TextInput
                            value={ValidDate}
                            style={[styles.input, { width: '48%' }]}
                            placeholder="Valid date"
                            onChangeText={(val) => setBusinessValidDate(val)}
                        />
                    </View>
                    <TextInput
                        value={Credentials}
                        style={styles.input}
                        placeholder="Credentials"
                        onChangeText={(val) => setBusinessCredentials(val)}
                    />
                    <TextInput
                        style={styles.input}
                        value={BoardAccredited}
                        placeholder="Board accredited"
                        onChangeText={(val) => setBusinessBoardAccredited(val)}
                    />
                </SafeAreaView>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={() => save()}>
                        <LinearGradient
                            colors={["#FFB743", "#FFB743"]}
                            style={styles.modalButton}
                        >
                            <Text style={{ color: "white", fontWeight: 'bold' }}>Save</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View >
    );
};

export default ProvidingService;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        backgroundColor: "#F8F8F8",
        paddingHorizontal: 32,
    },
    serviceList: {
        width: width,
        paddingVertical: 0,
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
    subTitle: {
        fontSize: 14,
    },
    avatarContainer: {
        position: "relative",
        paddingBottom: 24,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50
    },
    button: {
        borderRadius: 26,
        marginTop: 32,
        justifyContent: "center",
        alignItems: "center",
        width: width - 64,
        height: 48,
    },
    avatarParent: {
        justifyContent: "center",
        alignItems: "center",
    },
    listItem: {
        borderRadius: 24,
        borderWidth: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: 12,
        width: width - 64,
        paddingHorizontal: 24,
        height: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    addService: {
        marginTop: 16,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {},
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 64,
        paddingHorizontal: 24,
        minHeight: 48,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    buttonGroup: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 16,
    },
    modalButton: {
        width: (width - 64),
        alignItems: "center",
        justifyContent: "center",
        height: 43,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: "#EBEBEB",
    },
});
