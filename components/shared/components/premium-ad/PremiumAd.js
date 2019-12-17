import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  Image,
  Animated,
  Easing,
  Platform
} from "react-native";

import { styles } from "./styles/styles";

import { close_icon, check_icon } from "../../icons";
import { normalize } from "../../helpers";
import { Map } from "immutable";

const icon_size = normalize(24, "width");
const icon_color = "#05838B";

const check_icon_size = normalize(19, "width");

const window_width = Dimensions.get("window").width;
const window_height = Dimensions.get("window").height;
const anim_duration = 350;
const easing = Easing.in();
const premium_1x_image = require("../../../../assets/pngs/premium_1x.png");

export default class PremiumAd extends React.PureComponent {
  anim_translate_y = new Animated.Value(window_height);
  anim_opacity_value = this.anim_translate_y.interpolate({
    inputRange: [0, window_height],
    outputRange: [1, 0],
    extrapolate: "clamp"
  });

  state = {
    is_logged_in: false,
    number_of_tasks_per_category_free: "0",
    number_of_categories_free: "0",
    number_of_rewards_free: "0",
    number_of_tasks_per_category_premium: "0",
    number_of_categories_premium: "0",
    number_of_rewards_premium: "0"
  };

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

  _updateLoggedIn = () => {
    let is_logged_in = Map(this.props.generalSettings).getIn([
      "account",
      "isLoggedIn"
    ]);

    this.setState({
      is_logged_in
    });
  };

  _pay = () => {
    if (this.state.is_logged_in) {
      // PROCESS PAYMENT HERE
    } else {
      if (this.props._goToLogin) {
        this._endAnim(this.props._goToLogin);
      }
    }
  };

  _updateNumbers = () => {
    let generalSettings = Map(this.props.generalSettings),
      number_of_tasks_per_category_free = generalSettings.getIn([
        "package_limitations",
        "free",
        "number_of_tasks_per_category"
      ]),
      number_of_categories_free = generalSettings.getIn([
        "package_limitations",
        "free",
        "number_of_categories"
      ]),
      number_of_rewards_free = generalSettings.getIn([
        "package_limitations",
        "free",
        "number_of_rewards"
      ]),
      number_of_tasks_per_category_premium = generalSettings.getIn([
        "package_limitations",
        "premium",
        "number_of_tasks_per_category"
      ]),
      number_of_categories_premium = generalSettings.getIn([
        "package_limitations",
        "premium",
        "number_of_categories"
      ]),
      number_of_rewards_premium = generalSettings.getIn([
        "package_limitations",
        "premium",
        "number_of_rewards"
      ]);

    this.setState({
      number_of_tasks_per_category_free,
      number_of_categories_free,
      number_of_rewards_free,
      number_of_tasks_per_category_premium,
      number_of_categories_premium,
      number_of_rewards_premium
    });
  };

  componentDidMount() {
    this._startAnim();
    this._updateLoggedIn();
    this._updateNumbers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Map(this.props.generalSettings).getIn(["account", "isLoggedIn"]) ||
      Map(prevProps.generalSettings).getIn(["account", "isLoggedIn"])
    ) {
      this._updateLoggedIn();
    }

    if (
      Map(this.props.generalSettings).getIn(["package_limitations"]) ||
      Map(prevProps.generalSettings).getIn(["package_limitations"])
    ) {
      this._updateNumbers();
    }
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
                marginTop: normalize(42, "height"),
                paddingHorizontal: normalize(22, "width"),
                alignItems: "flex-start"
              }}
            >
              <TouchableOpacity onPress={this._close}>
                {close_icon(icon_size, icon_color)}
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View
                style={{
                  marginTop: normalize(12, "height"),
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.props.motivation_text &&
                this.props.motivation_text.length > 0 &&
                this.props.motivation_text !== "" ? (
                  <View style={{ marginBottom: normalize(10, "height") }}>
                    <Text style={styles.motivation_text}>
                      {this.props.motivation_text}
                    </Text>
                  </View>
                ) : null}

                <Text style={styles.title}>Upgrade to Premium</Text>
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
                      Up to {this.state.number_of_tasks_per_category_premium}{" "}
                      tasks per category.
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
                      ({this.state.number_of_tasks_per_category_free} tasks per
                      category in Free plan)
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
                      Up to {this.state.number_of_categories_premium} categories
                      and rewards.
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
                      ({this.state.number_of_rewards_free} categories and
                      rewards in Free plan)
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

              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: normalize(52, "height"),
                  marginBottom: normalize(93, "height")
                }}
              >
                <TouchableOpacity
                  style={styles.upgrade_button_container}
                  onPress={this._pay}
                >
                  <View>
                    <Text style={styles.upgrade_button_normal_text}>
                      Pay €2.99/month
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
