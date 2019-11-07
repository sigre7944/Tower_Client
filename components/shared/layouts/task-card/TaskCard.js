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
        checked_complete: false
    }

    _openModal = () => {
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
            data = Map(),
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
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).update(this.priority_order[task_priority], (value) => value + 1)
                        })
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value + 1)
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).updateIn([day_in_week, this.priority_order[task_priority]], (value) => value + 1)
                        })
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value + 1)
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).updateIn([day_in_month - 1, this.priority_order[task_priority]], (value) => value + 1)
                        })
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
                        pre_convert_completed_data.current_priority_value = task_priority
                        pre_convert_completed_data.completed_priority_array = [0, 0, 0, 0]
                        pre_convert_completed_data.completed_priority_array[this.priority_order[task_priority]] += 1
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        pre_convert_completed_data.current_priority_value = task_priority
                        pre_convert_completed_data.completed_priority_array = [
                            new Array(4).fill(0),
                            new Array(4).fill(0),
                            new Array(4).fill(0),
                            new Array(4).fill(0),
                            new Array(4).fill(0),
                            new Array(4).fill(0),
                            new Array(4).fill(0)
                        ]
                        pre_convert_completed_data.completed_priority_array[day_in_week][this.priority_order[task_priority]] += 1
                    }

                    else {
                        let day_in_month = current_date.getDate(),
                            last_day_in_month = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate(),
                            completed_priority_array = new Array(last_day_in_month).fill(new Array(4).fill(0))

                        completed_priority_array[day_in_month - 1][this.priority_order[task_priority]] += 1
                        pre_convert_completed_data.current_priority_value = task_priority
                        pre_convert_completed_data.completed_priority_array = completed_priority_array
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
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).update(this.priority_order[task_priority], (value) => value - 1 < 0 ? 0 : value - 1)
                        })
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).updateIn([day_in_week, this.priority_order[task_priority]], (value) => value - 1 < 0 ? 0 : value - 1)
                        })
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).updateIn([day_in_month - 1, this.priority_order[task_priority]], (value) => value - 1 < 0 ? 0 : value - 1)
                        })
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
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).update(this.priority_order[task_priority], (value) => value - 1 < 0 ? 0 : value - 1)
                        })
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).updateIn([day_in_week, this.priority_order[task_priority]], (value) => value - 1 < 0 ? 0 : value - 1)
                        })
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks_map.get(task_id)).asMutable()
                        data.updateIn([timestamp_toString, "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp_toString, "current_priority_value"], (value) => task_priority)
                        data.updateIn([timestamp_toString, "completed_priority_array"], (completed_priority_array) => {
                            return List(completed_priority_array).updateIn([day_in_month - 1, this.priority_order[task_priority]], (value) => value - 1 < 0 ? 0 : value - 1)
                        })
                    }
                }
            }
        }

        return ({
            type: this.props.action_type,
            keyPath: [task_id],
            notSetValue: {},
            updater: (value) => data.toMap()
        })
    }

    doUpdateOnStats = (flag, type, operation) => {
        let task_map = Map(this.props.task_data),
            task_priority = task_map.getIn(["priority", "value"]),
            current_date = new Date(),
            stats = Map(this.props.stats),
            stats_data = {},
            stats_timestamp_toString = "",
            stats_action_type = "UPDATE_DAY_STATS"

        if (type === "day") {
            stats_timestamp_toString = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()).getTime().toString()
            stats_action_type = "UPDATE_DAY_STATS"
        }

        else if (type === "week") {
            stats_timestamp_toString = new Date(this.getMonday(current_date).getFullYear(), this.getMonday(current_date).getMonth(), this.getMonday(current_date).getDate()).getTime().toString()
            stats_action_type = "UPDATE_WEEK_STATS"
        }

        else {
            stats_timestamp_toString = new Date(current_date.getFullYear(), current_date.getMonth()).getTime().toString()
            stats_action_type = "UPDATE_MONTH_STATS"
        }

        if (operation === "inc") {
            if (flag === "uncompleted") {
                if (stats.has(stats_timestamp_toString)) {
                    stats_data = Map(stats.get(stats_timestamp_toString)).update("current", (value) => {
                        return List(value).update(this.priority_order[task_priority], (v) => v += 1)
                    })
                }

                else {
                    let current = [0, 0, 0, 0]
                    current[this.priority_order[task_priority]] += 1
                    stats_data.current = current

                    stats_data = fromJS(stats_data)
                }
            }

            else {
                if (stats.has(stats_timestamp_toString)) {
                    stats_data = Map(stats.get(stats_timestamp_toString)).update("current", (value) => {
                        return List(value).update(this.priority_order[task_priority], (v) => v - 1 < 0 ? 0 : v - 1)
                    })
                }
            }
        }

        else {
            if (flag === "uncompleted") {
                if (stats.has(stats_timestamp_toString)) {
                    stats_data = Map(stats.get(stats_timestamp_toString)).update("current", (value) => {
                        return List(value).update(this.priority_order[task_priority], (v) => v - 1 < 0 ? 0 : v - 1)
                    })
                }
            }
        }

        return ({
            type: stats_action_type,
            keyPath: [stats_timestamp_toString],
            notSetValue: {},
            updater: (value) => stats_data
        })
    }

    doUpdateOnChartStats = (flag, operation) => {
        let current_date = new Date()

        week_timestamp_toString = new Date(this.getMonday(current_date).getFullYear(), this.getMonday(current_date).getMonth(), this.getMonday(current_date).getDate()).getTime().toString(),
            month_timestamp_toString = new Date(current_date.getFullYear(), current_date.getMonth()).getTime().toString(),
            year_timestamp_toString = current_date.getFullYear().toString(),

            week_chart_key = current_date.getDay().toString(),
            month_chart_key = current_date.getDate().toString(),
            year_chart_key = current_date.getMonth().toString()

        let week_chart_stats_update = this.doCompareAndUpdateOnChartStatsData(this.props.task_data, this.props.week_chart_stats, week_timestamp_toString, week_chart_key, flag, operation)

        let month_chart_stats_update = this.doCompareAndUpdateOnChartStatsData(this.props.task_data, this.props.month_chart_stats, month_timestamp_toString, month_chart_key, flag, operation)

        let year_chart_stats_update = this.doCompareAndUpdateOnChartStatsData(this.props.task_data, this.props.year_chart_stats, year_timestamp_toString, year_chart_key, flag, operation)

        return ({
            week_action_type: "UPDATE_WEEK_CHART_STATS",
            week_chart_keyPath: [week_timestamp_toString, week_chart_key, "current"],
            week_chart_notSetValue: {},
            week_chart_updater: (value) => week_chart_stats_update,

            month_action_type: "UPDATE_MONTH_CHART_STATS",
            month_chart_keyPath: [month_timestamp_toString, month_chart_key, "current"],
            month_chart_notSetValue: {},
            month_chart_updater: (value) => month_chart_stats_update,

            year_action_type: "UPDATE_YEAR_CHART_STATS",
            year_chart_keyPath: [year_timestamp_toString, year_chart_key, "current"],
            year_chart_notSetValue: {},
            year_chart_updater: (value) => year_chart_stats_update,
        })
    }

    doCompareAndUpdateOnChartStatsData = (task_data, chart_stats, timestamp_toString, key, flag, operation) => {
        let task_data_map = Map(task_data),
            task_priority = task_data_map.getIn(["priority", "value"]),
            chart_stats_map = Map(chart_stats),
            update_data = {}

        if (operation === "inc") {
            if (flag === "uncompleted") {
                if (chart_stats_map.hasIn([timestamp_toString, key])) {
                    update_data = List(chart_stats_map.getIn([timestamp_toString, key, "current"])).update(this.priority_order[task_priority], (v) => v + 1)
                }

                else {
                    let current = [0, 0, 0, 0]
                    current[this.priority_order[task_priority]] += 1
                    update_data = fromJS(current)
                }
            }

            //flag completed - operation increase => will decrease the goal current value when the complete button is pressed
            else {
                if (chart_stats_map.hasIn([timestamp_toString, key])) {
                    update_data = List(chart_stats_map.getIn([timestamp_toString, key, "current"])).update(this.priority_order[task_priority], (v) => v - 1 < 0 ? 0 : v - 1)
                }
            }

        }

        // operation decrease - flag uncompleted (only uncompleted task has operation increase and decrease, completed only has decrease)
        else {
            if (chart_stats_map.hasIn([timestamp_toString, key])) {
                update_data = List(chart_stats_map.getIn([timestamp_toString, key, "current"])).update(this.priority_order[task_priority], (v) => v - 1 < 0 ? 0 : v - 1)
            }
        }

        return update_data
    }

    _checkComplete = () => {
        if (this.props.is_chosen_date_today) {
            let sending_obj = {}

            sending_obj.completed_task_data = this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "inc")
            sending_obj.stats_data = this.doUpdateOnStats(this.props.flag, this.props.type, "inc")

            sending_obj.chart_data = this.doUpdateOnChartStats(this.props.flag, "inc")

            this.props.updateBulkThunk(sending_obj)

            this.setState(prevState => ({
                checked_complete: !prevState.checked_complete
            }))
        }
    }

    _unCheckComplete = () => {
        if (this.props.is_chosen_date_today) {

            let sending_obj = {}

            sending_obj.completed_task_data = this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "dec")
            sending_obj.stats_data = this.doUpdateOnStats(this.props.flag, this.props.type, "dec")
            sending_obj.chart_data = this.doUpdateOnChartStats(this.props.flag, "dec")

            this.props.updateBulkThunk(sending_obj)
        }
    }

    render() {
        let priorities_map = Map(this.props.priorities),
            categories_map = Map(this.props.categories),
            task_data_map = Map(this.props.task_data),
            task_priority_value = task_data_map.getIn(["priority", "value"]),
            task_priority_color = priorities_map.getIn([task_priority_value, "color"]),
            task_category = task_data_map.get("category"),
            task_category_color = categories_map.getIn([task_category, "color"])

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
                            priority_color={task_priority_color}
                        />

                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                height: 62,
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
                        onPress={this._openModal}
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



                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {this.props.flag === "uncompleted" ?

                        <TouchableOpacity
                            style={{
                                width: 58,
                                height: 62,
                                justifyContent: "center",
                                alignItems: "center",
                            }}

                            onPress={this._unCheckComplete}
                        >
                            <FontAwesomeIcon
                                icon={faRedoAlt}
                                size={18}
                                color="#BDBDBD"
                            />
                        </TouchableOpacity>

                        :
                        null
                    }
                    <CategoryColorCircle
                        category_color={task_category_color}
                    />
                </View>

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
                    height: 62,
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