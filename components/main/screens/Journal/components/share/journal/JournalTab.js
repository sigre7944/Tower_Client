import React from 'react'
import {
    View,
    Text,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native';

import TaskCard from './task-card/TaskCard.Container'
import TaskDetailModal from './task-detail-modal/TaskDetailModal.Container'

import DayFlatlist from './day-flatlist/DayFlatlist.Container'
import WeekFlatlist from './week-flatlist/WeekFlatlist.Container'
import MonthFlatlist from './month-flatlist/MonthFlatlist.Container'

import { styles } from './styles/styles'

import { List, Map, hasIn, getIn, fromJS } from 'immutable'

const window_width = Dimensions.get("window").width

export default class JournalTab extends React.PureComponent {
    static navigationOptions = {
        swipeEnabled: false,
        header: null
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

    getNoWeekInMonth = (date) => {
        let nearest_monday_timestamp = this.getMonday(date).getTime()
        let first_monday_of_month_timestamp = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 1)).getTime()

        return Math.floor((nearest_monday_timestamp - first_monday_of_month_timestamp) / (7 * 86400 * 1000)) + 1
    }

    current_date = new Date()

    initChosenDateData = () => {
        if (this.props.type === "day") {
            return ({
                day: this.current_date.getDate(),
                month: this.current_date.getMonth(),
                year: this.current_date.getFullYear()
            })
        }

        else if (this.props.type === "week") {
            let monday = this.getMonday(this.current_date),
                sunday = new Date(monday)

            sunday.setDate(monday.getDate() + 6)

            let week = this.getWeek(this.current_date),
                start_month = monday.getMonth(),
                end_month = sunday.getMonth(),
                start_year = monday.getFullYear(),
                end_year = sunday.getFullYear(),
                start_noWeekInMonth = this.getNoWeekInMonth(monday),
                end_noWeekInMonth = this.getNoWeekInMonth(sunday)

            return ({
                monday: monday.getDate(),
                sunday: sunday.getDate(),
                week,
                start_month,
                end_month,
                start_year,
                end_year,
                start_noWeekInMonth,
                end_noWeekInMonth,
            })
        }

        return ({
            month: this.current_date.getMonth(),
            year: this.current_date.getFullYear()
        })
    }

    state = {
        isModalOpened: false,
        task_data: Map(),
        chosen_date_data: this.initChosenDateData(),
    }

    setChosenDateData = (data) => {
        this.setState({
            chosen_date_data: data
        }, () => {
            this._setChosenDateDataAtStore(data)
        })
    }

    _setChosenDateDataAtStore = (data) => {
        let action_type = "RETURN_NEW_CHOSEN_DAY_DATE_DATA",
            sending_data = fromJS(data)

        if (this.props.type === "week") {
            action_type = "RETURN_NEW_CHOSEN_WEEK_DATE_DATA"
        }

        else if (this.props.type === "month") {
            action_type = "RETURN_NEW_CHOSEN_MONTH_DATE_DATA"
        }

        this.props.returnNewChosenDateData(action_type, sending_data)
    }

    openModal = (task_data) => {
        this.setState({
            isModalOpened: true,
            task_data: Map(task_data).toMap()
        })
    }

    closeModal = () => {
        this.setState({
            isModalOpened: false,
        })
    }

    componentDidMount() {
        const didFocusScreen = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.props.changeRouteAction(payload.state.routeName)
            }
        )

        this._setChosenDateDataAtStore(this.state.chosen_date_data)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.tasks !== prevProps.tasks) {
            if (Map(this.state.task_data).has("id")) {
                let task_id = Map(this.state.task_data).get("id"),
                    tasks_map = Map(this.props.tasks)
                this.setState(prevState => ({
                    task_data: Map(tasks_map.get(task_id)).toMap()
                }))
            }
        }
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    flex: 1
                }}
            >
                {
                    this.props.type === "day" ?

                        <DayFlatlist
                            setChosenDateData={this.setChosenDateData}
                        />

                        :
                        <>
                            {
                                this.props.type === "week" ?
                                    <WeekFlatlist
                                        setChosenDateData={this.setChosenDateData}
                                    />

                                    :

                                    <MonthFlatlist
                                        setChosenDateData={this.setChosenDateData}
                                    />
                            }
                        </>
                }

                <View
                    style={{
                        flex: 1,
                        width: window_width,
                    }}
                >
                    <FlatlistGroup
                        priorities={this.props.priorities}
                        tasks={this.props.tasks}
                        completed_tasks={this.props.completed_tasks}
                        type={this.props.type}
                        chosen_date_data={this.state.chosen_date_data}
                        openModal={this.openModal}
                        current_chosen_category={this.props.current_chosen_category}
                        deleted_tasks={this.props.deleted_tasks}
                        sortSettings={this.props.sortSettings}
                    />
                </View>

                {this.state.isModalOpened ?
                    <TaskDetailModal
                        closeModal={this.closeModal}
                        task_data={this.state.task_data}
                        categories={this.props.categories}
                        priorities={this.props.priorities}
                        action_type={this.props.action_type}
                        type={this.props.type}
                        chosen_date_data={this.state.chosen_date_data}
                    />

                    :

                    <></>
                }
            </View>
        )
    }
}

class FlatlistGroup extends React.PureComponent {

    state = {
        should_flatlist_update: 0,
        data: []
    }

    _keyExtractor = (item, index) => `journal-${item.id}`

    _renderItem = ({ item, index }) => {
        if (item.id === "uncompleted-flatlist-group") {
            return (
                <View>
                    <UncompletedTaskCardHolder
                        priorities={this.props.priorities}
                        tasks={this.props.tasks}
                        completed_tasks={this.props.completed_tasks}
                        type={this.props.type}
                        chosen_date_data={this.props.chosen_date_data}
                        openModal={this.props.openModal}
                        current_chosen_category={this.props.current_chosen_category}
                        deleted_tasks={this.props.deleted_tasks}
                        sortSettings={this.props.sortSettings}
                    />
                </View>
            )
        }

        else if (item.id === "completed-flatlist-group") {
            return (
                <View>
                    <CompletedTaskCardHolder
                        priorities={this.props.priorities}
                        tasks={this.props.tasks}
                        completed_tasks={this.props.completed_tasks}
                        type={this.props.type}
                        chosen_date_data={this.props.chosen_date_data}
                        openModal={this.props.openModal}
                        current_chosen_category={this.props.current_chosen_category}
                        sortSettings={this.props.sortSettings}
                    />
                </View>
            )
        }

        else {
            return (
                <View
                    style={styles.completed_container}
                >
                    <Text
                        style={styles.completed_text}
                    >
                        Completed
                    </Text>
                </View>
            )
        }
    }

    _updateData = () => {
        let data = []

        data.push({
            id: "uncompleted-flatlist-group",
        })

        data.push({
            id: "completed-tag",
        })

        data.push({
            id: "completed-flatlist-group",
        })

        this.setState(prevState => ({
            should_flatlist_update: prevState.should_flatlist_update + 1,
            data
        }))
    }

    componentDidMount() {
        this._updateData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.tasks !== prevProps.tasks
            || this.props.completed_tasks !== prevProps.completed_tasks
            || this.props.current_chosen_category !== prevProps.current_chosen_category
            || this.props.deleted_tasks !== prevProps.deleted_tasks
            || this.props.chosen_date_data !== prevProps.chosen_date_data
            || this.props.sortSettings !== prevProps.sortSettings) {
            this._updateData()
        }
    }

    render() {
        return (
            <FlatList
                data={this.state.data}
                extraData={this.state.should_flatlist_update}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }
}

class UncompletedTaskCardHolder extends React.PureComponent {

    state = {
        should_flatlist_update: 0,
        data: []
    }

    _keyExtractor = (item, index) => `journal-${this.props.type}-uncompleted-task-${item[0]}`

    _renderItem = ({ item, index }) => {
        return (
            <UncompletedTaskCard
                index={index}
                task_id={item[0]}
                task_data={item[1]}
                current_chosen_category={this.props.current_chosen_category}
                completed_task={Map(this.props.completed_tasks).get(item[0])}
                type={this.props.type}
                chosen_date_data={this.props.chosen_date_data}
                openModal={this.props.openModal}
                deleted_task_data={Map(this.props.deleted_tasks).get(item[0])}
            />
        )
    }

    _sortedByPriorityTasks = () => {
        let tasks_map = Map(this.props.tasks),
            priorities_map = Map(this.props.priorities),
            data = []

        priorities_map.valueSeq().forEach((priority_data, index) => {
            List(priority_data.get("tasks")).forEach((task_data, i) => {
                let task_id = Map(task_data).get("id")
                data.push([task_id, tasks_map.get(task_id)])
            })
        })

        if (data.length > 0) {
            this.setState(prevState => ({
                data,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    _sortedByNameTasks = () => {
        let tasks_map = Map(this.props.tasks),
            data = []

        let tasks_for_sorting_array = tasks_map.valueSeq().map((value, index) => {
            let title = Map(value).get("title"),
                id = Map(value).get("id")

            return ([title, id])
        })

        let sorted_tasks = tasks_for_sorting_array.sort()

        sorted_tasks.forEach((tuple) => {
            let id = tuple[1]
            data.push([id, tasks_map.get(id)])
        })

        if (data.length > 0) {
            this.setState(prevState => ({
                data,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    _sortByRewardTasks = () => {
        let tasks_map = Map(this.props.tasks),
            data = []

        let tasks_for_sorting_array = tasks_map.valueSeq().map((value, index) => {
            let reward_value = Map(value).getIn(["reward", "value"]),
                id = Map(value).get("id")

            return ([reward_value, id])
        })

        let sorted_tasks = tasks_for_sorting_array.sort((a, b) => b[0] - a[0])

        sorted_tasks.forEach((tuple) => {
            let id = tuple[1]
            data.push([id, tasks_map.get(id)])
        })

        if (data.length > 0) {
            this.setState(prevState => ({
                data,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    componentDidMount() {
        let sort_settings = List(this.props.sortSettings)

        if (sort_settings.get(0)) {
            this._sortedByPriorityTasks()
        }
        else if (sort_settings.get(1)) {
            this._sortedByNameTasks()
        }

        else if (sort_settings.get(2)) {
            this._sortByRewardTasks()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.completed_tasks !== prevProps.completed_tasks
            || this.props.tasks !== prevProps.tasks
            || this.props.current_chosen_category !== prevProps.current_chosen_category
            || this.props.deleted_tasks !== prevProps.deleted_tasks
            || this.props.chosen_date_data !== prevProps.chosen_date_data
            || this.props.sortSettings !== prevProps.sortSettings) {

            let sort_settings = List(this.props.sortSettings)

            if (sort_settings.get(0)) {
                this._sortedByPriorityTasks()
            }
            else if (sort_settings.get(1)) {
                this._sortedByNameTasks()
            }

            else if (sort_settings.get(2)) {
                this._sortByRewardTasks()
            }
        }
    }

    render() {
        return (
            <FlatList
                // data={Map(this.props.tasks).toArray()}
                data={this.state.data}
                extraData={this.state.should_flatlist_update}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}

                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                scrollEnabled={false}

                windowSize={3}
                maxToRenderPerBatch={3}
                initialNumToRender={3}
            />
        )
    }
}

class UncompletedTaskCard extends React.PureComponent {

    update_obj = {
        should_render: false
    }

    getMonday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
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

    getNoWeekInMonth = (date) => {
        let nearest_monday_timestamp = this.getMonday(date).getTime()
        let first_monday_of_month_timestamp = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 1)).getTime()

        return Math.floor((nearest_monday_timestamp - first_monday_of_month_timestamp) / (7 * 86400 * 1000)) + 1
    }

    compareDayTypeDaily = (repeat, end, schedule, day, month, year) => {
        let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
            repeat_type = Map(repeat).get("type"),
            task_day = parseInt(Map(schedule).get("day")),
            task_month = parseInt(Map(schedule).get("month")),
            task_year = parseInt(Map(schedule).get("year")),
            task_start_timestamp = new Date(task_year, task_month, task_day).getTime(),
            current_date_start_timestamp = new Date(year, month, day).getTime()

        if (repeat_type === "daily" && current_date_start_timestamp >= task_start_timestamp) {
            let start_date_time = new Date(task_year, task_month, task_day).getTime(),
                current_date_time = new Date(year, month, day).getTime(),
                diff_day = Math.floor((current_date_time - start_date_time) / (86400 * 1000))

            if (diff_day > 0 && diff_day % repeat_value === 0) {

                let end_type = Map(end).get("type")

                if (end_type === "never") {
                    return true
                }

                else if (end_type === "on") {
                    let end_at = parseInt(Map(end).get("endAt")),
                        end_at_day = new Date(end_at).getDate(),
                        end_at_month = new Date(end_at).getMonth(),
                        end_at_year = new Date(end_at).getFullYear(),
                        end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                    if (current_date_start_timestamp <= end_timestamp) {
                        return true
                    }

                    if (year < end_at_year) {
                        return true
                    }

                    else if (year === end_at_year) {
                        if (month < end_at_month) {
                            return true
                        }

                        else if (month === end_at_month) {
                            return day <= end_at_day
                        }
                    }
                }

                else {
                    let end_after_value = parseInt(Map(end).get("occurrence"))
                    return diff_day / repeat_value <= (end_after_value - 1)
                }
            }
        }


        return false
    }

    compareDayTypeWeekly = (repeat, end, schedule, day, month, year) => {
        let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
            task_day = parseInt(Map(schedule).get("day")),
            task_month = parseInt(Map(schedule).get("month")),
            task_year = parseInt(Map(schedule).get("year")),
            repeat_type = Map(repeat).get("type"),
            repeat_days_in_week = Map(repeat).getIn(["interval", "daysInWeek"]),
            task_start_timestamp = new Date(task_year, task_month, task_day).getTime(),
            current_date_start_timestamp = new Date(year, month, day).getTime()


        if (repeat_type === "weekly" && current_date_start_timestamp >= task_start_timestamp) {

            let is_days_in_week_chosen = false

            repeat_days_in_week.every((value) => {
                if (value) {
                    is_days_in_week_chosen = true

                    return false
                }

                return true
            })

            if (is_days_in_week_chosen) {
                let start_date_week = this.getWeek(new Date(new Date(task_year, task_month, task_day))),
                    current_date_week = this.getWeek(new Date(new Date(year, month, day))),
                    current_date_day_in_week = new Date(year, month, day).getDay() === 0 ? 6 : new Date(year, month, day).getDay() - 1

                let diff = Math.abs(current_date_week - start_date_week)

                if (diff >= 0 && diff % repeat_value === 0) {

                    if (List(repeat_days_in_week).get(current_date_day_in_week)) {

                        let end_type = Map(end).get("type")

                        if (end_type === "never") {
                            return true
                        }

                        else if (end_type === "on") {
                            let end_at = parseInt(Map(end).get("endAt")),
                                end_at_day = new Date(end_at).getDate(),
                                end_at_month = new Date(end_at).getMonth(),
                                end_at_year = new Date(end_at).getFullYear(),
                                end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                            if (current_date_start_timestamp <= end_timestamp) {
                                return true
                            }

                            if (year < end_at_year) {
                                return true
                            }

                            else if (year === end_at_year) {
                                if (month < end_at_month) {
                                    return true
                                }

                                else if (month === end_at_month) {
                                    return day <= end_at_day
                                }
                            }
                        }

                        else {
                            let end_after_value = parseInt(Map(end).get("occurrence"))
                            return diff / repeat_value <= (end_after_value - 1)
                        }
                    }
                }
            }

            else {
                let start_date_time = new Date(new Date(task_year, task_month, task_day)).getTime(),
                    current_date_time = new Date(new Date(year, month, day)).getTime(),
                    diff = (current_date_time - start_date_time) / (86400 * 1000 * 7)

                if (diff > 0 && diff % repeat_value === 0) {

                    let end_type = Map(end).get("type")

                    if (end_type === "never") {
                        return true
                    }

                    else if (end_type === "on") {
                        let end_at = parseInt(Map(end).get("endAt")),
                            end_at_day = new Date(end_at).getDate(),
                            end_at_month = new Date(end_at).getMonth(),
                            end_at_year = new Date(end_at).getFullYear(),
                            end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                        if (current_date_start_timestamp <= end_timestamp) {
                            return true
                        }


                        if (year < end_at_year) {
                            return true
                        }

                        else if (year === end_at_year) {
                            if (month < end_at_month) {
                                return true
                            }

                            else if (month === end_at_month) {
                                return day <= end_at_day
                            }
                        }
                    }

                    else {
                        let end_after_value = parseInt(Map(end).get("occurrence"))
                        return diff / repeat_value <= (end_after_value - 1)
                    }
                }
            }
        }

        return false
    }

    compareDayTypeMonthly = (repeat, end, schedule, day, month, year) => {
        let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
            task_day = parseInt(Map(schedule).get("day")),
            task_month = parseInt(Map(schedule).get("month")),
            task_year = parseInt(Map(schedule).get("year")),
            repeat_type = Map(repeat).get("type"),
            task_start_timestamp = new Date(task_year, task_month, task_day).getTime(),
            current_date_start_timestamp = new Date(year, month, day).getTime()

        if (repeat_type === "monthly" && current_date_start_timestamp >= task_start_timestamp) {
            let start_date = new Date(task_year, task_month, task_day),
                current_date = new Date(year, month, day),
                diff_year = current_date.getFullYear() - start_date.getFullYear(),
                diff_month = (current_date.getMonth() + diff_year * 12) - start_date.getMonth()

            if (diff_month > 0 && diff_month % repeat_value === 0) {
                // If chosen date equals the start date, meaning schedule's date is between 1 - 28/29/30
                if (current_date.getDate() === start_date.getDate()) {

                    let end_type = Map(end).get("type")

                    if (end_type === "never") {
                        return true
                    }

                    else if (end_type === "on") {
                        let end_at = parseInt(Map(end).get("endAt")),
                            end_at_day = new Date(end_at).getDate(),
                            end_at_month = new Date(end_at).getMonth(),
                            end_at_year = new Date(end_at).getFullYear(),
                            end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                        if (current_date_start_timestamp <= end_timestamp) {
                            return true
                        }

                        if (year < end_at_year) {
                            return true
                        }

                        else if (year === end_at_year) {
                            if (month < end_at_month) {
                                return true
                            }

                            else if (month === end_at_month) {
                                return day <= end_at_day
                            }
                        }
                    }

                    else {
                        let end_after_value = parseInt(Map(end).get("occurrence"))
                        return diff_month / repeat_value <= (end_after_value - 1)
                    }
                }

                // If there is no common date between 1 - 28/29/30, meaning schedule's date is the last day of month
                else {
                    if (current_date.getDate() === new Date(year, month + 1, 0).getDate()) {

                        let end_type = Map(end).get("type")

                        if (end_type === "never") {
                            return true
                        }

                        else if (end_type === "on") {
                            let end_at = parseInt(Map(end).get("endAt")),
                                end_at_day = new Date(end_at).getDate(),
                                end_at_month = new Date(end_at).getMonth(),
                                end_at_year = new Date(end_at).getFullYear(),
                                end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                            if (current_date_start_timestamp <= end_timestamp) {
                                return true
                            }


                            if (year < end_at_year) {
                                return true
                            }

                            else if (year === end_at_year) {
                                if (month < end_at_month) {
                                    return true
                                }

                                else if (month === end_at_month) {
                                    return day <= end_at_day
                                }
                            }
                        }

                        else {
                            let end_after_value = parseInt(Map(end).get("occurrence"))
                            return diff_month / repeat_value <= (end_after_value - 1)
                        }

                        return true
                    }
                }
            }
        }

        return false
    }

    compareWeekTypeWeekly = (repeat, end, schedule, monday, sunday, week, start_month, end_month, start_year, end_year, start_noWeekInMonth, end_noWeekInMonth) => {
        let task_monday = parseInt(Map(schedule).get("monday")),
            task_sunday = parseInt(Map(schedule).get("sunday")),
            task_start_month = parseInt(Map(schedule).get("start_month")),
            task_end_month = parseInt(Map(schedule).get("end_month")),
            task_chosen_month = parseInt(Map(schedule).get("chosen_month")),
            task_start_year = parseInt(Map(schedule).get("start_year")),
            task_end_year = parseInt(Map(schedule).get("end_year")),
            task_chosen_year = parseInt(Map(schedule).get("chosen_year")),
            task_week = parseInt(Map(schedule).get("week")),
            repeat_type = Map(repeat).get("type"),
            repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
            current_date_start_start_week_timestamp = new Date(start_year, start_month, monday).getTime(),
            current_date_start_end_week_timestamp = new Date(end_year, end_month, sunday).getTime(),
            task_start_timestamp = new Date(task_start_year, task_start_month, task_monday).getTime()

        if (repeat_type === "weekly-w" && current_date_start_start_week_timestamp >= task_start_timestamp) {
            let diff = Math.abs(week - task_week)
            if (diff >= 0 && diff % repeat_value === 0) {
                let end_type = Map(end).get("type")

                if (end_type === "never") {
                    return true
                }

                else if (end_type === "on") {
                    let end_at = parseInt(Map(end).get("endAt")),
                        end_at_day = new Date(end_at).getDate(),
                        end_at_month = new Date(end_at).getMonth(),
                        end_at_year = new Date(end_at).getFullYear(),
                        end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                    if ((current_date_start_end_week_timestamp >= end_timestamp)) {
                        return true
                    }

                    if (end_at_year === start_year) {
                        if (end_at_month > start_month) {
                            return true
                        }

                        else if (end_at_month === start_month) {
                            if (end_at_day >= monday) {
                                return true
                            }
                        }
                    }

                    else if (end_at_year > start_year) {
                        return true
                    }
                }

                else {
                    let end_after_value = parseInt(Map(end).get("occurrence"))
                    return diff / repeat_value <= (end_after_value - 1)
                }
            }
        }

        return false
    }

    compareWeekTypeMonthly = (repeat, end, schedule, monday, sunday, week, start_month, end_month, start_year, end_year, start_noWeekInMonth, end_noWeekInMonth) => {
        let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
            task_monday = parseInt(Map(schedule).get("monday")),
            task_chosen_month = parseInt(Map(schedule).get("chosen_month")),
            task_start_month = parseInt(Map(schedule).get("start_month")),
            task_end_month = parseInt(Map(schedule).get("end_month")),
            task_start_year = parseInt(Map(schedule).get("start_year")),
            task_chosen_year = parseInt(Map(schedule).get("chosen_year")),
            task_week = parseInt(Map(schedule).get("week")),
            task_chosen_noWeekInMonth = parseInt(Map(schedule).get("start_noWeekInMonth")),
            repeat_type = Map(repeat).get("type"),
            current_date_start_start_week_timestamp = new Date(start_year, start_month, monday).getTime(),
            current_date_start_end_week_timestamp = new Date(end_year, end_month, sunday).getTime(),
            task_start_timestamp = new Date(task_start_year, task_start_month, task_monday).getTime()

        if (repeat_type === "weekly-m" && current_date_start_start_week_timestamp >= task_start_timestamp) {
            if (task_chosen_month === task_start_month) {
                let diff_year = start_year - task_chosen_year,
                    diff_month = (start_month + diff_year * 12) - task_chosen_month

                task_chosen_noWeekInMonth = parseInt(Map(schedule).get("start_noWeekInMonth"))

                if (task_chosen_noWeekInMonth > 4) {
                    task_chosen_noWeekInMonth = 4
                }

                if (start_noWeekInMonth > 4) {
                    start_noWeekInMonth = 4
                }

                if (diff_month > 0 && diff_month % repeat_value === 0) {
                    if (start_noWeekInMonth === task_chosen_noWeekInMonth) {
                        let end_type = Map(end).get("type")

                        if (end_type === "never") {
                            return true
                        }

                        else if (end_type === "on") {
                            let end_at = parseInt(Map(end).get("endAt")),
                                end_at_day = new Date(end_at).getDate(),
                                end_at_month = new Date(end_at).getMonth(),
                                end_at_year = new Date(end_at).getFullYear(),
                                end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                            if ((current_date_start_end_week_timestamp >= end_timestamp)) {
                                return true
                            }

                            if (end_at_year === start_year) {
                                if (end_at_month > start_month) {
                                    return true
                                }

                                else if (end_at_month === start_month) {
                                    if (end_at_day >= monday) {
                                        return true
                                    }
                                }
                            }

                            else if (end_at_year > start_year) {
                                return true
                            }
                        }

                        else {
                            let end_after_value = parseInt(Map(end).get("occurrence"))
                            return diff_month / repeat_value <= (end_after_value - 1)
                        }
                    }
                }
            }

            else if (task_chosen_month === task_end_month) {
                let diff_year = end_year - task_chosen_year,
                    diff_month = (end_month + diff_year * 12) - task_chosen_month

                task_chosen_noWeekInMonth = parseInt(Map(schedule).get("end_noWeekInMonth"))

                if (task_chosen_noWeekInMonth > 4) {
                    task_chosen_noWeekInMonth = 4
                }

                if (end_noWeekInMonth > 4) {
                    end_noWeekInMonth = 4
                }

                if (diff_month > 0 && diff_month % repeat_value === 0) {

                    if (end_noWeekInMonth === task_chosen_noWeekInMonth) {
                        let end_type = Map(end).get("type")

                        if (end_type === "never") {
                            return true
                        }

                        else if (end_type === "on") {
                            let end_at = parseInt(Map(end).get("endAt")),
                                end_at_day = new Date(end_at).getDate(),
                                end_at_month = new Date(end_at).getMonth(),
                                end_at_year = new Date(end_at).getFullYear(),
                                end_timestamp = new Date(end_at_year, end_at_month, end_at_day).getTime()

                            if ((current_date_start_end_week_timestamp >= end_timestamp)) {
                                return true
                            }

                            if (end_at_year === start_year) {
                                if (end_at_month > start_month) {
                                    return true
                                }

                                else if (end_at_month === start_month) {
                                    if (end_at_day >= monday) {
                                        return true
                                    }
                                }
                            }

                            else if (end_at_year > start_year) {
                                return true
                            }
                        }

                        else {
                            let end_after_value = parseInt(Map(end).get("occurrence"))
                            return diff_month / repeat_value <= (end_after_value - 1)
                        }
                    }
                }
            }
        }

        return false
    }

    compareMonthTypeMonthly = (repeat, end, schedule, month, year) => {
        let repeat_value = parseInt(Map(repeat).getIn(["interval", "value"])),
            task_month = Map(schedule).get("month"),
            task_year = Map(schedule).get("year")

        let diff_year = year - task_year,
            diff_month = (month + diff_year * 12) - task_month

        if (diff_month > 0 && diff_month % repeat_value === 0) {
            let end_type = Map(end).get("type")

            if (end_type === "never") {
                return true
            }

            else if (end_type === "on") {
                let end_at = parseInt(Map(end).get("endAt")),
                    end_at_day = new Date(end_at).getDate(),
                    end_at_month = new Date(end_at).getMonth(),
                    end_at_year = new Date(end_at).getFullYear()

                if (end_at_year === year) {
                    if (end_at_month >= month) {
                        return true
                    }
                }

                else if (end_at_year > year) {
                    return true
                }
            }

            else {
                let end_after_value = parseInt(Map(end).get("occurrence"))
                return diff_month / repeat_value <= (end_after_value - 1)
            }
        }

        return false
    }

    handleUpdate = (deleted_task_data, completed_task, task, type, current_chosen_category, chosen_date_data) => {
        let task_map = Map(task),
            schedule = task_map.get("schedule"),
            repeat = task_map.get("repeat"),
            end = task_map.get("end"),
            title = task_map.get("title"),
            goal = task_map.get("goal"),
            category = task_map.get("category"), //category id
            current_goal_value = 0

        if (current_chosen_category === category) {
            if (type === "day") {
                let { day, month, year } = chosen_date_data,
                    chosen_day_timestamp = new Date(year, month, day).getTime(),
                    chosen_day_timestamp_to_string = chosen_day_timestamp.toString(),

                    task_day = parseInt(Map(schedule).get("day")),
                    task_month = parseInt(Map(schedule).get("month")),
                    task_year = parseInt(Map(schedule).get("year")),
                    goal_value = parseInt(Map(goal).get("max"))

                if ((task_day === day && task_month === month && task_year === year)
                    || this.compareDayTypeDaily(repeat, end, schedule, day, month, year)
                    || this.compareDayTypeWeekly(repeat, end, schedule, day, month, year)
                    || this.compareDayTypeMonthly(repeat, end, schedule, day, month, year)
                ) {
                    current_goal_value = parseInt(getIn(completed_task, [chosen_day_timestamp_to_string, "current"], 0))

                    if (current_goal_value < goal_value) {
                        if (!Map(deleted_task_data).has(chosen_day_timestamp_to_string)) {
                            this.update_obj = {
                                should_render: true,
                                current_goal_value,
                                action_type: "UPDATE_COMPLETED_DAY_TASK",
                                title,
                                goal_value,
                                task_data: task
                            }
                        }

                        else {
                            this.update_obj.should_render = false
                        }
                    }

                    else {
                        this.update_obj.should_render = false
                    }
                }

                else {
                    this.update_obj.should_render = false
                }
            }

            else if (type === "week") {
                let { monday, sunday, week, start_month, end_month, start_year, end_year, start_noWeekInMonth, end_noWeekInMonth } = chosen_date_data,
                    chosen_week_timestamp = new Date(start_year, start_month, monday).getTime(),
                    chosen_week_timestamp_to_string = chosen_week_timestamp.toString(),

                    task_week = parseInt(Map(schedule).get("week")),
                    task_year = parseInt(Map(schedule).get("chosen_year")),
                    goal_value = parseInt(Map(goal).get("max"))

                if ((task_week === week && task_year === start_year)
                    || this.compareWeekTypeWeekly(repeat, end, schedule, monday, sunday, week, start_month, end_month, start_year, end_year, start_noWeekInMonth, end_noWeekInMonth)
                    || this.compareWeekTypeMonthly(repeat, end, schedule, monday, sunday, week, start_month, end_month, start_year, end_year, start_noWeekInMonth, end_noWeekInMonth)
                ) {
                    current_goal_value = getIn(completed_task, [chosen_week_timestamp_to_string, "current"], 0)

                    if (current_goal_value < parseInt(goal_value)) {
                        if (!Map(deleted_task_data).has(chosen_week_timestamp_to_string)) {
                            this.update_obj = {
                                should_render: true,
                                current_goal_value,
                                action_type: "UPDATE_COMPLETED_WEEK_TASK",
                                title,
                                goal_value,
                                task_data: task
                            }
                        }

                        else {
                            this.update_obj.should_render = false
                        }
                    }

                    else {
                        this.update_obj.should_render = false
                    }
                }

                else {
                    this.update_obj.should_render = false
                }
            }

            else {
                let { month, year } = chosen_date_data,
                    chosen_month_timestamp = new Date(year, month).getTime(),
                    chosen_month_timestamp_to_string = chosen_month_timestamp.toString(),

                    task_month = parseInt(Map(schedule).get("month")),
                    task_year = parseInt(Map(schedule).get("year")),
                    goal_value = parseInt(Map(goal).get("max"))

                if ((task_month === month && task_year === year)
                    || this.compareMonthTypeMonthly(repeat, end, schedule, month, year)
                ) {
                    current_goal_value = getIn(completed_task, [chosen_month_timestamp_to_string, "current"], 0)
                    if (current_goal_value < parseInt(goal_value)) {
                        if (!Map(deleted_task_data).has(chosen_month_timestamp_to_string)) {
                            this.update_obj = {
                                should_render: true,
                                current_goal_value,
                                action_type: "UPDATE_COMPLETED_MONTH_TASK",
                                title,
                                goal_value,
                                task_data: task
                            }
                        }

                        else {
                            this.update_obj.should_render = false
                        }
                    }

                    else {
                        this.update_obj.should_render = false
                    }
                }

                else {
                    this.update_obj.should_render = false
                }
            }
        }

        else {
            this.update_obj.should_render = false
        }
    }

    checkIfChosenDateIsToday = (chosen_date_data, type) => {
        let current = new Date(),
            is_chosen_date_today = false


        if (type === "day") {
            let { day, month, year } = chosen_date_data

            if (day === current.getDate() && month === current.getMonth() && year === current.getFullYear()) {
                is_chosen_date_today = true
            }

            else {
                is_chosen_date_today = false
            }
        }

        else if (type === "week") {
            let { week, start_year } = chosen_date_data

            if (week === this.getWeek(current) && start_year === current.getFullYear()) {
                is_chosen_date_today = true
            }

            else {
                is_chosen_date_today = false
            }
        }

        else {
            let { month, year } = chosen_date_data

            if (month === current.getMonth() && year === current.getFullYear()) {
                is_chosen_date_today = true
            }

            else {
                is_chosen_date_today = false
            }
        }

        return is_chosen_date_today
    }

    render() {
        let is_chosen_date_today = this.checkIfChosenDateIsToday(this.props.chosen_date_data, this.props.type)

        this.handleUpdate(
            this.props.deleted_task_data,
            this.props.completed_task,
            this.props.task_data,
            this.props.type,
            this.props.current_chosen_category,
            this.props.chosen_date_data
        )

        return (
            <View>
                {this.update_obj.should_render ?
                    <TaskCard
                        action_type={this.update_obj.action_type}
                        type={this.props.type}
                        task_data={this.props.task_data}
                        index={this.props.index}
                        openModal={this.props.openModal}

                        is_chosen_date_today={is_chosen_date_today}
                        flag={"uncompleted"}

                        current_goal_value={this.update_obj.current_goal_value}
                        title={this.update_obj.title}
                        goal_value={this.update_obj.goal_value}
                    />

                    :

                    null
                }
            </View>
        )
    }
}

class CompletedTaskCardHolder extends React.PureComponent {

    state = {
        should_flatlist_update: 0,
        data: []
    }

    _keyExtractor = (item, index) => `journal-${this.props.type}-completed-task-${item[0]}`

    _renderItem = ({ item, index }) => (
        <CompletedTaskCard
            index={index}
            task_id={item[0]}
            completed_task={item[1]}
            current_chosen_category={this.props.current_chosen_category}
            task={Map(this.props.tasks).get(item[0])}
            type={this.props.type}
            chosen_date_data={this.props.chosen_date_data}
            openModal={this.props.openModal}
        />
    )

    _sortedByPriorityTasks = () => {
        let completed_tasks_map = Map(this.props.completed_tasks),
            tasks_map = Map(this.props.tasks),
            priorities_map = Map(this.props.priorities),
            data = []

        priorities_map.valueSeq().forEach((priority_data, index) => {
            List(priority_data.get("tasks")).forEach((task_data, i) => {
                let task_id = Map(task_data).get("id")
                if (completed_tasks_map.has(task_id)) {
                    data.push([task_id, completed_tasks_map.get(task_id)])
                }
            })
        })

        if (data.length > 0) {
            this.setState(prevState => ({
                data,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    _sortedByNameTasks = () => {
        let tasks_map = Map(this.props.tasks),
            completed_tasks_map = Map(this.props.completed_tasks),
            data = []

        let tasks_for_sorting_array = tasks_map.valueSeq().map((value, index) => {
            let title = Map(value).get("title"),
                id = Map(value).get("id")

            return ([title, id])
        })

        let sorted_tasks = tasks_for_sorting_array.sort()

        sorted_tasks.forEach((tuple) => {
            let id = tuple[1]
            if (completed_tasks_map.has(id)) {
                data.push([id, completed_tasks_map.get(id)])
            }
        })

        if (data.length > 0) {
            this.setState(prevState => ({
                data,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    _sortByRewardTasks = () => {
        let tasks_map = Map(this.props.tasks),
            completed_tasks_map = Map(this.props.completed_tasks),
            data = []

        let tasks_for_sorting_array = tasks_map.valueSeq().map((value, index) => {
            let reward_value = Map(value).getIn(["reward", "value"]),
                id = Map(value).get("id")

            return ([reward_value, id])
        })

        let sorted_tasks = tasks_for_sorting_array.sort((a, b) => b[0] - a[0])

        sorted_tasks.forEach((tuple) => {
            let id = tuple[1]
            if (completed_tasks_map.has(id)) {
                data.push([id, completed_tasks_map.get(id)])
            }
        })

        if (data.length > 0) {
            this.setState(prevState => ({
                data,
                should_flatlist_update: prevState.should_flatlist_update + 1
            }))
        }
    }

    componentDidMount() {
        let sort_settings = List(this.props.sortSettings)

        if (sort_settings.get(0)) {
            this._sortedByPriorityTasks()
        }
        else if (sort_settings.get(1)) {
            this._sortedByNameTasks()
        }

        else if (sort_settings.get(2)) {
            this._sortByRewardTasks()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.completed_tasks !== prevProps.completed_tasks
            || this.props.current_chosen_category !== prevProps.current_chosen_category
            || this.props.chosen_date_data !== prevProps.chosen_date_data
            || this.props.sortSettings !== prevProps.sortSettings) {

            let sort_settings = List(this.props.sortSettings)

            if (sort_settings.get(0)) {
                this._sortedByPriorityTasks()
            }
            else if (sort_settings.get(1)) {
                this._sortedByNameTasks()
            }

            else if (sort_settings.get(2)) {
                this._sortByRewardTasks()
            }
        }
    }

    render() {
        return (
            <FlatList
                // data={Map(this.props.completed_tasks).toArray()}
                data={this.state.data}
                extraData={this.state.should_flatlist_update}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}

                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                scrollEnabled={false}

                windowSize={3}
                maxToRenderPerBatch={3}
                initialNumToRender={3}
            />
        )
    }
}

class CompletedTaskCard extends React.PureComponent {

    update_obj = {
        should_render: false
    }

    handleUpdate = (task, completed_task, type, current_chosen_category, chosen_date_data) => {
        let task_id = Map(task).get("id")
        if (task_id && task_id === completed_task.get("id")) {
            let title = Map(task).get("title"),
                goal_value = Map(task).getIn(["goal", "max"]),
                category = Map(task).get("category"), // category id
                current_goal_value = 0

            if (current_chosen_category === category) {
                if (type === "day") {
                    let { day, month, year } = chosen_date_data,
                        chosen_day_timestamp = new Date(year, month, day).getTime(),
                        chosen_day_timestamp_to_string = chosen_day_timestamp.toString()

                    if (hasIn(completed_task, [chosen_day_timestamp_to_string, "current"]) &&
                        parseInt(getIn(completed_task, [chosen_day_timestamp_to_string, "current"], 0)) >= parseInt(goal_value)) {
                        current_goal_value = getIn(completed_task, [chosen_day_timestamp_to_string, "current"], 0)

                        this.update_obj = {
                            action_type: "UPDATE_COMPLETED_DAY_TASK",
                            current_goal_value,
                            should_render: true,
                            title,
                            goal_value,
                            task_data: task
                        }
                    }

                    else {
                        this.update_obj.should_render = false
                    }
                }

                else if (type === "week") {
                    let { monday, start_month, start_year } = chosen_date_data,
                        chosen_week_timestamp = new Date(start_year, start_month, monday).getTime(),
                        chosen_week_timestamp_to_string = chosen_week_timestamp.toString()

                    if (hasIn(completed_task, [chosen_week_timestamp_to_string, "current"]) &&
                        parseInt(getIn(completed_task, [chosen_week_timestamp_to_string, "current"], 0)) >= parseInt(goal_value)) {
                        current_goal_value = getIn(completed_task, [chosen_week_timestamp_to_string, "current"], 0)


                        this.update_obj = {
                            action_type: "UPDATE_COMPLETED_WEEK_TASK",
                            current_goal_value,
                            should_render: true,
                            title,
                            goal_value,
                            task_data: task
                        }
                    }

                    else {
                        this.update_obj.should_render = false
                    }
                }

                else {
                    let { month, year } = chosen_date_data,
                        chosen_month_timestamp = new Date(year, month).getTime(),
                        chosen_month_timestamp_to_string = chosen_month_timestamp.toString()

                    if (hasIn(completed_task, [chosen_month_timestamp_to_string, "current"]) &&
                        parseInt(getIn(completed_task, [chosen_month_timestamp_to_string, "current"], 0)) >= parseInt(goal_value)) {
                        current_goal_value = getIn(completed_task, [chosen_month_timestamp_to_string, "current"], 0)

                        this.update_obj = {
                            action_type: "UPDATE_COMPLETED_MONTH_TASK",
                            current_goal_value,
                            should_render: true,
                            title,
                            goal_value,
                            task_data: task
                        }
                    }

                    else {
                        this.update_obj.should_render = false
                    }
                }
            }

            else {
                this.update_obj.should_render = false
            }
        }

        else {
            this.update_obj.should_render = false
        }
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

    checkIfChosenDateIsToday = (chosen_date_data, type) => {
        let current = new Date(),
            is_chosen_date_today = false


        if (type === "day") {
            let { day, month, year } = chosen_date_data

            if (day === current.getDate() && month === current.getMonth() && year === current.getFullYear()) {
                is_chosen_date_today = true
            }

            else {
                is_chosen_date_today = false
            }
        }

        else if (type === "week") {
            let { week, start_year } = chosen_date_data

            if (week === this.getWeek(current) && start_year === current.getFullYear()) {
                is_chosen_date_today = true
            }

            else {
                is_chosen_date_today = false
            }
        }

        else {
            let { month, year } = chosen_date_data

            if (month === current.getMonth() && year === current.getFullYear()) {
                is_chosen_date_today = true
            }

            else {
                is_chosen_date_today = false
            }
        }

        return is_chosen_date_today
    }

    render() {
        this.handleUpdate(this.props.task, this.props.completed_task, this.props.type, this.props.current_chosen_category, this.props.chosen_date_data)


        let is_chosen_date_today = this.checkIfChosenDateIsToday(this.props.chosen_date_data, this.props.type)
        return (
            <>
                {this.update_obj.should_render ?
                    <TaskCard
                        action_type={this.update_obj.action_type}
                        type={this.props.type}
                        task_data={this.update_obj.task_data}
                        index={this.props.index}
                        openModal={this.props.openModal}

                        is_chosen_date_today={is_chosen_date_today}
                        flag={"completed"}

                        current_goal_value={this.update_obj.current_goal_value}
                        title={this.update_obj.title}
                        goal_value={this.update_obj.goal_value}
                    />

                    :

                    null
                }
            </>
        )
    }
}
