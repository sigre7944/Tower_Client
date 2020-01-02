import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  title_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(26, "width"),
    lineHeight: normalize(29, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1,
    marginTop: normalize(30, "height"),
    marginLeft: normalize(30, "width")
  },

  small_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3,
    marginLeft: normalize(30, "width")
  },

  text_input: {
    // height: normalize(25, "height"),
    justifyContent: "center",
    color: CommonStyle.text_icon_colors.ti_1,
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    marginBottom: normalize(10, "height")
  },

  button_container: {
    justifyContent: "center",
    marginTop: normalize(18, "height"),
    marginHorizontal: normalize(30, "width"),
    borderColor: CommonStyle.text_icon_colors.ti_4,
    borderBottomWidth: 1
  },

  invite_friends_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    color: CommonStyle.text_icon_colors.ti_1,
    letterSpacing: -0.02,
    marginTop: normalize(18, "height"),
    marginLeft: normalize(30, "width")
  },

  title_warning_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    color: "#EB5757",
    letterSpacing: -0.02
  },

  warning_close_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    color: CommonStyle.text_icon_colors.ti_3,
    letterSpacing: -0.02
  }
});
