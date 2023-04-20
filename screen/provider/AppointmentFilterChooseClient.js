import React, { useState } from "react";
import {
    Container,
    Content,
    Header,
    Icon,
    Input,
    Item,
    View,
} from "native-base";
import {
    Dimensions,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import { Images } from "../../constants";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";

const AppointmentHome = ({ navigation }) => {
    const [isSearch, setIsSearch] = useState(false);
    return (
        <Container>
            <Header style={[styles.header, styles.boxShadow]}>
                <StatusBar barStyle="dark-content" backgroundColor="#F8F8F7" />
                {isSearch ? (
                    <TouchableOpacity onPress={() => setIsSearch(false)}>
                        <AntDesign
                            name="closecircle"
                            size={20}
                            color="#6B6864"
                            style={[{ width: 30, marginLeft: 10 }]}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity>
                        <Entypo
                            name="chevron-thin-left"
                            size={12}
                            color="#6B6864"
                            style={[{ width: 30, marginLeft: 10 }]}
                        />
                    </TouchableOpacity>
                )}
                {isSearch ? (
                    <Item style={{ borderColor: "transparent", flex: 1 }}>
                        <Input
                            placeholder="Search Client"
                            style={styles.searchInput}
                        />
                        <AntDesign
                            name="search1"
                            size={18}
                            color="#6B6864"
                            style={{ position: "absolute", right: 20 }}
                        />
                    </Item>
                ) : (
                    <React.Fragment>
                        <Text
                            style={[{ color: "#061128", fontSize: 18 }]}
                        >{`Choose Client`}</Text>
                        <TouchableOpacity onPress={() => setIsSearch(true)}>
                            <AntDesign
                                name="search1"
                                size={18}
                                color="#6B6864"
                                style={{ marginRight: 20 }}
                            />
                        </TouchableOpacity>
                    </React.Fragment>
                )}
            </Header>
            <Content style={styles.content}>
                <View style={[styles.appointmentInfoCard, styles.boxShadow3]}>
                    <View style={styles.appointmentInfoCardHeader}>
                        <Image
                            source={Images.PROFILE.AVATAR1}
                            style={{ width: 56, height: 56, borderRadius: 50 }}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.userName}>Cherry Blossom</Text>
                            <Text style={styles.userPhone}>
                                +1 909 3123 322
                            </Text>
                            <Text style={styles.userPhone}>
                                cherry@gmail.com
                            </Text>
                        </View>
                    </View>
                    <View style={styles.appointmentInfoCardFooter}>
                        <View
                            style={[
                                styles.row,
                                { alignItems: "center", marginBottom: 10 },
                            ]}
                        >
                            <MaterialIcons
                                name="cake"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                12 Jan 1996
                            </Text>
                        </View>
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <MaterialIcons
                                name="location-on"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                Main Street, New York, 400001
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.appointmentInfoCard, styles.boxShadow3]}>
                    <View style={styles.appointmentInfoCardHeader}>
                        <Image
                            source={Images.PROFILE.AVATAR}
                            style={{ width: 56, height: 56, borderRadius: 50 }}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.userName}>Sofia Jenner</Text>
                            <Text style={styles.userPhone}>
                                +1 909 3123 322
                            </Text>
                            <Text style={styles.userPhone}>
                                sofia@gmail.com
                            </Text>
                        </View>
                    </View>
                    <View style={styles.appointmentInfoCardFooter}>
                        <View
                            style={[
                                styles.row,
                                { alignItems: "center", marginBottom: 10 },
                            ]}
                        >
                            <MaterialIcons
                                name="cake"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                12 Jan 1998
                            </Text>
                        </View>
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <MaterialIcons
                                name="location-on"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                Main Street, New York, 400001
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.appointmentInfoCard, styles.boxShadow3]}>
                    <View style={styles.appointmentInfoCardHeader}>
                        <Image
                            source={Images.PROFILE.AVATAR2}
                            style={{ width: 56, height: 56, borderRadius: 50 }}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.userName}>Chris Anthemum</Text>
                            <Text style={styles.userPhone}>
                                +1 909 3123 322
                            </Text>
                            <Text style={styles.userPhone}>
                                chris@gmail.com
                            </Text>
                        </View>
                    </View>
                    <View style={styles.appointmentInfoCardFooter}>
                        <View
                            style={[
                                styles.row,
                                { alignItems: "center", marginBottom: 10 },
                            ]}
                        >
                            <MaterialIcons
                                name="cake"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                12 Jan 1995
                            </Text>
                        </View>
                        <View style={[styles.row, { alignItems: "center" }]}>
                            <MaterialIcons
                                name="location-on"
                                size={20}
                                color="#7F7F7F"
                            />
                            <Text
                                style={{
                                    color: "#7F7F7F",
                                    marginLeft: 5,
                                    fontSize: 13,
                                }}
                            >
                                Main Street, New York, 400001
                            </Text>
                        </View>
                    </View>
                </View>
            </Content>
        </Container>
    );
};

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 0,
    },
    boxShadow3: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    header: {
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8F8F7",
    },
    content: {
        padding: 20,
        paddingTop: 0,
        backgroundColor: "#F8F8F7",
    },
    appointmentStatus: {
        color: "#21BE13",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
    },
    appointmentInfoCard: {
        borderRadius: 15,
        marginVertical: 10,
        backgroundColor: "#FFFFFF",
        marginHorizontal: 2,
    },
    appointmentInfoCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#E9E9E9",
        borderBottomWidth: 1,
        padding: 15,
    },
    appointmentInfoCardFooter: {
        padding: 15,
    },
    userName: {
        fontSize: 14,
    },
    userPhone: {
        fontSize: 12,
        color: "#7F7F7F",
    },
    searchInput: {
        fontSize: 13,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#7F7F7F",
        height: 30,
        paddingHorizontal: 20,
        marginRight: 10,
        paddingLeft: 15,
    },
});

export default AppointmentHome;
