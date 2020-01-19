import { StyleSheet, Platform } from "react-native";

import * as CommonStyles from "../../shared/styles/style";
import { normalize } from "../../shared/helpers";
export const styles = StyleSheet.create({
  header_container: {
    height: normalize(27 + 23 + 17, "height"),
    paddingTop: Platform.OS === "android" ? 25 : 0,
    marginTop: normalize(17, "height"),
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
  },

  title_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3
  },

  input: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    paddingVertical: normalize(5, "height"),
    marginTop: normalize(3, "height"),
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.15)"
  },

  separating_line: {
    height: 1,
    backgroundColor: "black",
    opacity: 0.15,
    marginHorizontal: normalize(22, "width")
  }
});
