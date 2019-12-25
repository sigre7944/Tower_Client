import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  Animated,
  Easing,
  Dimensions,
  Platform
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

    // if (referral_code && referral_code.length > 0) {
    //   this.setState(prevState => ({
    //     should_display_banner: !prevState.should_display_banner
    //   }));
    // } else {
    //   this.props.navigation.navigate("SignInScreen");
    // }

    this.setState(prevState => ({
      should_display_banner: !prevState.should_display_banner
    }));
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
          <Banner _toggleDisplayBanner={this._toggleDisplayBanner} />
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

  _close = () => {
    this._endAnim(this.props._toggleDisplayBanner);
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
          <View
            style={{
              marginTop: normalize(42, "height"),
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: normalize(22, "width")
            }}
          >
            <TouchableOpacity onPress={this._close}>
              {close_icon(icon_size, "#05838B")}
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    );
  }
}
