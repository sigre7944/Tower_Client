import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../shared/styles/style";
import { normalize } from "../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  separating_line: {
    flexDirection: "row",
    height: 1,
    backgroundColor: CommonStyles.text_icon_colors.ti_4,
    marginTop: normalize(32, "height")
  },

  other_rewards_title: {
    marginTop: normalize(32, "height"),
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(20, "width"),
    lineHeight: normalize(23, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  }
});
