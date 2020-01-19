import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  unchosen_weekth_container: {
    width: normalize(84, "width"),
    height: normalize(28, "height"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(214, 214, 214, 0.3)",
    borderRadius: normalize(15, "width")
  },

  chosen_weekth_container: {
    width: normalize(84, "width"),
    height: normalize(28, "height"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.primary_colors.prim_3,
    borderRadius: normalize(15, "width")
  },

  unchosen_weekth_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  chosen_weekth_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  unchosen_week_every_month_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  chosen_week_every_month_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

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
  },

  picker_button_container: {
    marginLeft: normalize(20, "width"),
    width: normalize(84, "width"),
    height: normalize(28, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(15, "width"),
    backgroundColor: CommonStyle.primary_colors.prim_3
  }
});
