import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHourglassEnd,
  faClipboardList,
  faStore,
  faChartBar,
  faQuestion,
  faTrophy,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";

export const calendar_icon = (icon_size, icon_color) => (
  <AntDesign name="calendar" size={icon_size} color={icon_color} />
);
export const repeat_icon = (icon_size, icon_color) => (
  <Feather name="repeat" size={icon_size} color={icon_color} />
);
export const category_icon = (icon_size, icon_color) => (
  <Feather name="list" size={icon_size} color={icon_color} />
);
export const priority_icon = (icon_size, icon_color) => (
  <MaterialCommunityIcons
    name="priority-high"
    size={icon_size}
    color={icon_color}
  />
);
export const goal_icon = (icon_size, icon_color) => (
  <Feather name="flag" size={icon_size} color={icon_color} />
);
export const end_icon = (icon_size, icon_color) => (
  <FontAwesomeIcon icon={faHourglassEnd} size={icon_size} color={icon_color} />
);
export const reward_icon = (icon_size, icon_color) => (
  <Feather name="gift" size={icon_size} color={icon_color} />
);
export const check_icon = (icon_size, icon_color) => (
  <Feather name="check" size={icon_size} color={icon_color} />
);
export const close_icon = (icon_size, icon_color) => (
  <AntDesign name="close" size={icon_size} color={icon_color} />
);

export const journal_icon = (icon_size, icon_color) => (
  <FontAwesomeIcon icon={faClipboardList} size={icon_size} color={icon_color} />
);
export const progress_icon = (icon_size, icon_color) => (
  <FontAwesomeIcon icon={faChartBar} size={icon_size} color={icon_color} />
);
export const reward_screen_icon = (icon_size, icon_color) => (
  <FontAwesomeIcon icon={faStore} size={icon_size} color={icon_color} />
);
export const settings_icon = (icon_size, icon_color) => (
  <Feather name="settings" size={icon_size} color={icon_color} />
);

export const plus_icon = (icon_size, icon_color) => (
  <AntDesign name="plus" size={icon_size} color={icon_color} />
);

export const question_icon = (icon_size, icon_color) => (
  <FontAwesomeIcon icon={faQuestion} size={icon_size} color={icon_color} />
);

export const user_icon = (icon_size, icon_color) => (
  <MaterialCommunityIcons name="account" size={icon_size} color={icon_color} />
);
export const left_arrow_icon = (icon_size, icon_color) => (
  <Feather name="arrow-left" size={icon_size} color={icon_color} />
);

export const left_chevron_icon = (icon_size, icon_color) => (
  <FontAwesomeIcon icon={faChevronLeft} size={icon_size} color={icon_color} />
);
export const right_chevron_icon = (icon_size, icon_color) => (
  <FontAwesomeIcon icon={faChevronRight} size={icon_size} color={icon_color} />
);

export const paper_plane_icon = (icon_size, icon_color) => (
  <Entypo name="paper-plane" size={icon_size} color={icon_color} />
);

export const home_icon = (icon_size, icon_color) => (
  <AntDesign name="home" size={icon_size} color={icon_color} />
);
