import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../shared/styles/style";
import { normalize } from "../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  main_value_title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(26, "width"),
    lineHeight: normalize(29, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  main_value_cheering: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    marginTop: normalize(5, "height")
  },

  cannot_get_button_container: {
    width: normalize(110, "width"),
    height: normalize(36, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(30, "width"),
    backgroundColor: CommonStyles.text_icon_colors.ti_4,
    marginTop: normalize(21, "height")
  },

  can_get_button_container: {
    width: normalize(110, "width"),
    height: normalize(36, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(30, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    marginTop: normalize(21, "height")
  },

  get_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white"
  },

  balance_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(26, "width"),
    lineHeight: normalize(29, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  reward_value_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  no_reward_tracked_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textAlign: "center"
  }
});
