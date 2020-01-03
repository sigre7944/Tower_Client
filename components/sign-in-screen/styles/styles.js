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
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
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

  sign_in_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white",
    textTransform: "uppercase"
  },

  sign_up_small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  sign_up_small_underline_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: CommonStyles.text_icon_colors.ti_1
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  cancel_sign_up_button: {
    height: normalize(32, "height"),
    justifyContent: "center",
    alignItems: "center"
  },

  cancel_sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    textTransform: "uppercase"
  },

  welcome_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(21, "width"),
    lineHeight: normalize(24, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  }
});
