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
  state = {
    should_display_error_banner: false,
    should_display_success_banner: false
  };

  _proceedToNextStageOfSignUp = () => {};

  _signIn = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  componentDidMount() {
    let { email, password } = this.props,
      { uuid } = this.props.response_from_server;

    try {
      firebase
        .firestore()
        .collection("users")
        .doc(uuid)
        .onSnapshot(doc => {
          let email_verified = doc.date().emailVerified;

          if (email_verified) {
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .then(response => {
                if (uuid === response.user.uid) {
                  this.setState({
                    should_display_success_banner: true,
                    should_display_error_banner: false
                  });
                }
              })
              .catch(err => {
                console.log(err);

                this.setState({
                  should_display_error_banner: true,
                  should_display_success_banner: false
                });
              });
          }
        });
    } catch (err) {
      this.setState({
        should_display_error_banner: true,
        should_display_success_banner: false
      });
    }
  }

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

          {this.state.should_display_success_banner ? (
            <SuccessBanner />
          ) : (
            <>
              {this.state.should_display_error_banner ? (
                <ErrorBanner />
              ) : (
                <AskForVerifyingEmailBanner />
              )}
            </>
          )}
          
        </View>
      </Modal>
    );
  }
}

class AskForVerifyingEmailBanner extends React.PureComponent {
  waiting_time = 1000 * 60 * 3; // 3 minutes

  scale_value = new Animated.Value(0);
  opacity_value = this.scale_value.interpolate({
    inputRange: [0, 0.3, 0.5, 0.7, 1],
    outputRange: [0, 0.3, 0.5, 0.7, 1],
    extrapolate: "clamp"
  });

  state = {
    should_display_cancel_button: false
  };

  _startAnimate = () => {
    Animated.timing(this.scale_value, {
      toValue: 0,
      duration: anim_duration,
      easing,
      useNativeDriver: true
    });
  };

  componentDidMount() {
    this._startAnimate();

    setTimeout(() => {
      this.setState({
        should_display_cancel_button: true
      });
    }, this.waiting_time);
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
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="#05838B" />
        </View>

        <View
          style={{
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.normal_text}>
            A verification email has been sent to {this.props.email}
          </Text>
        </View>

        <View
          style={{
            marginTop: 5,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.normal_text}>
            Please verify your email before proceeding ...
          </Text>
        </View>

        {this.state.should_display_cancel_button ? (
          <View
            style={{
              marginTop: 15
            }}
          >
            <TouchableOpacity style={styles.cancel_sign_up_button}>
              <Text style={styles.cancel_sign_up_text}>CANCEL SIGN UP</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </Animated.View>
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
      toValue: 0,
      duration: anim_duration,
      easing,
      useNativeDriver: true
    });
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
            width: 100,
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
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.welcome_text}>
            Welcome to Quint App, {this.props.email}
          </Text>
        </View>

        <View
          style={{
            marginTop: 15
          }}
        >
          <TouchableOpacity style={styles.cancel_sign_up_button}>
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
      toValue: 0,
      duration: anim_duration,
      easing,
      useNativeDriver: true
    });
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
          <Text style={{ ...styles.normal_text, ...{ color: "#EB5757" } }}>
            Something went wrong
          </Text>
        </View>

        <View
          style={{
            marginTop: 15
          }}
        >
          <TouchableOpacity style={styles.cancel_sign_up_button}>
            <Text style={styles.cancel_sign_up_text}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}
