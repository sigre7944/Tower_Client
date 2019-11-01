import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Animated
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faRedoAlt
} from '@fortawesome/free-solid-svg-icons'
import { Map, List, fromJS } from 'immutable'

import { styles } from './styles/styles'

export default class TaskCard extends React.PureComponent {
    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
    }

    state = {
        category_color: "white",
        priority_color: "#F78096",
        checked_complete: false
    }

    _onPress = () => {
        this.props.openModal(this.props.task_data)
    }

    getWeek = (date) => {
        let target = new Date(date);
        let dayNr = (date.getDay() + 6) % 7;
        target.setDate(target.getDate() - dayNr + 3);
        let firstThursday = target.valueOf();
        target.setMonth(0, 1);
        if (target.getDay() != 4) {
            target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
        }
        return 1 + Math.ceil((firstThursday - target) / 604800000);
    }

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
    }

    doUpdateOnCompletedTask = (flag, type, operation) => {
        let task_map = Map(this.props.task_data),
            task_id = task_map.get("id"),
            task_priority = task_map.getIn(["priority", "value"]),
            current_date = new Date(),
            data,
            completed_tasks_map = Map(this.props.completed_tasks),
            timestamp_toString = 0

        if (type === "day") {
            timestamp_toString = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()).getTime().toString()
        }

        else if (type === "week") {
            timestamp_toString = new Date(this.getMonday(current_date).getFullYear(), this.getMonday(current_date).getMonth(), this.getMonday(current_date).getDate()).getTime().toString()
        }

        else {
            timestamp_toString = new Date(current_date.getFullYear(), current_date.getMonth()).getTime().toString()
        }

        if (operation === "inc") {
            if (flag === "uncompleted") {

                if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
                    if (type === "day") {
                        data = Map(completed_tasks_map.get(task_id)).asMutable()

                        data.updateIn([timestamp_toString, "current"], (value) => value + 1)
                        data.updateIn([timestamp_toString, "priority_value"], (value) => task_priority)
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => v + 1)
                        data.updateIn([timestamp_toString, "day_completed_array"], (value) => List(value).update(day_in_week, (v) => v + 1))
                        data.updateIn([timestamp_toString, "priority_value_array"], (value) => List(value).update(day_in_week, (v) => task_priority))
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => v + 1)
                        data.updateIn([timestamp_toString, "day_completed_array"], (value) => List(value).update(day_in_month - 1, (v) => v + 1))
                        data.updateIn([timestamp_toString, "priority_value_array"], (value) => List(value).update(day_in_month - 1, (v) => task_priority))
                    }
                }

                else {
                    let pre_convert_obj = {
                        id: task_id,
                    }
                    let pre_convert_completed_data = {
                        current: 1
                    }

                    if (type === "day") {
                        pre_convert_completed_data.priority_value = task_priority
                    }

                    else if (type === "week") {
                        let day_completed_array = new Array(7).fill(0),
                            priority_value_array = new Array(7).fill(task_priority),
                            day_in_week = current_date.getDay()

                        day_completed_array[day_in_week] += 1
                        pre_convert_completed_data.day_completed_array = day_completed_array
                        pre_convert_completed_data.priority_value_array = priority_value_array
                    }

                    else {
                        let day_in_month = current_date.getDate(),
                            last_day_in_month = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate(),
                            priority_value_array = new Array(last_day_in_month).fill(task_priority),
                            day_completed_array = new Array(last_day_in_month).fill(0)

                        day_completed_array[day_in_month - 1] += 1
                        pre_convert_completed_data.day_completed_array = day_completed_array
                        pre_convert_completed_data.priority_value_array = priority_value_array
                    }

                    pre_convert_obj[timestamp_toString] = pre_convert_completed_data

                    data = fromJS(pre_convert_obj)
                }
            }

            //operation increase - flag completed
            else {
                if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
                    if (type === "day") {
                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "priority_value"], (value) => task_priority)
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "day_completed_array"], (value) => List(value).update(day_in_week, (v) => v - 1 < 0 ? 0 : v - 1))
                        data.updateIn([timestamp_toString, "priority_value_array"], (value) => List(value).update(day_in_week, (v) => task_priority))
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "day_completed_array"], (value) => List(value).update(day_in_month - 1, (v) => v - 1 < 0 ? 0 : v - 1))
                        data.updateIn([timestamp_toString, "priority_value_array"], (value) => List(value).update(day_in_month - 1, (v) => task_priority))
                    }
                }
            }
        }

        else {
            if (flag === "uncompleted") {
                if (completed_tasks_map.hasIn([task_id, timestamp_toString])) {
                    if (type === "day") {
                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "priority_value"], (value) => task_priority)
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "day_completed_array"], (value) => List(value).update(day_in_week, (v) => v - 1 < 0 ? 0 : v - 1))
                        data.updateIn([timestamp_toString, "priority_value_array"], (value) => List(value).update(day_in_week, (v) => task_priority))
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "day_completed_array"], (value) => List(value).update(day_in_month - 1, (v) => v - 1 < 0 ? 0 : v - 1))
                        data.updateIn([timestamp_toString, "priority_value_array"], (value) => List(value).update(day_in_month - 1, (v) => task_priority))
                    }
                }
            }
        }

        return ({
            type: this.props.action_type,
            keyPath: [task_id, timestamp_toString],
            notSetValue: {},
            updater: (value) => data
        })
    }

    doUpdateOnStats = (flag, type, operation) => {
        let task = this.props.task_data,
            current_date = new Date(),
            stats = Map(this.props.stats),
            stats_data = {},
            stats_timestamp = 0,
            stats_action_type = "UPDATE_DAY_STATS"

        if (type === "day") {
            stats_timestamp = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()).getTime()
            stats_action_type = "UPDATE_DAY_STATS"
        }

        else if (type === "week") {
            stats_timestamp = new Date(this.getMonday(current_date).getFullYear(), this.getMonday(current_date).getMonth(), this.getMonday(current_date).getDate()).getTime()
            stats_action_type = "UPDATE_WEEK_STATS"
        }

        else {
            stats_timestamp = new Date(current_date.getFullYear(), current_date.getMonth()).getTime()
            stats_action_type = "UPDATE_MONTH_STATS"
        }

        if (operation === "inc") {
            if (flag === "uncompleted") {
                if (stats.has(stats_timestamp)) {
                    stats_data = Map(stats.get(stats_timestamp)).toMap().update("current", (value) => {
                        return List(value).update(this.priority_order[task.priority.value], (v) => v += 1)
                    })
                }

                else {
                    let current = [0, 0, 0, 0]
                    current[this.priority_order[task.priority.value]] += 1
                    stats_data.current = current

                    stats_data = fromJS(stats_data)
                }
            }

            else {
                if (stats.has(stats_timestamp)) {
                    stats_data = Map(stats.get(stats_timestamp)).toMap().update("current", (value) => {
                        return List(value).update(this.priority_order[task.priority.value], (v) => v - 1 < 0 ? 0 : v - 1)
                    })
                }
            }
        }

        else {
            if (flag === "uncompleted") {
                if (stats.has(stats_timestamp)) {
                    stats_data = Map(stats.get(stats_timestamp)).toMap().update("current", (value) => {
                        return List(value).update(this.priority_order[task.priority.value], (v) => v - 1 < 0 ? 0 : v - 1)
                    })
                }
            }
        }

        return ({
            stats_action_type,
            stats_timestamp,
            stats_data
        })
    }

    doUpdateOnChartStats = (flag, operation) => {
        let task = this.props.task_data,
            current_date = new Date(),
            week_chart_stats = this.props.week_chart_stats,
            month_chart_stats = this.props.month_chart_stats,
            year_chart_stats = this.props.year_chart_stats,
            week_chart_stats_data = {},
            month_chart_stats_data = {},
            year_chart_stats_data = {},
            week_timestamp = new Date(this.getMonday(current_date).getFullYear(), this.getMonday(current_date).getMonth(), this.getMonday(current_date).getDate()).getTime(),
            month_timestamp = new Date(current_date.getFullYear(), current_date.getMonth()).getTime(),
            year_timestamp = current_date.getFullYear()

        week_chart_stats_data = this.doCompareAndUpdateOnChartStatsData(task, Map(week_chart_stats), week_timestamp, current_date.getDay(), flag, operation)

        month_chart_stats_data = this.doCompareAndUpdateOnChartStatsData(task, Map(month_chart_stats), month_timestamp, current_date.getDate(), flag, operation)

        year_chart_stats_data = this.doCompareAndUpdateOnChartStatsData(task, Map(year_chart_stats), year_timestamp, current_date.getMonth(), flag, operation)

        return ({
            week_action_type: "UPDATE_WEEK_CHART_STATS",
            week_timestamp,
            week_chart_stats_data,

            month_action_type: "UPDATE_MONTH_CHART_STATS",
            month_timestamp,
            month_chart_stats_data,

            year_action_type: "UPDATE_YEAR_CHART_STATS",
            year_timestamp,
            year_chart_stats_data
        })
    }

    doCompareAndUpdateOnChartStatsData = (task, chart_stats_map, timestamp, key, flag, operation) => {
        let chart_stats_data = {}

        if (operation === "inc") {
            if (flag === "uncompleted") {
                if (chart_stats_map.has(timestamp)) {

                    if (Map(chart_stats_map.get(timestamp)).has(key.toString())) {
                        chart_stats_data = Map(chart_stats_map.get(timestamp)).toMap().updateIn([key.toString(), "current"], (value) => {
                            return List(value).update(this.priority_order[task.priority.value], (v) => v + 1)
                        })
                    }

                    else {
                        let current = [0, 0, 0, 0]
                        current[this.priority_order[task.priority.value]] += 1
                        chart_stats_data[key] = { current }

                        chart_stats_data = fromJS(chart_stats_data)
                    }
                }

                else {
                    let current = [0, 0, 0, 0]
                    current[this.priority_order[task.priority.value]] += 1
                    chart_stats_data[key] = { current }

                    chart_stats_data = fromJS(chart_stats_data)
                }
            }

            else {
                if (chart_stats_map.hasIn([timestamp, key.toString()])) {

                    chart_stats_data = Map(chart_stats_map.get(timestamp)).toMap().updateIn([key.toString(), "current"], (value) => {
                        return List(value).update(this.priority_order[task.priority.value], (v) => v - 1 < 0 ? 0 : v - 1)
                    })
                }
            }

        }

        else {
            if (chart_stats_map.hasIn([timestamp, key.toString()])) {

                chart_stats_data = Map(chart_stats_map.get(timestamp)).toMap().updateIn([key.toString(), "current"], (value) => {
                    return List(value).update(this.priority_order[task.priority.value], (v) => v - 1 < 0 ? 0 : v - 1)
                })
            }
        }

        return chart_stats_data
    }

    _checkComplete = () => {
        if (this.props.is_chosen_date_today) {
            let sending_obj = {}

            // sending_obj.completed_task_data = this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "inc")
            // sending_obj.stats_data = this.doUpdateOnStats(this.props.flag, this.props.type, "inc")

            // sending_obj.chart_data = this.doUpdateOnChartStats(this.props.flag, "inc")

            // this.props.updateBulkThunk(sending_obj)

            this.setState(prevState => ({
                checked_complete: !prevState.checked_complete
            }))
        }
    }

    unCheckComplete = () => {
        if (this.props.is_chosen_date_today) {

            let sending_obj = {}

            sending_obj.completed_task_data = this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "dec")
            sending_obj.stats_data = this.doUpdateOnStats(this.props.flag, this.props.type, "dec")
            sending_obj.chart_data = this.doUpdateOnChartStats(this.props.flag, "dec")

            this.props.updateBulkThunk(sending_obj)
        }
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <View
                    style={{
                        flexDirection: "row",
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <PriorityColorBar
                            priority_color={this.state.priority_color}
                        />

                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 72,
                                paddingHorizontal: 15,
                            }}

                            onPress={this._checkComplete}
                        >
                            <CompleteBox
                                checked_complete={this.state.checked_complete}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            marginLeft: 15,
                            flex: 1,
                            justifyContent: "center",
                        }}
                        onPress={this._onPress}

                    >
                        <Text
                            style={styles.task_title}
                        >
                            {this.props.title}
                        </Text>

                        <Text
                            style={styles.goal_tracking}
                        >
                            {this.props.current_goal_value} / {this.props.goal_value}
                        </Text>
                    </TouchableOpacity>
                </View>



                {this.props.flag === "uncompleted" ?
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 58,
                                height: 72,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faRedoAlt}
                                size={18}
                                color="#BDBDBD"
                            />
                        </TouchableOpacity>

                        <CategoryColorCircle
                            category_color={this.state.category_color}
                        />
                    </View>
                    :
                    null
                }

            </View>
        )
    }
}

class PriorityColorBar extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    width: 9,
                    backgroundColor: this.props.priority_color,
                    borderRadius: 30,
                    height: 72,
                    marginLeft: 1,
                }}
            >

            </View>
        )
    }
}

class CompleteBox extends React.PureComponent {

    render() {
        return (
            <View
                style={styles.complete_box_container}
            >
                {this.props.checked_complete ?
                    <View>

                    </View>

                    :

                    null
                }

                <View>

                </View>
            </View>
        )
    }
}

class CategoryColorCircle extends React.PureComponent {
    render() {
        return (
            <>
                {this.props.category_color === "white" || this.props.category_color === "no color" ?
                    <View
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            borderWidth: 1,
                            borderColor: "#2C2C2C",
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 15,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: 1,
                                backgroundColor: "#2C2C2C",
                                transform: [{ rotate: "45deg" }]
                            }}
                        >
                        </View>
                    </View>
                    :

                    <View
                        style={{
                            backgroundColor: this.props.category_color,
                            marginHorizontal: 15,
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                        }}
                    >

                    </View>
                }
            </>
        )
    }
}