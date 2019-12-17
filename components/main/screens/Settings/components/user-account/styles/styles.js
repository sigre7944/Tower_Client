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
  }
});
