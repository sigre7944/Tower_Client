import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  not_chosen_week: {
    width: normalize(88, "width"),
    height: normalize(23, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(20, "width"),
    overflow: "hidden"
  },

  chosen_week: {
    width: normalize(88, "width"),
    height: normalize(23, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(20, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_3,
    overflow: "hidden"
  },

  not_chosen_week_text: {
    color: CommonStyles.text_icon_colors.ti_2,
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02
  },

  chosen_week_text: {
    color: CommonStyles.primary_colors.prim_1,
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02
  },

  chosen_inform_text_container: {
    justifyContent: "center",
    alignItems: "center",
    height: normalize(28, "height")
  },

  not_chosen_inform_text_container: {
    justifyContent: "center",
    alignItems: "center",
    height: normalize(20, "height")
  },

  chosen_inform_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  not_chosen_inform_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3
  }
});
