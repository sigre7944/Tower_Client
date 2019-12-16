import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  year_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1
  },

  separating_line: {
    height: 1,
    marginTop: normalize(20, "height"),
    marginHorizontal: normalize(15, "width"),
    backgroundColor: CommonStyle.text_icon_colors.ti_4
  },

  unchosen_month_holder_container: {
    flex: 1,
    height: normalize(45, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10, "width")
  },

  chosen_month_holder_container: {
    flex: 1,
    height: normalize(45, "height"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: normalize(10, "width"),
    backgroundColor: CommonStyle.primary_colors.prim_3
  },

  unchosen_month_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1
  },

  chosen_month_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.primary_colors.prim_1
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
  }
});
