import React from "react";
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
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Easing,
  Image
} from "react-native";

import { styles } from "./styles/styles";

import axios from "axios";
import { SERVER_URL } from "../../../../config";

import { Map } from "immutable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as firebase from "firebase";

const window_width = Dimensions.get("window").width;
const anim_duration = 250;
const easing = Easing.in();

const logo_image = require("../../../../assets/pngs/logo.png");

export default class WaitingForEmailVerification extends React.PureComponent {
  state = {};

  _proceedToNextStageOfSignUp = () => {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    // If the connection settings are changed
    if (this.props.generalSettings !== prevProps.generalSettings) {
      // Handle cases when the device reaches internet or not
      let is_internet_reachable = Map(this.props.generalSettings).getIn([
        "net_info",
        "is_internet_reachable"
      ]);

      if (is_internet_reachable) {
      } else {
      }
    }
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
            />
          )}
        </View>
      </Modal>
    );
  }
}

class SuccessBanner extends React.PureComponent {
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
          paddingVertical: 22,
          paddingHorizontal: 22,
          width: 300,
          borderRadius: 10,
          opacity: this.opacity_value,
          transform: [{ scale: this.scale_value }]
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 100
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
            marginTop: 20,
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
            marginTop: 15
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
      <Animated.View
        style={{
          position: "absolute",
          backgroundColor: "white",
          paddingVertical: 22,
          paddingHorizontal: 22,
          width: 250,
          borderRadius: 10,
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
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              ...styles.normal_text,
              ...{ color: "#EB5757", fontSize: 18, lineHeight: 21 }
            }}
          >
            Something went wrong :(
          </Text>
        </View>

        <View
          style={{
            marginTop: 15
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
