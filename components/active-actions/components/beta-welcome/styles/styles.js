import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../shared/styles/style";
import { normalize } from "../../../../shared/helpers";
export const styles = StyleSheet.create({
  big_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(21, "width"),
    lineHeight: normalize(24, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1,
    textAlign: "center"
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textAlign: "justify"
  },

  small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textAlign: "justify"
  },

  go_to_sign_in_container: {
    height: normalize(38, "height"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalize(5, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    marginTop: normalize(22, "height")
  },

  go_to_sign_in_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white",
    textAlign: "center"
  },

  understand_container: {
    height: normalize(38, "height"),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: normalize(5, "width"),
    marginTop: normalize(5, "height")
  },

  understand_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    textAlign: "center"
  }
});
