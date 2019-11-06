import React from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native'

import { Map, fromJS } from 'immutable'

import { styles } from './styles/styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

const panel_width = 338
const margin_top_for_calendar_row = 20
const margin_top_for_month_year_text = 30
const calendar_total_height = margin_top_for_calendar_row * 3 + 45 * 3
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)

export default class MonthCalendar extends React.Component {
    chosen_month = -1
    chosen_year = -1

    calendar_scale_value = new Animated.Value(0.3)
    calendar_opacity_value = new Animated.Value(0.3)

    save = () => {
        if (this.chosen_month >= 0 && this.chosen_year >= 0) {
            if (this.props.edit) {
                let keyPath = ["schedule"],
                    notSetValue = {},
                    updater = (value) => fromJS({
                        month: this.chosen_month,
                        year: this.chosen_year
                    })

                this.props._editFieldData(keyPath, notSetValue, updater)
            }

            else {
                this._updateTask(this.chosen_month, this.chosen_year)
            }
        }

        this.props.hideAction()
    }

    cancel = () => {
        this.props.hideAction()
    }

    setData = (month, year) => {
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateTask = (month, year) => {
        this.props.updateTaskSchedule({
            month,
            year,
        })
    }

    animateCalendar = () => {
        Animated.parallel([
            Animated.timing(
                this.calendar_opacity_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.calendar_scale_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            )
        ]).start()
    }

    componentDidMount() {
        this.animateCalendar()
    }


    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: panel_width,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    flexDirection: "row",
                    overflow: "hidden",
                    transform: [{ scale: this.calendar_scale_value }],
                    opacity: this.calendar_opacity_value
                }}
            >
                <View>
                    {/* Main content of day calendar */}
                    <Calendar
                        edit={this.props.edit}
                        setData={this.setData}
                        task_data={this.props.task_data}
                        edit_task_data={this.props.edit_task_data}
                    />

                    <View
                        style={styles.separating_line}
                    >
                    </View>

                    <View
                        style={{
                            marginTop: 28,
                            marginHorizontal: 30,
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginBottom: 35,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.close_icon_holder}
                            onPress={this.cancel}
                        >
                            <FontAwesomeIcon
                                icon={faTimes}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.save_icon_holder}
                            onPress={this.save}
                        >
                            <FontAwesomeIcon
                                icon={faCheck}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
        )
    }
}

class Calendar extends React.Component {

    current_year = new Date().getFullYear()
    current_month = new Date().getMonth()

    year_in_between = 4
    left_end_year = this.current_year - this.year_in_between
    right_end_year = this.current_year + this.year_in_between

    present_year_index = -1

    year_data = []

    start_index = 0

    state = {
        should_flatlist_update: 0,

        current_year_index: -1,
        last_year_index: -1,

        current_month_index: -1,
        last_month_index: -1,
    }

    scrollToYear = (year_index) => {
        if (this._flatlist) {
            this._flatlist.scrollToOffset({ animated: true, offset: year_index * panel_width })
        }
    }

    _setRef = (r) => this._flatlist = r

    chooseMonth = (year_index, month_index) => {
        this.setState(prevState => ({
            current_year_index: year_index,
            last_year_index: prevState.current_year_index,

            current_month_index: month_index,
            last_month_index: prevState.current_month_index,

            should_flatlist_update: prevState.should_flatlist_update + 1
        }))
    }

    _keyExtractor = (item, index) => `month-type-calendar-year-${index}`

    _renderItem = ({ item, index }) => (
        <YearHolder
            data={item}
            year_index={index}

            current_year_index={this.state.current_year_index}
            last_year_index={this.state.last_year_index}

            current_month_index={this.state.current_month_index}
            last_month_index={this.state.last_month_index}

            chooseMonth={this.chooseMonth}
            scrollToYear={this.scrollToYear}
            present_year_index={this.present_year_index}

            setData={this.props.setData}
            task_data={this.props.task_data}
        />
    )

    initYearData = () => {
        let counter = 0

        for (let year = this.left_end_year; year <= this.right_end_year; year++) {
            this.year_data.push({
                year
            })

            if (year === this.current_year) {
                this.present_year_index = counter
            }

            counter += 1
        }

        if (this.props.edit) {
            this.start_index = this.findStartIndex(this.props.edit_task_data)
        }

        else {
            this.start_index = this.findStartIndex(this.props.task_data)
        }
    }

    _getItemLayout = (data, index) => ({
        length: panel_width,
        offset: panel_width * index,
        index
    })

    findStartIndex = (task_data) => {
        if (task_data) {
            let task_data_map = Map(task_data),
                month = task_data_map.getIn(["schedule", "month"]),
                year = task_data_map.getIn(["schedule", "year"]),
                month_index = month,
                year_index = this.findYearIndex(year)

            this.chooseMonth(year_index, month_index)

            return year_index
        }

        else {
            let month_index = new Date().getMonth(),
                year = new Date().getFullYear(),
                year_index = this.findYearIndex(year)

            this.chooseMonth(year_index, month_index)

            return year_index
        }
    }


    findYearIndex = (year) => {

        return year - this.left_end_year
    }

    componentDidMount() {
        this.initYearData()

    }

    render() {
        return (

            <View
                style={{
                    backgroundColor: "white",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    position: "relative",
                }}
            >
                <View>
                    <FlatList
                        data={this.year_data}
                        extraData={this.state.should_flatlist_update}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        snapToInterval={338}
                        snapToAlignment="start"
                        getItemLayout={this._getItemLayout}
                        initialScrollIndex={this.start_index}
                        ref={this._setRef}
                        initialNumToRender={5}
                        windowSize={5}
                    />
                </View>
            </View>
        )
    }
}

class YearHolder extends React.Component {

    months_in_year_data = []

    state = {
        should_flatlist_update: 0,
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.year_index === nextProps.current_year_index || this.props.year_index === nextProps.last_year_index
    }

    _keyExtractor = (item, index) => `month-type-calendar-${item.month}-${item.year}-${index}`

    _renderItem = ({ item, index }) => {
        return (
            <MonthHolder
                month_data={item}
                month_index={index}
                year_index={this.props.year_index}

                current_year_index={this.props.current_year_index}
                last_year_index={this.props.last_year_index}

                current_month_index={this.props.current_month_index}
                last_month_index={this.props.last_month_index}

                setData={this.props.setData}
                chooseMonth={this.props.chooseMonth}
            />
        )
    }

    _returnToCurrentYear = () => {
        this.props.scrollToYear(this.props.present_year_index)
    }

    componentDidMount() {

        let { year } = this.props.data

        for (let i = 0; i < 12; i++) {
            this.months_in_year_data.push({
                month: i,
                year
            })
        }

        this.setState(prevState => ({
            should_flatlist_update: prevState.should_flatlist_update + 1,
        }))
    }

    render() {
        return (
            <View
                style={{
                    width: panel_width,
                    alignItems: "center",
                }}
            >
                <TouchableOpacity
                    style={{
                        marginTop: margin_top_for_month_year_text,
                        flexDirection: "row",
                        alignItems: "center",
                    }}

                    onPress={this._returnToCurrentYear}
                >
                    <Text
                        style={styles.year_text}
                    >
                        {this.props.data.year}
                    </Text>
                </TouchableOpacity>

                <View
                    style={{
                        marginTop: margin_top_for_calendar_row,
                        height: calendar_total_height,
                    }}
                >
                    <FlatList
                        data={this.months_in_year_data}
                        extraData={this.state.should_flatlist_update}
                        numColumns={4}
                        columnWrapperStyle={{
                            width: panel_width - 10,
                            marginTop: margin_top_for_calendar_row,
                        }}

                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        scrollEnabled={false}
                    />
                </View>
            </View>
        )
    }
}

class MonthHolder extends React.Component {
    month_names = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.month_index === nextProps.current_month_index && this.props.year_index === nextProps.current_year_index)
            || (this.props.month_index === nextProps.last_month_index && this.props.year_index === nextProps.current_year_index)
            || (this.props.month_index === nextProps.last_month_index && this.props.year_index === nextProps.last_year_index)
    }

    _chooseMonthFromCurrentYear = () => {
        this.props.chooseMonth(this.props.year_index, this.props.month_index)
        this.props.setData(this.props.month_data.month, this.props.month_data.year)
    }

    render() {
        let container_style = styles.unchosen_month_holder_container,
            text_style = styles.unchosen_month_text,
            current_month = new Date().getMonth(),
            current_year = new Date().getFullYear()


        if (this.props.month_index === this.props.current_month_index && this.props.year_index === this.props.current_year_index) {
            container_style = styles.chosen_month_holder_container
            text_style = styles.chosen_month_text
        }

        else if (this.props.month_index === this.props.last_month_index && this.props.year_index === this.props.current_year_index) {
            container_style = styles.unchosen_month_holder_container
            text_style = styles.unchosen_month_text
        }

        else if (this.props.month_index === this.props.last_month_index && this.props.year_index === this.props.last_year_index) {
            container_style = styles.unchosen_month_holder_container
            text_style = styles.unchosen_month_text
        }

        if (this.props.month_data.month === current_month && this.props.month_data.year === current_year) {
            text_style = styles.chosen_month_text
        }

        return (
            <TouchableOpacity
                style={container_style}

                onPress={this._chooseMonthFromCurrentYear}
            >
                <Text
                    style={text_style}
                >
                    {this.month_names[this.props.month_data.month]}
                </Text>
            </TouchableOpacity>
        )
    }

}

