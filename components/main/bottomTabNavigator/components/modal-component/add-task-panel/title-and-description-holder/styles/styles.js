import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../shared/styles/style";

import { normalize } from "../../../../../../../shared/helpers";

export const styles = StyleSheet.create({
  title_description_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  title_description_text_input: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1
  }
});
