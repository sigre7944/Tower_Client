import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../shared/styles/style";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 62,
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
    marginVertical: 5,
    position: "relative"
  },

  unable_to_edit_container: {
    flexDirection: "row",
    height: 62,
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
    marginVertical: 5,
    position: "relative",
    opacity: 0.3
  },

  complete_box_container: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CommonStyles.text_icon_colors.ti_3
  },

  complete_box_container_active: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: CommonStyles.primary_colors.prim_1,
    justifyContent: "center",
    alignItems: "center"
  },

  task_title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_1
  },

  completed_task_title: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1
  },

  goal_tracking: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.02,
    color: CommonStyles.text_icon_colors.ti_3,
    marginTop: 5
  },

  completed_goal_tracking: {
    fontFamily: CommonStyles.sf_ui_display_light_font,
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.02,
    color: CommonStyles.primary_colors.prim_1,
    marginTop: 5
  }
});
