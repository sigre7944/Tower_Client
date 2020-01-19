import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  container: {
    marginTop: normalize(40, "height"),
    height: normalize(48, "height"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(4, "width"),
    marginHorizontal: normalize(30, "width"),
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.06)",
    shadowOpacity: 1
  },

  text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: "white"
  }
});
