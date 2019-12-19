import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../shared/styles/style";
import { normalize } from "../../../../../../shared/helpers";

export const styles = StyleSheet.create({
  container: {
    paddingTop: normalize(57, "height"),
    height: normalize(125, "height"),
    backgroundColor: "white"
  },
  middle_text_style: {
    color: "#2C2C2C",
    lineHeight: normalize(31, "height"),
    letterSpacing: -0.02,
    fontFamily: CommonStyles.sf_ui_display_medium_font,
    fontSize: normalize(26, "width")
  },

  end_icon_container: {
    justifyContent: "center",
    alignItems: "center",
    width: normalize(60, "width"),
    height: normalize(40, "height")
  }
});
