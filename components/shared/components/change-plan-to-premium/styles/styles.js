import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../styles/style";
import { normalize } from "../../../helpers";
export const styles = StyleSheet.create({
  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1,
    textAlign: "center"
  },

  button_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(21, "width"),
    lineHeight: normalize(24, "height"),
    letterSpacing: -0.02,
    color: "white",
    textAlign: "center"
  },
  button_container: {
    height: normalize(48, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(5, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    marginTop: normalize(32, "height")
  }
});
