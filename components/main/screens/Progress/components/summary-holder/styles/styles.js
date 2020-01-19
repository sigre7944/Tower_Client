import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../shared/styles/style";
import { normalize } from "../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  separating_line: {
    flex: 1,
    height: 1,
    backgroundColor: CommonStyles.text_icon_colors.ti_4,
    marginHorizontal: normalize(16, "width")
  },

  big_completions_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(26, "width"),
    lineHeight: normalize(29, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  informing_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3
  }
});
