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

  sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: "white",
    textTransform: "uppercase"
  },

  sign_in_small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  sign_in_small_underline_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.02,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: CommonStyles.text_icon_colors.ti_1
  },

  small_instruction_password_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  small_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.02,
    color: "#EB5757"
  },

  referral_check_container: {
    width: 52,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginLeft: 20,
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  referral_check_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.02,
    color: "white"
  }
});
