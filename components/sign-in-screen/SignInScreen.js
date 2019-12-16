import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  Animated,
  ScrollView,
  Modal,
  ActivityIndicator,
  Easing
} from "react-native";

import { styles } from "./styles/styles";

import { left_arrow_icon } from "../shared/icons";
import { normalize } from "../shared/helpers";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import * as firebase from "firebase";

const icon_size = normalize(39, "width");
const icon_color = "#BDBDBD";
const window_width = Dimensions.get("window").width;
const anim_duration = 250;
const easing = Easing.in();

export default class SignInScreen extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    };
  };

  state = {
    email: "",
    password: "",

    should_replace_with_activity_indicator: false,
    should_display_error_banner: false,
    error_msg: "Something went wrong!"
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

  _goBack = () => {
    this.props.navigation.navigate("DrawerNavigator");
  };

  _goToSignUpScreen = () => {
    this.props.navigation.navigate("SignUpScreen");
  };

  _hideErrorBanner = () => {
    this.setState({
      should_display_error_banner: false,
      should_replace_with_activity_indicator: false
    });
  };

  _signIn = () => {
    this.setState({
      should_replace_with_activity_indicator: true
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(reponse => {
        if (!reponse.user.emailVerified) {
          this.setState({
            should_display_error_banner: true,
            error_msg: "Invalid email/password."
          });
        } else {
          this._goBack();
        }
      })
      .catch(err => {
        let code = err.code;
        if (code === "auth/invalid-email") {
          this.setState({
            should_display_error_banner: true,
            error_msg: "Invalid email."
          });
        } else if (code === "auth/wrong-password") {
          this.setState({
            should_display_error_banner: true,
            error_msg: "Wrong password."
          });
        } else if (code === "auth/user-not-found") {
          this.setState({
            should_display_error_banner: true,
            error_msg: "User not found."
          });
        } else {
          this.setState({
            should_display_error_banner: true,
            error_msg: "Something went wrong :("
          });
        }
      });
  };

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: normalize(32, "width")
        }}
        scrollEnabled={false}
        keyboardDismissMode="on-drag"
      >
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
          <Text style={styles.title_text}>Sign</Text>
          <Text style={styles.title_text}>In</Text>
        </View>

        <View
          style={{
            marginTop: normalize(53, "height")
          }}
        >
          <Text style={styles.input_title}>Email:</Text>

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
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(28, "height")
          }}
        >
          <Text style={styles.input_title}>Password:</Text>

          <View
            style={{
              marginTop: normalize(12, "height")
            }}
          >
            <TextInput
              style={styles.input_text}
              placeholder="Insert password here"
              secureTextEntry={true}
              value={this.state.password}
              onChange={this._onChangePassword}
            />
          </View>
        </View>

        {/* <TouchableOpacity
          style={{
            marginTop: 12
          }}
        >
          <Text style={styles.forgot_password_text}>Forgot your password?</Text>
        </TouchableOpacity> */}

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
              shadowOpacity: 0.25
            }}
          >
            <TouchableOpacity
              style={styles.button_container}
              onPress={this._signIn}
            >
              {this.state.should_replace_with_activity_indicator ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.sign_in_text}>SIGN IN</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(32, "height"),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.sign_up_small_text}>New to Quint?</Text>

          <TouchableOpacity
            style={{
              marginLeft: normalize(5, "width")
            }}
            onPress={this._goToSignUpScreen}
          >
            <Text style={styles.sign_up_small_underline_text}>Sign up</Text>
          </TouchableOpacity>
        </View>

        {this.state.should_display_error_banner ? (
          <ErrorBanner
            _hideErrorBanner={this._hideErrorBanner}
            error_msg={this.state.error_msg}
          />
        ) : null}
      </ScrollView>
    );
  }
}

class ErrorBanner extends React.PureComponent {
  scale_value = new Animated.Value(0);
  opacity_value = this.scale_value.interpolate({
    inputRange: [0, 0.3, 0.5, 0.7, 1],
    outputRange: [0, 0.3, 0.5, 0.7, 1],
    extrapolate: "clamp"
  });

  _startAnimate = () => {
    Animated.timing(this.scale_value, {
      toValue: 1,
      duration: anim_duration,
      easing,
      useNativeDriver: true
    }).start();
  };

  componentDidMount() {
    this._startAnimate();
  }
  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
          }}
        >
          <View
            style={{
              flex: 1,
              width: window_width,
              backgroundColor: "black",
              opacity: 0.2
            }}
          ></View>

          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "white",
              paddingVertical: normalize(22, "height"),
              paddingHorizontal: normalize(22, "width"),
              width: normalize(250, "width"),
              borderRadius: normalize(10, "width"),
              opacity: this.opacity_value,
              transform: [{ scale: this.scale_value }]
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MaterialIcons name="error" color="#EB5757" size={62} />
            </View>

            <View
              style={{
                marginTop: normalize(10, "height"),
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  ...styles.normal_text,
                  ...{
                    color: "#EB5757",
                    fontSize: normalize(18, "width"),
                    lineHeight: normalize(21, "height")
                  }
                }}
              >
                {this.props.error_msg}
              </Text>
            </View>

            <View
              style={{
                marginTop: normalize(15, "height")
              }}
            >
              <TouchableOpacity
                style={styles.cancel_sign_up_button}
                onPress={this.props._hideErrorBanner}
              >
                <Text style={styles.cancel_sign_up_text}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
