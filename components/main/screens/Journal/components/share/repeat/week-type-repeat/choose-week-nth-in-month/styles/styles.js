import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../../shared/styles/style";

export const styles = StyleSheet.create({
  unchosen_weekth_container: {
    width: 84,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(214, 214, 214, 0.3)",
    borderRadius: 15
  },

  chosen_weekth_container: {
    width: 84,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.primary_colors.prim_3,
    borderRadius: 15
  },

  unchosen_weekth_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  chosen_weekth_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  unchosen_week_every_month_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  chosen_week_every_month_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  picker_value_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  picker_done_option_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  picker_cancel_option_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  picker_button_container: {
    marginLeft: 20,
    width: 84,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: CommonStyle.primary_colors.prim_3
  }
});
