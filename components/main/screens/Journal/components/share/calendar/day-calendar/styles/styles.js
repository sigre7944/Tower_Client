import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
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
    marginLeft: 5
  },

  day_text_absolute: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
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
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    color: CommonStyle.primary_colors.prim_1,
    // marginLeft: 5,
    letterSpacing: -0.02
  },

  day_holder_container: {
    flex: 1,
    height: 32,
    justifyContent: "center",
    alignItems: "center"
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
    borderRadius: normalize(16, "width"),
    backgroundColor: "white"
  },

  chosen_round_day_container: {
    width: normalize(32, "width"),
    height: normalize(32, "width"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(16, "width"),
    backgroundColor: CommonStyle.primary_colors.prim_3
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

  option_text: {
    marginLeft: normalize(20, "width"),
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "rgba(0, 0, 0, 0.3)"
  },

  close_icon_holder: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    borderRadius: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.text_icon_colors.ti_6
  },

  save_icon_holder: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    borderRadius: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.primary_colors.prim_1,
    marginLeft: normalize(45, "width")
  }
});
