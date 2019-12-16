import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  add_button_container: {
    height: normalize(219, "height"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    borderRadius: normalize(10, "width"),
    justifyContent: "center",
    alignItems: "center"
  },

  reward_holder_container: {
    height: normalize(219, "height"),
    backgroundColor: "white",
    borderRadius: normalize(10, "width"),
    alignItems: "center",
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.08)"
  },

  reward_name: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  reward_value: {
    fontFamily: CommonStyles.sf_ui_display_medium_font,
    fontSize: normalize(26, "width"),
    lineHeight: normalize(29, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  currency_text: {
    fontFamily: CommonStyles.sf_ui_display_medium_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  reward_get_button_container: {
    width: normalize(110, "width"),
    height: normalize(36, "height"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_1,
    borderRadius: normalize(30, "width"),
    marginTop: normalize(22, "height")
  },

  reward_get_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white"
  }
});
