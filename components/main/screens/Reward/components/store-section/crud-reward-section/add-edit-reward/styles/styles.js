import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1,
    marginLeft: normalize(13, "width")
  },

  reward_title_informer: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3
  },

  reward_input: {
    marginTop: normalize(10, "height"),
    height: normalize(33, "height"),
    borderBottomWidth: 1,
    borderColor: CommonStyles.text_icon_colors.ti_4,
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  set_as_main_reward_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  cancel_container: {
    width: normalize(36, "width"),
    height: normalize(36, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.text_icon_colors.ti_3,
    borderRadius: normalize(36, "width"),
    marginRight: normalize(44, "width")
  },

  save_container: {
    width: normalize(36, "width"),
    height: normalize(36, "width"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CommonStyles.primary_colors.prim_1,
    borderRadius: normalize(36, "width")
  },

  delete_reward_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(15, "width"),
    lineHeight: normalize(18, "height"),
    letterSpacing: -0.02,
    color: "#EB5757"
  },

  delete_warning_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  }
});
