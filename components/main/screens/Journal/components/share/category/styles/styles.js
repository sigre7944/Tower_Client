import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../shared/styles/style";

export const styles = StyleSheet.create({
  category_title: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: 15
  },

  category_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: "rgba(0, 0, 0, 0.3)",
    marginLeft: 15
  },

  new_category_input: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: "rgba(0, 0, 0, 0.3)",
    marginLeft: 15,
    flex: 1
  },

  close_icon_holder: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.text_icon_colors.ti_6
  },

  save_icon_holder: {
    width: 35,
    height: 35,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.primary_colors.prim_1,
    marginLeft: 45
  },

  unchosen_button_container: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)"
  },

  chosen_button_container: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CommonStyle.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center"
  },

  inner_button_container: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: CommonStyle.primary_colors.prim_1
  },

  category_row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 45,
    opacity: 1
  },

  unable_category_row_container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 45,
    opacity: 0.3
  }
});
