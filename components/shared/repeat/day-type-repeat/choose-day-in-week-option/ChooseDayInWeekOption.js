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
                />
                <DayInWeekOptionHolder
                    index={1}
                    day_in_week={"Tue"}
                />
                <DayInWeekOptionHolder
                    index={2}
                    day_in_week={"Wed"}
                />
                <DayInWeekOptionHolder
                    index={3}
                    day_in_week={"Thu"}
                />
                <DayInWeekOptionHolder
                    index={4}
                    day_in_week={"Fri"}
                />
                <DayInWeekOptionHolder
                    index={5}
                    day_in_week={"Sat"}
                />
                <DayInWeekOptionHolder
                    index={6}
                    day_in_week={"Sun"}
                />
            </View>
        )
    }
}

class DayInWeekOptionHolder extends React.PureComponent {

    handleIndex = (index) => {
        if (index === 0) {
            return styles.unchosen_left_end_day_in_week_container
        }

        else if (index === 6) {
            return styles.unchosen_right_end_day_in_week_container
        }
        else {
            return styles.unchosen_normal_day_in_week_container
        }
    }

    state = {
        container_style: this.handleIndex(this.props.index),
        text_style: styles.unchosen_day_in_week_text,

        is_chosen: false,
    }

    _onChooseDayInWeek = () => {
        let { index } = this.props

        this.setState(prevState => ({
            is_chosen: !prevState.is_chosen
        }), () => {
            if (this.state.is_chosen) {
                if (index === 0) {
                    this.setState({
                        container_style: styles.chosen_left_end_day_in_week_container,
                        text_style: styles.chosen_day_in_week_text
                    })
                }

                else if (index === 6) {
                    this.setState({
                        container_style: styles.chosen_right_end_day_in_week_container,
                        text_style: styles.chosen_day_in_week_text
                    })
                }

                else {
                    this.setState({
                        container_style: styles.chosen_normal_day_in_week_container,
                        text_style: styles.chosen_day_in_week_text
                    })
                }
            }

            else {
                if (index === 0) {
                    this.setState({
                        container_style: styles.unchosen_left_end_day_in_week_container,
                        text_style: styles.unchosen_day_in_week_text
                    })
                }

                else if (index === 6) {
                    this.setState({
                        container_style: styles.unchosen_right_end_day_in_week_container,
                        text_style: styles.unchosen_day_in_week_text
                    })
                }

                else {
                    this.setState({
                        container_style: styles.unchosen_normal_day_in_week_container,
                        text_style: styles.unchosen_day_in_week_text
                    })
                }
            }
        })

    }

    render() {
        return (
            <>
                {this.props.index === 0 ?
                    <TouchableOpacity
                        style={this.state.container_style}
                        onPress={this._onChooseDayInWeek}
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