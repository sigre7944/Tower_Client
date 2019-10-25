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
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import { styles } from './styles/styles'

import RepeatValueHolder from './repeat-value-holder/RepeatValueHolder'
import ChooseWeekNthInMonth from './choose-week-nth-in-month/ChooseWeekNthInMonth'

import RepeatEndOptionsHolder from './repeat-end-options-holder/RepeatEndOptionsHolder'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faFlag,
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

import { Map, fromJS } from 'immutable'

const animation_duration = 250
const easing = Easing.inOut(Easing.linear)
const window_width = Dimensions.get("window").width
const margin_bottom_of_last_row = 35

export default class WeekTypeRepeat extends React.PureComponent {

    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = new Animated.Value(0.3)
    date = new Date()

    state = {
        selected_repeat_type: "weeks",

        is_week_nth_option_selected: false,

        no_week_in_month: 1,

        repeat_input_value: "1",

        after_occurrence_value: "1",

        goal_value: "1",

        should_animate_translate_y: true,

        end_current_index: 0,

        end_last_index: -1,

        end_at_chosen_day: this.date.getDate().toString(),
        end_at_chosen_month: this.date.getMonth().toString(),
        end_at_chosen_year: this.date.getFullYear().toString(),
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

    _chooseWeekNthOptionRepeat = () => {
        this.setState({
            is_week_nth_option_selected: true
        })
    }

    _chooseEveryOptionRepeat = () => {
        this.setState({
            is_week_nth_option_selected: false
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

    animateRepeat = () => {
        Animated.parallel([
            Animated.timing(
                this.repeat_opacity_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.repeat_scale_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            )
        ]).start()
    }

    _dontAnimateRepeatWhenFocusInput = () => {
        this.setState({
            should_animate_translate_y: false
        })
    }

    _keyboardWillHideHandler = (e) => {
        this.setState({
            should_animate_translate_y: true
        })

        this._resetRepeatInput()
        this._resetAfterOccurrenceInput()
        this._resetGoalValueInput()
    }

    close = () => {
        this.props.hideAction()
    }

    save = () => {
        let { selected_repeat_type,
            goal_value,
            repeat_input_value,
            after_occurrence_value,
            end_current_index,
            end_at_chosen_day,
            end_at_chosen_month,
            end_at_chosen_year,
            no_week_in_month,
            is_week_nth_option_selected } = this.state

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
            end_value_data.occurrence = after_occurrence_value
        }

        if (is_week_nth_option_selected) {
            repeat_value_data.type = "weekly-nth"
            repeat_value_data.interval = {
                value: parseInt(no_week_in_month)
            }
        }

        else {
            if (selected_repeat_type === "weeks") {
                repeat_value_data.type = "weekly-w"
                repeat_value_data.interval = {
                    value: repeat_input_value
                }
            }

            else {
                repeat_value_data.type = "monthly"
                repeat_value_data.interval = {
                    value: repeat_input_value
                }
            }
        }


        let sending_data = {
            repeat_data: {
                keyPath: ["repeat"],
                notSetValue: fromJS(repeat_value_data),
                updater: (value) => fromJS(repeat_value_data)
            },
            goal_data: {
                keyPath: ["goal", "max"],
                notSetValue: goal_value,
                updater: (value) => goal_value
            },
            end_data: {
                keyPath: ["end"],
                notSetValue: fromJS(end_value_data),
                updater: (value) => fromJS(end_value_data)
            }
        }

        this.props.updateThunk(sending_data)

        this.props.hideAction()
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday_timestamp = this.getMonday(date).getTime()
        let first_monday_of_month_timestamp = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 1)).getTime()

        return Math.floor((nearest_monday_timestamp - first_monday_of_month_timestamp) / (7 * 86400 * 1000)) + 1
    }

    initializeData = () => {
        let current_task_map = Map(this.props.currentTask),
            repeat_type = current_task_map.getIn(["repeat", "type"]),
            goal_value = current_task_map.getIn(["goal", "max"]).toString(),
            end_type = current_task_map.getIn(["end", "type"]),
            repeat_value = "1",
            selected_repeat_type = "weeks",
            end_current_index = 0,
            end_at_chosen_day = this.date.getDate(),
            end_at_chosen_month = this.date.getMonth(),
            end_at_chosen_year = this.date.getFullYear(),
            after_occurrence_value = "1",
            is_week_nth_option_selected = false,
            no_week_in_month = parseInt(current_task_map.getIn(["schedule", "noWeekInMonth"]))

        if (no_week_in_month > 4) {
            no_week_in_month = 4
        }

        if (repeat_type === "weekly-w") {
            repeat_value = current_task_map.getIn(["repeat", "interval", "value"]).toString()
            selected_repeat_type = "weeks"
        }

        else if (repeat_type === "weekly-nth") {
            is_week_nth_option_selected = true
        }

        else {
            selected_repeat_type = "months"
            repeat_value = current_task_map.getIn(["repeat", "interval", "value"])
        }

        if (end_type === "never") {
            end_current_index = 0
        }

        else if (end_type === "on") {
            let timestamp = current_task_map.getIn(["end", "endAt"]),
                date = new Date(timestamp)

            end_at_chosen_day = date.getDate().toString()
            end_at_chosen_month = date.getMonth().toString()
            end_at_chosen_year = date.getFullYear().toString()

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
            is_week_nth_option_selected,
            no_week_in_month
        })
    }

    componentDidMount() {
        this.animateRepeat()

        this._keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", this._keyboardWillHideHandler)

        this.initializeData()
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillHide", this._keyboardWillHideHandler)
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
                    overflow: "hidden"
                }}
            >
                <KeyboardAvoidingView
                    behavior={"position"}
                    enabled={this.state.should_animate_translate_y}
                >
                    <ScrollView
                        keyboardDismissMode="on-drag"
                        scrollEnabled={false}
                    >

                        <RepeatValueHolder
                            repeat_input_value={this.state.repeat_input_value}
                            _onChangeRepeatInput={this._onChangeRepeatInput}
                            _dontAnimateRepeatWhenFocusInput={this._dontAnimateRepeatWhenFocusInput}
                            selected_repeat_type={this.state.selected_repeat_type}
                            _setRepeatType={this._setRepeatType}

                            is_week_nth_option_selected={this.state.is_week_nth_option_selected}
                            _chooseEveryOptionRepeat={this._chooseEveryOptionRepeat}
                        />

                        <ChooseWeekNthInMonth
                            is_week_nth_option_selected={this.state.is_week_nth_option_selected}
                            _chooseWeekNthOptionRepeat={this._chooseWeekNthOptionRepeat}
                            no_week_in_month={this.state.no_week_in_month}
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
                </KeyboardAvoidingView>

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
                        keyboardType="numbers-and-punctuation"
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