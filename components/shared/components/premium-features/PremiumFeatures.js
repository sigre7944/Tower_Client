import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  Animated,
  Easing,
  Platform,
  SafeAreaView
} from "react-native";

import { styles } from "./styles/styles";

import { close_icon, check_icon } from "../../icons";
import { normalize } from "../../helpers";
const icon_size = normalize(24, "width");
const icon_color = "#05838B";

const check_icon_size = normalize(19, "width");

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
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _endAnim = callback => {
    Animated.timing(this.anim_translate_y, {
      toValue: window_height,
      duration: anim_duration,
      easing,
      useNativeDriver: Platform.OS === "android" ? true : false
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
            <SafeAreaView>
              <View
                style={{
                  marginTop: normalize(21, "height"),
                  paddingHorizontal: normalize(22, "width"),
                  alignItems: "flex-start"
                }}
              >
                <TouchableOpacity onPress={this._close}>
                  {close_icon(icon_size, icon_color)}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: normalize(12, "height"),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={styles.title}>Premium plan</Text>
              </View>

              <View
                style={{
                  height: normalize(220, "height"),
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: normalize(48, "height")
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
                  marginTop: normalize(27, "height"),
                  paddingHorizontal: normalize(35, "width")
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: normalize(21, "height")
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
                      marginLeft: normalize(15, "width")
                    }}
                  >
                    <Text style={styles.benefit_text}>
                      Up to 99 tasks per category.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: normalize(5, "height")
                  }}
                >
                  <View
                    style={{
                      marginLeft: check_icon_size + normalize(15, "width")
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
                    marginTop: normalize(21, "height")
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
                      marginLeft: normalize(15, "width")
                    }}
                  >
                    <Text style={styles.benefit_text}>
                      Up to 99 categories and rewards.
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    marginTop: normalize(5, "height")
                  }}
                >
                  <View
                    style={{
                      marginLeft: check_icon_size + normalize(15, "width")
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
                    marginTop: normalize(21, "height")
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
                      marginLeft: normalize(15, "width"),
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
                    marginTop: normalize(5, "height")
                  }}
                >
                  <View
                    style={{
                      marginLeft: check_icon_size + normalize(15, "width")
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
                    marginTop: normalize(21, "height")
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
                      marginLeft: normalize(15, "width"),
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
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
