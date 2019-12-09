import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";

export const styles = StyleSheet.create({
  image_container: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: CommonStyles.primary_colors.prim_3,
    justifyContent: "center",
    alignItems: "center"
  },

  row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 58
  },

  normal_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 16,
    lineHeight: 19,
    color: CommonStyles.text_icon_colors.ti_1
  },

  highlight_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    color: CommonStyles.primary_colors.prim_1
  },

  separate_line: {
    height: 1,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)"
  },

  log_out_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    color: "#EB5757"
  }
});
