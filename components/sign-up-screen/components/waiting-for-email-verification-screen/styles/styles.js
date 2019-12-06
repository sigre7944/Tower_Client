import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../shared/styles/style";

export const styles = StyleSheet.create({
  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  cancel_sign_up_button: {
    height: 32,
    justifyContent: "center",
    alignItems: "center"
  },

  cancel_sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_2,
    textTransform: "uppercase"
  },

  welcome_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 21,
    lineHeight: 24,
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  }
});
