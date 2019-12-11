import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  Picker,
  Modal,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  Animated,
  Easing
} from "react-native";

import { styles } from "./styles/styles";

import { close_icon, check_icon } from "../../icons";

const icon_size = 24;
const icon_color = "#05838B";

const check_icon_size = 19;

const window_width = Dimensions.get("window").width;
const window_height = Dimensions.get("window").height;
const anim_duration = 350;
const easing = Easing.in();
const premium_1x_image = require("../../../../assets/pngs/premium_1x.png");

export default class PremiumFeatures extends React.PureComponent {
  anim_translate_y = new Animated.Value(window_height);
  anim_opacity_value = this.anim_translate_y.interpolate({
    inputRange: [0, window_height],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  _startAnim = () => {
    Animated.timing(this.anim_translate_y, {
      toValue: 0,
      duration: anim_duration,
      easing
    }).start();
  };

  _endAnim = callback => {
    Animated.timing(this.anim_translate_y, {
      toValue: window_height,
      duration: anim_duration,
      easing
    }).start(() => {
      callback();
    });
  };

  _close = () => {
    this._endAnim(this.props.dismissAction);
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
            position: "relative"
          }}
        >
          <Animated.View
            style={{
              width: window_width,
              height: window_height,
              backgroundColor: "white",
              transform: [{ translateY: this.anim_translate_y }],
              opacity: this.anim_opacity_value,
              position: "absolute"
            }}
          >
            <View
              style={{
                marginTop: 42,
                paddingHorizontal: 22,
                alignItems: "flex-start"
              }}
            >
              <TouchableOpacity onPress={this._close}>
                {close_icon(icon_size, icon_color)}
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 12,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.title}>Premium plan</Text>
            </View>

            <View
              style={{
                height: 220,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 48
              }}
            >
              <Image
                source={premium_1x_image}
                resizeMode="contain"
                style={{
                  flex: 1
                }}
              />
            </View>

            <View
              style={{
                marginTop: 27,
                paddingHorizontal: 35
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 21
                }}
              >
                <View
                  style={{
                    width: check_icon_size,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {check_icon(check_icon_size, icon_color)}
                </View>

                <View
                  style={{
                    marginLeft: 15
                  }}
                >
                  <Text style={styles.benefit_text}>
                    Up to 99 tasks per category.
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 5
                }}
              >
                <View
                  style={{
                    marginLeft: check_icon_size + 15
                  }}
                >
                  <Text style={styles.versus_text}>
                    (5 tasks per category in Free plan)
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 21
                }}
              >
                <View
                  style={{
                    width: check_icon_size,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {check_icon(check_icon_size, icon_color)}
                </View>

                <View
                  style={{
                    marginLeft: 15
                  }}
                >
                  <Text style={styles.benefit_text}>
                    Up to 99 categories and rewards.
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 5
                }}
              >
                <View
                  style={{
                    marginLeft: check_icon_size + 15
                  }}
                >
                  <Text style={styles.versus_text}>
                    (5 categories and rewards in Free plan)
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 21
                }}
              >
                <View
                  style={{
                    width: check_icon_size,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {check_icon(check_icon_size, icon_color)}
                </View>

                <View
                  style={{
                    marginLeft: 15,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.benefit_text}>
                    Full access to chart and stats analytics.
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: 5
                }}
              >
                <View
                  style={{
                    marginLeft: check_icon_size + 15
                  }}
                >
                  <Text style={styles.versus_text}>
                    (Limited access in Free plan)
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 21
                }}
              >
                <View
                  style={{
                    width: check_icon_size,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {check_icon(check_icon_size, icon_color)}
                </View>

                <View
                  style={{
                    marginLeft: 15,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.benefit_text}>
                    Instant access to incoming features.
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
