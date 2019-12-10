import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../styles/style";

export const styles = StyleSheet.create({
  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: "#EB5757"
  },

  button_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: -0.02,
    color: "white"
  },
  button_container: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: CommonStyles.primary_colors.prim_1,
    marginTop: 32
  }
});
