import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";
import { normalize } from "../../shared/helpers";
export const styles = StyleSheet.create({
  title_text: {
    fontFamily: CommonStyles.sf_ui_display_medium_font,
    fontSize: normalize(48, "width"),
    lineHeight: normalize(51, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textTransform: "uppercase"
  },

  input_title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  input_text: {
    height: normalize(24, "height"),
    // paddingVertical: normalize(5, "height"),
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    borderBottomWidth: 1,
    borderColor: CommonStyles.text_icon_colors.ti_4
  },

  forgot_password_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textDecorationLine: "underline"
  },

  button_container: {
    height: normalize(48, "height"),
    borderRadius: normalize(4, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white",
    textTransform: "uppercase"
  },

  sign_in_small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  sign_in_small_underline_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: CommonStyles.text_icon_colors.ti_1
  },

  small_instruction_password_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  small_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: "#EB5757"
  },

  referral_check_container: {
    width: normalize(52, "width"),
    height: normalize(24, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(2, "width"),
    marginLeft: normalize(20, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  referral_check_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: "white"
  }
});
