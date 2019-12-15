import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";

export const styles = StyleSheet.create({
  completed_container: {
    width: normalize(100, "width"),
    height: normalize(28, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_3,
    borderRadius: 15,
    marginVertical: normalize(25, "height"),
    marginLeft: normalize(25, "width")
  },

  completed_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  }
});
