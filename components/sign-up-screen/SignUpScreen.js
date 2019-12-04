import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    Dimensions,
    Animated,
    ScrollView,
    UIManager,
    Keyboard
} from 'react-native'

import { styles } from "./styles/styles";

import {
    left_arrow_icon
} from "../shared/icons";

import * as firebase from "firebase";

import Collapsible from "react-native-collapsible";

const icon_size = 39
const icon_color = "#BDBDBD"

const extra_margin_from_keyboard = 10
const text_input_state = TextInput.State
const window_height = Dimensions.get("window").height
const window_width = Dimensions.get("window").width

export default class SignUpScreen extends React.PureComponent {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return ({
            header: null,
            swipeable: false
        })
    }

    translate_y_value = new Animated.Value(0)

    state = {
        email: "",
        password: "",
        confirm_password: "",
        should_password_instruction_collapsed: true
    }

    _goBack = () => {
        this.props.navigation.navigate("SignInSignUp")
    }

    _goToSignInScreen = () => {
        this.props.navigation.navigate("SignInScreen")
    }

    _validateEmail = (email) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase())
    }

    _validatePassword = (password) => {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/
        return regex.test(String(password))
    }

    _onChangeEmail = ({ nativeEvent }) => {
        this.setState({
            email: nativeEvent.text
        })
    }

    _onChangePassword = ({ nativeEvent }) => {
        this.setState({
            password: nativeEvent.text
        })
    }

    _onChangeConfirmPassword = ({ nativeEvent }) => {
        this.setState({
            confirm_password: nativeEvent.text
        })
    }

    _setEmailRef = (r) => {
        this.email_input_ref = r
    }

    _setPassRef = (r) => {
        this.password_input_ref = r
    }

    _setConfirmPassRef = (r) => {
        this.confirm_password_input_ref = r
    }

    _onPassFocus = () => {
        this.setState({
            should_password_instruction_collapsed: false
        })
    }

    _onPassBlur = () => {
        this.setState({
            should_password_instruction_collapsed: true
        })
    }

    _keyboardWillHideHandler = (e) => {
        Animated.timing(
            this.translate_y_value,
            {
                toValue: 0,
                duration: e.duration,
                useNativeDriver: true
            }
        ).start()
    }

    _keyboardWillShowHandler = (e) => {
        let keyboard_height = e.endCoordinates.height,
            keyboard_duration = e.duration

        let currently_focused_input = text_input_state.currentlyFocusedField()

        UIManager.measure(currently_focused_input, (x, y, width, height, pageX, pageY) => {
            let input_height = height,
                input_py = pageY

            let gap = (window_height - keyboard_height) - (input_height + input_py) - extra_margin_from_keyboard

            if (gap < 0) {
                Animated.timing(
                    this.translate_y_value,
                    {
                        toValue: gap,
                        duration: keyboard_duration,
                        useNativeDriver: true
                    }
                ).start()
            }
        })
    }

    _checkIfConfirmPasswordValid = (password, confirm_password) => {
        return password === confirm_password
    }

    _signUp = () => {
        let { email, password } = this.state,
            is_email_valid = this._validateEmail(this.state.email),
            is_password_valid = this._validatePassword(this.state.password),
            is_confirm_password_valid = this._checkIfConfirmPasswordValid(this.state.password, this.state.confirm_password)

        if (is_email_valid && is_password_valid && is_confirm_password_valid) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user_credential) => {
                    // console.log(user_credential)
                    fire
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    componentDidMount() {
        this.keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", this._keyboardWillHideHandler)
        this.keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", this._keyboardWillShowHandler)
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillHide", this._keyboardWillHideHandler)
        Keyboard.removeListener("keyboardWillShow", this._keyboardWillShowHandler)
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: 32,
                    overflow: "hidden",
                }}
            >
                <Animated.View
                    style={{
                        transform: [{ translateY: this.translate_y_value }]
                    }}
                >
                    <ScrollView
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
                                    value={this.state.email}
                                    onChange={this._onChangeEmail}
                                    ref={this._setEmailRef}
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
                                    placeholder="Type your password"
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChange={this._onChangePassword}
                                    onFocus={this._onPassFocus}
                                    onBlur={this._onPassBlur}
                                    ref={this._setPassRef}
                                />
                            </View>

                            <Collapsible
                                collapsed={this.state.should_password_instruction_collapsed}
                                style={{
                                    marginTop: 5,
                                    height: 35,
                                }}
                            >
                                <Text
                                    style={styles.small_instruction_password_text}
                                >
                                    Must contain more than 6 characters, including at least 1 number and uppercase.
                                </Text>
                            </Collapsible>
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
                                    placeholder="Type your password again"
                                    secureTextEntry={true}
                                    value={this.state.confirm_password}
                                    onChange={this._onChangeConfirmPassword}
                                    autoCorrect={false}
                                    ref={this._setConfirmPassRef}
                                />
                            </View>
                        </View>

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

                                    onPress={this._signUp}
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
                </Animated.View>
            </View>
        )
    }
}