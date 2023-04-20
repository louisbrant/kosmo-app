import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Images, ServerURL } from "../../constants";
import { API } from "../../hooks";

const Home = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [shop, setShops] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    const handleActiveTab = (newTab) => {
        setActiveTab(newTab);
    };
    const checkType = (types) => {
        switch (activeTab) {
            case 0: {
                if (types.Skin) {
                    return true;
                } else {
                    return false;
                }
            }
            case 1: {
                if (types.Teeth) {
                    return true;
                } else {
                    return false;
                }
            }
            case 2: {
                if (types.Nurse) {
                    return true;
                } else {
                    return false;
                }
            }
            case 3: {
                if (types.Hair) {
                    return true;
                } else {
                    return false;
                }
            }
            case 4: {
                if (types.Eye) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    };
    useEffect(() => {
        API.getShopList({}, (data) => {
            setShops(data);
        });
    }, [API]);
    return (
        <View style={styles.container}>
            <Image source={Images.BASE.LOGO} style={styles.logo} />
            <SafeAreaView style={styles.inputRoot}>
                <TextInput style={styles.input} onChangeText={val => setSearchKey(val)} placeholder="Search" />
                <Image source={Images.ICONS.SEARCH} style={styles.inputIcon} />
            </SafeAreaView>
            <View style={styles.navList}>
                <TouchableOpacity onPress={() => handleActiveTab(0)}>
                    <View
                        style={[
                            styles.navItem,
                            activeTab === 0 && styles.navItemActive,
                        ]}
                    >
                        <Image
                            source={
                                activeTab === 0
                                    ? Images.HOME.NAVITEM01WHITE
                                    : Images.HOME.NAVITEM01YELLOW
                            }
                            style={styles.navItemIcon}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActiveTab(1)}>
                    <View
                        style={[
                            styles.navItem,
                            activeTab === 1 && styles.navItemActive,
                        ]}
                    >
                        <Image
                            source={
                                activeTab === 1
                                    ? Images.HOME.NAVITEM02WHITE
                                    : Images.HOME.NAVITEM02YELLOW
                            }
                            style={styles.navItemIcon}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActiveTab(2)}>
                    <View
                        style={[
                            styles.navItem,
                            activeTab === 2 && styles.navItemActive,
                        ]}
                    >
                        <Image
                            source={
                                activeTab === 2
                                    ? Images.HOME.NAVITEM03WHITE
                                    : Images.HOME.NAVITEM03YELLOW
                            }
                            style={styles.navItemIcon}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActiveTab(3)}>
                    <View
                        style={[
                            styles.navItem,
                            activeTab === 3 && styles.navItemActive,
                        ]}
                    >
                        <Image
                            source={
                                activeTab === 3
                                    ? Images.HOME.NAVITEM04WHITE
                                    : Images.HOME.NAVITEM04YELLOW
                            }
                            style={styles.navItemIcon}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleActiveTab(4)}>
                    <View
                        style={[
                            styles.navItem,
                            activeTab === 4 && styles.navItemActive,
                        ]}
                    >
                        <Image
                            source={
                                activeTab === 4
                                    ? Images.HOME.NAVITEM05WHITE
                                    : Images.HOME.NAVITEM05YELLOW
                            }
                            style={styles.navItemIcon}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.serviceList}>
                {shop.map((item, idx) => {
                    if (item.businessName.toLowerCase().search(searchKey.toLowerCase()) === -1 && searchKey !== '') {
                        return <React.Fragment key={idx} />;
                    } else {
                        return (
                            <View
                                key={idx}
                                style={
                                    !checkType(item.businessType)
                                        ? [{ display: "none" }, styles.serviceCard]
                                        : styles.serviceCard
                                }
                            >
                                <TouchableOpacity
                                    onPress={() =>
                                        navigation.navigate("Detail", item)
                                    }
                                >
                                    <Image
                                        source={{
                                            uri: `${ServerURL}shop/${item.workPlace[0]}`,
                                        }}
                                        style={styles.serviceImage}
                                    />
                                    <View style={styles.serviceDescription}>
                                        <View>
                                            <Text style={styles.serviceDescTitle}>
                                                {item.businessName}
                                            </Text>
                                            <View
                                                style={styles.serviceDescWithIcon}
                                            >
                                                <Image
                                                    source={Images.ICONS.LOCATION}
                                                    style={styles.serviceDescIcon}
                                                />
                                                <Text
                                                    style={
                                                        styles.serviceDescContact
                                                    }
                                                >
                                                    {item.location}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                })}
            </ScrollView>
        </View>
    );
};

export default Home;

const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        justifyContent: "space-evenly",
    },
    active: {
        color: "#FFFFFF",
    },
    logo: {
        height: 20,
        resizeMode: "contain",
        marginVertical: 4,
        marginBottom: 16,
    },
    inputRoot: {
        position: "relative",
        padding: 0,
    },
    input: {
        borderRadius: 24,
        borderWidth: 2,
        fontSize: 12,
        width: width - 32,
        paddingHorizontal: 24,
        paddingLeft: 48,
        height: 43,
        borderColor: "#EBEBEB",
        backgroundColor: "#fff",
        marginVertical: 4,
    },
    inputIcon: {
        position: "absolute",
        width: 16,
        height: 16,
        top: 51 / 2 - 8,
        left: 18,
        zIndex: 2,
    },
    navList: {
        marginVertical: 16,
        width: width - 32,
        flexDirection: "row",
    },
    navItemActive: {
        backgroundColor: "#D97C2B",
    },
    navItem: {
        width: (width - 32 - 11 * 4) / 5,
        height: (width - 32 - 11 * 4) / 5,
        backgroundColor: "#fff",
        borderRadius: 50,
        marginRight: 11,
        justifyContent: "center",
        alignItems: "center",
    },
    navItemIcon: {
        width: (width - 32 - 11 * 4) / 5 / 2,
        height: (width - 32 - 11 * 4) / 5 / 2,
        resizeMode: "contain",
    },
    buttonGroup: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingVertical: 16,
        paddingTop: 0,
        width: width - 32,
    },
    button: {
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        height: 27,
    },
    navButton: {
        backgroundColor: "#fff",
        borderColor: "#707070",
        borderWidth: 1,
        borderRadius: 21,
    },
    navButtonText: {
        fontSize: 10,
        paddingHorizontal: 2,
    },
    icon: {
        width: 10,
        height: 10,
        resizeMode: "contain",
    },
    buttonWithIcon: {
        flexDirection: "row",
        alignItems: "center",
    },
    serviceList: {
        width: width,
        marginTop: 8,
        paddingVertical: 0,
    },
    serviceCard: {
        marginBottom: 16,
        marginHorizontal: 16,
        padding: 8,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    serviceImage: {
        width: "100%",
        height: 180,
        borderRadius: 10,
    },
    serviceDescription: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: "rgba(0,0,0,.35)",
        flexDirection: "row",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        alignItems: "center",
    },
    serviceDescTitle: {
        fontSize: 16,
        marginTop: 8,
        paddingVertical: 4,
        color: "#fff",
    },
    serviceDescType: {
        fontSize: 10,
        paddingVertical: 2,
    },
    serviceDescWithIcon: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 8,
    },
    serviceDescIcon: {
        width: 8,
        resizeMode: "contain",
    },
    serviceDescContact: {
        fontSize: 10,
        color: "#ddd",
        paddingHorizontal: 4,
    },
    serviceLikeIconContainer: {
        width: 31,
        height: 31,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 116,
        borderWidth: 1,
        borderColor: "#D6D5D5",
    },
    rightIcon: {
        width: 16,
        height: 16,
        resizeMode: "contain",
    },
});
