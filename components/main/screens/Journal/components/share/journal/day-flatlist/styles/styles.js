import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  not_chosen_day: {
    marginTop: normalize(3, "height"),
    width: normalize(22, "width"),
    height: normalize(22, "width"),
    borderRadius: normalize(22, "width"),
    justifyContent: "center",
    alignItems: "center"
  },

  chosen_day: {
    marginTop: normalize(5, "height"),
    width: normalize(30, "width"),
    height: normalize(30, "width"),
    borderRadius: normalize(30, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_3
  },

  not_chosen_text: {
    color: CommonStyles.text_icon_colors.ti_2,
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02
  },

  chosen_text: {
    color: CommonStyles.primary_colors.prim_1,
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02
  },

  chosen_day_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  not_chosen_day_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    opacity: 0.3
  }
});
