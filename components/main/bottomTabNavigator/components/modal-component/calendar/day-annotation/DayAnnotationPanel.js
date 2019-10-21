import React, { Component } from 'react'

import {
    View,
    Text,
    FlatList,
    Animated,
    Easing,
} from 'react-native';

import DayCalendar from '../../../../../screens/Journal/components/share/day-calendar/DayCalendar.Container'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faRedoAlt,
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

import { styles } from './styles/styles'
import { TouchableOpacity } from 'react-native-gesture-handler';

const panel_width = 338
const day_calendar_height = 572
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)

export default class DayAnnotationPanel extends Component {
    chosen_day = -1
    chosen_month = -1
    chosen_year = -1

    calendar_scale_value = new Animated.Value(0.3)
    calendar_opacity_value = new Animated.Value(0.3)

    _chooseRepeatOption = () => {
        this.props.chooseRepeatOption()
    }

    save = () => {
        let date = new Date()

        if (this.chosen_day > 0 && this.chosen_month > 0 && this.chosen_year > 0) {
            if (this.chosen_day < date.getDate() && this.chosen_month === date.getMonth() && this.chosen_year === date.getFullYear())
                this._updateTask(date.getDate(), this.chosen_month, this.chosen_year)

            else
                this._updateTask(this.chosen_day, this.chosen_month, this.chosen_year)
        }

        this.props.disableAllTabs()
    }

    cancel = () => {
        this.props.disableAllTabs()
    }

    setData = (day, month, year) => {
        this.chosen_day = day
        this.chosen_month = month
        this.chosen_year = year
    }

    _updateTask = (day, month, year) => {
        this.props.updateTaskSchedule({
            type: "UPDATE_NEW_DAY_TASK",
            day,
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
                    // height: day_calendar_height,
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
                    <DayCalendar
                        edit={false}
                        setData={this.setData}
                    />

                    <View
                        style={styles.separating_line}
                    >
                    </View>

                    <View
                        style={{
                            marginHorizontal: 15,
                            marginTop: 15,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}

                            onPress={this._chooseRepeatOption}
                        >
                            <>
                                <FontAwesomeIcon
                                    icon={faRedoAlt}
                                    color="rgba(0, 0, 0, 0.3)"
                                />

                                <Text
                                    style={styles.option_text}
                                >
                                    Add repeat
                            </Text>
                            </>
                        </TouchableOpacity>
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