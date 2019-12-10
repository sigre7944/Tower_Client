import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  sign_in_sign_up_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: "white",
    marginLeft: 16
  },

  text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: "white"
  },
  normal_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    textAlign: "center"
  },
  small_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 15,
    lineHeight: 18,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3,
    textAlign: "center"
  },

  edit_container: {
    height: 42,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2994A"
  },

  delete_container: {
    height: 42,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EB5757"
  },

  category_row_container: {
    marginTop: 20,
    flexDirection: "row"
  }
});
