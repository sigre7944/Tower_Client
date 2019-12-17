import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";
import { normalize } from "../../shared/helpers";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  sign_in_sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "white",
    marginLeft: normalize(16, "width")
  },

  text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "white"
  },
  normal_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textAlign: "center"
  },
  small_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3,
    textAlign: "center"
  },

  edit_container: {
    height: normalize(42, "height"),
    width: normalize(50, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2994A"
  },

  delete_container: {
    height: normalize(42, "height"),
    width: normalize(50, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EB5757"
  },

  category_row_container: {
    marginTop: normalize(20, "height"),
    flexDirection: "row"
  }
});
