import { Platform } from "react-native";
// export const sf_ui_display_light_font = "SFUIDisplay-Light";
// export const sf_ui_display_medium_font = "SFUIDisplay-Medium";

export const sf_ui_display_light_font = Platform.OS === "ios" ? "Arial": "Roboto"
export const sf_ui_display_medium_font = Platform.OS === "ios" ? "Arial": "Roboto"

export const primary_colors = {
  prim_1: "#05838B",
  prim_2: "#B4DADC",
  prim_3: "#E6F3F3"
};

export const priority_colors = {
  prio_1: "#F78096",
  prio_2: "#EFDA6E",
  prio_3: "#6F73D9",
  prio_4: "#CBC8C8"
};

export const category_colors = {
  cate_1: "#F78096",
  cate_2: "#6F73D9",
  cate_3: "#E89005",
  cate_4: "#CCF3F3",
  cate_5: "#DDC8C4",
  cate_6: "#995852",
  cate_7: "#EFDA6E",
  cate_8: "#003F5C",
  cate_9: "#296EB4"
};

export const text_icon_colors = {
  ti_1: "#2C2C2C",
  ti_2: "#6E6E6E",
  ti_3: "#BDBDBD",
  ti_4: "#D6D6D6",
  ti_5: "#FFFFFF",
  ti_6: "#C4C4C4"
};

export const oauth_colors = {
  oauth_1: "#3B5998",
  oauth_2: "#BD5240"
};
