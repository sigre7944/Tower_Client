import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements'
import { Map } from 'immutable'

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
        let task = { ... this.props.task_data },
            current_date = new Date(),
            data = {},
            overwrite_obj = {},
            currentGoal = 0,
            completed_tasks = Map(this.props.completed_tasks),
            timestamp = 0,
            day_timestamp_for_day_completed_data = 0

        if (type === "day") {
            timestamp = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()).getTime()
        }

        else if (type === "week") {
            timestamp = new Date(this.getMonday(current_date).getFullYear(), this.getMonday(current_date).getMonth(), this.getMonday(current_date).getDate()).getTime()
            day_timestamp_for_day_completed_data = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()).getTime()
        }

        else {
            timestamp = new Date(current_date.getFullYear(), current_date.getMonth()).getTime()
            day_timestamp_for_day_completed_data = new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()).getTime()
        }

        if (operation === "inc") {
            if (flag === "uncompleted") {
                if (completed_tasks.has(task.id)) {
                    data = completed_tasks.get(task.id)

                    if (data.hasOwnProperty(timestamp)) {
                        currentGoal = data[timestamp].current
                    }

                    overwrite_obj[timestamp] = {
                        current: currentGoal + 1,
                        priority_value: task.priority.value
                    }

                    data = { ...data, ...overwrite_obj }
                }

                else {
                    data.id = task.id
                    data.category = task.category
                    data[timestamp] = {
                        current: currentGoal + 1,
                        // category: task.category,
                        priority_value: task.priority.value
                    }

                    if(day_timestamp_for_day_data)
                    data.day_completed_data = {
                        
                    }
                }
            }

            else {
                if (completed_tasks.has(task.id)) {
                    data = completed_tasks.get(task.id)

                    if (data.hasOwnProperty(timestamp)) {
                        currentGoal = data[timestamp].current
                    }

                    if (currentGoal <= 0) {
                        overwrite_obj[timestamp] = {
                            current: 0,
                            priority_value: task.priority.value
                        }
                    }

                    else {
                        overwrite_obj[timestamp] = {
                            current: currentGoal - 1,
                            priority_value: task.priority.value
                        }
                    }

                    data = { ...data, ...overwrite_obj }
                }
            }
        }

        else {
            if (flag === "uncompleted") {
                if (completed_tasks.has(task.id)) {
                    data = completed_tasks.get(task.id)

                    if (data.hasOwnProperty(timestamp)) {
                        currentGoal = data[timestamp].current
                    }

                    if (currentGoal <= 0) {
                        overwrite_obj[timestamp] = {
                            current: 0,
                            priority_value: task.priority.value
                        }
                    }

                    else {
                        overwrite_obj[timestamp] = {
                            current: currentGoal - 1,
                            priority_value: task.priority.value
                        }
                    }

                    data = { ...data, ...overwrite_obj }
                }
            }
        }

        this.props.updateCompletedTask(data)
    }

    doUpdateOnStats = (flag, type, operation) => {
        let task = { ... this.props.task_data },
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
                    stats_data = stats.get(stats_timestamp)
                    let { current } = stats_data
                    current[this.priority_order[task.priority.value]] += 1

                    stats_data.current = current
                }

                else {
                    let current = [0, 0, 0, 0]
                    current[this.priority_order[task.priority.value]] += 1
                    stats_data = {
                        current
                    }
                }
            }

            else {
                if (stats.has(stats_timestamp)) {
                    stats_data = stats.get(stats_timestamp)
                    let { current } = stats_data
                    current[this.priority_order[task.priority.value]] -= 1
                    if (current[this.priority_order[task.priority.value]] < 0) {
                        current[this.priority_order[task.priority.value]] = 0
                    }
                    stats_data.current = current
                }
            }
        }

        else {
            if (flag === "uncompleted") {
                if (stats.has(stats_timestamp)) {
                    stats_data = stats.get(stats_timestamp)
                    let { current } = stats_data
                    current[this.priority_order[task.priority.value]] -= 1
                    if (current[this.priority_order[task.priority.value]] < 0) {
                        current[this.priority_order[task.priority.value]] = 0
                    }
                    stats_data.current = current
                }
            }
        }

        this.props.updateStats(stats_action_type, stats_timestamp, stats_data)
    }

    doUpdateOnChartStats = (flag, operation) => {
        let task = { ... this.props.task_data },
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


        week_chart_stats_data = this.doCompareAndUpdateOnChartStatsData(task, week_chart_stats, week_timestamp, current_date.getDay(), flag, operation)
        month_chart_stats_data = this.doCompareAndUpdateOnChartStatsData(task, month_chart_stats, month_timestamp, current_date.getDate(), flag, operation)
        year_chart_stats_data = this.doCompareAndUpdateOnChartStatsData(task, year_chart_stats, year_timestamp, current_date.getMonth(), flag, operation)

        let sending_obj = {
            week_action_type: "UPDATE_WEEK_CHART_STATS",
            week_timestamp,
            week_chart_stats_data,

            month_action_type: "UPDATE_MONTH_CHART_STATS",
            month_timestamp,
            month_chart_stats_data,

            year_action_type: "UPDATE_YEAR_CHART_STATS",
            year_timestamp,
            year_chart_stats_data
        }

        this.props.updateChartStatsThunk(sending_obj)
    }

    doCompareAndUpdateOnChartStatsData = (task, chart_stats, timestamp, key, flag, operation) => {

        let chart_stats_data = {},
            chart_stats_map = Map(chart_stats)

        if (operation === "inc") {
            if (flag === "uncompleted") {
                if (chart_stats_map.has(timestamp)) {
                    chart_stats_data = chart_stats_map.get(timestamp)
                    if (chart_stats_data.hasOwnProperty(key)) {
                        let { current } = chart_stats_data[key]
                        current[this.priority_order[task.priority.value]] += 1
                        chart_stats_data[key].current = current
                    }

                    else {
                        let current = [0, 0, 0, 0]
                        current[this.priority_order[task.priority.value]] += 1
                        chart_stats_data[key] = { current }
                    }
                }

                else {
                    let current = [0, 0, 0, 0]
                    current[this.priority_order[task.priority.value]] += 1
                    chart_stats_data[key] = { current }
                }
            }

            else {
                if (chart_stats_map.has(timestamp)) {
                    chart_stats_data = chart_stats_map.get(timestamp)

                    if (chart_stats_data.hasOwnProperty(key)) {
                        let { current } = chart_stats_data[key]
                        current[this.priority_order[task.priority.value]] -= 1

                        if (current[this.priority_order[task.priority.value]] < 0) {
                            current[this.priority_order[task.priority.value]] = 0
                        }

                        chart_stats_data[key].current = current
                    }
                }
            }

        }

        else {
            if (chart_stats_map.has(timestamp)) {
                chart_stats_data = chart_stats_map.get(timestamp)

                if (chart_stats_data.hasOwnProperty(key)) {
                    let { current } = chart_stats_data[key]
                    current[this.priority_order[task.priority.value]] -= 1

                    if (current[this.priority_order[task.priority.value]] < 0) {
                        current[this.priority_order[task.priority.value]] = 0
                    }
                    chart_stats_data[key].current = current
                }
            }
        }


        return chart_stats_data
    }

    checkComplete = () => {
        if (this.props.is_chosen_date_today) {
            this.setState(prevState => ({
                checked: !prevState.checked
            }))

            this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "inc")
            this.doUpdateOnStats(this.props.flag, this.props.type, "inc")
            this.doUpdateOnChartStats(this.props.flag, "inc")
        }
    }

    unCheckComplete = () => {
        if (this.props.is_chosen_date_today) {
            this.setState(prevState => ({
                uncomplete_checked: !prevState.uncomplete_checked
            }))

            this.doUpdateOnCompletedTask(this.props.flag, this.props.type, "dec")
            this.doUpdateOnStats(this.props.flag, this.props.type, "dec")
            this.doUpdateOnChartStats(this.props.flag, "dec")
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