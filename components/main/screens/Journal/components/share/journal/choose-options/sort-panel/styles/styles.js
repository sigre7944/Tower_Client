import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  row_name: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3
  },

  close_button_container: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.text_icon_colors.ti_3,
    borderRadius: normalize(35, "width")
  },

  save_button_container: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_1,
    marginLeft: normalize(44, "width"),
    borderRadius: normalize(35, "width")
  }
});
