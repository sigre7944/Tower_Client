import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";
import { normalize } from "../../shared/helpers";
export const styles = StyleSheet.create({
  image_container: {
    width: normalize(150, "width"),
    height: normalize(150, "width"),
    borderRadius: normalize(150, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_3,
    justifyContent: "center",
    alignItems: "center"
  },

  row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: normalize(58, "height")
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    color: CommonStyles.text_icon_colors.ti_1
  },

  highlight_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    color: CommonStyles.primary_colors.prim_1
  },

  separate_line: {
    height: 1,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },

  log_out_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    color: "#EB5757"
  }
});
