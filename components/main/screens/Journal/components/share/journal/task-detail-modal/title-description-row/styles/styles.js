import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  complete_box_container: {
    width: normalize(28, "width"),
    height: normalize(28, "width"),
    borderRadius: normalize(28, "width"),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)"
  },

  title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  description: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    marginTop: normalize(16, "height")
  }
});
