import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
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
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3,
    width: normalize(27, "width"),
    height: normalize(28, "width"),
    borderBottomWidth: 1,
    borderBottomColor: CommonStyle.text_icon_colors.ti_3,
    marginLeft: normalize(20, "width"),
    textAlign: "center"
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
  }
});
