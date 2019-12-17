import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  normal_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textAlign: "center"
  },

  small_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(13, "width"),
    lineHeight: normalize(16, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3,
    textAlign: "center"
  }
});
