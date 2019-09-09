import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';

import WeekAnnotationCalendar from './week-anno-calendar/WeekAnnotationCalendar'

export default class WeekChart extends React.PureComponent {

    month_texts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        calendar_chosen_bool: false,
        week_anno_current_time_text: ""
    }

    chooseCalendar = () => {
        this.setState({
            calendar_chosen_bool: true
        })
    }

    dismissCalendar = () => {
        this.setState({
            calendar_chosen_bool: false
        })
    }

    chooseWeek = (f_day, f_month, f_year, l_day, l_month, l_year) => {
        this.props.setWeekAnnoMonthYearData(f_month, f_year)

        this.setState({
            week_anno_current_time_text: `${this.month_texts[f_month]} ${f_day} ${f_year} - ${this.month_texts[l_month]} ${l_day} ${l_year}`
        })
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
        return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
    }

    getSunday = (date) => {
        let dayInWeek = new Date(date).getDay()
        let diff = (7 - dayInWeek) === 7 ? 0 : 7 - dayInWeek
        return new Date(new Date(date).getTime() + (diff * 86400 * 1000))
    }

    componentDidMount() {
        let current = new Date(),
            monday = this.getMonday(current),
            sunday = this.getSunday(current)

        this.setState({
            week_anno_current_time_text: `${this.month_texts[monday.getMonth()]} ${monday.getDate()} ${monday.getFullYear()} - ${this.month_texts[sunday.getMonth()]} ${sunday.getDate()} ${sunday.getFullYear()}`
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        marginTop: 17,
                        justifyContent: "center",
                        alignItems: "center"
                    }}

                    onPress={this.chooseCalendar}
                >
                    <Text>
                        {this.state.week_anno_current_time_text}
                    </Text>
                </TouchableOpacity>

                {this.state.calendar_chosen_bool ?
                    <Modal
                        transparent={true}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    width: Dimensions.get("window").width,
                                    backgroundColor: "black",
                                    opacity: 0.5
                                }}

                                onPress={this.dismissCalendar}
                            >
                            </TouchableOpacity>

                            <WeekAnnotationCalendar
                                month_array={this.props.month_array}
                                year_array={this.props.year_array}
                                chooseWeek={this.chooseWeek}
                                dismissCalendar={this.dismissCalendar}
                            />
                        </View>
                    </Modal>

                    :

                    null
                }
            </View>
        )
    }
}