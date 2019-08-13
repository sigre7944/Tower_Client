import React, { Component } from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableHighlight
} from 'react-native';

import DayCalendar from '../../../../../../shared/calendar/day-calendar/DayCalendar.Container'
// Need to optimize DayAnnotationPanel component and its child components
export default class DayAnnotationPanel extends Component {
    chosen_day = -1
    chosen_month = -1
    chosen_year = -1

    state = {
    }

    _chooseRepeatOption = () => {
        this.props.chooseRepeatOption()
    }

    save = () => {
        if (this.chosen_day > 0 && this.chosen_month > 0 && this.chosen_year > 0) {
            if (this.chosen_day < new Date().getDate() && this.chosen_month === new Date().getMonth() && this.chosen_year === new Date().getFullYear())
                this._updateTask(new Date().getDate(), this.chosen_month, this.chosen_year)

            else
                this._updateTask(this.chosen_day, this.chosen_month, this.chosen_year)
        }

        this.props.disableAllTabs()
    }

    setData = (day, month, year) => {
        this.chosen_day = day
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateTask = (day, month, year) => {
        let startTime = trackingTime = new Date(new Date(new Date((new Date().setMonth(month))).setDate(day)).setFullYear(year)).getTime()

        this.props.updateTask({
            startTime,
            trackingTime,
            schedule: {
                day,
                month,
                year,
            }
        })
    }


    render() {
        return (
            <>

                {/* Main content of day calendar */}
                <DayCalendar
                    edit={false}
                    setData={this.setData}
                />
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