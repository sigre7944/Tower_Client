import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  balance_title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(20, "width"),
    lineHeight: normalize(23, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  balance_value: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(26, "width"),
    lineHeight: normalize(29, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  currency: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1,
    marginLeft: normalize(10, "width")
  }
});
