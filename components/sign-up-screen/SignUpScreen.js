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
                            placeholder="Insert password here"
                            secureTextEntry={true}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        marginTop: 12
                    }}
                >
                    <Text
                        style={styles.forgot_password_text}
                    >
                        Forgot your password?
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginTop: 32,
                    }}
                >
                    <TouchableOpacity
                        style={styles.button_container}

                        onPress={this._goToSignInScreen}
                    >
                        <Text
                            style={styles.sign_in_text}
                        >
                            SIGN IN
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        marginTop: 32,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Text
                        style={styles.sign_up_small_text}
                    >
                        New to Quint?
                    </Text>

                    <TouchableOpacity
                        style={{
                            marginLeft: 5
                        }}
                    >
                        <Text
                            style={styles.sign_up_small_underline_text}
                        >
                            Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}