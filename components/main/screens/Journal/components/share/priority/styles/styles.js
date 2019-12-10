import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../shared/styles/style";

export const styles = StyleSheet.create({
  title: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: 15
  },

  normal_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1
  },

  reward_input: {
    height: 25,
    width: 47,
    justifyContent: "center",
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_2,
    borderBottomWidth: 1,
    borderColor: CommonStyle.text_icon_colors.ti_4,
    textAlign: "center"
  },

  currency: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1,
    marginLeft: 10
  },

  close_icon_holder: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.text_icon_colors.ti_6
  },

  save_icon_holder: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.primary_colors.prim_1,
    marginLeft: 45
  },

  priority_do_first_container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "rgba(247, 128, 150, 0.2)"
  },

  priority_plan_container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "rgba(239, 218, 110, 0.2)"
  },

  priority_delay_container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "rgba(111, 115, 217, 0.2)"
  },

  priority_delegate_container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    backgroundColor: "rgba(203, 200, 200, 0.2)"
  },

  priority_do_first_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_1
  },

  priority_plan_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_2
  },

  priority_delay_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_3
  },

  priority_delegate_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.priority_colors.prio_4
  },

  matrix_upper_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    textTransform: "uppercase"
  }
});
