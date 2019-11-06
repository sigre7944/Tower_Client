import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    DatePickerIOS,
    Keyboard,
    Modal,
    Picker,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    Easing,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import { styles } from './styles/styles'

export default class ChooseDayInWeekOption extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    marginTop: 25,
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: 30,
                }}
            >
                <DayInWeekOptionHolder
                    index={0}
                    day_in_week={"Mon"}
                    selected_repeat_type={this.props.selected_repeat_type}
                    is_toggled={this.props.days_in_week_option_array[0]}
                    _toggleDayInWeek={this.props._toggleDayInWeek}
                />
                <DayInWeekOptionHolder
                    index={1}
                    day_in_week={"Tue"}
                    selected_repeat_type={this.props.selected_repeat_type}
                    is_toggled={this.props.days_in_week_option_array[1]}
                    _toggleDayInWeek={this.props._toggleDayInWeek}
                />
                <DayInWeekOptionHolder
                    index={2}
                    day_in_week={"Wed"}
                    selected_repeat_type={this.props.selected_repeat_type}
                    is_toggled={this.props.days_in_week_option_array[2]}
                    _toggleDayInWeek={this.props._toggleDayInWeek}
                />
                <DayInWeekOptionHolder
                    index={3}
                    day_in_week={"Thu"}
                    selected_repeat_type={this.props.selected_repeat_type}
                    is_toggled={this.props.days_in_week_option_array[3]}
                    _toggleDayInWeek={this.props._toggleDayInWeek}
                />
                <DayInWeekOptionHolder
                    index={4}
                    day_in_week={"Fri"}
                    selected_repeat_type={this.props.selected_repeat_type}
                    is_toggled={this.props.days_in_week_option_array[4]}
                    _toggleDayInWeek={this.props._toggleDayInWeek}
                />
                <DayInWeekOptionHolder
                    index={5}
                    day_in_week={"Sat"}
                    selected_repeat_type={this.props.selected_repeat_type}
                    is_toggled={this.props.days_in_week_option_array[5]}
                    _toggleDayInWeek={this.props._toggleDayInWeek}
                />
                <DayInWeekOptionHolder
                    index={6}
                    day_in_week={"Sun"}
                    selected_repeat_type={this.props.selected_repeat_type}
                    is_toggled={this.props.days_in_week_option_array[6]}
                    _toggleDayInWeek={this.props._toggleDayInWeek}
                />
            </View>
        )
    }
}

class DayInWeekOptionHolder extends React.PureComponent {

    state = {
        container_style: {},
        text_style: styles.unchosen_day_in_week_text,

        disabled: false
    }

    _onChooseDayInWeek = () => {
        this.props._toggleDayInWeek(this.props.index)
    }

    _compareToggledIndex = () => {
        let { index, is_toggled } = this.props

        if (is_toggled) {
            if (index === 0) {
                this.setState({
                    container_style: styles.chosen_left_end_day_in_week_container,
                    text_style: styles.chosen_day_in_week_text,
                    disabled: false
                })
            }

            else if (index === 6) {
                this.setState({
                    container_style: styles.chosen_right_end_day_in_week_container,
                    text_style: styles.chosen_day_in_week_text,
                    disabled: false
                })
            }

            else {
                this.setState({
                    container_style: styles.chosen_normal_day_in_week_container,
                    text_style: styles.chosen_day_in_week_text,
                    disabled: false
                })
            }
        }

        else {
            if (index === 0) {
                this.setState({
                    container_style: styles.unchosen_left_end_day_in_week_container,
                    text_style: styles.unchosen_day_in_week_text,
                    disabled: false
                })
            }

            else if (index === 6) {
                this.setState({
                    container_style: styles.unchosen_right_end_day_in_week_container,
                    text_style: styles.unchosen_day_in_week_text,
                    disabled: false
                })
            }

            else {
                this.setState({
                    container_style: styles.unchosen_normal_day_in_week_container,
                    text_style: styles.unchosen_day_in_week_text,
                    disabled: false
                })
            }
        }
    }

    _deactiveStyle = () => {
        let { index } = this.props

        if (index === 0) {
            this.setState({
                container_style: styles.deactivated_left_end_day_in_week_container,
                text_style: styles.deactivated_day_in_week_text,
                disabled: true
            })
        }

        else if (index === 6) {
            this.setState({
                container_style: styles.deactivated_right_end_day_in_week_container,
                text_style: styles.deactivated_day_in_week_text,
                disabled: true
            })
        }

        else {
            this.setState({
                container_style: styles.deactivated_normal_end_day_in_week_container,
                text_style: styles.deactivated_day_in_week_text,
                disabled: true
            })
        }
    }

    componentDidMount() {
        if (this.props.selected_repeat_type === "week") {
            this._compareToggledIndex()
        }

        else {

            this._deactiveStyle()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selected_repeat_type !== prevState.selected_repeat_type) {
            if (this.props.selected_repeat_type === "week") {
                this._compareToggledIndex()
            }

            else {

                this._deactiveStyle()
            }
        }

        if (this.props.is_toggled !== prevProps.is_toggled && this.props.selected_repeat_type === "week") {
            this._compareToggledIndex()
        }
    }

    render() {
        return (
            <>
                {this.props.index === 0 ?
                    <TouchableOpacity
                        style={this.state.container_style}
                        onPress={this._onChooseDayInWeek}
                        disabled={this.state.disabled}
                    >
                        <Text
                            style={this.state.text_style}
                        >
                            {this.props.day_in_week}
                        </Text>
                    </TouchableOpacity>

                    :

                    <>
                        {this.props.index === 6 ?
                            <TouchableOpacity
                                style={this.state.container_style}
                                onPress={this._onChooseDayInWeek}
                                disabled={this.state.disabled}
                            >
                                <Text
                                    style={this.state.text_style}
                                >
                                    {this.props.day_in_week}
                                </Text>
                            </TouchableOpacity>
                            :

                            <TouchableOpacity
                                style={this.state.container_style}
                                onPress={this._onChooseDayInWeek}
                                disabled={this.state.disabled}
                            >
                                <Text
                                    style={this.state.text_style}
                                >
                                    {this.props.day_in_week}
                                </Text>
                            </TouchableOpacity>
                        }
                    </>
                }
            </>
        )
    }
}