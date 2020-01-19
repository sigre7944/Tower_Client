import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../shared/styles/style";
import { normalize } from "../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  user_icon_container: {
    width: normalize(48, "width"),
    height: normalize(48, "width"),
    borderRadius: normalize(48, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center"
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  small_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2
  },

  plan_icon_container: {
    width: normalize(48, "width"),
    height: normalize(48, "width"),
    borderRadius: normalize(48, "width"),
    borderWidth: normalize(2.5, "width"),
    borderColor: CommonStyles.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center"
  },

  separating_line: {
    marginHorizontal: normalize(17, "width"),
    height: 1,
    backgroundColor: CommonStyles.text_icon_colors.ti_4
  },

  currency_symbol: {
    fontFamily: CommonStyles.fontFamily,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  }
});
