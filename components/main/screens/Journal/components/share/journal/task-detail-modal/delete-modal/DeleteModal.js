import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  View,
  Dimensions,
  Modal
} from "react-native";

import { Map, List, fromJS } from "immutable";
import { styles } from "./styles/styles";
import { normalize } from "../../../../../../../../shared/helpers";

const window_width = Dimensions.get("window").width;

export default class DeleteModal extends React.PureComponent {
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

  month_names = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  short_month_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

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

  _updateNewData = () => {
    let completed_tasks_map = Map(this.props.completed_tasks),
      task_id = Map(this.props.task_data).get("id"),
      returning_day_chart_stats_map = Map(
        this.props.day_chart_stats
      ).asMutable(),
      returning_week_chart_stats_map = Map(
        this.props.week_chart_stats
      ).asMutable(),
      returning_month_chart_stats_map = Map(
        this.props.month_chart_stats
      ).asMutable(),
      returning_year_chart_stats_map = Map(
        this.props.year_chart_stats
      ).asMutable(),
      type = this.props.type,
      task_type = Map(this.props.task_data).get("type");

    Map(completed_tasks_map.get(task_id))
      .keySeq()
      .forEach((key, index) => {
        if (key !== "id" && key !== "category") {
          let completed_priority_array = List(
            completed_tasks_map.getIn([
              task_id,
              key,
              "completed_priority_array"
            ])
          );

          let timestamp = parseInt(key);

          if (type === "day") {
            let day_in_week = new Date(timestamp).getDay(),
              day_in_month = new Date(timestamp).getDate(),
              month_in_year = new Date(timestamp).getMonth(),
              year = new Date(timestamp).getFullYear(),
              year_toString = year.toString(),
              monday = this.getMonday(new Date(timestamp)),
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
              day_timestamp_toString = key,
              total_points = parseInt(
                completed_tasks_map.getIn([task_id, key, "totalPoints"], 0)
              );

            if (
              returning_day_chart_stats_map.hasIn([
                day_timestamp_toString,
                "totalPoints"
              ])
            ) {
              returning_day_chart_stats_map.updateIn(
                [day_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (
              returning_week_chart_stats_map.hasIn([
                week_timestamp_toString,
                "totalPoints"
              ])
            ) {
              returning_week_chart_stats_map.updateIn(
                [week_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (
              returning_month_chart_stats_map.hasIn([
                month_timestamp_toString,
                "totalPoints"
              ])
            ) {
              returning_month_chart_stats_map.updateIn(
                [month_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (
              returning_year_chart_stats_map.hasIn([
                year_toString,
                "totalPoints"
              ])
            ) {
              returning_year_chart_stats_map.updateIn(
                [year_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            completed_priority_array.forEach(
              (completed_value, priority_index) => {
                if (
                  returning_day_chart_stats_map.hasIn([
                    day_timestamp_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  returning_day_chart_stats_map.updateIn(
                    [day_timestamp_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  returning_day_chart_stats_map.hasIn([
                    day_timestamp_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  returning_day_chart_stats_map.updateIn(
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
                  returning_week_chart_stats_map.hasIn([
                    week_timestamp_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  returning_week_chart_stats_map.updateIn(
                    [week_timestamp_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  returning_week_chart_stats_map.hasIn([
                    week_timestamp_toString,
                    "completed_priority_array",
                    day_in_week,
                    priority_index
                  ])
                ) {
                  returning_week_chart_stats_map.updateIn(
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
                  returning_week_chart_stats_map.hasIn([
                    week_timestamp_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  returning_week_chart_stats_map.updateIn(
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
                  returning_month_chart_stats_map.hasIn([
                    month_timestamp_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  returning_month_chart_stats_map.updateIn(
                    [month_timestamp_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  returning_month_chart_stats_map.hasIn([
                    month_timestamp_toString,
                    "completed_priority_array",
                    day_in_month - 1,
                    priority_index
                  ])
                ) {
                  returning_month_chart_stats_map.updateIn(
                    [
                      month_timestamp_toString,
                      "completed_priority_array",
                      day_in_month - 1,
                      priority_index
                    ],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  returning_month_chart_stats_map.hasIn([
                    month_timestamp_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  returning_month_chart_stats_map.updateIn(
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
                  returning_year_chart_stats_map.hasIn([
                    year_toString,
                    "current",
                    priority_index
                  ])
                ) {
                  returning_year_chart_stats_map.updateIn(
                    [year_toString, "current", priority_index],
                    value =>
                      value - completed_value < 0 ? 0 : value - completed_value
                  );
                }

                if (
                  returning_year_chart_stats_map.hasIn([
                    year_toString,
                    "completed_priority_array",
                    month_in_year,
                    priority_index
                  ])
                ) {
                  returning_year_chart_stats_map.updateIn(
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
                  returning_year_chart_stats_map.hasIn([
                    year_toString,
                    "task_type_completions",
                    this.task_type_order["day"]
                  ])
                ) {
                  returning_year_chart_stats_map.updateIn(
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
          } else if (type === "week") {
            let week_timestamp_toString = key,
              total_points_array = List(
                completed_tasks_map.getIn([task_id, key, "total_points_array"])
              );

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
                  total_points = parseInt(
                    total_points_array.get(day_in_week_index)
                  );

                if (
                  returning_day_chart_stats_map.hasIn([
                    day_timestamp_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_day_chart_stats_map.updateIn(
                    [day_timestamp_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                if (
                  returning_week_chart_stats_map.hasIn([
                    week_timestamp_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_week_chart_stats_map.updateIn(
                    [week_timestamp_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                if (
                  returning_month_chart_stats_map.hasIn([
                    month_timestamp_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_month_chart_stats_map.updateIn(
                    [month_timestamp_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                if (
                  returning_year_chart_stats_map.hasIn([
                    year_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_year_chart_stats_map.updateIn(
                    [year_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                List(completed_value_array).forEach(
                  (completed_value, priority_index) => {
                    if (
                      returning_day_chart_stats_map.hasIn([
                        day_timestamp_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_day_chart_stats_map.updateIn(
                        [day_timestamp_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_day_chart_stats_map.hasIn([
                        day_timestamp_toString,
                        "task_type_completions",
                        this.task_type_order["week"]
                      ])
                    ) {
                      returning_day_chart_stats_map.updateIn(
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
                      returning_week_chart_stats_map.hasIn([
                        week_timestamp_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_week_chart_stats_map.updateIn(
                        [week_timestamp_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_week_chart_stats_map.hasIn([
                        week_timestamp_toString,
                        "completed_priority_array",
                        day_in_week_index,
                        priority_index
                      ])
                    ) {
                      returning_week_chart_stats_map.updateIn(
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
                      returning_week_chart_stats_map.hasIn([
                        week_timestamp_toString,
                        "task_type_completions",
                        this.task_type_order["week"]
                      ])
                    ) {
                      returning_week_chart_stats_map.updateIn(
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
                      returning_month_chart_stats_map.hasIn([
                        month_timestamp_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_month_chart_stats_map.updateIn(
                        [month_timestamp_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_month_chart_stats_map.hasIn([
                        month_timestamp_toString,
                        "completed_priority_array",
                        day_in_month - 1,
                        priority_index
                      ])
                    ) {
                      returning_month_chart_stats_map.updateIn(
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
                      returning_month_chart_stats_map.hasIn([
                        month_timestamp_toString,
                        "task_type_completions",
                        this.task_type_order["week"]
                      ])
                    ) {
                      returning_month_chart_stats_map.updateIn(
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
                      returning_year_chart_stats_map.hasIn([
                        year_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_year_chart_stats_map.updateIn(
                        [year_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_year_chart_stats_map.hasIn([
                        year_toString,
                        "completed_priority_array",
                        month_in_year,
                        priority_index
                      ])
                    ) {
                      returning_year_chart_stats_map.updateIn(
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
                      returning_year_chart_stats_map.hasIn([
                        year_toString,
                        "task_type_completions",
                        this.task_type_order["week"]
                      ])
                    ) {
                      returning_year_chart_stats_map.updateIn(
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
          } else {
            let month_timestamp_toString = key,
              total_points_array = List(
                completed_tasks_map.getIn([task_id, key, "total_points_array"])
              );

            completed_priority_array.forEach(
              (completed_value_array, day_in_month_index) => {
                let day_in_month = day_in_month_index + 1,
                  timestamp_date = new Date(timestamp),
                  date = new Date(
                    timestamp_date.getFullYear(),
                    timestamp_date.getMonth(),
                    day_in_month
                  ),
                  day_in_week = date.getDay(),
                  month_in_year = date.getMonth(),
                  year = date.getFullYear(),
                  year_toString = date.getFullYear().toString(),
                  monday = this.getMonday(date),
                  day_timestamp_toString = date.getTime().toString(),
                  week_timestamp_toString = new Date(
                    monday.getFullYear(),
                    monday.getMonth(),
                    monday.getDate()
                  )
                    .getTime()
                    .toString(),
                  total_points = parseInt(
                    total_points_array.get(day_in_month_index)
                  );

                if (
                  returning_day_chart_stats_map.hasIn([
                    day_timestamp_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_day_chart_stats_map.updateIn(
                    [day_timestamp_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                if (
                  returning_week_chart_stats_map.hasIn([
                    week_timestamp_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_week_chart_stats_map.updateIn(
                    [week_timestamp_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                if (
                  returning_month_chart_stats_map.hasIn([
                    month_timestamp_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_month_chart_stats_map.updateIn(
                    [month_timestamp_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                if (
                  returning_year_chart_stats_map.hasIn([
                    year_toString,
                    "totalPoints"
                  ])
                ) {
                  returning_year_chart_stats_map.updateIn(
                    [year_toString, "totalPoints"],
                    value =>
                      value - total_points < 0 ? 0 : value - total_points
                  );
                }

                List(completed_value_array).forEach(
                  (completed_value, priority_index) => {
                    if (
                      returning_day_chart_stats_map.hasIn([
                        day_timestamp_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_day_chart_stats_map.updateIn(
                        [day_timestamp_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_day_chart_stats_map.hasIn([
                        day_timestamp_toString,
                        "task_type_completions",
                        this.task_type_order["month"]
                      ])
                    ) {
                      returning_day_chart_stats_map.updateIn(
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
                      returning_week_chart_stats_map.hasIn([
                        week_timestamp_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_week_chart_stats_map.updateIn(
                        [week_timestamp_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_week_chart_stats_map.hasIn([
                        week_timestamp_toString,
                        "completed_priority_array",
                        day_in_week,
                        priority_index
                      ])
                    ) {
                      returning_week_chart_stats_map.updateIn(
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
                      returning_week_chart_stats_map.hasIn([
                        week_timestamp_toString,
                        "task_type_completions",
                        this.task_type_order["month"]
                      ])
                    ) {
                      returning_week_chart_stats_map.updateIn(
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
                      returning_month_chart_stats_map.hasIn([
                        month_timestamp_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_month_chart_stats_map.updateIn(
                        [month_timestamp_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_month_chart_stats_map.hasIn([
                        month_timestamp_toString,
                        "completed_priority_array",
                        day_in_month_index,
                        priority_index
                      ])
                    ) {
                      returning_month_chart_stats_map.updateIn(
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
                      returning_month_chart_stats_map.hasIn([
                        month_timestamp_toString,
                        "task_type_completions",
                        this.task_type_order["month"]
                      ])
                    ) {
                      returning_month_chart_stats_map.updateIn(
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
                      returning_year_chart_stats_map.hasIn([
                        year_toString,
                        "current",
                        priority_index
                      ])
                    ) {
                      returning_year_chart_stats_map.updateIn(
                        [year_toString, "current", priority_index],
                        value =>
                          value - completed_value < 0
                            ? 0
                            : value - completed_value
                      );
                    }

                    if (
                      returning_year_chart_stats_map.hasIn([
                        year_toString,
                        "completed_priority_array",
                        month_in_year,
                        priority_index
                      ])
                    ) {
                      returning_year_chart_stats_map.updateIn(
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
                      returning_year_chart_stats_map.hasIn([
                        year_toString,
                        "task_type_completions",
                        this.task_type_order["month"]
                      ])
                    ) {
                      returning_year_chart_stats_map.updateIn(
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
        }
      });

    return {
      returning_day_chart_stats_map,
      returning_week_chart_stats_map,
      returning_month_chart_stats_map,
      returning_year_chart_stats_map
    };
  };

  _deleteTaskAndHistory = () => {
    let task_id = Map(this.props.task_data).get("id"),
      task_category = Map(this.props.task_data).get("category"),
      task_priority_value = Map(this.props.task_data).getIn([
        "priority",
        "value"
      ]),
      new_data = this._updateNewData(),
      type = this.props.type,
      sending_data = {
        delete_task_data: {
          type: "DELETE_DAY_TASK",
          id: task_id
        },
        update_category_data: {
          keyPath: [task_category, "quantity"],
          notSetValue: 0,
          updater: value => (value - 1 < 0 ? 0 : value - 1)
        },
        update_priority_data: {
          keyPath: [task_priority_value, "tasks"],
          notSetValue: [],
          updater: tasks =>
            List(tasks).delete(
              List(tasks).findIndex(
                task_data => Map(task_data).get("id") === task_id
              )
            )
        },
        delete_completed_task_data: {
          type: "DELETE_COMPLETED_DAY_TASK",
          id: task_id
        },

        return_new_day_chart_stats_data: {
          type: "RETURN_NEW_DAY_CHART_STATS",
          data: new_data.returning_day_chart_stats_map
        },

        return_new_week_chart_stats_data: {
          type: "RETURN_NEW_WEEK_CHART_STATS",
          data: new_data.returning_week_chart_stats_map
        },

        return_new_month_chart_stats_data: {
          type: "RETURN_NEW_MONTH_CHART_STATS",
          data: new_data.returning_month_chart_stats_map
        },

        return_new_year_chart_stats_data: {
          type: "RETURN_NEW_YEAR_CHART_STATS",
          data: new_data.returning_year_chart_stats_map
        },

        deleted_task_data: {
          type: "DELETE_DELETED_KEYPATH_DAY_TASK",
          keyPath: [task_id]
        }
      };

    if (type === "week") {
      sending_data.delete_task_data.type = "DELETE_WEEK_TASK";
      sending_data.delete_completed_task_data.type =
        "DELETE_COMPLETED_WEEK_TASK";
      sending_data.deleted_task_data.type = "DELETE_DELETED_KEYPATH_WEEK_TASK";
    } else if (type === "month") {
      sending_data.delete_task_data.type = "DELETE_MONTH_TASK";
      sending_data.delete_completed_task_data.type =
        "DELETE_COMPLETED_MONTH_TASK";
      sending_data.deleted_task_data.type = "DELETE_DELETED_KEYPATH_MONTH_TASK";
    }

    this.props.deleteTaskAndHistoryThunk(sending_data);
    this.props._agreeDelete();
    this.props._toggleDelete();
  };

  _deleteRecord = () => {
    let type = this.props.type,
      task_data_map = Map(this.props.task_data),
      task_id = task_data_map.get("id"),
      task_category = task_data_map.get("category"),
      task_priority_value = task_data_map.getIn(["priority", "value"]),
      chosen_date_data = this.props.chosen_date_data,
      timestamp_toString = "",
      returning_day_chart_stats_map = Map(
        this.props.day_chart_stats
      ).asMutable(),
      returning_week_chart_stats_map = Map(
        this.props.week_chart_stats
      ).asMutable(),
      returning_month_chart_stats_map = Map(
        this.props.month_chart_stats
      ).asMutable(),
      returning_year_chart_stats_map = Map(
        this.props.year_chart_stats
      ).asMutable(),
      completed_tasks_map = Map(this.props.completed_tasks),
      sending_data = {
        delete_timestamp_completed_task_data: {
          type: "DELETE_KEYPATH_COMPLETED_DAY_TASK",
          keyPath: [task_id, timestamp_toString]
        },
        deleted_task_data: {
          type: "UPDATE_DELETED_DAY_TASK",
          keyPath: [task_id, timestamp_toString],
          notSetValue: {},
          updater: value =>
            fromJS({
              category: task_category,
              priority_value: task_priority_value
            })
        },
        delete_timestamp_day_chart_stats_data: {
          // action_bool: false,
          type: "RETURN_NEW_DAY_CHART_STATS",
          data: returning_day_chart_stats_map
        },
        delete_timestamp_week_chart_stats_data: {
          // action_bool: false,
          type: "RETURN_NEW_WEEK_CHART_STATS",
          data: returning_week_chart_stats_map
        },
        delete_timestamp_month_chart_stats_data: {
          // action_bool: false,
          type: "RETURN_NEW_MONTH_CHART_STATS",
          data: returning_month_chart_stats_map
        },
        delete_timestamp_year_chart_stats_data: {
          // action_bool: false,
          type: "RETURN_NEW_YEAR_CHART_STATS",
          data: returning_year_chart_stats_map
        }
      };

    if (type === "day") {
      let { day, month, year } = chosen_date_data;

      timestamp_toString = new Date(year, month, day).getTime().toString();

      let chosen_date = new Date(year, month, day),
        monday = this.getMonday(chosen_date),
        day_in_week = chosen_date.getDay(),
        day_in_month = chosen_date.getDate(),
        month_in_year = chosen_date.getMonth(),
        week_timestamp_toString = new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate()
        )
          .getTime()
          .toString(),
        month_timestamp_toString = new Date(year, month).getTime().toString(),
        year_toString = year.toString();

      if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
        let total_points = parseInt(
            completed_tasks_map.getIn(
              [task_id, timestamp_toString, "totalPoints"],
              0
            )
          ),
          completed_priority_array = List(
            completed_tasks_map.getIn([
              task_id,
              timestamp_toString,
              "completed_priority_array"
            ])
          );

        if (returning_day_chart_stats_map.has(timestamp_toString)) {
          returning_day_chart_stats_map.updateIn(
            [timestamp_toString, "totalPoints"],
            value => (value - total_points < 0 ? 0 : value - total_points)
          );
        }

        if (returning_week_chart_stats_map.has(week_timestamp_toString)) {
          returning_week_chart_stats_map.updateIn(
            [week_timestamp_toString, "totalPoints"],
            value => (value - total_points < 0 ? 0 : value - total_points)
          );
        }

        if (returning_month_chart_stats_map.has(month_timestamp_toString)) {
          returning_month_chart_stats_map.updateIn(
            [month_timestamp_toString, "totalPoints"],
            value => (value - total_points < 0 ? 0 : value - total_points)
          );
        }

        if (returning_year_chart_stats_map.has(year_toString)) {
          returning_year_chart_stats_map.updateIn(
            [year_toString, "totalPoints"],
            value => (value - total_points < 0 ? 0 : value - total_points)
          );
        }

        completed_priority_array.forEach((completed_value, priority_index) => {
          if (returning_day_chart_stats_map.has(timestamp_toString)) {
            returning_day_chart_stats_map.updateIn(
              [timestamp_toString, "current", priority_index],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
            returning_day_chart_stats_map.updateIn(
              [timestamp_toString, "task_type_completions", 0],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
          }

          if (returning_week_chart_stats_map.has(week_timestamp_toString)) {
            returning_week_chart_stats_map.updateIn(
              [week_timestamp_toString, "current", priority_index],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
            returning_week_chart_stats_map.updateIn(
              [
                week_timestamp_toString,
                "completed_priority_array",
                day_in_week,
                priority_index
              ],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
            returning_week_chart_stats_map.updateIn(
              [week_timestamp_toString, "task_type_completions", 0],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
          }

          if (returning_month_chart_stats_map.has(month_timestamp_toString)) {
            returning_month_chart_stats_map.updateIn(
              [month_timestamp_toString, "current", priority_index],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
            returning_month_chart_stats_map.updateIn(
              [
                month_timestamp_toString,
                "completed_priority_array",
                day_in_month - 1,
                priority_index
              ],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
            returning_month_chart_stats_map.updateIn(
              [month_timestamp_toString, "task_type_completions", 0],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
          }

          if (returning_year_chart_stats_map.has(year_toString)) {
            returning_year_chart_stats_map.updateIn(
              [year_toString, "current", priority_index],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
            returning_year_chart_stats_map.updateIn(
              [
                year_toString,
                "completed_priority_array",
                month_in_year,
                priority_index
              ],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
            returning_year_chart_stats_map.updateIn(
              [year_toString, "task_type_completions", 0],
              value =>
                value - completed_value < 0 ? 0 : value - completed_value
            );
          }
        });

        // sending_data.delete_timestamp_day_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_week_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_month_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_year_chart_stats_data.action_bool = true;
      }

      sending_data.delete_timestamp_completed_task_data.keyPath = [
        task_id,
        timestamp_toString
      ];
      sending_data.deleted_task_data.keyPath = [task_id, timestamp_toString];
    } else if (type === "week") {
      let { monday, start_month, start_year } = chosen_date_data;

      timestamp_toString = new Date(start_year, start_month, monday)
        .getTime()
        .toString();

      sending_data.delete_timestamp_completed_task_data.type =
        "DELETE_KEYPATH_COMPLETED_WEEK_TASK";
      sending_data.deleted_task_data.type = "UPDATE_DELETED_WEEK_TASK";

      if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
        let total_points_array = completed_tasks_map.getIn([
            task_id,
            timestamp_toString,
            "total_points_array"
          ]),
          completed_priority_array = List(
            completed_tasks_map.getIn([
              task_id,
              timestamp_toString,
              "completed_priority_array"
            ])
          );

        completed_priority_array.forEach(
          (completed_value_array, day_in_week_index) => {
            let day_in_week = day_in_week_index === 0 ? 7 : day_in_week_index;

            let date = new Date(
                parseInt(timestamp_toString) + (day_in_week - 1) * 86400 * 1000
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
              total_points = parseInt(
                total_points_array.get(day_in_week_index)
              );

            if (returning_day_chart_stats_map.has(day_timestamp_toString)) {
              returning_day_chart_stats_map.updateIn(
                [day_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (returning_week_chart_stats_map.has(timestamp_toString)) {
              returning_week_chart_stats_map.updateIn(
                [timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (returning_month_chart_stats_map.has(month_timestamp_toString)) {
              returning_month_chart_stats_map.updateIn(
                [month_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (returning_year_chart_stats_map.has(year_toString)) {
              returning_year_chart_stats_map.updateIn(
                [year_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            completed_value_array.forEach((completed_value, priority_index) => {
              if (returning_day_chart_stats_map.has(day_timestamp_toString)) {
                returning_day_chart_stats_map.updateIn(
                  [day_timestamp_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_day_chart_stats_map.updateIn(
                  [day_timestamp_toString, "task_type_completions", 1],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }

              if (returning_week_chart_stats_map.has(timestamp_toString)) {
                returning_week_chart_stats_map.updateIn(
                  [timestamp_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_week_chart_stats_map.updateIn(
                  [
                    timestamp_toString,
                    "completed_priority_array",
                    day_in_week_index,
                    priority_index
                  ],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_week_chart_stats_map.updateIn(
                  [timestamp_toString, "task_type_completions", 1],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }

              if (
                returning_month_chart_stats_map.has(month_timestamp_toString)
              ) {
                returning_month_chart_stats_map.updateIn(
                  [month_timestamp_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_month_chart_stats_map.updateIn(
                  [
                    month_timestamp_toString,
                    "completed_priority_array",
                    day_in_month - 1,
                    priority_index
                  ],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_month_chart_stats_map.updateIn(
                  [month_timestamp_toString, "task_type_completions", 1],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }

              if (returning_year_chart_stats_map.has(year_toString)) {
                returning_year_chart_stats_map.updateIn(
                  [year_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_year_chart_stats_map.updateIn(
                  [
                    year_toString,
                    "completed_priority_array",
                    month_in_year,
                    priority_index
                  ],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_year_chart_stats_map.updateIn(
                  [year_toString, "task_type_completions", 1],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }
            });
          }
        );

        // sending_data.delete_timestamp_day_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_week_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_month_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_year_chart_stats_data.action_bool = true;
      }

      sending_data.delete_timestamp_completed_task_data.keyPath = [
        task_id,
        timestamp_toString
      ];
      sending_data.deleted_task_data.keyPath = [task_id, timestamp_toString];
    } else {
      let { month, year } = chosen_date_data;

      timestamp_toString = new Date(year, month).getTime().toString();

      sending_data.delete_timestamp_completed_task_data.type =
        "DELETE_KEYPATH_COMPLETED_MONTH_TASK";
      sending_data.deleted_task_data.type = "UPDATE_DELETED_MONTH_TASK";

      if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
        let total_points_array = completed_tasks_map.getIn([
            task_id,
            timestamp_toString,
            "total_points_array"
          ]),
          completed_priority_array = List(
            completed_tasks_map.getIn([
              task_id,
              timestamp_toString,
              "completed_priority_array"
            ])
          );

        completed_priority_array.forEach(
          (completed_value_array, day_in_month_index) => {
            let day_in_month = day_in_month_index + 1,
              timestamp_date = new Date(parseInt(timestamp_toString)),
              date = new Date(
                timestamp_date.getFullYear(),
                timestamp_date.getMonth(),
                day_in_month
              ),
              day_in_week = date.getDay(),
              month_in_year = date.getMonth(),
              year = date.getFullYear(),
              year_toString = date.getFullYear().toString(),
              monday = this.getMonday(date),
              day_timestamp_toString = date.getTime().toString(),
              week_timestamp_toString = new Date(
                monday.getFullYear(),
                monday.getMonth(),
                monday.getDate()
              )
                .getTime()
                .toString(),
              total_points = parseInt(
                total_points_array.get(day_in_month_index)
              );

            if (returning_day_chart_stats_map.has(day_timestamp_toString)) {
              returning_day_chart_stats_map.updateIn(
                [day_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (returning_week_chart_stats_map.has(week_timestamp_toString)) {
              returning_week_chart_stats_map.updateIn(
                [week_timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (returning_month_chart_stats_map.has(timestamp_toString)) {
              returning_month_chart_stats_map.updateIn(
                [timestamp_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            if (returning_year_chart_stats_map.has(year_toString)) {
              returning_year_chart_stats_map.updateIn(
                [year_toString, "totalPoints"],
                value => (value - total_points < 0 ? 0 : value - total_points)
              );
            }

            completed_value_array.forEach((completed_value, priority_index) => {
              if (returning_day_chart_stats_map.has(day_timestamp_toString)) {
                returning_day_chart_stats_map.updateIn(
                  [day_timestamp_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_day_chart_stats_map.updateIn(
                  [day_timestamp_toString, "task_type_completions", 2],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }

              if (returning_week_chart_stats_map.has(week_timestamp_toString)) {
                returning_week_chart_stats_map.updateIn(
                  [week_timestamp_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_week_chart_stats_map.updateIn(
                  [
                    week_timestamp_toString,
                    "completed_priority_array",
                    day_in_week,
                    priority_index
                  ],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_week_chart_stats_map.updateIn(
                  [week_timestamp_toString, "task_type_completions", 2],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }

              if (returning_month_chart_stats_map.has(timestamp_toString)) {
                returning_month_chart_stats_map.updateIn(
                  [timestamp_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_month_chart_stats_map.updateIn(
                  [
                    timestamp_toString,
                    "completed_priority_array",
                    day_in_month_index,
                    priority_index
                  ],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_month_chart_stats_map.updateIn(
                  [timestamp_toString, "task_type_completions", 2],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }

              if (returning_year_chart_stats_map.has(year_toString)) {
                returning_year_chart_stats_map.updateIn(
                  [year_toString, "current", priority_index],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_year_chart_stats_map.updateIn(
                  [
                    year_toString,
                    "completed_priority_array",
                    month_in_year,
                    priority_index
                  ],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
                returning_year_chart_stats_map.updateIn(
                  [year_toString, "task_type_completions", 2],
                  value =>
                    value - completed_value < 0 ? 0 : value - completed_value
                );
              }
            });
          }
        );

        // sending_data.delete_timestamp_day_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_week_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_month_chart_stats_data.action_bool = true;

        // sending_data.delete_timestamp_year_chart_stats_data.action_bool = true;
      }

      sending_data.delete_timestamp_completed_task_data.keyPath = [
        task_id,
        timestamp_toString
      ];
      sending_data.deleted_task_data.keyPath = [task_id, timestamp_toString];
    }

    this.props.deleteTaskAndHistoryAtTimeThunk(sending_data);
    this.props._agreeDelete();
    this.props._toggleDelete();
  };

  _checkIfTaskIsOneTimer = () => {
    let task_data_map = Map(this.props.task_data),
      task_end_type = task_data_map.getIn(["end", "type"]),
      type = this.props.type;

    if (task_end_type === "on") {
      let task_end_at_timestamp = task_data_map.getIn(["end", "endAt"]),
        task_schedule = Map(task_data_map.get("schedule"));

      if (type === "day") {
        let schedule_day = task_schedule.get("day"),
          schedule_month = task_schedule.get("month"),
          schedule_year = task_schedule.get("year"),
          schedule_timestamp = new Date(
            schedule_year,
            schedule_month,
            schedule_day
          ).getTime();

        if (Math.floor(task_end_at_timestamp - schedule_timestamp) === 0) {
          return true;
        }
      } else if (type === "week") {
        let schedule_monday = task_schedule.get("monday"),
          schedule_start_month = task_schedule.get("start_month"),
          schedule_start_year = task_schedule.get("start_year"),
          schedule_start_timestamp = new Date(
            schedule_start_year,
            schedule_start_month,
            schedule_monday
          ).getTime(),
          schedule_sunday = task_schedule.get("sunday"),
          schedule_end_month = task_schedule.get("end_month"),
          schedule_end_year = task_schedule.get("end_year"),
          schedule_end_timestamp = new Date(
            schedule_end_year,
            schedule_end_month,
            schedule_sunday
          ).getTime();

        if (
          task_end_at_timestamp >= schedule_start_timestamp &&
          task_end_at_timestamp <= schedule_end_timestamp
        ) {
          return true;
        }
      } else {
        let schedule_month = task_schedule.get("month"),
          schedule_year = task_schedule.get("year");

        if (
          new Date(task_end_at_timestamp).getMonth() === schedule_month &&
          new Date(task_end_at_timestamp).getFullYear() === schedule_year
        ) {
          return true;
        }
      }
    } else if (task_end_type === "after") {
      let task_end_occurrence = task_data_map.getIn(["end", "occurrence"]);

      if (task_end_occurrence === 1) {
        return true;
      }
    }

    return false;
  };

  render() {
    let check_if_task_is_one_timer = this._checkIfTaskIsOneTimer();

    let chosen_date_text = "",
      { chosen_date_data } = this.props;

    if (this.props.type === "day") {
      chosen_date_text = `${this.month_names[chosen_date_data.month]} ${
        chosen_date_data.day
      } ${chosen_date_data.year}`;
    } else if (this.props.type === "week") {
      chosen_date_text = `Week ${chosen_date_data.week}: ${
        this.short_month_names[chosen_date_data.start_month]
      } ${chosen_date_data.monday} ${chosen_date_data.start_year} - ${
        this.short_month_names[chosen_date_data.end_month]
      } ${chosen_date_data.sunday} ${chosen_date_data.end_year}`;
    } else {
      chosen_date_text = `${this.month_names[chosen_date_data.month]} ${
        chosen_date_data.year
      }`;
    }

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
          <TouchableWithoutFeedback onPress={this.props._toggleDelete}>
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "black",
                opacity: 0.2
              }}
            ></View>
          </TouchableWithoutFeedback>

          <View
            style={{
              position: "absolute",
              borderRadius: normalize(20, "width"),
              width: normalize(320, "width"),
              backgroundColor: "white",
              paddingHorizontal: normalize(22, "width"),
              paddingVertical: normalize(22, "height")
            }}
          >
            {/* <Text
                            style={styles.normal_warning_text}
                        >
                            Are you sure you want to delete this task?
                        </Text> */}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingVertical: normalize(5, "height"),
                borderRadius: normalize(5, "width"),
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#EB5757"
              }}
              onPress={this._deleteTaskAndHistory}
            >
              <Text style={{ ...styles.text, ...{ color: "white" } }}>
                {"DELETE TASK & HISTORY"}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                marginTop: normalize(5, "height")
              }}
            >
              <Text style={styles.small_warning_text}>
                Delete the task and all of its records
              </Text>
            </View>

            {check_if_task_is_one_timer ? null : (
              <>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    paddingVertical: normalize(5, "height"),
                    borderRadius: normalize(5, "width"),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F2994A",
                    marginTop: normalize(15, "height")
                  }}
                  onPress={this._deleteRecord}
                >
                  <Text style={{ ...styles.text, ...{ color: "white" } }}>
                    {"Delete Record"}
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    marginTop: normalize(5, "height")
                  }}
                >
                  <Text style={styles.small_warning_text}>
                    Delete the task and its records at
                  </Text>

                  <Text style={styles.small_warning_text}>
                    {chosen_date_text}
                  </Text>
                </View>
              </>
            )}

            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingVertical: normalize(5, "height"),
                borderRadius: normalize(5, "width"),
                justifyContent: "center",
                alignItems: "center",
                marginTop: normalize(15, "height")
              }}
              onPress={this.props._toggleDelete}
            >
              <Text style={{ ...styles.text, ...{ color: "#6E6E6E" } }}>
                {"CANCEL"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
