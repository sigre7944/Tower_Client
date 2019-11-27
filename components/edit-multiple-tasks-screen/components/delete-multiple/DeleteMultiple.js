import React from 'react';
import { DrawerActions } from 'react-navigation-drawer'
import {
    TouchableOpacity,
    Text,
    View,
    Modal,
    TextInput,
    FlatList,
    Dimensions,
    Animated
} from 'react-native'

import { Map, List, OrderedMap, fromJS } from 'immutable'

import { styles } from "./styles/styles";
const window_width = Dimensions.get("window").width


export default class DeleteMultiple extends React.PureComponent {
    month_names = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    short_month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


    _checkIfOneTimer = (task_id) => {
        let tasks_map = Map(this.props.tasks),
            task_data_map = Map(tasks_map.get(task_id)),
            task_end_type = task_data_map.getIn(["end", "type"]),
            { type } = this.props

        if (task_end_type === "on") {
            let task_end_at_timestamp = task_data_map.getIn(["end", "endAt"]),
                task_schedule = Map(task_data_map.get("schedule"))

            if (type === "day") {
                let schedule_day = task_schedule.get("day"),
                    schedule_month = task_schedule.get("month"),
                    schedule_year = task_schedule.get("year"),
                    schedule_timestamp = new Date(schedule_year, schedule_month, schedule_day).getTime()

                if (Math.floor(task_end_at_timestamp - schedule_timestamp) === 0) {
                    return true
                }
            }

            else if (type === "week") {
                let schedule_monday = task_schedule.get("monday"),
                    schedule_start_month = task_schedule.get("start_month"),
                    schedule_start_year = task_schedule.get("start_year"),
                    schedule_start_timestamp = new Date(schedule_start_year, schedule_start_month, schedule_monday).getTime(),
                    schedule_sunday = task_schedule.get("sunday"),
                    schedule_end_month = task_schedule.get("end_month"),
                    schedule_end_year = task_schedule.get("end_year"),
                    schedule_end_timestamp = new Date(schedule_end_year, schedule_end_month, schedule_sunday).getTime()

                if ((task_end_at_timestamp >= schedule_start_timestamp) && (task_end_at_timestamp <= schedule_end_timestamp)) {
                    return true
                }
            }

            else {
                let schedule_month = task_schedule.get("month"),
                    schedule_year = task_schedule.get("year")

                if (new Date(task_end_at_timestamp).getMonth() === schedule_month && new Date(task_end_at_timestamp).getFullYear() === schedule_year) {
                    return true
                }
            }
        }

        else if (task_end_type === "after") {
            let task_end_occurrence = task_data_map.getIn(["end", "occurrence"])

            if (task_end_occurrence === 1) {
                return true
            }
        }

        return false
    }

    _updateNewData = (delete_all_bool) => {
        let checked_task_data_map = Map(this.props.checked_task_data),
            new_day_chart_stats_map = Map(this.props.day_chart_stats).asMutable(),
            new_week_chart_stats_map = Map(this.props.week_chart_stats).asMutable(),
            new_month_chart_stats_map = Map(this.props.month_chart_stats).asMutable(),
            new_year_chart_stats_map = Map(this.props.year_chart_stats).asMutable(),
            new_completed_tasks_map = Map(this.props.completed_tasks).asMutable(),
            new_tasks = Map(this.props.tasks).asMutable(),
            new_priorities = Map(this.props.priorities).asMutable(),
            new_deleted_tasks = Map(this.props.deleted_tasks).asMutable(),
            tasks_map = Map(this.props.tasks),
            { type } = this.props,
            completed_tasks_map = Map(this.props.completed_tasks)

        checked_task_data_map.valueSeq().forEach((checked_task) => {
            let checked_task_map = Map(checked_task)

            if (checked_task_map.get("checked")) {
                let task_id = checked_task_map.get("task_id"),
                    task_priority = tasks_map.getIn([task_id, "priority", "value"]),
                    task_category = tasks_map.getIn(["category"])

                let check_if_one_timer_bool = this._checkIfOneTimer(task_id)

                // If choosing delete records only && the task is a repeating task, we apply partial deletion
                if ((!delete_all_bool && !check_if_one_timer_bool)) {
                    let { chosen_date_data } = this.props

                    if (type === "day") {
                        let { day, month, year } = chosen_date_data

                        let timestamp_toString = new Date(year, month, day).getTime().toString()

                        new_deleted_tasks.updateIn([task_id, timestamp_toString], (value) => fromJS({
                            category: task_category,
                            priority_value: task_priority
                        }))

                        new_completed_tasks_map.deleteIn([task_id, timestamp_toString])

                        let chosen_date = new Date(year, month, day),
                            monday = this.getMonday(chosen_date),
                            day_in_week = chosen_date.getDay(),
                            day_in_month = chosen_date.getDate(),
                            month_in_year = chosen_date.getMonth(),
                            week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime().toString(),
                            month_timestamp_toString = new Date(year, month).getTime().toString(),
                            year_toString = year.toString()

                        if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
                            let total_points = completed_tasks_map.getIn([task_id, timestamp_toString, "totalPoints"], 0),
                                completed_priority_array = List(completed_tasks_map.getIn([task_id, timestamp_toString, "completed_priority_array"]))

                            if (new_day_chart_stats_map.has(timestamp_toString)) {
                                new_day_chart_stats_map.updateIn([timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                            }

                            if (new_week_chart_stats_map.has(week_timestamp_toString)) {
                                new_week_chart_stats_map.updateIn([week_timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                            }

                            if (new_month_chart_stats_map.has(month_timestamp_toString)) {
                                new_month_chart_stats_map.updateIn([month_timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                            }

                            if (new_year_chart_stats_map.has(year_toString)) {
                                new_year_chart_stats_map.updateIn([year_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                            }

                            completed_priority_array.forEach((completed_value, priority_index) => {
                                if (new_day_chart_stats_map.has(timestamp_toString)) {
                                    new_day_chart_stats_map.updateIn([timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    new_day_chart_stats_map.updateIn([timestamp_toString, "task_type_completions", 0], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                }

                                if (new_week_chart_stats_map.has(week_timestamp_toString)) {
                                    new_week_chart_stats_map.updateIn([week_timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    new_week_chart_stats_map.updateIn([week_timestamp_toString, "completed_priority_array", day_in_week, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    new_week_chart_stats_map.updateIn([week_timestamp_toString, "task_type_completions", 0], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                }

                                if (new_month_chart_stats_map.has(month_timestamp_toString)) {
                                    new_month_chart_stats_map.updateIn([month_timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    new_month_chart_stats_map.updateIn([month_timestamp_toString, "completed_priority_array", day_in_month - 1, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    new_month_chart_stats_map.updateIn([month_timestamp_toString, "task_type_completions", 0], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                }

                                if (new_year_chart_stats_map.has(year_toString)) {
                                    new_year_chart_stats_map.updateIn([year_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    new_year_chart_stats_map.updateIn([year_toString, "completed_priority_array", month_in_year, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    new_year_chart_stats_map.updateIn([year_toString, "task_type_completions", 0], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                }
                            })

                        }
                    }

                    else if (type === "week") {
                        let { monday, start_month, start_year } = chosen_date_data

                        let timestamp_toString = new Date(start_year, start_month, monday).getTime().toString()

                        new_deleted_tasks.updateIn([task_id, timestamp_toString], (value) => fromJS({
                            category: task_category,
                            priority_value: task_priority
                        }))

                        new_completed_tasks_map.deleteIn([task_id, timestamp_toString])

                        if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
                            let total_points_array = completed_tasks_map.getIn([task_id, timestamp_toString, "total_points_array"]),
                                completed_priority_array = List(completed_tasks_map.getIn([task_id, timestamp_toString, "completed_priority_array"]))

                            completed_priority_array.forEach((completed_value_array, day_in_week_index) => {
                                let day_in_week = day_in_week_index === 0 ? 7 : day_in_week_index

                                let date = new Date(parseInt(timestamp_toString) + (day_in_week - 1) * 86400 * 1000),
                                    day_in_month = date.getDate(),
                                    month_in_year = date.getMonth(),
                                    year = date.getFullYear(),
                                    year_toString = year.toString(),
                                    month_timestamp_toString = new Date(year, month_in_year).getTime().toString(),
                                    day_timestamp_toString = new Date(year, month_in_year, day_in_month).getTime().toString(),
                                    total_points = parseFloat(total_points_array.get(day_in_week_index))

                                if (new_day_chart_stats_map.has(day_timestamp_toString)) {
                                    new_day_chart_stats_map.updateIn([day_timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                if (new_week_chart_stats_map.has(timestamp_toString)) {
                                    new_week_chart_stats_map.updateIn([timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                if (new_month_chart_stats_map.has(month_timestamp_toString)) {
                                    new_month_chart_stats_map.updateIn([month_timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                if (new_year_chart_stats_map.has(year_toString)) {
                                    new_year_chart_stats_map.updateIn([year_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                completed_value_array.forEach((completed_value, priority_index) => {
                                    if (new_day_chart_stats_map.has(day_timestamp_toString)) {
                                        new_day_chart_stats_map.updateIn([day_timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_day_chart_stats_map.updateIn([day_timestamp_toString, "task_type_completions", 1], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }

                                    if (new_week_chart_stats_map.has(timestamp_toString)) {
                                        new_week_chart_stats_map.updateIn([timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_week_chart_stats_map.updateIn([timestamp_toString, "completed_priority_array", day_in_week_index, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_week_chart_stats_map.updateIn([timestamp_toString, "task_type_completions", 1], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }

                                    if (new_month_chart_stats_map.has(month_timestamp_toString)) {
                                        new_month_chart_stats_map.updateIn([month_timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_month_chart_stats_map.updateIn([month_timestamp_toString, "completed_priority_array", day_in_month - 1, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_month_chart_stats_map.updateIn([month_timestamp_toString, "task_type_completions", 1], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }

                                    if (new_year_chart_stats_map.has(year_toString)) {
                                        new_year_chart_stats_map.updateIn([year_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_year_chart_stats_map.updateIn([year_toString, "completed_priority_array", month_in_year, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_year_chart_stats_map.updateIn([year_toString, "task_type_completions", 1], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }
                                })
                            })
                        }

                        else {
                            let { month, year } = chosen_date_data
                            month_timestamp_toString = new Date(year, month).getTime().toString()
                            new_deleted_tasks.updateIn([task_id, month_timestamp_toString], (value) => fromJS({
                                category: task_category,
                                priority_value: task_priority
                            }))

                            new_completed_tasks_map.deleteIn([task_id, month_timestamp_toString])
                        }

                        new_priorities.updateIn([task_priority, "tasks"], (tasks) => {
                            let tasks_list = List(tasks)
                            return tasks_list.delete(tasks_list.findIndex((id) => task_id === id))
                        })
                    }

                    else {
                        let { month, year } = chosen_date_data

                        let timestamp_toString = new Date(year, month).getTime().toString()

                        new_deleted_tasks.updateIn([task_id, timestamp_toString], (value) => fromJS({
                            category: task_category,
                            priority_value: task_priority
                        }))

                        new_completed_tasks_map.deleteIn([task_id, timestamp_toString])

                        if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
                            let total_points_array = completed_tasks_map.getIn([task_id, timestamp_toString, "total_points_array"]),
                                completed_priority_array = List(completed_tasks_map.getIn([task_id, timestamp_toString, "completed_priority_array"]))

                            completed_priority_array.forEach((completed_value_array, day_in_month_index) => {
                                let day_in_month = day_in_month_index + 1,
                                    timestamp_date = new Date(parseInt(timestamp_toString)),
                                    date = new Date(timestamp_date.getFullYear(), timestamp_date.getMonth(), day_in_month),
                                    day_in_week = date.getDay(),
                                    month_in_year = date.getMonth(),
                                    year = date.getFullYear(),
                                    year_toString = date.getFullYear().toString(),
                                    monday = this.getMonday(date),
                                    day_timestamp_toString = date.getTime().toString(),
                                    week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime().toString(),
                                    total_points = parseFloat(total_points_array.get(day_in_month_index))

                                if (new_day_chart_stats_map.has(day_timestamp_toString)) {
                                    new_day_chart_stats_map.updateIn([day_timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                if (new_week_chart_stats_map.has(week_timestamp_toString)) {
                                    new_week_chart_stats_map.updateIn([week_timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                if (new_month_chart_stats_map.has(timestamp_toString)) {
                                    new_month_chart_stats_map.updateIn([timestamp_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                if (new_year_chart_stats_map.has(year_toString)) {
                                    new_year_chart_stats_map.updateIn([year_toString, "totalPoints"], (value) => value - total_points < 0 ? 0 : value - total_points)
                                }

                                completed_value_array.forEach((completed_value, priority_index) => {
                                    if (new_day_chart_stats_map.has(day_timestamp_toString)) {
                                        new_day_chart_stats_map.updateIn([day_timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_day_chart_stats_map.updateIn([day_timestamp_toString, "task_type_completions", 2], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }

                                    if (new_week_chart_stats_map.has(week_timestamp_toString)) {
                                        new_week_chart_stats_map.updateIn([week_timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_week_chart_stats_map.updateIn([week_timestamp_toString, "completed_priority_array", day_in_week, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_week_chart_stats_map.updateIn([week_timestamp_toString, "task_type_completions", 2], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }

                                    if (new_month_chart_stats_map.has(timestamp_toString)) {
                                        new_month_chart_stats_map.updateIn([timestamp_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_month_chart_stats_map.updateIn([timestamp_toString, "completed_priority_array", day_in_month_index, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_month_chart_stats_map.updateIn([timestamp_toString, "task_type_completions", 2], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }

                                    if (new_year_chart_stats_map.has(year_toString)) {
                                        new_year_chart_stats_map.updateIn([year_toString, "current", priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_year_chart_stats_map.updateIn([year_toString, "completed_priority_array", month_in_year, priority_index], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                        new_year_chart_stats_map.updateIn([year_toString, "task_type_completions", 2], (value) => value - completed_value < 0 ? 0 : value - completed_value)
                                    }
                                })
                            })
                        }
                    }
                }
                
                else {
                    new_deleted_tasks.delete(task_id)
                    new_completed_tasks_map.delete(task_id)
                    new_tasks.delete(task_id)

                    new_priorities.updateIn([task_priority, "tasks"], (tasks) => {
                        let tasks_list = List(tasks)
                        return tasks_list.delete(tasks_list.findIndex((id) => task_id === id))
                    })

                    Map(completed_tasks_map.get(task_id)).entrySeq().forEach((tuple, index) => {
                        let key = tuple[0],
                            completed_tasks_key_data = Map(tuple[1])

                        if (key !== "id" && key !== "category") {
                            let completed_priority_array = List(completed_tasks_key_data.get("completed_priority_array"))

                            let timestamp = parseInt(key)

                            if (type === "day") {
                                let day_in_week = new Date(timestamp).getDay(),
                                    day_in_month = new Date(timestamp).getDate(),
                                    month_in_year = new Date(timestamp).getMonth(),
                                    year = new Date(timestamp).getFullYear(),
                                    year_toString = year.toString(),
                                    monday = this.getMonday(new Date(timestamp)),
                                    week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime().toString(),
                                    month_timestamp_toString = new Date(year, month_in_year).getTime().toString(),
                                    day_timestamp_toString = key,
                                    total_points = completed_tasks_key_data.getIn(["totalPoints"])

                                if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "totalPoints"])) {
                                    new_day_chart_stats_map.updateIn(
                                        [day_timestamp_toString, "totalPoints"],
                                        (value) => value - total_points < 0 ? 0 : value - total_points
                                    )
                                }

                                if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "totalPoints"])) {
                                    new_week_chart_stats_map.updateIn(
                                        [week_timestamp_toString, "totalPoints"],
                                        (value) => value - total_points < 0 ? 0 : value - total_points
                                    )
                                }

                                if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "totalPoints"])) {
                                    new_month_chart_stats_map.updateIn(
                                        [month_timestamp_toString, "totalPoints"],
                                        (value) => value - total_points < 0 ? 0 : value - total_points
                                    )
                                }

                                if (new_year_chart_stats_map.hasIn([year_toString, "totalPoints"])) {
                                    new_year_chart_stats_map.updateIn(
                                        [year_toString, "totalPoints"],
                                        (value) => value - total_points < 0 ? 0 : value - total_points
                                    )
                                }

                                completed_priority_array.forEach((completed_value, priority_index) => {
                                    if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "current", priority_index])) {
                                        new_day_chart_stats_map.updateIn(
                                            [day_timestamp_toString, "current", priority_index],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "task_type_completions", this.task_type_order["day"]])) {
                                        new_day_chart_stats_map.updateIn(
                                            [day_timestamp_toString, "task_type_completions", this.task_type_order["day"]],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "current", priority_index])) {
                                        new_week_chart_stats_map.updateIn(
                                            [week_timestamp_toString, "current", priority_index],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "completed_priority_array", day_in_week, priority_index])) {
                                        new_week_chart_stats_map.updateIn(
                                            [week_timestamp_toString, "completed_priority_array", day_in_week, priority_index],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "task_type_completions", this.task_type_order["day"]])) {
                                        new_week_chart_stats_map.updateIn(
                                            [week_timestamp_toString, "task_type_completions", this.task_type_order["day"]],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "current", priority_index])) {
                                        new_month_chart_stats_map.updateIn(
                                            [month_timestamp_toString, "current", priority_index],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "completed_priority_array", day_in_month - 1, priority_index])) {
                                        new_month_chart_stats_map.updateIn(
                                            [month_timestamp_toString, "completed_priority_array", day_in_month - 1, priority_index],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "task_type_completions", this.task_type_order["day"]])) {
                                        new_month_chart_stats_map.updateIn(
                                            [month_timestamp_toString, "task_type_completions", this.task_type_order["day"]],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_year_chart_stats_map.hasIn([year_toString, "current", priority_index])) {
                                        new_year_chart_stats_map.updateIn(
                                            [year_toString, "current", priority_index],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_year_chart_stats_map.hasIn([year_toString, "completed_priority_array", month_in_year, priority_index])) {
                                        new_year_chart_stats_map.updateIn(
                                            [year_toString, "completed_priority_array", month_in_year, priority_index],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }

                                    if (new_year_chart_stats_map.hasIn([year_toString, "task_type_completions", this.task_type_order["day"]])) {
                                        new_year_chart_stats_map.updateIn(
                                            [year_toString, "task_type_completions", this.task_type_order["day"]],
                                            (value) => value - completed_value < 0 ? 0 : value - completed_value
                                        )
                                    }
                                })

                            }

                            else if (type === "week") {
                                let week_timestamp_toString = key,
                                    total_points_array = List(completed_tasks_key_data.get("total_points_array"))

                                completed_priority_array.forEach((completed_value_array, day_in_week_index) => {
                                    let day_in_week = day_in_week_index === 0 ? 7 : day_in_week_index
                                    let date = new Date(timestamp + (day_in_week - 1) * 86400 * 1000),
                                        day_in_month = date.getDate(),
                                        month_in_year = date.getMonth(),
                                        year = date.getFullYear(),
                                        year_toString = year.toString(),
                                        month_timestamp_toString = new Date(year, month_in_year).getTime().toString(),
                                        day_timestamp_toString = new Date(year, month_in_year, day_in_month).getTime().toString(),
                                        total_points = total_points_array.get(day_in_week_index)

                                    if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "totalPoints"])) {
                                        new_day_chart_stats_map.updateIn(
                                            [day_timestamp_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "totalPoints"])) {
                                        new_week_chart_stats_map.updateIn(
                                            [week_timestamp_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "totalPoints"])) {
                                        new_month_chart_stats_map.updateIn(
                                            [month_timestamp_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    if (new_year_chart_stats_map.hasIn([year_toString, "totalPoints"])) {
                                        new_year_chart_stats_map.updateIn(
                                            [year_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    List(completed_value_array).forEach((completed_value, priority_index) => {
                                        if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "current", priority_index])) {
                                            new_day_chart_stats_map.updateIn(
                                                [day_timestamp_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "task_type_completions", this.task_type_order["week"]])) {
                                            new_day_chart_stats_map.updateIn(
                                                [day_timestamp_toString, "task_type_completions", this.task_type_order["week"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "current", priority_index])) {
                                            new_week_chart_stats_map.updateIn(
                                                [week_timestamp_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "completed_priority_array", day_in_week_index, priority_index])) {
                                            new_week_chart_stats_map.updateIn(
                                                [week_timestamp_toString, "completed_priority_array", day_in_week_index, priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "task_type_completions", this.task_type_order["week"]])) {
                                            new_week_chart_stats_map.updateIn(
                                                [week_timestamp_toString, "task_type_completions", this.task_type_order["week"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "current", priority_index])) {
                                            new_month_chart_stats_map.updateIn(
                                                [month_timestamp_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "completed_priority_array", day_in_month - 1, priority_index])) {
                                            new_month_chart_stats_map.updateIn(
                                                [month_timestamp_toString, "completed_priority_array", day_in_month - 1, priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "task_type_completions", this.task_type_order["week"]])) {
                                            new_month_chart_stats_map.updateIn(
                                                [month_timestamp_toString, "task_type_completions", this.task_type_order["week"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_year_chart_stats_map.hasIn([year_toString, "current", priority_index])) {
                                            new_year_chart_stats_map.updateIn(
                                                [year_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_year_chart_stats_map.hasIn([year_toString, "completed_priority_array", month_in_year, priority_index])) {
                                            new_year_chart_stats_map.updateIn(
                                                [year_toString, "completed_priority_array", month_in_year, priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_year_chart_stats_map.hasIn([year_toString, "task_type_completions", this.task_type_order["week"]])) {
                                            new_year_chart_stats_map.updateIn(
                                                [year_toString, "task_type_completions", this.task_type_order["week"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }
                                    })
                                })
                            }

                            else {
                                let month_timestamp_toString = key,
                                    total_points_array = List(completed_tasks_key_data.get("total_points_array"))

                                completed_priority_array.forEach((completed_value_array, day_in_month_index) => {
                                    let day_in_month = day_in_month_index + 1,
                                        timestamp_date = new Date(timestamp),
                                        date = new Date(timestamp_date.getFullYear(), timestamp_date.getMonth(), day_in_month),
                                        day_in_week = date.getDay(),
                                        month_in_year = date.getMonth(),
                                        year = date.getFullYear(),
                                        year_toString = date.getFullYear().toString(),
                                        monday = this.getMonday(date),
                                        day_timestamp_toString = date.getTime().toString(),
                                        week_timestamp_toString = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()).getTime().toString(),
                                        total_points = parseFloat(total_points_array.get(day_in_month_index))

                                    if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "totalPoints"])) {
                                        new_day_chart_stats_map.updateIn(
                                            [day_timestamp_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "totalPoints"])) {
                                        new_week_chart_stats_map.updateIn(
                                            [week_timestamp_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "totalPoints"])) {
                                        new_month_chart_stats_map.updateIn(
                                            [month_timestamp_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    if (new_year_chart_stats_map.hasIn([year_toString, "totalPoints"])) {
                                        new_year_chart_stats_map.updateIn(
                                            [year_toString, "totalPoints"],
                                            (value) => value - total_points < 0 ? 0 : value - total_points
                                        )
                                    }

                                    List(completed_value_array).forEach((completed_value, priority_index) => {
                                        if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "current", priority_index])) {
                                            new_day_chart_stats_map.updateIn(
                                                [day_timestamp_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_day_chart_stats_map.hasIn([day_timestamp_toString, "task_type_completions", this.task_type_order["month"]])) {
                                            new_day_chart_stats_map.updateIn(
                                                [day_timestamp_toString, "task_type_completions", this.task_type_order["month"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "current", priority_index])) {
                                            new_week_chart_stats_map.updateIn(
                                                [week_timestamp_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "completed_priority_array", day_in_week, priority_index])) {
                                            new_week_chart_stats_map.updateIn(
                                                [week_timestamp_toString, "completed_priority_array", day_in_week, priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_week_chart_stats_map.hasIn([week_timestamp_toString, "task_type_completions", this.task_type_order["month"]])) {
                                            new_week_chart_stats_map.updateIn(
                                                [week_timestamp_toString, "task_type_completions", this.task_type_order["month"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "current", priority_index])) {
                                            new_month_chart_stats_map.updateIn(
                                                [month_timestamp_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "completed_priority_array", day_in_month_index, priority_index])) {
                                            new_month_chart_stats_map.updateIn(
                                                [month_timestamp_toString, "completed_priority_array", day_in_month_index, priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }


                                        if (new_month_chart_stats_map.hasIn([month_timestamp_toString, "task_type_completions", this.task_type_order["month"]])) {
                                            new_month_chart_stats_map.updateIn(
                                                [month_timestamp_toString, "task_type_completions", this.task_type_order["month"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_year_chart_stats_map.hasIn([year_toString, "current", priority_index])) {
                                            new_year_chart_stats_map.updateIn(
                                                [year_toString, "current", priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_year_chart_stats_map.hasIn([year_toString, "completed_priority_array", month_in_year, priority_index])) {
                                            new_year_chart_stats_map.updateIn(
                                                [year_toString, "completed_priority_array", month_in_year, priority_index],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }

                                        if (new_year_chart_stats_map.hasIn([year_toString, "task_type_completions", this.task_type_order["month"]])) {
                                            new_year_chart_stats_map.updateIn(
                                                [year_toString, "task_type_completions", this.task_type_order["month"]],
                                                (value) => value - completed_value < 0 ? 0 : value - completed_value
                                            )
                                        }
                                    })
                                })
                            }
                        }
                    })
                }
            }
        })


        return ({
            new_day_chart_stats_map,
            new_week_chart_stats_map,
            new_month_chart_stats_map,
            new_year_chart_stats_map,
            new_completed_tasks_map,
            new_priorities,
            new_deleted_tasks,
            new_tasks
        })
    }

    _updateDeletionsOnOneTimers = (task_id) => {
        let new_tasks = Map(this.props.tasks).asMutable(),
            new_completed_tasks_map = Map(this.props.completed_tasks).asMutable(),
            new_

    }

    _deleteTasksAndHistories = () => {

    }

    _deleteRecord = (task_id) => {

    }

    render() {
        let chosen_date_text = "",
            { chosen_date_data } = this.props

        if (this.props.type === "day") {
            chosen_date_text = `${this.month_names[chosen_date_data.month]} ${chosen_date_data.day} ${chosen_date_data.year}`
        }

        else if (this.props.type === "week") {
            chosen_date_text = `Week ${chosen_date_data.week}: ${this.short_month_names[chosen_date_data.start_month]} ${chosen_date_data.monday} ${chosen_date_data.start_year} - ${this.short_month_names[chosen_date_data.end_month]} ${chosen_date_data.sunday} ${chosen_date_data.end_year}`
        }

        else {
            chosen_date_text = `${this.month_names[chosen_date_data.month]} ${chosen_date_data.year}`
        }
        return (
            <View
                style={{
                    position: "absolute",
                    borderRadius: 20,
                    width: 320,
                    backgroundColor: "white",
                    paddingHorizontal: 22,
                    paddingVertical: 22,
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
                        paddingVertical: 5,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#EB5757",
                    }}

                    onPress={this._deleteTasksAndHistories}
                >
                    <Text
                        style={{ ...styles.text, ...{ color: "white" } }}
                    >
                        {"DELETE TASKS & HISTORIES"}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginTop: 5
                    }}
                >
                    <Text
                        style={styles.small_warning_text}
                    >
                        Delete selected tasks and all of their records
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        paddingVertical: 5,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#F2994A",
                        marginTop: 15,
                    }}

                    onPress={this._deleteRecord}
                >
                    <Text
                        style={{ ...styles.text, ...{ color: "white" } }}
                    >
                        {"Delete Record"}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginTop: 5
                    }}
                >
                    <Text
                        style={styles.small_warning_text}
                    >
                        Delete the task and its records at
                    </Text>

                    <Text
                        style={styles.small_warning_text}
                    >
                        {chosen_date_text}
                    </Text>
                </View>


                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 15,
                    }}

                    onPress={this.props.hideAction}
                >
                    <Text
                        style={{ ...styles.text, ...{ color: "#6E6E6E" } }}
                    >
                        {"CANCEL"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}