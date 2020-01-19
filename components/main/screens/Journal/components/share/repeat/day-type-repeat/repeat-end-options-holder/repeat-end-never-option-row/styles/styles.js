import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  title_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: normalize(15, "width")
  },

  every_option_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  unchosen_every_option_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  every_option_input: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1,
    width: normalize(27, "width"),
    height: normalize(28, "height"),
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.primary_colors.prim_3,
    marginLeft: normalize(20, "width"),
    textAlign: "center"
  },

  unchosen_every_option_input: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3,
    width: normalize(27, "width"),
    height: normalize(28, "height"),
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.text_icon_colors.ti_3,
    marginLeft: normalize(20, "width"),
    textAlign: "center"
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
  },

  unchosen_left_end_day_in_week_container: {
    flex: 1,
    height: normalize(26, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: normalize(30, "width"),
    borderBottomLeftRadius: normalize(30, "width"),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_2,
    backgroundColor: "white"
  },

  chosen_left_end_day_in_week_container: {
    flex: 1,
    height: normalize(26, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: normalize(30, "width"),
    borderBottomLeftRadius: normalize(30, "width"),
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_1,
    backgroundColor: CommonStyle.primary_colors.prim_1
  },

  unchosen_right_end_day_in_week_container: {
    flex: 1,
    height: normalize(26, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: normalize(30, "width"),
    borderBottomLeftRadius: normalize(30, "width"),
    borderWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_2,
    backgroundColor: "white"
  },

  chosen_right_end_day_in_week_container: {
    flex: 1,
    height: normalize(26, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: normalize(30, "width"),
    borderBottomLeftRadius: normalize(30, "width"),
    borderWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_1,
    backgroundColor: CommonStyle.primary_colors.prim_1
  },

  unchosen_normal_day_in_week_container: {
    flex: 1,
    height: normalize(26, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_2,
    backgroundColor: "white"
  },

  chosen_normal_day_in_week_container: {
    flex: 1,
    height: normalize(26, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_1,
    backgroundColor: CommonStyle.primary_colors.prim_1
  },

  unchosen_day_in_week_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  chosen_day_in_week_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: "white"
  },

  separating_line: {
    marginTop: normalize(25, "height"),
    height: 1,
    backgroundColor: CommonStyle.text_icon_colors.ti_4,
    marginHorizontal: normalize(30, "width")
  },

  repeat_end_chosen_button_container: {
    width: normalize(16, "width"),
    height: normalize(16, "width"),
    borderRadius: normalize(16, "width"),
    borderWidth: 1.5,
    borderColor: CommonStyle.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },

  repeat_end_chosen_button_activated: {
    width: normalize(10, "width"),
    height: normalize(10, "width"),
    borderRadius: normalize(10, "width"),
    backgroundColor: CommonStyle.primary_colors.prim_1
  },

  repeat_end_chosen_button_container_deactivated: {
    width: normalize(16, "width"),
    height: normalize(16, "width"),
    borderRadius: normalize(16, "width"),
    borderWidth: 1.5,
    borderColor: CommonStyle.text_icon_colors.ti_3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },

  close_button_container: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(35, "width"),
    backgroundColor: CommonStyle.text_icon_colors.ti_6
  },

  save_button_container: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(35, "width"),
    backgroundColor: CommonStyle.primary_colors.prim_1,
    marginLeft: normalize(45, "width")
  }
});
