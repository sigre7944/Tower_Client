import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../shared/styles/style";
import { normalize } from "../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  big_title_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  unchosen_annotation_container: {
    flex: 1,
    height: normalize(24, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(30, "width"),
    backgroundColor: "white"
  },

  chosen_annotation_container: {
    flex: 1,
    height: normalize(24, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(30, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1
  },

  unchosen_annotation_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_2
  },

  chosen_annotation_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(12, "width"),
    lineHeight: normalize(15, "height"),
    letterSpacing: -0.02,
    color: "white"
  },

  do_first_mark_container: {
    width: normalize(36, "width"),
    height: normalize(16, "height"),
    backgroundColor: CommonStyles.priority_colors.prio_1
  },

  delay_mark_container: {
    width: normalize(36, "width"),
    height: normalize(16, "height"),
    backgroundColor: CommonStyles.priority_colors.prio_3
  },

  plan_mark_container: {
    width: normalize(36, "width"),
    height: normalize(16, "height"),
    backgroundColor: CommonStyles.priority_colors.prio_2
  },

  delegate_mark_container: {
    width: normalize(36, "width"),
    height: normalize(16, "height"),
    backgroundColor: CommonStyles.priority_colors.prio_4
  },

  mark_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    marginLeft: normalize(10, "width")
  }
});
