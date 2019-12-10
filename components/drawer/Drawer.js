import React from "react";
import { DrawerActions } from "react-navigation-drawer";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  Animated
} from "react-native";

import AddCategoryPanel from "../main/screens/Journal/components/share/category/add-category-panel/AddCategoryPanel.Container";
import EditCategoryPanel from "../main/screens/Journal/components/share/category/edit-category-panel/EditCategoryPanel.Container";
import AccountRow from "./components/account-row/AccountRow.Container";

import { Map, List, OrderedMap } from "immutable";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInbox, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/styles";

import Swipeable from "react-native-gesture-handler/Swipeable";

import { category_icon, plus_icon } from "../shared/icons";
import PremiumAd from "../shared/components/premium-ad/PremiumAd";

const icon_size = 18;
const icon_color = "white";

const category_row_height = 42;
const window_width = Dimensions.get("window").width;

export default class Drawer extends React.PureComponent {
  priority_order = {
    pri_01: 0,
    pri_02: 1,
    pri_03: 2,
    pri_04: 3
  };

  task_type_order = {
    day: 0,
    week: 1,
    month: 2
  };

  category_data = Map();

  state = {
    delete_category_bool: false,

    add_new_category_bool: false,

    edit_category_bool: false
  };

  getWeek = date => {
    let target = new Date(date);
    let dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    let firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
  };

  getMonday = date => {
    let dayInWeek = new Date(date).getDay();
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1;
    return new Date(new Date(date).getTime() - diff * 86400 * 1000);
  };

  _toggleAddNewCategory = () => {
    this.setState(prevState => ({
      add_new_category_bool: !prevState.add_new_category_bool
    }));
  };

  _setEditCategoryData = data => {
    this.category_data = data;
  };

  _toggleEditCategory = data => {
    this.category_data = data;
    this.setState(prevState => ({
      edit_category_bool: !prevState.edit_category_bool
    }));
  };

  _toggleDeleteWarning = data => {
    this.category_data = data;
    this.setState(prevState => ({
      delete_category_bool: !prevState.delete_category_bool
    }));
  };

  _updateNewData = () => {
    let new_day_chart_stats = Map(this.props.day_chart_stats).asMutable(),
      new_week_chart_stats = Map(this.props.week_chart_stats).asMutable(),
      new_month_chart_stats = Map(this.props.month_chart_stats).asMutable(),
      new_year_chart_stats = Map(this.props.year_chart_stats).asMutable(),
      completed_day_tasks_map = Map(this.props.completed_day_tasks),
      completed_week_tasks_map = Map(this.props.completed_week_tasks),
      completed_month_tasks_map = Map(this.props.completed_month_tasks),
      category_data = Map(this.category_data),
      category_id = category_data.get("id");

    completed_day_tasks_map.valueSeq().forEach((completed_day_task, index) => {
      let completed_day_task_map = Map(completed_day_task);
      if (completed_day_task_map.get("category") === category_id) {
        completed_day_task_map.entrySeq().forEach((tuple, tuple_index) => {
          let key = tuple[0],
            data = tuple[1];

          if (key !== "id" && key !== "category") {
            let completed_priority_array = List(
                data.get("completed_priority_array")
              ),
              timestamp = parseInt(key),
              day_in_week = new Date(timestamp).getDay(),
              day_in_month = new Date(timestamp).getDate(),
              month_in_year = new Date(timestamp).getMonth(),
              year = new Date(timestamp).getFullYear(),
              year_toString = year.toString(),
              monday = this.getMonday(new Date(timestamp)),
              day_timestamp_toString = key,
              week_timestamp_toString = new Date(
                monday.getFullYear(),
                monday.getMonth(),
                monday.getDate()
              )
                .getTime()
                .toString(),
              month_timestamp_toString = new Date(year, month_in_year)
                .getTime()
                .toString(),
              total_points = parseInt(data.get("totalPoints"));

            if (
              new_day_chart_stats.hasIn([day_timestamp_toString, "totalPoints"])
            ) {
              new_day_chart_stats.updateIn(
                [day_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (
              new_week_chart_stats.hasIn([
                week_timestamp_toString,
                "totalPoints"
              ])
            ) {
              new_week_chart_stats.updateIn(
                [week_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (
              new_month_chart_stats.hasIn([
                month_timestamp_toString,
                "totalPoints"
              ])
            ) {
              new_month_chart_stats.updateIn(
                [month_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (new_year_chart_stats.hasIn([year_toString, "totalPoints"])) {
              new_year_chart_stats.updateIn(
                [year_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            completed_priority_array.forEach(
              (completed_value, priority_index) => {
                if (
                  new_day_chart_stats.hasIn([
                    day_timestamp_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  new_day_chart_stats.updateIn(
                    [day_timestamp_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_day_chart_stats.hasIn([
                    day_timestamp_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  new_day_chart_stats.updateIn(
                    [
                      day_timestamp_toString,
                      "task_type_completions",
                      this.task_type_order["day"]
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_week_chart_stats.hasIn([
                    week_timestamp_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  new_week_chart_stats.updateIn(
                    [week_timestamp_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_week_chart_stats.hasIn([
                    week_timestamp_toString,
                    "completed_priority_array",
                    day_in_week,
                    priority_index
                  ])
                ) {
                  new_week_chart_stats.updateIn(
                    [
                      week_timestamp_toString,
                      "completed_priority_array",
                      day_in_week,
                      priority_index
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_week_chart_stats.hasIn([
                    week_timestamp_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  new_week_chart_stats.updateIn(
                    [
                      week_timestamp_toString,
                      "task_type_completions",
                      this.task_type_order["day"]
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_month_chart_stats.hasIn([
                    month_timestamp_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  new_month_chart_stats.updateIn(
                    [month_timestamp_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_month_chart_stats.hasIn([
                    month_timestamp_toString,
                    "completed_priority_array",
                    day_in_month,
                    priority_index
                  ])
                ) {
                  new_month_chart_stats.updateIn(
                    [
                      month_timestamp_toString,
                      "completed_priority_array",
                      day_in_month,
                      priority_index
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_month_chart_stats.hasIn([
                    month_timestamp_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  new_month_chart_stats.updateIn(
                    [
                      month_timestamp_toString,
                      "task_type_completions",
                      this.task_type_order["day"]
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_year_chart_stats.hasIn([
                    year_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  new_year_chart_stats.updateIn(
                    [year_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_year_chart_stats.hasIn([
                    year_toString,
                    "completed_priority_array",
                    month_in_year,
                    priority_index
                  ])
                ) {
                  new_year_chart_stats.updateIn(
                    [
                      year_toString,
                      "completed_priority_array",
                      month_in_year,
                      priority_index
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  new_year_chart_stats.hasIn([
                    year_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  new_year_chart_stats.updateIn(
                    [
                      year_toString,
                      "task_type_completions",
                      this.task_type_order["day"]
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }
              }
            );
          }
        });
      }
    });

    completed_week_tasks_map
      .valueSeq()
      .forEach((completed_week_task, index) => {
        let completed_week_task_map = Map(completed_week_task);

        if (completed_week_task_map.get("category") === category_id) {
          completed_week_task_map.entrySeq().forEach((tuple, tuple_index) => {
            let key = tuple[0],
              data = tuple[1];

            if (key !== "id" && key !== "category") {
              let completed_priority_array = List(
                  data.get("completed_priority_array")
                ),
                week_timestamp_toString = key,
                timestamp = parseInt(key),
                total_points_array = List(data.get("total_points_array"));

              completed_priority_array.forEach(
                (completed_value_array, day_in_week_index) => {
                  let day_in_week =
                    day_in_week_index === 0 ? 7 : day_in_week_index;
                  let date = new Date(
                      timestamp + (day_in_week - 1) * 86400 * 1000
                    ),
                    day_in_month = date.getDate(),
                    month_in_year = date.getMonth(),
                    year = date.getFullYear(),
                    year_toString = year.toString(),
                    month_timestamp_toString = new Date(year, month_in_year)
                      .getTime()
                      .toString(),
                    day_timestamp_toString = new Date(
                      year,
                      month_in_year,
                      day_in_month
                    )
                      .getTime()
                      .toString(),
                    total_points = total_points_array.get(day_in_week_index);

                  if (
                    new_day_chart_stats.hasIn([
                      day_timestamp_toString,
                      "totalPoints"
                    ])
                  ) {
                    new_day_chart_stats.updateIn(
                      [day_timestamp_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  if (
                    new_week_chart_stats.hasIn([
                      week_timestamp_toString,
                      "totalPoints"
                    ])
                  ) {
                    new_week_chart_stats.updateIn(
                      [week_timestamp_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  if (
                    new_month_chart_stats.hasIn([
                      month_timestamp_toString,
                      "totalPoints"
                    ])
                  ) {
                    new_month_chart_stats.updateIn(
                      [month_timestamp_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  if (
                    new_year_chart_stats.hasIn([year_toString, "totalPoints"])
                  ) {
                    new_year_chart_stats.updateIn(
                      [year_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  List(completed_value_array).forEach(
                    (completed_value, priority_index) => {
                      if (
                        new_day_chart_stats.hasIn([
                          day_timestamp_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_day_chart_stats.updateIn(
                          [day_timestamp_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_day_chart_stats.hasIn([
                          day_timestamp_toString,
                          "task_type_completions",
                          this.task_type_order["week"]
                        ])
                      ) {
                        new_day_chart_stats.updateIn(
                          [
                            day_timestamp_toString,
                            "task_type_completions",
                            this.task_type_order["week"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_week_chart_stats.hasIn([
                          week_timestamp_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_week_chart_stats.updateIn(
                          [week_timestamp_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_week_chart_stats.hasIn([
                          week_timestamp_toString,
                          "completed_priority_array",
                          day_in_week_index,
                          priority_index
                        ])
                      ) {
                        new_week_chart_stats.updateIn(
                          [
                            week_timestamp_toString,
                            "completed_priority_array",
                            day_in_week_index,
                            priority_index
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_week_chart_stats.hasIn([
                          week_timestamp_toString,
                          "task_type_completions",
                          this.task_type_order["week"]
                        ])
                      ) {
                        new_week_chart_stats.updateIn(
                          [
                            week_timestamp_toString,
                            "task_type_completions",
                            this.task_type_order["week"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_month_chart_stats.hasIn([
                          month_timestamp_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_month_chart_stats.updateIn(
                          [month_timestamp_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_month_chart_stats.hasIn([
                          month_timestamp_toString,
                          "completed_priority_array",
                          day_in_month - 1,
                          priority_index
                        ])
                      ) {
                        new_month_chart_stats.updateIn(
                          [
                            month_timestamp_toString,
                            "completed_priority_array",
                            day_in_month - 1,
                            priority_index
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_month_chart_stats.hasIn([
                          month_timestamp_toString,
                          "task_type_completions",
                          this.task_type_order["week"]
                        ])
                      ) {
                        new_month_chart_stats.updateIn(
                          [
                            month_timestamp_toString,
                            "task_type_completions",
                            this.task_type_order["week"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_year_chart_stats.hasIn([
                          year_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_year_chart_stats.updateIn(
                          [year_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_year_chart_stats.hasIn([
                          year_toString,
                          "completed_priority_array",
                          month_in_year,
                          priority_index
                        ])
                      ) {
                        new_year_chart_stats.updateIn(
                          [
                            year_toString,
                            "completed_priority_array",
                            month_in_year,
                            priority_index
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_year_chart_stats.hasIn([
                          year_toString,
                          "task_type_completions",
                          this.task_type_order["week"]
                        ])
                      ) {
                        new_year_chart_stats.updateIn(
                          [
                            year_toString,
                            "task_type_completions",
                            this.task_type_order["week"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }
                    }
                  );
                }
              );
            }
          });
        }
      });

    completed_month_tasks_map
      .valueSeq()
      .forEach((completed_month_task, index) => {
        let completed_month_task_map = Map(completed_month_task);

        if (completed_month_task_map.get("category") === category_id) {
          completed_month_task_map.entrySeq().forEach((tuple, tuple_index) => {
            let key = tuple[0],
              data = tuple[1];

            if (key !== "id" && key !== "category") {
              let completed_priority_array = List(
                  data.get("completed_priority_array")
                ),
                month_timestamp_toString = key,
                timestamp = parseInt(key),
                total_points_array = List(data.get("total_points_array"));

              completed_priority_array.forEach(
                (completed_value_array, day_in_month_index) => {
                  let day_in_month = parseInt(day_in_month_index) + 1,
                    date = new Date(timestamp),
                    day_in_week = date.getDay(),
                    month_in_year = date.getMonth(),
                    year = date.getFullYear(),
                    year_toString = date.getFullYear().toString(),
                    monday = this.getMonday(
                      new Date(year, month_in_year, day_in_month)
                    ),
                    week_timestamp_toString = new Date(
                      monday.getFullYear(),
                      monday.getMonth(),
                      monday.getDate()
                    )
                      .getTime()
                      .toString(),
                    day_timestamp_toString = new Date(
                      year,
                      month_in_year,
                      day_in_month
                    )
                      .getTime()
                      .toString(),
                    total_points = total_points_array.get(day_in_month_index);

                  if (
                    new_day_chart_stats.hasIn([
                      day_timestamp_toString,
                      "totalPoints"
                    ])
                  ) {
                    new_day_chart_stats.updateIn(
                      [day_timestamp_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  if (
                    new_week_chart_stats.hasIn([
                      week_timestamp_toString,
                      "totalPoints"
                    ])
                  ) {
                    new_week_chart_stats.updateIn(
                      [week_timestamp_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  if (
                    new_month_chart_stats.hasIn([
                      month_timestamp_toString,
                      "totalPoints"
                    ])
                  ) {
                    new_month_chart_stats.updateIn(
                      [month_timestamp_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  if (
                    new_year_chart_stats.hasIn([year_toString, "totalPoints"])
                  ) {
                    new_year_chart_stats.updateIn(
                      [year_toString, "totalPoints"],
                      value =>
                        value - total_points < 0 ? 0 : value - total_points
                    );
                  }

                  List(completed_value_array).forEach(
                    (completed_value, priority_index) => {
                      if (
                        new_day_chart_stats.hasIn([
                          day_timestamp_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_day_chart_stats.updateIn(
                          [day_timestamp_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_day_chart_stats.hasIn([
                          day_timestamp_toString,
                          "task_type_completions",
                          this.task_type_order["month"]
                        ])
                      ) {
                        new_day_chart_stats.updateIn(
                          [
                            day_timestamp_toString,
                            "task_type_completions",
                            this.task_type_order["month"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_week_chart_stats.hasIn([
                          week_timestamp_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_week_chart_stats.updateIn(
                          [week_timestamp_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_week_chart_stats.hasIn([
                          week_timestamp_toString,
                          "completed_priority_array",
                          day_in_week,
                          priority_index
                        ])
                      ) {
                        new_week_chart_stats.updateIn(
                          [
                            week_timestamp_toString,
                            "completed_priority_array",
                            day_in_week,
                            priority_index
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_week_chart_stats.hasIn([
                          week_timestamp_toString,
                          "task_type_completions",
                          this.task_type_order["month"]
                        ])
                      ) {
                        new_week_chart_stats.updateIn(
                          [
                            week_timestamp_toString,
                            "task_type_completions",
                            this.task_type_order["month"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_month_chart_stats.hasIn([
                          month_timestamp_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_month_chart_stats.updateIn(
                          [month_timestamp_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_month_chart_stats.hasIn([
                          month_timestamp_toString,
                          "completed_priority_array",
                          day_in_month_index,
                          priority_index
                        ])
                      ) {
                        new_month_chart_stats.updateIn(
                          [
                            month_timestamp_toString,
                            "completed_priority_array",
                            day_in_month_index,
                            priority_index
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_month_chart_stats.hasIn([
                          month_timestamp_toString,
                          "task_type_completions",
                          this.task_type_order["month"]
                        ])
                      ) {
                        new_month_chart_stats.updateIn(
                          [
                            month_timestamp_toString,
                            "task_type_completions",
                            this.task_type_order["month"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_year_chart_stats.hasIn([
                          year_toString,
                          "current",
                          priority_index
                        ])
                      ) {
                        new_year_chart_stats.updateIn(
                          [year_toString, "current", priority_index],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_year_chart_stats.hasIn([
                          year_toString,
                          "completed_priority_array",
                          month_in_year,
                          priority_index
                        ])
                      ) {
                        new_year_chart_stats.updateIn(
                          [
                            year_toString,
                            "completed_priority_array",
                            month_in_year,
                            priority_index
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }

                      if (
                        new_year_chart_stats.hasIn([
                          year_toString,
                          "task_type_completions",
                          this.task_type_order["month"]
                        ])
                      ) {
                        new_year_chart_stats.updateIn(
                          [
                            year_toString,
                            "task_type_completions",
                            this.task_type_order["month"]
                          ],
                          value =>
                            value - completed_value < 0
                              ? 0
                              : value - completed_value
                        );
                      }
                    }
                  );
                }
              );
            }
          });
        }
      });

    return {
      new_day_chart_stats,
      new_week_chart_stats,
      new_month_chart_stats,
      new_year_chart_stats
    };
  };

  _updateNewPriorities = () => {
    let new_priorities = Map(this.props.priorities).asMutable(),
      category_data = Map(this.category_data),
      category_id = category_data.get("id");

    Map(this.props.priorities)
      .entrySeq()
      .forEach((tuple, index) => {
        let key = tuple[0],
          priority_data = tuple[1];
        let tasks_list = List(Map(priority_data).get("tasks"));

        tasks_list.forEach((task_data, task_index) => {
          if (Map(task_data).get("category") === category_id) {
            new_priorities.deleteIn([key, "tasks", task_index]);
          }
        });
      });

    return new_priorities;
  };

  _deleteCategoryAffectingTasksAndHistory = () => {
    let category_data = Map(this.category_data),
      new_data = this._updateNewData();

    let sending_obj = {
      category_id: category_data.get("id"),
      new_priorities: this._updateNewPriorities(),
      new_day_chart_stats: new_data.new_day_chart_stats,
      new_week_chart_stats: new_data.new_week_chart_stats,
      new_month_chart_stats: new_data.new_month_chart_stats,
      new_year_chart_stats: new_data.new_year_chart_stats
    };

    this.props.deleteTasksAndHistory(sending_obj);
    this._toggleDeleteWarning();
  };

  _deleteCategoryAffectingOnlyTasks = () => {
    let category_data = Map(this.category_data),
      new_priorities = this._updateNewPriorities();

    let sending_obj = {
      category_id: category_data.get("id"),
      new_priorities
    };

    this.props.deleteOnlyTasks(sending_obj);
    this._toggleDeleteWarning();
  };

  render() {
    return (
      <View style={styles.container}>
        <AccountRow navigation={this.props.navigation} />

        <CategoryFlatlist
          categories={this.props.categories}
          _toggleEditCategory={this._toggleEditCategory}
          _setEditCategoryData={this._setEditCategoryData}
          current_chosen_category={this.props.current_chosen_category}
          chooseCategory={this.props.chooseCategory}
          _toggleDeleteWarning={this._toggleDeleteWarning}
          navigation={this.props.navigation}
          currentRoute={this.props.currentRoute}
          account_plan={Map(this.props.generalSettings).getIn([
            "account",
            "package",
            "plan"
          ])}
        />

        <AddNewCategory _toggleAddNewCategory={this._toggleAddNewCategory} />

        {this.state.add_new_category_bool ? (
          <AddCategoryPanel
            _closeAddCategoryPanel={this._toggleAddNewCategory}
            at_drawer={true}
          />
        ) : (
          <>
            {this.state.edit_category_bool ? (
              <EditCategoryPanel
                _closeAddCategoryPanel={this._toggleEditCategory}
                category_data={this.category_data}
              />
            ) : (
              <>
                {this.state.delete_category_bool ? (
                  <DeleteWarning
                    _deleteCategoryAffectingTasksAndHistory={
                      this._deleteCategoryAffectingTasksAndHistory
                    }
                    _deleteCategoryAffectingOnlyTasks={
                      this._deleteCategoryAffectingOnlyTasks
                    }
                    _toggleDeleteWarning={this._toggleDeleteWarning}
                  />
                ) : null}
              </>
            )}
          </>
        )}
      </View>
    );
  }
}

class CategoryFlatlist extends React.PureComponent {
  state = {
    current_category_index: 0,
    last_category_index: -1,
    should_flatlist_update: 0
  };

  _chooseCategoryIndex = (index, category_data) => {
    if (this.state.current_category_index !== index) {
      this.setState(
        prevState => ({
          current_category_index: index,
          last_category_index: prevState.current_category_index,
          should_flatlist_update: prevState.should_flatlist_update + 1
        }),
        () => {
          this._scrollToRow();
          this.props._setEditCategoryData(category_data);
          this.props.chooseCategory(Map(category_data).get("id"));

          this.props.navigation.dispatch(DrawerActions.closeDrawer());

          if (
            this.props.currentRoute !== "Day" ||
            this.props.currentRoute !== "Week" ||
            this.props.currentRoute !== "Month"
          ) {
            this.props.navigation.navigate("Journal");
          }
        }
      );
    } else {
      this._scrollToRow();
      this.props._setEditCategoryData(category_data);
      this.props.chooseCategory(Map(category_data).get("id"));

      this.props.navigation.dispatch(DrawerActions.closeDrawer());

      if (
        this.props.currentRoute !== "Day" ||
        this.props.currentRoute !== "Week" ||
        this.props.currentRoute !== "Month"
      ) {
        this.props.navigation.navigate("Journal");
      }
    }
  };

  _setRef = r => (this._flatlist_ref = r);

  _scrollToRow = index => {
    if (this._flatlist_ref) {
      this._flatlist_ref.scrollToOffset({
        animated: true,
        offest: index * (category_row_height + 20)
      });
    }
  };

  _getItemLayout = (data, index) => ({
    length: category_row_height + 20,
    offset: index * (category_row_height + 20),
    index
  });

  _keyExtractor = (item, index) => `drawer-category-${item[0]}`;

  _renderItem = ({ item, index }) => {
    if (Map(item[1]).get("name") === "Inbox") {
      return (
        <InboxRow
          data={item[1]}
          index={index}
          current_category_index={this.state.current_category_index}
          last_category_index={this.state.last_category_index}
          _chooseCategoryIndex={this._chooseCategoryIndex}
        />
      );
    }
    return (
      <CategoryRow
        data={item[1]}
        _toggleEditCategory={this.props._toggleEditCategory}
        _setEditCategoryData={this.props._setEditCategoryData}
        index={index}
        current_category_index={this.state.current_category_index}
        last_category_index={this.state.last_category_index}
        _chooseCategoryIndex={this._chooseCategoryIndex}
        _toggleDeleteWarning={this.props._toggleDeleteWarning}
        account_plan={this.props.account_plan}
      />
    );
  };

  _findStartIndex = () => {
    let { current_chosen_category } = this.props,
      categories_map = OrderedMap(this.props.categories);

    categories_map.valueSeq().every((category_data, index) => {
      if (Map(category_data).get("id") === current_chosen_category) {
        this._chooseCategoryIndex(index, current_chosen_category);
        return false;
      }

      return true;
    });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.categories !== prevProps.categories ||
      this.props.account_plan !== prevProps.account_plan
    ) {
      this.setState(prevState => ({
        should_flatlist_update: prevState.should_flatlist_update + 1
      }));
    }
  }

  render() {
    return (
      <View
        style={{
          marginTop: 20,
          flex: 1
        }}
      >
        <FlatList
          data={OrderedMap(this.props.categories).toArray()}
          extraData={this.state.should_flatlist_update}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          ref={this._setRef}
          windowSize={3}
          maxToRenderPerBatch={3}
          initialNumToRender={3}
          // removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }
}

class InboxRow extends React.Component {
  _chooseCategory = () => {
    this.props._chooseCategoryIndex(this.props.index, this.props.data);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.index === nextProps.current_category_index ||
      this.props.index === nextProps.last_category_index ||
      this.props.data !== nextProps.data
    );
  }

  render() {
    let category_color =
        Map(this.props.data).get("color") === "white" ||
        Map(this.props.data).get("color") === "no color"
          ? "transparent"
          : Map(this.props.data).get("color"),
      category_name = Map(this.props.data).get("name"),
      category_quantity = Map(this.props.data).get("quantity"),
      row_color = category_color,
      alpha_hex = "CC";

    if (this.props.index === this.props.current_category_index) {
      row_color = row_color + alpha_hex;
    } else {
      row_color = "transparent";
    }

    return (
      <TouchableOpacity
        style={{
          marginTop: 20,
          height: category_row_height,
          flexDirection: "row",
          backgroundColor: row_color
        }}
        onPress={this._chooseCategory}
      >
        <View
          style={{
            height: category_row_height,
            width: 4,
            backgroundColor: category_color,
            borderTopRightRadius: 3,
            borderBottomRightRadius: 3
          }}
        ></View>

        <View
          style={{
            flex: 1,
            marginLeft: 18,
            marginRight: 22,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignItems: "center"
            }}
          >
            <FontAwesomeIcon icon={faInbox} color="white" size={18} />

            <Text style={{ ...styles.text, ...{ marginLeft: 16 } }}>
              {category_name}
            </Text>
          </View>

          <Text style={styles.text}>{category_quantity}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class CategoryRow extends React.Component {
  translate_x = new Animated.Value(0);
  old_translate_x = 0;

  state = {
    can_choose: false,
    should_display_premium_ad: false
  };

  _chooseCategory = () => {
    if (this.state.can_choose) {
      this.props._chooseCategoryIndex(this.props.index, this.props.data);
    } else {
      this._toggleShouldDisplayPremiumAd();
    }
  };

  _toggleShouldDisplayPremiumAd = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.props.index === nextProps.current_category_index &&
        this.props.current_category_index !==
          nextProps.current_category_index) ||
      (this.props.index === nextProps.last_category_index &&
        this.props.last_category_index !== nextProps.last_category_index) ||
      this.props.data !== nextProps.data ||
      this.props.account_plan !== nextProps.account_plan ||
      this.state !== nextState
    );
  }

  _editCategory = () => {
    if (this.state.can_choose) {
      this.props._toggleEditCategory(this.props.data);
    } else {
      this._toggleShouldDisplayPremiumAd();
    }
  };

  _deleteCategory = () => {
    this.props._toggleDeleteWarning(this.props.data);
  };

  _renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });
    return (
      <Animated.View
        style={{
          marginTop: 20,
          flexDirection: "row",
          transform: [{ translateX: trans }]
        }}
      >
        <TouchableOpacity
          style={styles.edit_container}
          onPress={this._editCategory}
        >
          <FontAwesomeIcon icon={faEdit} color="white" size={16} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete_container}
          onPress={this._deleteCategory}
        >
          <FontAwesomeIcon icon={faTrashAlt} color="white" size={14} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  _checkIfCanChoose = () => {
    let account_plan = this.props.account_plan,
      category_plan = Map(this.props.data).get("plan"),
      can_choose = false;

    if (category_plan === "free") {
      can_choose = true;
    } else {
      can_choose = account_plan === category_plan;
    }

    this.setState({
      can_choose
    });
  };

  componentDidMount() {
    this._checkIfCanChoose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.account_plan !== prevProps.account_plan) {
      this._checkIfCanChoose();
    }
  }

  render() {
    let category_color =
        Map(this.props.data).get("color") === "white" ||
        Map(this.props.data).get("color") === "no color"
          ? "transparent"
          : Map(this.props.data).get("color"),
      category_name = Map(this.props.data).get("name"),
      category_quantity = Map(this.props.data).get("quantity"),
      row_color = category_color,
      alpha_hex = "CC";

    if (this.props.index === this.props.current_category_index) {
      if (row_color === "transparent") {
        row_color = "#BDBDBDCC";
      } else {
        row_color = row_color + alpha_hex;
      }
    } else {
      row_color = "transparent";
    }

    let can_choose = this.state.can_choose;

    return (
      <Swipeable
        renderRightActions={this._renderRightActions}
        overshootRight={false}
        useNativeAnimations={true}
        rightThreshold={1}
        friction={2}
        overshootFriction={8}
      >
        <View
          style={{
            opacity: can_choose ? 1 : 0.5
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: 20,
              flexDirection: "row",
              height: category_row_height
            }}
            onPress={this._chooseCategory}
          >
            <View
              style={{
                height: category_row_height,
                width: 4,
                backgroundColor: category_color,
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3
              }}
            ></View>

            <View
              style={{
                flex: 1,
                marginLeft: 18,
                marginRight: 22,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    width: icon_size,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {category_icon(icon_size, icon_color)}
                </View>

                <Text style={{ ...styles.text, ...{ marginLeft: 16 } }}>
                  {category_name}
                </Text>
              </View>

              <Text style={styles.text}>{category_quantity}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {this.state.should_display_premium_ad ? (
          <PremiumAd
            dismissAction={this._toggleShouldDisplayPremiumAd}
            motivation_text="The category was disabled due to Free plan."
          />
        ) : null}
      </Swipeable>
    );
  }
}

class AddNewCategory extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 42,
          marginHorizontal: 22,
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center"
        }}
        onPress={this.props._toggleAddNewCategory}
      >
        {plus_icon(icon_size, icon_color)}

        <Text style={{ ...styles.text, ...{ marginLeft: 16 } }}>
          Add Category
        </Text>
      </TouchableOpacity>
    );
  }
}

class DeleteWarning extends React.PureComponent {
  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              width: window_width,
              backgroundColor: "black",
              opacity: 0.2
            }}
            onPress={this.props._toggleDeleteWarning}
          ></TouchableOpacity>

          <View
            style={{
              position: "absolute",
              borderRadius: 20,
              width: 320,
              backgroundColor: "white",
              paddingHorizontal: 22,
              paddingVertical: 22
            }}
          >
            {/* <Text
                            style={styles.normal_warning_text}
                        >
                            Are you sure you want to delete the category?
                        </Text> */}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EB5757",
                paddingVertical: 5
              }}
              onPress={this.props._deleteCategoryAffectingTasksAndHistory}
            >
              <Text style={{ ...styles.text, ...{ color: "white" } }}>
                {"Delete category"}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginTop: 5
              }}
            >
              <Text style={styles.small_warning_text}>
                This action will delete all tasks and their records belonged to
                the category
              </Text>
            </View>

            {/* <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#ffb948",
                                marginTop: 20,
                            }}

                            onPress={this.props._deleteCategoryAffectingOnlyTasks}
                        >
                            <Text
                                style={{ ...styles.text, ...{ color: "white" } }}
                            >
                                {"DELETE ONLY TASKS"}
                            </Text>
                        </TouchableOpacity> */}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
                paddingVertical: 5
              }}
              onPress={this.props._toggleDeleteWarning}
            >
              <Text style={{ ...styles.text, ...{ color: "#6E6E6E" } }}>
                {"Cancel"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
