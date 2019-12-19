import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../styles/style";
import { normalize } from "../../../helpers";
export const styles = StyleSheet.create({
  title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(26, "width"),
    lineHeight: normalize(29, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  upgrade_button_container: {
    width: normalize(316, "width"),
    height: normalize(57, "height"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_1,
    borderRadius: normalize(4, "width")
  },

  upgrade_button_normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "white"
  },

  benefit_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  versus_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  motivation_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "#EB5757"
  }
});
