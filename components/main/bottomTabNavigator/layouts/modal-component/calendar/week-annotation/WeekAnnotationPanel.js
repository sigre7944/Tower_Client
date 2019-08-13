import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import WeekCalendar from '../../../../../../shared/calendar/week-calendar/WeekCalendar.Container'

export default class WeekAnnotationPanel extends Component {

    chosen_noWeekInMonth = chosen_day = chosen_week = chosen_month = chosen_year = -1

    state = {

    }

    _chooseRepeatOption = () => {
        this.props.chooseRepeatOption()
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
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000)).getDate()
    }

    getNoWeekInMonth = (date) => {
        let nearest_monday = this.getMonday(date)
        let first_moday_of_month = this.getMonday(new Date(date.getFullYear(), date.getMonth(), 7))

        return Math.floor((nearest_monday - first_moday_of_month) / 7) + 1
    }

    save = () => {

        if (this.chosen_day > 0 && this.chosen_week > 0 && this.chosen_month > 0 && this.chosen_year > 0) {
            let current = new Date()

            if (this.chosen_day < current.getDate() && this.chosen_month === current.getMonth() && this.chosen_year === current.getFullYear()) {
                this._updateTask(this.getMonday(current), this.getWeek(current), this.chosen_month, this.chosen_year, this.getNoWeekInMonth(current))
            }

            else {
                this._updateTask(this.chosen_day, this.chosen_week, this.chosen_month, this.chosen_year, this.chosen_noWeekInMonth)
            }
        }
        this.props.disableAllTabs()
    }

    setData = (day, week, month, year, noWeekInMonth) => {
        this.chosen_day = day
        this.chosen_week = week
        this.chosen_month = month
        this.chosen_year = year
        this.chosen_noWeekInMonth = noWeekInMonth
    }

    _updateTask = (day, week, month, year, noWeekInMonth) => {
        let startTime = trackingTime = new Date(
            new Date(
                new Date(
                    new Date().setDate(day)).setMonth(month)).setFullYear(year))
            .getTime()

        this.props.updateTask({
            startTime,
            trackingTime,
            schedule: {
                noWeekInMonth,
                day,
                week,
                month,
                year,
            }
        })
    }

    render() {
        return (
            <>

                <WeekCalendar
                    edit={false}
                    setData={this.setData}
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

class DayInWeekHolder extends React.PureComponent {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        color: "gray",
                    }}
                >
                    {this.props.day}
                </Text>
            </View>
        )
    }
}