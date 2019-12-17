import React from "react";
import { DrawerActions } from "react-navigation-drawer";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
  ScrollView,
  UIManager,
  Keyboard,
  ActivityIndicator,
} from "react-native";

import { styles } from "./styles/styles";

import { left_arrow_icon, check_icon, close_icon } from "../shared/icons";

import { normalize } from "../shared/helpers";

import axios from "axios";

import { SERVER_URL } from "../../config";

import Collapsible from "react-native-collapsible";

import * as firebase from "firebase";

import WaitingForEmailVerificationScreen from "./components/waiting-for-email-verification-screen/WaitingForEmailVerification";

const icon_size = normalize(39, "width");
const icon_color = "#BDBDBD";

const extra_margin_from_keyboard = normalize(10, "height");
const text_input_state = TextInput.State;
const window_height = Dimensions.get("window").height;
const window_width = Dimensions.get("window").width;

export default class SignUpScreen extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    };
  };

  translate_y_value = new Animated.Value(0);

  state = {
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    referral_code: "",
    should_password_instruction_collapsed: true,
    should_display_waiting_email_verification: false,
    should_display_success_banner: false,

    should_full_name_warning_collapsed: true,
    should_email_warning_collapsed: true,
    should_password_warning_collapsed: true,
    should_confirm_password_warning_collapsed: true,

    error_msg: "Somethings went wrong :(",

    should_replace_with_activity_indicator: false,

    should_referral_code_inform_collapsed: true,
    referral_code_inform_text: null,
    referral_code_inform_icon: null
  };

  _goBack = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
    this.props.navigation.navigate("Journal");
  };

  _goToSignInScreen = () => {
    this.props.navigation.navigate("SignInScreen");
  };

  _validateEmail = email => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  _validatePassword = password => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return regex.test(String(password));
  };

  _onChangeFullName = ({ nativeEvent }) => {
    this.setState({
      full_name: nativeEvent.text
    });
  };

  _onChangeEmail = ({ nativeEvent }) => {
    this.setState({
      email: nativeEvent.text
    });
  };

  _onChangePassword = ({ nativeEvent }) => {
    this.setState({
      password: nativeEvent.text
    });
  };

  _onChangeConfirmPassword = ({ nativeEvent }) => {
    this.setState({
      confirm_password: nativeEvent.text
    });
  };

  _onChangeReferralCode = ({ nativeEvent }) => {
    this.setState({
      referral_code: nativeEvent.text
    });
  };

  _onPassFocus = () => {
    this.setState({
      should_password_instruction_collapsed: false
    });
  };

  _onPassBlur = () => {
    this.setState({
      should_password_instruction_collapsed: true
    });
  };

  _keyboardWillHideHandler = e => {
    Animated.timing(this.translate_y_value, {
      toValue: 0,
      duration: e.duration,
      useNativeDriver: true
    }).start();
  };

  _keyboardWillShowHandler = e => {
    let keyboard_height = e.endCoordinates.height,
      keyboard_duration = e.duration;

    let currently_focused_input = text_input_state.currentlyFocusedField();

    UIManager.measure(
      currently_focused_input,
      (x, y, width, height, pageX, pageY) => {
        let input_height = height,
          input_py = pageY;

        let gap =
          window_height -
          keyboard_height -
          (input_height + input_py) -
          extra_margin_from_keyboard;

        if (gap < 0) {
          Animated.timing(this.translate_y_value, {
            toValue: gap,
            duration: keyboard_duration,
            useNativeDriver: true
          }).start();
        }
      }
    );
  };

  _checkIfConfirmPasswordValid = (password, confirm_password) => {
    return password === confirm_password;
  };

  _activeSuccessBanner = () => {
    this.setState({
      should_display_waiting_email_verification: true,
      should_display_success_banner: true
    });
  };

  _deactiveSuccessBanner = () => {
    this.setState({
      should_display_waiting_email_verification: true,
      should_display_success_banner: false
    });
  };

  _deactiveShouldWaitingEmailVerification = () => {
    this.setState({
      should_display_waiting_email_verification: false,
      should_replace_with_activity_indicator: false
    });
  };

  _sendSignUpRequestToServer = (
    full_name,
    email,
    password,
    used_referral_code
  ) => {
    return axios({
      method: "POST",
      url: SERVER_URL + "auth?action=signup",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        full_name,
        email,
        password,
        used_referral_code
      }
    });
  };

  _validateFullName = full_name => {
    return full_name.length > 0 && full_name !== "";
  };

  _signUp = async () => {
    let {
        full_name,
        email,
        password,
        confirm_password,
        referral_code
      } = this.state,
      is_full_name_valid = this._validateFullName(full_name.trim()),
      is_email_valid = this._validateEmail(email.trim()),
      is_password_valid = this._validatePassword(password),
      is_confirm_password_valid = this._checkIfConfirmPasswordValid(
        this.state.password,
        confirm_password
      );

    if (
      is_full_name_valid &&
      is_email_valid &&
      is_password_valid &&
      is_confirm_password_valid
    ) {
      this.setState({
        should_full_name_warning_collapsed: true,
        should_email_warning_collapsed: true,
        should_confirm_password_warning_collapsed: true,
        should_replace_with_activity_indicator: true
      });

      try {
        let sign_up_response = await this._sendSignUpRequestToServer(
          full_name.trim(),
          email.trim(),
          password,
          referral_code.trim()
        );
        this._activeSuccessBanner();
      } catch (err) {
        if (String(err).indexOf("code 409")) {
          this.setState({
            error_msg: "Email already exists."
          });
          this._deactiveSuccessBanner();
        } else {
          this._deactiveSuccessBanner();
        }
      }
    } else {
      if (!is_full_name_valid) {
        this.setState({
          should_full_name_warning_collapsed: false
        });
      } else {
        this.setState({
          should_full_name_warning_collapsed: true
        });
      }
      if (!is_email_valid) {
        this.setState({
          should_email_warning_collapsed: false
        });
      } else {
        this.setState({
          should_email_warning_collapsed: true
        });
      }
      if (!is_password_valid) {
        this.setState({
          should_password_warning_collapsed: false
        });
      } else {
        this.setState({
          should_password_warning_collapsed: true
        });
      }
      if (!is_confirm_password_valid) {
        this.setState({
          should_confirm_password_warning_collapsed: false
        });
      } else {
        this.setState({
          should_confirm_password_warning_collapsed: true
        });
      }
    }
  };

  _checkReferralCode = () => {
    let input_referral_code = this.state.referral_code;

    if (input_referral_code.length > 0 && input_referral_code.trim() !== "") {
      firebase
        .firestore()
        .collection("referralCodes")
        .doc(input_referral_code)
        .get()
        .then(response => {
          if (response.data()) {
            this.setState({
              referral_code_inform_icon: check_icon(15, "#05838B"),
              referral_code_inform_text: (
                <Text
                  style={{
                    ...styles.referral_check_text,
                    ...{ color: "#05838B" }
                  }}
                >
                  Code available.
                </Text>
              ),
              should_referral_code_inform_collapsed: false
            });
          } else {
            this.setState({
              referral_code_inform_icon: close_icon(15, "#EB5757"),
              referral_code_inform_text: (
                <Text
                  style={{
                    ...styles.referral_check_text,
                    ...{ color: "#EB5757" }
                  }}
                >
                  Code doesn't exist.
                </Text>
              ),
              should_referral_code_inform_collapsed: false
            });
          }
        })
        .catch(err => {
          this.setState({
            referral_code_inform_icon: close_icon(15, "#EB5757"),
            referral_code_inform_text: (
              <Text
                style={{
                  ...styles.referral_check_text,
                  ...{ color: "#EB5757" }
                }}
              >
                Something wrong with the code :(
              </Text>
            ),
            should_referral_code_inform_collapsed: false
          });
        });
    }
  };

  componentDidMount() {
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this._keyboardWillHideHandler
    );
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this._keyboardWillShowHandler
    );
  }

  componentWillUnmount() {
    Keyboard.removeListener("keyboardWillHide", this._keyboardWillHideHandler);
    Keyboard.removeListener("keyboardWillShow", this._keyboardWillShowHandler);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: normalize(32, "width"),
          overflow: "hidden"
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: this.translate_y_value }]
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: normalize(45, "height")
              }}
            >
              <TouchableOpacity
                style={{
                  width: icon_size
                }}
                onPress={this._goBack}
              >
                {left_arrow_icon(icon_size, icon_color)}
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: normalize(15, "height")
              }}
            >
              <Text style={styles.title_text}> Sign </Text>
              <Text style={styles.title_text}> Up </Text>
            </View>

            <View
              style={{
                marginTop: normalize(53, "height")
              }}
            >
              <Text style={styles.input_title}> Full name: </Text>
              <View
                style={{
                  marginTop: normalize(12, "height")
                }}
              >
                <TextInput
                  style={styles.input_text}
                  placeholder="Type your full name (max 30 chars)"
                  value={this.state.full_name}
                  onChange={this._onChangeFullName}
                  maxLength={30}
                />

                <Collapsible
                  collapsed={this.state.should_full_name_warning_collapsed}
                  style={{
                    marginTop: normalize(5, "height"),
                    height: normalize(20, "height")
                  }}
                >
                  <Text style={styles.small_warning_text}>
                    This field can't be blank
                  </Text>
                </Collapsible>
              </View>
            </View>

            <View
              style={{
                marginTop: normalize(28, "height")
              }}
            >
              <Text style={styles.input_title}> Email: </Text>
              <View
                style={{
                  marginTop: normalize(12, "height")
                }}
              >
                <TextInput
                  style={styles.input_text}
                  placeholder="example@domain.com"
                  keyboardType="email-address"
                  value={this.state.email}
                  onChange={this._onChangeEmail}
                />

                <Collapsible
                  collapsed={this.state.should_email_warning_collapsed}
                  style={{
                    marginTop: normalize(5, "height"),
                    height: normalize(20, "height")
                  }}
                >
                  <Text style={styles.small_warning_text}>
                    Invalid email format.
                  </Text>
                </Collapsible>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(28, "height")
              }}
            >
              <Text style={styles.input_title}> Password: </Text>
              <View
                style={{
                  marginTop: normalize(12, "height")
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
                />
              </View>
              <Collapsible
                collapsed={this.state.should_password_instruction_collapsed}
                style={{
                  marginTop: normalize(5, "height"),
                  height: normalize(35, "height")
                }}
              >
                <Text style={styles.small_instruction_password_text}>
                  Must contain more than 6 characters, including at least 1
                  number and uppercase.
                </Text>
              </Collapsible>

              <Collapsible
                collapsed={this.state.should_password_warning_collapsed}
                style={{
                  marginTop: normalize(5, "height"),
                  height: normalize(20, "height")
                }}
              >
                <Text style={styles.small_warning_text}>Invalid password.</Text>
              </Collapsible>
            </View>
            <View
              style={{
                marginTop: normalize(28, "height")
              }}
            >
              <Text style={styles.input_title}> Confirm password: </Text>
              <View
                style={{
                  marginTop: normalize(12, "height")
                }}
              >
                <TextInput
                  style={styles.input_text}
                  placeholder="Type your password again"
                  secureTextEntry={true}
                  value={this.state.confirm_password}
                  onChange={this._onChangeConfirmPassword}
                  autoCorrect={false}
                />

                <Collapsible
                  collapsed={
                    this.state.should_confirm_password_warning_collapsed
                  }
                  style={{
                    marginTop: normalize(5, "height"),
                    height: normalize(20, "height")
                  }}
                >
                  <Text style={styles.small_warning_text}>
                    Fields don't match.
                  </Text>
                </Collapsible>
              </View>
            </View>

            <View
              style={{
                marginTop: normalize(28, "height")
              }}
            >
              <Text style={styles.input_title}> Referral code: </Text>
              <View
                style={{
                  marginTop: normalize(12, "height")
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <TextInput
                    style={{ ...styles.input_text, ...{ flex: 1 } }}
                    placeholder="e.g: AbCd12"
                    value={this.state.referral_code}
                    onChange={this._onChangeReferralCode}
                    maxLength={6}
                  />

                  <TouchableOpacity
                    style={styles.referral_check_container}
                    onPress={this._checkReferralCode}
                  >
                    <Text style={styles.referral_check_text}>Check</Text>
                  </TouchableOpacity>
                </View>

                <Collapsible
                  collapsed={this.state.should_referral_code_inform_collapsed}
                  style={{
                    marginTop: normalize(5, "height"),
                    height: normalize(20, "height")
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center"
                    }}
                  >
                    {this.state.referral_code_inform_icon}
                    <View
                      style={{
                        marginLeft: normalize(5, "height")
                      }}
                    >
                      {/* <Text style={styles.small_warning_text}> */}
                      {this.state.referral_code_inform_text}
                      {/* </Text> */}
                    </View>
                  </View>
                </Collapsible>
              </View>
            </View>
            <View
              style={{
                marginTop: normalize(32, "height")
              }}
            >
              <View
                style={{
                  shadowOffset: {
                    width: 0,
                    height: 4
                  },
                  shadowRadius: 8,
                  shadowColor: "black",
                  shadowOpacity: 0.25,
                  elevation: 4,
                  backgroundColor: "white"
                }}
              >
                <TouchableOpacity
                  style={styles.button_container}
                  onPress={this._signUp}
                >
                  {this.state.should_replace_with_activity_indicator ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text style={styles.sign_up_text}> Sign up </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginVertical: normalize(32, "height")
              }}
            >
              <Text style={styles.sign_in_small_text}>Already a member ?</Text>
              <TouchableOpacity
                style={{
                  marginLeft: normalize(5, "height")
                }}
                onPress={this._goToSignInScreen}
              >
                <Text style={styles.sign_in_small_underline_text}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>

        {this.state.should_display_waiting_email_verification ? (
          <WaitingForEmailVerificationScreen
            email={this.state.email}
            should_display_success_banner={
              this.state.should_display_success_banner
            }
            _deactiveShouldWaitingEmailVerification={
              this._deactiveShouldWaitingEmailVerification
            }
            _goToSignInScreen={this._goToSignInScreen}
            error_msg={this.state.error_msg}
          />
        ) : null}
      </View>
    );
  }
}
