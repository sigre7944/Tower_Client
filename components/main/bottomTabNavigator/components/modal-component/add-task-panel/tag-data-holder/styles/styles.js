import { StyleSheet } from "react-native";

import * as CommonStyle from "../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  day_tag_schedule_container: {
    width: normalize(153, "width"),
    height: normalize(32, "height"),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: CommonStyle.text_icon_colors.ti_3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: normalize(17, "width"),
    marginTop: normalize(26, "height")
  },

  day_tag_uncolorful_text: {
    fontFamily: CommonStyle.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: CommonStyle.text_icon_colors.ti_1,
    marginLeft: normalize(9, "width")
  },

  day_tag_repeat_container: {
    width: normalize(132, "width"),
    height: normalize(32, "height"),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: CommonStyle.text_icon_colors.ti_3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: normalize(17, "width"),
    marginTop: normalize(26, "height")
  },

  day_tag_container: {
    paddingHorizontal: normalize(15, "width"),
    height: normalize(32, "height"),
    flexDirection: "row",
    borderWidth: 1,
    borderColor: CommonStyle.text_icon_colors.ti_3,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginLeft: normalize(17, "width"),
    marginTop: normalize(26, "height")
  }
});
