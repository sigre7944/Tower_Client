import { StyleSheet } from "react-native";

import * as CommonStyles from "../../shared/styles/style";
import { normalize } from "../../shared/helpers";
export const styles = StyleSheet.create({
  header_container: {
    paddingTop: normalize(57, "height"),
    height: normalize(125, "height"),
    backgroundColor: "white"
  },
  middle_text_style: {
    color: "#2C2C2C",
    lineHeight: normalize(31, "height"),
    letterSpacing: -0.02,
    fontFamily: CommonStyles.sf_ui_display_medium_font,
    fontSize: normalize(26, "width")
  },

  end_icon_container: {
    justifyContent: "center",
    alignItems: "center",
    width: normalize(60, "width"),
    height: normalize(40, "height")
  },

  date_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(20, "width"),
    lineHeight: normalize(23, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  task_card_container: {
    flexDirection: "row",
    height: normalize(62, "height"),
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 10,
    shadowOpacity: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: normalize(5, "height"),
    position: "relative",
    elevation: 8
  },

  complete_box_container_unchosen: {
    width: normalize(28, "width"),
    height: normalize(28, "width"),
    borderRadius: normalize(5, "width"),
    borderWidth: 1,
    borderColor: CommonStyles.text_icon_colors.ti_3,
    justifyContent: "center",
    alignItems: "center"
  },

  complete_box_container_chosen: {
    width: normalize(28, "width"),
    height: normalize(28, "width"),
    borderRadius: normalize(5, "width"),
    backgroundColor: CommonStyles.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center"
  },

  task_title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(18, "width"),
    lineHeight: normalize(21, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  goal_tracking: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(14, "width"),
    lineHeight: normalize(17, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3,
    marginTop: normalize(5, "height")
  },

  bottom_nav_icon_button_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: normalize(60, "height")
  },

  chosen_option_text: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: normalize(16, "width"),
    lineHeight: normalize(19, "height"),
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  }
});
