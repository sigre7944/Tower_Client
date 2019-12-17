import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Animated,
  Modal,
  Easing,
  Image,
  Platform
} from "react-native";

import { styles } from "./styles/styles";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { normalize } from "../../../shared/helpers";
const window_width = Dimensions.get("window").width;
const anim_duration = 250;
const easing = Easing.in();

const logo_image = require("../../../../assets/pngs/logo.png");

export default class WaitingForEmailVerification extends React.PureComponent {
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

          {this.props.should_display_success_banner ? (
            <SuccessBanner
              _deactiveShouldWaitingEmailVerification={
                this.props._deactiveShouldWaitingEmailVerification
              }
              _goToSignInScreen={this.props._goToSignInScreen}
            />
          ) : (
            <ErrorBanner
              _deactiveShouldWaitingEmailVerification={
                this.props._deactiveShouldWaitingEmailVerification
              }
              error_msg={this.props.error_msg}
            />
          )}
        </View>
      </Modal>
    );
  }
}

class SuccessBanner extends React.PureComponent {
  opacity_value = new Animated.Value(0);

  _startAnimate = () => {
    Animated.timing(this.opacity_value, {
      toValue: 1,
      duration: anim_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _cancelAndGoToSignIn = () => {
    this.props._deactiveShouldWaitingEmailVerification();
    this.props._goToSignInScreen();
  };

  componentDidMount() {
    this._startAnimate();
  }

  render() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          backgroundColor: "white",
          paddingVertical: normalize(22, "height"),
          paddingHorizontal: normalize(22, "width"),
          width: normalize(300, "width"),
          borderRadius: normalize(10, "width"),
          opacity: this.opacity_value
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: normalize(100, "height")
          }}
        >
          <Image
            source={logo_image}
            style={{
              flex: 1
            }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            marginTop: normalize(20, "height"),
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.normal_text}>
            A verification email has been sent to {this.props.email}. Please
            verify your email before logging in.
          </Text>
        </View>

        <View
          style={{
            marginTop: normalize(15, "height")
          }}
        >
          <TouchableOpacity
            style={styles.cancel_sign_up_button}
            onPress={this._cancelAndGoToSignIn}
          >
            <Text style={styles.cancel_sign_up_text}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

class ErrorBanner extends React.PureComponent {
  opacity_value = new Animated.Value(0);

  _startAnimate = () => {
    Animated.timing(this.opacity_value, {
      toValue: 1,
      duration: anim_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  componentDidMount() {
    this._startAnimate();
  }
  render() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          backgroundColor: "white",
          paddingVertical: normalize(22, "height"),
          paddingHorizontal: normalize(22, "width"),
          width: normalize(250, "width"),
          borderRadius: normalize(10, "width"),
          opacity: this.opacity_value
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <MaterialIcons
            name="error"
            color="#EB5757"
            size={normalize(62, "width")}
          />
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
            onPress={this.props._deactiveShouldWaitingEmailVerification}
          >
            <Text style={styles.cancel_sign_up_text}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}
