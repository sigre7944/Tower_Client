import React from "react";

import {
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  Platform
} from "react-native";
import { styles } from "./styles/styles";
import { normalize } from "../../../../../shared/helpers";

const easing = Easing.in();
const anim_duration = 250;
const window_width = Dimensions.get("window").width;

export default class InformPurchaseAction extends React.PureComponent {
  opacity_value = new Animated.Value(0);

  _startAnim = () => {
    Animated.timing(this.opacity_value, {
      toValue: 1,
      easing,
      duration: anim_duration,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _endAnim = callback => {
    Animated.timing(this.opacity_value, {
      toValue: 0,
      easing,
      duration: anim_duration,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start(() => {
      callback();
    });
  };

  _close = () => {
    this._endAnim(this.props._toggleDisplayInformBoughtItem);
  };

  componentDidMount() {
    this._startAnim();
  }

  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableWithoutFeedback onPress={this._close}>
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "black",
                opacity: 0.2
              }}
            ></View>
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              position: "absolute",
              backgroundColor: "white",
              borderRadius: normalize(10, "width"),
              paddingVertical: normalize(22, "height"),
              paddingHorizontal: normalize(22, "width"),
              width: normalize(300, "width"),
              opacity: this.warning_opacity_value,
              opacity: this.opacity_value
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Text style={styles.normal_text}>
                Congratulation! You have received{" "}
                <Text style={styles.highlight_text}>
                  {this.props.reward_name}.
                </Text>
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: normalize(12, "height")
              }}
            >
              <Text style={styles.normal_text}>Your balance:</Text>
              <View
                style={{
                  marginLeft: normalize(10, "width")
                }}
              >
                <Text style={styles.highlight_text}>{this.props.balance}</Text>
              </View>

              <View style={{ marginLeft: normalize(5, "width") }}>
                <Text style={styles.normal_text}>points</Text>
              </View>
            </View>

            <TouchableOpacity
              style={{
                marginTop: normalize(22, "height"),
                alignItems: "center"
              }}
              onPress={this._close}
            >
              <Text style={styles.close_text}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
