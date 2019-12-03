import React from 'react';
import { DrawerActions } from 'react-navigation-drawer'
import {
    TouchableOpacity,
    Text,
    View,
    Modal,
    TextInput,
    FlatList,
    Dimensions,
    Animated,
    Image,
    ScrollView
} from 'react-native'

import { styles } from "./styles/styles";

import {
    left_arrow_icon
} from "../shared/icons";

const icon_size = 39
const icon_color = "#BDBDBD"

export default class SignUpScreen extends React.PureComponent {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return ({
            header: null,
            swipeable: false
        })
    }

    _goBack = () => {
        this.props.navigation.navigate("SignInSignUp")
    }

    _goToSignInScreen = () => {
        this.props.navigation.navigate("SignInScreen")
    }

    render() {
        return (
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: 32
                }}
                scrollEnabled={false}
                keyboardDismissMode="on-drag"
            >
                <View
                    style={{
                        marginTop: 45
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: icon_size,
                        }}

                        onPress={this._goBack}
                    >
                        {left_arrow_icon(icon_size, icon_color)}
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        marginTop: 15,
                    }}
                >
                    <Text
                        style={styles.title_text}
                    >
                        Sign
                    </Text>
                    <Text
                        style={styles.title_text}
                    >
                        Up
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 53,
                    }}
                >
                    <Text
                        style={styles.input_title}
                    >
                        Email:
                    </Text>

                    <View
                        style={{
                            marginTop: 12
                        }}
                    >
                        <TextInput
                            style={styles.input_text}
                            placeholder="example@domain.com"
                            keyboardType="email-address"
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 28,
                    }}
                >
                    <Text
                        style={styles.input_title}
                    >
                        Password:
                    </Text>

                    <View
                        style={{
                            marginTop: 12
                        }}
                    >
                        <TextInput
                            style={styles.input_text}
                            placeholder="Insert your password"
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 28,
                    }}
                >
                    <Text
                        style={styles.input_title}
                    >
                        Confirm password:
                    </Text>

                    <View
                        style={{
                            marginTop: 12
                        }}
                    >
                        <TextInput
                            style={styles.input_text}
                            placeholder="Insert your password again"
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                {/* <View
                    style={{
                        marginTop: 28,
                    }}
                >
                    <Text
                        style={styles.input_title}
                    >
                        Full name:
                    </Text>

                    <View
                        style={{
                            marginTop: 12
                        }}
                    >
                        <TextInput
                            style={styles.input_text}
                            placeholder="Insert your full name"
                        />
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 28,
                    }}
                >
                    <Text
                        style={styles.input_title}
                    >
                        Date of birth:
                    </Text>

                    <View
                        style={{
                            marginTop: 12
                        }}
                    >
                        <TextInput
                            style={styles.input_text}
                            placeholder="Insert your password again"
                            secureTextEntry={true}
                        />
                    </View>
                </View> */}

                <View
                    style={{
                        marginTop: 32,
                    }}
                >
                    <View
                        style={{
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowRadius: 8,
                            shadowColor: "black",
                            shadowOpacity: 0.25
                        }}
                    >
                        <TouchableOpacity
                            style={styles.button_container}
                        >
                            <Text
                                style={styles.sign_up_text}
                            >
                                Sign up
                        </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginVertical: 32
                    }}
                >
                    <Text
                        style={styles.sign_in_small_text}
                    >
                        Already a member?
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginLeft: 5
                        }}

                        onPress={this._goToSignInScreen}
                    >
                        <Text
                            style={styles.sign_in_small_underline_text}
                        >
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}