import React from "react";
import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  Platform
} from "react-native";

import { styles } from "./styles/styles";

import { normalize } from "../../../../../../../shared/helpers";

const easing = Easing.in();
const anim_duration = 250;
const window_width = Dimensions.get("window").width;

export default class InsufficientWarning extends React.PureComponent {
  warning_opacity_value = new Animated.Value(0);

  _animateStartWarning = () => {
    Animated.timing(this.warning_opacity_value, {
      toValue: 1,
      duration: anim_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _animateEndWarning = callback => {
    Animated.timing(this.warning_opacity_value, {
      toValue: 0,
      duration: anim_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start(() => {
      callback();
    });
  };

  _closeWarning = () => {
    this._animateEndWarning(this.props.dismissAction);
  };

  componentDidMount() {
    this._animateStartWarning();
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
          <TouchableWithoutFeedback onPress={this._closeWarning}>
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "black",
                opacity: 0.2
              }}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "white",
              borderRadius: normalize(10, "width"),
              paddingVertical: normalize(22, "height"),
              paddingHorizontal: normalize(22, "width"),
              width: normalize(300, "width"),
              opacity: this.warning_opacity_value
            }}
          >
            <Text
              style={{
                ...styles.warning_text,
                ...{
                  color: "#EB5757",
                  fontSize: normalize(21, "width"),
                  lineHeight: normalize(24, "height")
                }
              }}
            >
              Insufficient points!
            </Text>

            <Text
              style={{
                ...styles.warning_text,
                ...{ marginTop: normalize(3, "height") }
              }}
            >
              Let's complete tasks to earn points.
            </Text>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
