import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../shared/styles/style";
import { normalize } from "../../../shared/helpers";
export const styles = StyleSheet.create({
  chosen_screen_component_icon: {
    color: CommonStyle.primary_colors.prim_1
  },

  not_chosen_screen_component_icon: {
    color: CommonStyle.text_icon_colors.ti_3
  },

  chosen_screen_component_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(14, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  not_chosen_screen_component_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(14, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  }
});
