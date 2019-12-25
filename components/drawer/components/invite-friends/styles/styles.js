import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../shared/styles/style";
import { normalize } from "../../../../shared/helpers";
export const styles = StyleSheet.create({
  text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "white"
  },

  big_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(28, "width"),
    lineHeight: normalize(31, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1,
    textAlign: "center"
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textAlign: "center"
  },

  small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    textAlign: "center"
  },

  your_referral_code_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  referral_code_container: {
    height: normalize(50, "height"),
    paddingHorizontal: normalize(15, "width"),
    justifyContent: "center",
    backgroundColor: CommonStyles.primary_colors.prim_1,
    borderRadius: 5,
    marginTop: normalize(5, "height"),
    position: "relative"
  },

  referral_code_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(24, "width"),
    lineHeight: normalize(27, "height"),
    letterSpacing: -0.02,
    color: "white"
  },

  copy_container: {
    height: normalize(50, "height"),
    marginRight: normalize(15, "width"),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },

  copy_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white",
    textAlign: "center"
  },

  copy_share_container: {
    position: "absolute",
    right: 0,
    height: normalize(50, "height"),
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row"
  },

  share_container: {
    height: normalize(50, "height"),
    marginRight: normalize(15, "width"),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  }
});
