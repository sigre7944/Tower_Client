import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";

export const styles = StyleSheet.create({
  edit_text: {
    marginLeft: normalize(20, "width"),
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  separating_line: {
    height: 1,
    marginHorizontal: normalize(22, "width"),
    backgroundColor: "#E0E0E0"
  }
});
