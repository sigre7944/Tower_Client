import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  not_chosen_annotation_holder: {
    height: normalize(32, "height"),
    width: normalize(85, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30
  },

  chosen_annotation_holder: {
    height: normalize(32, "height"),
    width: normalize(85, "height"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyle.primary_colors.prim_3,
    borderRadius: 30
  },

  not_chosen_annotation_text: {
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_3
  },

  chosen_annotation_text: {
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
  }
});
