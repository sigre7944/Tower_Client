import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../shared/styles/style";
import { normalize } from "../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  month_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  year_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: normalize(5, "height")
  },

  point_earned_text: {
    fontFamily: CommonStyle.sf_ui_display_medium_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  points_text: {
    fontFamily: CommonStyle.sf_ui_display_medium_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: normalize(5, "height")
  },

  day_text_absolute: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: normalize(12, "width"),
    lineHeight: normalize(14, "height"),
    color: CommonStyle.text_icon_colors.ti_1,
    opacity: 0.3,
    // marginLeft: 5,
    letterSpacing: -0.02,
    textTransform: "uppercase"
  },

  week_text_absolute: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    color: CommonStyle.primary_colors.prim_1,
    // marginLeft: 5,
    letterSpacing: -0.02
  },

  cannot_choose_day_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    opacity: 0.3
  },

  not_chosen_round_day_container: {
    width: normalize(32, "width"),
    height: normalize(32, "width"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(32, "width")
  },

  week_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  not_chosen_day_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1
  },

  chosen_day_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  },

  separating_line: {
    height: 1,
    marginTop: normalize(20, "height"),
    marginHorizontal: normalize(15, "width"),
    backgroundColor: CommonStyle.text_icon_colors.ti_4
  },

  point_banner: {
    width: normalize(42, "width"),
    height: normalize(87, "height"),
    borderRadius: normalize(21, "width"),
    backgroundColor: CommonStyle.primary_colors.prim_1,
    alignItems: "center",
    justifyContent: "space-between"
  },

  time_informer_container: {
    width: normalize(30, "width"),
    height: normalize(30, "width"),
    borderRadius: normalize(30, "width"),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: normalize(5, "height")
  },

  point_text_white: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: "white"
  }
});
