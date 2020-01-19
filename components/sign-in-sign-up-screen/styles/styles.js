import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";
import { normalize } from "../../shared/helpers";
export const styles = StyleSheet.create({
  sign_in_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white",
    textTransform: "uppercase"
  },

  separating_line: {
    width: normalize(80, "width"),
    height: 1,
    backgroundColor: CommonStyles.text_icon_colors.ti_4
  },

  or_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textTransform: "uppercase"
  },

  button_container: {
    // width: 311,
    height: normalize(48, "height"),
    borderRadius: normalize(4, "width"),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: normalize(32, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  sign_up_small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  sign_up_small_underline_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: CommonStyles.text_icon_colors.ti_1
  }
});
