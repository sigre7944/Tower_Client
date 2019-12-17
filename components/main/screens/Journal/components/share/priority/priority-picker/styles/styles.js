import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  picker_value_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(21, "width"),
    lineHeight: normalize(24, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  picker_done_option_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(21, "width"),
    lineHeight: normalize(24, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  picker_cancel_option_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(21, "width"),
    lineHeight: normalize(24, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  }
});
