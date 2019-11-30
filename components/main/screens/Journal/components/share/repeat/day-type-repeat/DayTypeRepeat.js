import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Dimensions,
    Animated,
    Easing,
    ScrollView,
    UIManager
} from 'react-native';

import { styles } from './styles/styles'

import RepeatValueHolder from './repeat-value-holder/RepeatValueHolder'
import ChooseDayInWeekOption from './choose-day-in-week-option/ChooseDayInWeekOption'

import RepeatEndOptionsHolder from './repeat-end-options-holder/RepeatEndOptionsHolder'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faFlag,
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

import { Map, fromJS } from 'immutable'

const animation_duration = 250
const easing = Easing.in()
const window_width = Dimensions.get("window").width
const window_height = Dimensions.get("window").height
const margin_bottom_of_last_row = 35
const extra_margin_from_keyboard = 10

export default class DayTypeRepeat extends React.PureComponent {

    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = this.repeat_opacity_value.interpolate({
        inputRange: [0, 0.3, 0.5, 0.7, 1],
        outputRange: [0, 0.3, 0.5, 0.7, 1],
        extrapolate: "clamp"
    })

    translate_y = new Animated.Value(0)

    date = new Date()

    currently_focused_input = TextInput.State

    state = {
        selected_repeat_type: "day",

        repeat_input_value: "1",

        after_occurrence_value: "1",

        goal_value: "1",

        days_in_week_option_array: [false, false, false, false, false, false, false],

        end_current_index: 0,

        end_last_index: -1,

        end_at_chosen_day: this.date.getDate(),
        end_at_chosen_month: this.date.getMonth(),
        end_at_chosen_year: this.date.getFullYear(),
    }

    _setEndAtDayMonthYear = (day, month, year) => {
        this.setState({
            end_at_chosen_day: day,
            end_at_chosen_month: month,
            end_at_chosen_year: year
        })
    }

    chooseEndOption = (index) => {
        if (this.state.end_current_index !== index) {
            this.setState(prevState => ({
                end_current_index: index,
                end_last_index: prevState.end_current_index
            }))
        }
    }

    _setRepeatType = (repeat_type) => {
        this.setState({
            selected_repeat_type: repeat_type
        })
    }

    _onChangeRepeatInput = (e) => {
        this.setState({
            repeat_input_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    _resetRepeatInput = () => {
        if (this.state.repeat_input_value.length === 0) {
            this.setState({
                repeat_input_value: "1"
            })
        }
    }

    _onChangeAfterOccurrenceValue = (e) => {
        this.setState({
            after_occurrence_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    _resetAfterOccurrenceInput = () => {
        if (this.state.after_occurrence_value.length === 0) {
            this.setState({
                after_occurrence_value: "1"
            })
        }
    }

    _onChangeGoalValue = (e) => {
        this.setState({
            goal_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    _resetGoalValueInput = () => {
        if (this.state.goal_value.length === 0) {
            this.setState({
                goal_value: "1"
            })
        }
    }

    animateRepeat = (edit) => {
        Animated.timing(
            this.repeat_opacity_value,
            {
                toValue: 1,
                duration: animation_duration,
                easing,
                useNativeDriver: edit ? false : true
            }
        ).start()
    }

    _animateRepeatEnd = (callback, edit) => {
        Animated.timing(
            this.repeat_opacity_value,
            {
                toValue: 0,
                duration: animation_duration,
                easing,
                useNativeDriver: edit ? false : true
            }
        ).start(() => { callback() })
    }

    _keyboardWillHideHandler = (e) => {
        this._resetRepeatInput()
        this._resetAfterOccurrenceInput()
        this._resetGoalValueInput()

        Animated.timing(
            this.translate_y,
            {
                toValue: 0,
                duration: e.duration,
                useNativeDriver: true
            }
        ).start()
    }

    _keyboardWillShowHandler = (e) => {
        let keyboard_height = e.endCoordinates.height,
            keyboard_duration = e.duration
        let currently_focused_input = this.currently_focused_input.currentlyFocusedField()

        UIManager.measure(currently_focused_input, (originX, originY, width, height, pageX, pageY) => {
            let input_height = height,
                input_py = pageY

            let gap = (window_height - keyboard_height) - (input_py + input_height) - extra_margin_from_keyboard

            if (gap < 0) {

                Animated.timing(
                    this.translate_y,
                    {
                        toValue: gap,
                        duration: keyboard_duration,
                        useNativeDriver: true
                    }
                ).start()
            }
        })
    }

    close = () => {
        this._animateRepeatEnd(this.props.hideAction, this.props.edit)
    }

    save = () => {
        let { selected_repeat_type,
            goal_value,
            repeat_input_value,
            after_occurrence_value,
            end_current_index,
            days_in_week_option_array,
            end_at_chosen_day,
            end_at_chosen_month,
            end_at_chosen_year } = this.state

        let end_value_data = {},
            repeat_value_data = {}

        if (end_current_index === 0) {
            end_value_data.type = "never"
        }
        else if (end_current_index === 1) {
            end_value_data.type = "on"
            end_value_data.endAt = new Date(end_at_chosen_year, end_at_chosen_month, end_at_chosen_day).getTime()
        }

        else {
            end_value_data.type = "after"
            end_value_data.occurrence = parseInt(after_occurrence_value)
        }

        if (selected_repeat_type === "day") {
            repeat_value_data.type = "daily"
            repeat_value_data.interval = {
                value: parseInt(repeat_input_value)
            }
        }

        else if (selected_repeat_type === "week") {
            repeat_value_data.type = "weekly"
            repeat_value_data.interval = {
                value: parseInt(repeat_input_value),
                daysInWeek: days_in_week_option_array
            }
        }

        else {
            repeat_value_data.type = "monthly"
            repeat_value_data.interval = {
                value: parseInt(repeat_input_value)
            }
        }

        let sending_data = {
            repeat_data: {
                keyPath: ["repeat"],
                notSetValue: {},
                updater: (value) => fromJS(repeat_value_data)
            },
            goal_data: {
                keyPath: ["goal", "max"],
                notSetValue: parseInt(goal_value),
                updater: (value) => parseInt(goal_value)
            },
            end_data: {
                keyPath: ["end"],
                notSetValue: {},
                updater: (value) => fromJS(end_value_data)
            }
        }

        if (this.props.edit) {
            this.props._editFieldData(sending_data.repeat_data.keyPath, sending_data.repeat_data.notSetValue, sending_data.repeat_data.updater)
            this.props._editFieldData(sending_data.goal_data.keyPath, sending_data.goal_data.notSetValue, sending_data.goal_data.updater)
            this.props._editFieldData(sending_data.end_data.keyPath, sending_data.end_data.notSetValue, sending_data.end_data.updater)
        }

        else {
            this.props.updateThunk(sending_data)
        }

        this.close()
    }

    _toggleDayInWeek = (index) => {
        let days_in_week_option_array = [... this.state.days_in_week_option_array]
        days_in_week_option_array[index] = !days_in_week_option_array[index]

        this.setState({
            days_in_week_option_array: [...days_in_week_option_array]
        })
    }

    initializeData = (task_data) => {
        if (task_data) {
            let current_task_map = Map(task_data),
                repeat_type = current_task_map.getIn(["repeat", "type"]),
                goal_value = current_task_map.getIn(["goal", "max"]).toString(),
                end_type = current_task_map.getIn(["end", "type"]),
                repeat_value = "1",
                days_in_week_option_array = [false, false, false, false, false, false, false],
                selected_repeat_type = "day",
                end_current_index = 0,
                end_at_chosen_day = this.date.getDate(),
                end_at_chosen_month = this.date.getMonth(),
                end_at_chosen_year = this.date.getFullYear(),
                after_occurrence_value = "1"


            if (repeat_type === "daily") {
                repeat_value = current_task_map.getIn(["repeat", "interval", "value"]).toString()
                selected_repeat_type = "day"


            }

            else if (repeat_type === "weekly") {
                repeat_value = current_task_map.getIn(["repeat", "interval", "value"]).toString()
                days_in_week_option_array = current_task_map.getIn(["repeat", "interval", "daysInWeek"])
                selected_repeat_type = "week"
            }

            else {
                selected_repeat_type = "month"
                repeat_value = current_task_map.getIn(["repeat", "interval", "value"]).toString()
            }

            if (end_type === "never") {
                end_current_index = 0
            }

            else if (end_type === "on") {
                let timestamp = current_task_map.getIn(["end", "endAt"]),
                    date = new Date(timestamp)

                end_at_chosen_day = date.getDate()
                end_at_chosen_month = date.getMonth()
                end_at_chosen_year = date.getFullYear()

                end_current_index = 1
            }

            else {
                after_occurrence_value = current_task_map.getIn(["end", "occurrence"]).toString()
                end_current_index = 2
            }

            this.chooseEndOption(end_current_index)

            this.setState({
                selected_repeat_type,
                repeat_input_value: repeat_value,
                goal_value,
                end_current_index,
                end_at_chosen_day,
                end_at_chosen_month,
                end_at_chosen_year,
                after_occurrence_value,
                days_in_week_option_array: [...days_in_week_option_array]
            })

        }
        else {
            return
        }
    }

    componentDidMount() {
        this.animateRepeat(this.props.edit)

        this._keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", this._keyboardWillHideHandler)
        this._keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", this._keyboardWillShowHandler)

        if (this.props.edit) {
            this.initializeData(this.props.edit_task_data)
        }

        else {
            this.initializeData(this.props.currentTask)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.should_call_end_animation_from_parent !== prevProps.should_call_end_animation_from_parent) {
            this.close()
        }
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillHide", this._keyboardWillHideHandler)
        Keyboard.removeListener("keyboardWillShow", this._keyboardWillShowHandler)
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: 338,
                    transform: [{ scale: this.repeat_scale_value }],
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: this.repeat_opacity_value,
                    overflow: "hidden",
                    paddingVertical: 5,
                }}
            >
                <Animated.View
                    style={{
                        transform: [{ translateY: this.translate_y }]
                    }}
                >
                    <ScrollView
                        keyboardDismissMode="on-drag"
                        scrollEnabled={false}
                    >

                        <RepeatValueHolder
                            repeat_input_value={this.state.repeat_input_value}
                            _onChangeRepeatInput={this._onChangeRepeatInput}
                            selected_repeat_type={this.state.selected_repeat_type}
                            _setRepeatType={this._setRepeatType}
                        />

                        <ChooseDayInWeekOption
                            selected_repeat_type={this.state.selected_repeat_type}
                            _toggleDayInWeek={this._toggleDayInWeek}
                            days_in_week_option_array={this.state.days_in_week_option_array}
                        />

                        {/* Separating line */}
                        <View
                            style={styles.separating_line}
                        >
                        </View>

                        <RepeatEndOptionsHolder
                            after_occurrence_value={this.state.after_occurrence_value}
                            _onChangeAfterOccurrenceValue={this._onChangeAfterOccurrenceValue}
                            current_index={this.state.end_current_index}
                            last_index={this.state.end_last_index}
                            chooseEndOption={this.chooseEndOption}

                            _setEndAtDayMonthYear={this._setEndAtDayMonthYear}
                            chosen_day={this.state.end_at_chosen_day}
                            chosen_month={this.state.end_at_chosen_month}
                            chosen_year={this.state.end_at_chosen_year}

                        />

                        {/* Separating line */}
                        <View
                            style={styles.separating_line}
                        >
                        </View>

                        <GoalHolder
                            goal_value={this.state.goal_value}
                            _onChangeGoalValue={this._onChangeGoalValue}
                        />

                        <View
                            style={{
                                marginTop: 30,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginHorizontal: 30,
                                marginBottom: margin_bottom_of_last_row,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.close_button_container}
                                onPress={this.close}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    color="white"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.save_button_container}
                                onPress={this.save}
                            >
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </Animated.View>
            </Animated.View >
        )
    }
}

class GoalHolder extends React.PureComponent {

    _onPress = () => {
        if (this._text_input_ref) {
            this._text_input_ref.focus()
        }
    }

    _setRef = (r) => {
        this._text_input_ref = r
    }


    render() {
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 30,
                        marginTop: 25,
                        alignItems: "center"
                    }}
                >
                    <FontAwesomeIcon
                        icon={faFlag}
                        color="#2C2C2C"
                        size={14}
                    />

                    <Text
                        style={styles.title_text}
                    >
                        Goal
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        marginTop: 25,
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 39,
                    }}


                    onPress={this._onPress}
                >
                    <TextInput
                        style={styles.every_option_input}
                        keyboardType="number-pad"
                        maxLength={2}
                        placeholder="1"
                        value={this.props.goal_value}
                        onChange={this.props._onChangeGoalValue}
                        ref={this._setRef}
                        autoCorrect={false}
                    />

                    <View
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        <Text
                            style={styles.every_option_text}
                        >
                            times per day
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}