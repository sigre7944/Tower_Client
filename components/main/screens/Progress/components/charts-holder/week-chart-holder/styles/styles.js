import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  chosen_week_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  day_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  y_axis_text: {
    // fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    color: CommonStyles.text_icon_colors.ti_1
  }
});
