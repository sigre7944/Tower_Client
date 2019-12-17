import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";

export const styles = StyleSheet.create({
  category_title: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: normalize(15, "width")
  },

  category_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "rgba(0, 0, 0, 0.3)",
    marginLeft: normalize(15, "width")
  },

  new_category_input: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: "rgba(0, 0, 0, 0.3)",
    marginLeft: normalize(15, "width"),
    flex: 1
  },

  close_icon_holder: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    borderRadius: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.text_icon_colors.ti_6
  },

  save_icon_holder: {
    width: normalize(35, "width"),
    height: normalize(35, "width"),
    borderRadius: normalize(35, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.primary_colors.prim_1,
    marginLeft: normalize(45, "width")
  },

  unchosen_button_container: {
    width: normalize(16, "width"),
    height: normalize(16, "width"),
    borderRadius: normalize(16, "width"),
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)"
  },

  chosen_button_container: {
    width: normalize(16, "width"),
    height: normalize(16, "width"),
    borderRadius: normalize(16, "width"),
    borderWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center"
  },

  inner_button_container: {
    width: normalize(10, "width"),
    height: normalize(10, "width"),
    borderRadius: normalize(10, "width"),
    backgroundColor: CommonStyle.primary_colors.prim_1
  },

  category_row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: normalize(45, "height"),
    opacity: 1
  },

  unable_category_row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: normalize(45, "height"),
    opacity: 0.3
  }
});
