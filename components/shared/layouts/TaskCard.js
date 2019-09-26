import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements'
import { Map, List, fromJS } from 'immutable'

export default class TaskCard extends React.PureComponent {
    priority_order = {
        pri_01: 0,
        pri_02: 1,
        pri_03: 2,
        pri_04: 3
    }

    state = {
        checked: false,
        uncomplete_checked: false
    }

    _onPress = () => {
        this.props.onPress(this.props.task_data)
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
        let task = this.props.task_data,
            current_date = new Date(),
            data,
            currentGoal = 0,
            completed_tasks = Map(this.props.completed_tasks),
            timestamp = 0

        if (type === "day") {
            timestamp = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()).getTime()
        }

        else if (type === "week") {
            timestamp = new Date(this.getMonday(current_date).getFullYear(), this.getMonday(current_date).getMonth(), this.getMonday(current_date).getDate()).getTime()
        }

        else {
            timestamp = new Date(current_date.getFullYear(), current_date.getMonth()).getTime()
        }

        if (operation === "inc") {
            if (flag === "uncompleted") {
                if (completed_tasks.hasIn([task.id, timestamp.toString()])) {
                    if (type === "day") {
                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => value + 1)
                        data.updateIn([timestamp.toString(), "priority_value"], (value) => task.priority.value)
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => v + 1)
                        data.updateIn([timestamp.toString(), "day_completed_array"], (value) => List(value).update(day_in_week, (v) => v + 1))
                        data.updateIn([timestamp.toString(), "priority_value_array"], (value) => List(value).update(day_in_week, (v) => task.priority.value))
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => v + 1)
                        data.updateIn([timestamp.toString(), "day_completed_array"], (value) => List(value).update(day_in_month - 1, (v) => v + 1))
                        data.updateIn([timestamp.toString(), "priority_value_array"], (value) => List(value).update(day_in_month - 1, (v) => task.priority.value))
                    }
                }

                else {
                    let pre_convert_obj = {
                        id: task.id,
                        category: task.category,
                    }
                    let pre_convert_completed_data = {
                        current: currentGoal + 1
                    }

                    if (type === "day") {
                        pre_convert_completed_data.priority_value = task.priority.value
                    }

                    else if (type === "week") {
                        let day_completed_array = new Array(7).fill(0),
                            priority_value_array = new Array(7).fill(task.priority.value),
                            day_in_week = current_date.getDay()

                        day_completed_array[day_in_week] += 1
                        pre_convert_completed_data.day_completed_array = day_completed_array
                        pre_convert_completed_data.priority_value_array = priority_value_array
                    }

                    else {
                        let day_in_month = current_date.getDate(),
                            last_day_in_month = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate(),
                            priority_value_array = new Array(last_day_in_month).fill(task.priority.value),
                            day_completed_array = new Array(last_day_in_month).fill(0)

                        day_completed_array[day_in_month - 1] += 1
                        pre_convert_completed_data.day_completed_array = day_completed_array
                        pre_convert_completed_data.priority_value_array = priority_value_array
                    }

                    pre_convert_obj[timestamp] = pre_convert_completed_data

                    data = fromJS(pre_convert_obj)
                }
            }

            else {
                if (completed_tasks.hasIn([task.id, timestamp.toString()])) {
                    if (type === "day") {
                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp.toString(), "priority_value"], (value) => task.priority.value)
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp.toString(), "day_completed_array"], (value) => List(value).update(day_in_week, (v) => value - 1 < 0 ? 0 : value - 1))
                        data.updateIn([timestamp.toString(), "priority_value_array"], (value) => List(value).update(day_in_week, (v) => task.priority.value))
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp.toString(), "day_completed_array"], (value) => List(value).update(day_in_month - 1, (v) => value - 1 < 0 ? 0 : value - 1))
                        data.updateIn([timestamp.toString(), "priority_value_array"], (value) => List(value).update(day_in_month - 1, (v) => task.priority.value))
                    }
                }
            }
        }

        else {
            if (flag === "uncompleted") {
                if (completed_tasks.hasIn([task.id, timestamp.toString()])) {
                    if (type === "day") {
                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp.toString(), "priority_value"], (value) => task.priority.value)
                    }

                    else if (type === "week") {
                        let day_in_week = current_date.getDay()

                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp.toString(), "day_completed_array"], (value) => List(value).update(day_in_week, (v) => value - 1 < 0 ? 0 : value - 1))
                        data.updateIn([timestamp.toString(), "priority_value_array"], (value) => List(value).update(day_in_week, (v) => task.priority.value))
                    }

                    else {
                        let day_in_month = current_date.getDate()

                        data = Map(completed_tasks.get(task.id)).toMap().asMutable()
                        data.updateIn([timestamp.toString(), "current"], (value) => value - 1 < 0 ? 0 : value - 1)
                        data.updateIn([timestamp.toString(), "day_completed_array"], (value) => List(value).update(day_in_month - 1, (v) => value - 1 < 0 ? 0 : value - 1))
                        data.updateIn([timestamp.toString(), "priority_value_array"], (value) => List(value).update(day_in_month - 1, (v) => task.priority.value))
                    }
                }
            }
        }

        return ({
            action_type: this.props.action_type,
            data,
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

    checkComplete = () => {
        if (this.props.is_chosen_date_today) {
            let sending_obj = {}

            this.setState(prevState => ({
                checked: !prevState.checked
            }))

            sending_obj.completed_task_data = this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "inc")
            sending_obj.stats_data = this.doUpdateOnStats(this.props.flag, this.props.type, "inc")

            sending_obj.chart_data = this.doUpdateOnChartStats(this.props.flag, "inc")

            this.props.updateBulkThunk(sending_obj)
        }
    }

    unCheckComplete = () => {
        if (this.props.is_chosen_date_today) {
            this.setState(prevState => ({
                uncomplete_checked: !prevState.uncomplete_checked
            }))

            let sending_obj = {}

            sending_obj.completed_task_data = this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "dec")
            sending_obj.stats_data = this.doUpdateOnStats(this.props.flag, this.props.type, "dec")
            sending_obj.chart_data = this.doUpdateOnChartStats(this.props.flag, "dec")

            this.props.updateBulkThunk(sending_obj)
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this._onPress}>

                <View style={styles.checkBox}>
                    <CheckBox
                        center
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.checked}
                        onPress={this.checkComplete}
                    />
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>{this.props.title ? this.props.title : 'Example task'}</Text>
                    <Text style={styles.descriptionAmount}>{this.props.goal ? `${this.props.current_goal_value}/${this.props.goal.max}` : "0/3"}</Text>
                </View>
                {this.props.flag === "uncompleted" ?
                    <View
                        style={styles.checkBox}
                    >
                        <CheckBox
                            center
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            checked={this.state.uncomplete_checked}
                            onPress={this.unCheckComplete}
                        />
                    </View>
                    :
                    null
                }
                <View style={styles.share}>
                    <FontAwesome name={'link'} style={styles.icon} />
                </View>
                <View style={styles.colorBox}>
                    <FontAwesome name={'circle'} style={styles.icon} />
                </View>

            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        borderWidth: 1,
        borderColor: 'grey',
        borderLeftWidth: 3,
        marginBottom: 4,
        marginTop: 4,
        backgroundColor: 'white',
        zIndex: 30
    },
    checkBox: {
        width: 50,
        height: 60
    },
    description: {
        flex: 1
    },
    descriptionText: {
        lineHeight: 25,
        fontSize: 16
    },
    descriptionAmount: {
        lineHeight: 25,
        opacity: 0.5
    },
    share: {
        width: 50,
        height: 60,
    },
    colorBox: {
        width: 50,
        height: 60
    },
    icon: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
        lineHeight: 60
    }
});