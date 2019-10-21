import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight
} from 'react-native';

import MonthCalendar from '../../../../../../shared/calendar/month-calendar/MonthCalendar.Container'

export default class MonthAnnotationPanel extends Component {

    chosen_month = chosen_year = -1

    state = {
        toggle_clear: false
    }

    _chooseRepeatOption = () => {
        this.props.chooseRepeatOption()
    }

    save = () => {
        if (this.chosen_month > 0 && this.chosen_year > 0) {
            if (this.chosen_month < new Date().getMonth() && this.chosen_year === new Date().getFullYear())
                this._updateTask(new Date().getMonth(), this.chosen_year)

            else
                this._updateTask(this.chosen_month, this.chosen_year)
        }
        this.props.disableAllTabs()
    }

    clear = () => {
        this.setState(prevState => ({
            toggle_clear: !prevState.toggle_clear
        }))

        let date = new Date()
        this.setData(date.getMonth(), date.getFullYear())
    }

    setData = (month, year) => {
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateTask = (month, year) => {
        let startTime = trackingTime = new Date(
            new Date(
                new Date(
                    new Date().setDate(1)).setMonth(month)).setFullYear(year))
            .getTime()

        this.props.updateTask({
            startTime,
            trackingTime,
            schedule: {
                month,
                year,
            }
        })
    }

    render() {
        return (
            <>
                <MonthCalendar
                    edit={false}
                    setData={this.setData}
                    toggle_clear={this.state.toggle_clear}
                />

                {/* Add Repeat */}
                <TouchableHighlight
                    style={{
                        height: 40,
                        backgroundColor: "white",
                        justifyContent: "center",
                        borderTopWidth: 1,
                        borderTopColor: 'gainsboro',
                    }}

                    onPress={this._chooseRepeatOption}
                    underlayColor="gainsboro"
                >
                    <Text>
                        Add repeat
                    </Text>
                </TouchableHighlight>
                <View
                    style={{
                        height: 60,
                        marginBottom: 10,
                        backgroundColor: 'white',
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: 'center'
                    }}
                >
                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}

                        onPress={this.clear}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            Clear
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            X
                    </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 10
                        }}

                        onPress={this.save}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            OK
                    </Text>
                    </TouchableHighlight>
                </View>
            </>
        )
    }
}