import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  title: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: normalize(15, "width")
  },

  normal_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1
  },

  reward_input: {
    height: normalize(25, "height"),
    paddingHorizontal: normalize(7, "width"),
    justifyContent: "center",
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_2,
    borderBottomWidth: 1,
    borderColor: CommonStyle.text_icon_colors.ti_4,
    textAlign: "center"
  },

  currency: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "width"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1,
    marginLeft: normalize(10, "width")
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
  },

  priority_do_first_container: {
    paddingHorizontal: normalize(15, "width"),
    paddingVertical: normalize(5, "height"),
    borderRadius: normalize(15, "width"),
    backgroundColor: "rgba(247, 128, 150, 0.2)"
  },

  priority_plan_container: {
    paddingHorizontal: normalize(15, "width"),
    paddingVertical: normalize(5, "height"),
    borderRadius: normalize(15, "width"),
    backgroundColor: "rgba(239, 218, 110, 0.2)"
  },

  priority_delay_container: {
    paddingHorizontal: normalize(15, "width"),
    paddingVertical: normalize(5, "height"),
    borderRadius: normalize(15, "width"),
    backgroundColor: "rgba(111, 115, 217, 0.2)"
  },

  priority_delegate_container: {
    paddingHorizontal: normalize(15, "width"),
    paddingVertical: normalize(5, "height"),
    borderRadius: normalize(15, "width"),
    backgroundColor: "rgba(203, 200, 200, 0.2)"
  },

  priority_do_first_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    fontWeight: "500",
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_1
  },

  priority_plan_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    fontWeight: "500",
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_2
  },

  priority_delay_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    fontWeight: "500",
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_3
  },

  priority_delegate_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    fontWeight: "500",
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_4
  },

  matrix_upper_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    textTransform: "uppercase"
  }
});
