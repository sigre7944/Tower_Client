import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    TouchableWithoutFeedback,
    Modal,
    Dimensions
} from 'react-native';
import { StackedBarChart, YAxis } from 'react-native-svg-charts'
import { Map, List } from 'immutable'
import { styles } from './styles/styles'

import WeekCalendar from "./week-calendar/WeekCalendar";

const window_width = Dimensions.get("window").width

export default class WeekChartHolder extends React.PureComponent {

    state = {
        chart_data: [],
        should_active_calendar: false
    }

    _toggleCalendar = () => {
        this.setState(prevState => ({
            should_active_calendar: !prevState.should_active_calendar
        }))
    }

    _setCalendarData = (monday, sunday, week, start_month, end_month, month, start_year, end_year, year, start_noWeekInMonth, end_noWeekInMonth) => {

    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={this._toggleCalendar}
                >
                    <Text
                        style={styles.chosen_week_text}
                    >
                        May 5 - May 11
                    </Text>
                </TouchableOpacity>

                {this.state.should_active_calendar ?
                    <Modal
                        transparent={true}
                    >
                        <View
                            style={{
                                flex: 1,
                                position: "relative",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <TouchableWithoutFeedback
                                onPress={this._toggleCalendar}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        width: window_width,
                                        backgroundColor: "black",
                                        opacity: 0.2
                                    }}
                                >

                                </View>
                            </TouchableWithoutFeedback>

                            <WeekCalendar
                                hideAction={this._toggleCalendar}
                                _setCalendarData={this._setCalendarData}
                            />
                        </View>
                    </Modal>

                    :

                    null
                }

                {/* <View
                    style={{
                        marginTop: 30,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            height: 200,
                        }}
                    >
                        <YAxis
                            style={{
                                width: 50,
                                borderRightWidth: 1,
                                borderColor: "black",
                            }}
                            data={this.y_data}
                            numberOfTicks={this.number_of_ticks}
                            contentInset={{
                                top: 7,
                                bottom: 5,
                            }}
                        />
                        <StackedBarChart
                            style={{
                                flex: 1,
                            }}
                            keys={this.keys}
                            colors={this.colors}
                            data={this.state.chart_data}
                            animate={true}
                            animationDuration={500}
                            contentInset={{
                                top: 7,
                                bottom: 0,
                            }}
                            spacingInner={0.05}
                        />
                    </View>
                    <XAxis />
                </View> */}
            </View>
        )
    }
}

class XAxis extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginLeft: 50,
                    height: 50,
                    borderTopWidth: 1,
                    borderColor: "black",
                }}
            >
                <XAxisDayTextHolder
                    day_text="Mon"
                />
                <XAxisDayTextHolder
                    day_text="Tue"
                />
                <XAxisDayTextHolder
                    day_text="Wed"
                />
                <XAxisDayTextHolder
                    day_text="Thu"
                />
                <XAxisDayTextHolder
                    day_text="Fri"
                />
                <XAxisDayTextHolder
                    day_text="Sat"
                />
                <XAxisDayTextHolder
                    day_text="Sun"
                />
            </View>
        )
    }
}

class XAxisDayTextHolder extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontSize: 11
                    }}
                >
                    {this.props.day_text}
                </Text>
            </View>
        )
    }
}