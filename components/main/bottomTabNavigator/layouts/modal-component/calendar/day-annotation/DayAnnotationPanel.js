import React, { Component } from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableHighlight
} from 'react-native';

import DayCalendar from '../../../../../../shared/calendar/day-calendar/DayCalendar.Container'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

import { styles } from './styles/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class DayAnnotationPanel extends Component {
    chosen_day = -1
    chosen_month = -1
    chosen_year = -1

    state = {
        toggle_clear: false
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

    cancel = () => {
        this.props.disableAllTabs()
    }

    clear = () => {
        this.setState(prevState => ({
            toggle_clear: !prevState.toggle_clear
        }))

        let date = new Date()
        this.setData(date.getDate(), date.getMonth(), date.getFullYear())
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
            <View
                style={{
                    position: "relative"
                }}
            >
                {/* Main content of day calendar */}
                <DayCalendar
                    edit={false}
                    setData={this.setData}
                    toggle_clear={this.state.toggle_clear}
                />

                {/* <View
                    style={styles.separating_line}
                >
                </View> */}

                <TouchableOpacity
                    style={{
                        height: 50,
                        marginLeft: 15,
                        flexDirection: "row",
                        alignItems: "center"
                    }}

                    onPress={this._chooseRepeatOption}
                    underlayColor="gainsboro"
                >
                    <>
                        <FontAwesomeIcon
                            icon={faRedoAlt}
                            color="rgba(0, 0, 0, 0.3)"
                        />

                        <Text
                            style={{
                                marginLeft: 20
                            }}
                        >
                            Add repeat
                        </Text>
                    </>
                </TouchableOpacity>
                {/* <View
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

                        onPress={this.cancel}
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
                </View> */}
            </View>
        )
    }
}