import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Animated,
  Easing,
  Dimensions,
  Platform,
  Clipboard,
  SafeAreaView,
  Share
} from "react-native";

import { styles } from "./styles/styles";

import { paper_plane_icon, close_icon } from "../../../shared/icons";
import { normalize } from "../../../shared/helpers";

import { fromJS, Map } from "immutable";

const category_row_height = normalize(42, "height");
const anim_duration = 250;
const easing = Easing.in();
const window_height = Dimensions.get("window").height;
const icon_size = normalize(24, "width");

export default class InviteFriends extends React.PureComponent {
  state = {
    should_display_banner: false
  };

  _toggleDisplayBanner = () => {
    let referral_code = Map(this.props.generalSettings).getIn([
      "account",
      "referralCode"
    ]);

    if (referral_code && referral_code.length > 0) {
      this.setState(prevState => ({
        should_display_banner: !prevState.should_display_banner
      }));
    } else {
      this.props.navigation.navigate("SignInScreen");
    }

    // this.setState(prevState => ({
    //   should_display_banner: !prevState.should_display_banner
    // }));
  };

  render() {
    return (
      <View
        style={{
          marginTop: normalize(20, "height")
        }}
      >
        <TouchableOpacity
          style={{
            height: category_row_height,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: normalize(22, "width")
          }}
          onPress={this._toggleDisplayBanner}
        >
          {paper_plane_icon(normalize(18, "width"), "white")}

          <View
            style={{
              marginLeft: normalize(18, "width")
            }}
          >
            <Text style={styles.text}>Invite friends</Text>
          </View>
        </TouchableOpacity>

        {this.state.should_display_banner ? (
          <Banner
            _toggleDisplayBanner={this._toggleDisplayBanner}
            referral_code={Map(this.props.generalSettings).getIn([
              "account",
              "referralCode"
            ])}
          />
        ) : null}
      </View>
    );
  }
}

class Banner extends React.PureComponent {
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

  _copyToClipboard = () => {
    Clipboard.setString(this.props.referral_code);
  };

  _close = () => {
    this._endAnim(this.props._toggleDisplayBanner);
  };

  _share = async () => {
    try {
      const result = await Share.share(
        {
          message: "this.props.referral_code"
        },
        {
          dialogTitle: "Share referral code from Quint"
        }
      );

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
        alert("Sharing finished");
      } else if (result.action === Share.dismissedAction) {
        alert("Sharing dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  componentDidMount() {
    this._startAnim();
  }

  render() {
    return (
      <Modal transparent={true}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "white",
            transform: [{ translateY: this.anim_translate_y }],
            opacity: this.anim_opacity_value
          }}
        >
          <SafeAreaView
            style={{
              position: "relative",
              flex: 1
            }}
          >
            <View
              style={{
                marginTop: normalize(22, "height"),
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: normalize(22, "width")
              }}
            >
              <TouchableOpacity onPress={this._close}>
                {close_icon(icon_size, "#05838B")}
              </TouchableOpacity>
            </View>

            <View
              style={{
                marginTop: normalize(42, "height"),
                alignItems: "center",
                paddingHorizontal: normalize(22, "width")
              }}
            >
              <Text style={styles.big_text}>Stay productive together!</Text>
            </View>

            <View
              style={{
                marginTop: normalize(22, "height"),
                alignItems: "center",
                paddingHorizontal: normalize(32, "width")
              }}
            >
              <Text style={styles.normal_text}>
                When your friends sign up using your referral code, both of you
                will get an extra month of Premium plan *. A WIN-WIN deal, don't
                you agree?
              </Text>
            </View>

            <View
              style={{
                marginTop: normalize(54, "height"),
                paddingHorizontal: normalize(32, "width")
                // alignItems: "center"
              }}
            >
              <Text style={styles.your_referral_code_text}>
                Your referral code
              </Text>

              <View style={styles.referral_code_container}>
                <Text style={styles.referral_code_text}>
                  {this.props.referral_code}
                </Text>

                <View style={styles.copy_share_container}>
                  <TouchableOpacity
                    style={styles.copy_container}
                    onPress={this._copyToClipboard}
                  >
                    <Text style={styles.copy_text}>Copy</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.share_container}
                    onPress={this._share}
                  >
                    <Text style={styles.copy_text}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                bottom: normalize(32, "height"),
                paddingHorizontal: normalize(32, "width"),
                left: 0,
                right: 0,
                position: "absolute"
              }}
            >
              <Text style={styles.small_text}>
                * Due to the payment policy, you will start using the free
                acquired Premium months when you paused your subscription. At
                any time you're able to resubscribe again and use as normal.
              </Text>
            </View>
          </SafeAreaView>
        </Animated.View>
      </Modal>
    );
  }
}
