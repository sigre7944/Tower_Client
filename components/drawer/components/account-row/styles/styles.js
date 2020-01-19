import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../shared/styles/style";
import { normalize } from "../../../../shared/helpers";
export const styles = StyleSheet.create({
  sign_in_sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "white"
  },

  email_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "white"
  }
});
