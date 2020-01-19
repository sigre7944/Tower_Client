import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../shared/styles/style";
import { normalize } from "../../../../shared/helpers";
export const styles = StyleSheet.create({
  informing_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  motivating_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    marginTop: normalize(3, "height")
  },

  add_reward_button_container: {
    width: normalize(316, "width"),
    height: normalize(48, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(5, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    marginTop: normalize(48, "height"),
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 1,
    elevation: 2
  }
});
