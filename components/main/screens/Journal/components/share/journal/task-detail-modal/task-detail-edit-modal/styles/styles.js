import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  minus: {
    width: normalize(37, "width"),
    height: normalize(5, "height"),
    borderRadius: normalize(3, "width"),
    backgroundColor: "#D4D4D4"
  },

  title_small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: "black",
    opacity: 0.25
  },

  text_input: {
    borderColor: "rgba(0, 0, 0, 0.15)",
    borderBottomWidth: 1,
    alignItems: "center",
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    marginLeft: normalize(25, "width")
  },

  cancel_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3
  }
});
