import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";

export const styles = StyleSheet.create({
  title_text: {
    fontFamily: CommonStyles.sf_ui_display_medium_font,
    fontSize: 48,
    lineHeight: 51,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textTransform: "uppercase"
  },

  input_title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  input_text: {
    height: 24,
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    borderBottomWidth: 1,
    borderColor: CommonStyles.text_icon_colors.ti_4
  },

  forgot_password_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textDecorationLine: "underline"
  },

  button_container: {
    height: 48,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  sign_in_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: "white",
    textTransform: "uppercase"
  },

  sign_up_small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  sign_up_small_underline_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.02,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: CommonStyles.text_icon_colors.ti_1
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  cancel_sign_up_button: {
    height: 32,
    justifyContent: "center",
    alignItems: "center"
  },

  cancel_sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    textTransform: "uppercase"
  },

  welcome_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  }
});
