import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import { StackedBarChart, YAxis } from 'react-native-svg-charts'
import MonthAnnotationCalendar from './month-anno-calendar/MonthAnnotationCalendar'
import { Map, List } from 'immutable'

export default class MonthChart extends React.PureComponent {

    y_data = []
    y_max = 0
    number_of_ticks = 0
    colors = ['#C4C4C4', '#ADB0B3', '#8B9199', '#000000']
    keys = ['pri_04', 'pri_03', 'pri_02', 'pri_01']

    month_texts = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    state = {
        calendar_chosen_bool: false,
        chart_data: [],

        should_update: 0
    }

    chooseMonth = (month, year) => {
        this.props.setMonthAnnoYearData(month, year)
        this.props.setMonthAnnoText(month, year)
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

    initChartData = () => {
        let { month, year } = this.props.current_chosen_month_data,
            last_day_of_month = new Date(year, month + 1, 0).getDate(),
            chart_data = []

        for (let i = 0; i < last_day_of_month; i++) {
            chart_data.push({
                pri_04: 0,
                pri_03: 0,
                pri_02: 0,
                pri_01: 0,
            })
        }

        this.setState({
            chart_data: [...chart_data]
        }, () => { setTimeout(this.updateChartData, 10) })
    }

    updateChartData = () => {
        let { month, year } = this.props.current_chosen_month_data,
            month_timestamp = new Date(year, month).getTime(),
            last_day_of_month = new Date(year, month + 1, 0).getDate(),
            month_chart_stats_map = Map(this.props.month_chart_stats),
            chart_data = [...this.state.chart_data],
            total_array = []

        if (month_chart_stats_map.has(month_timestamp)) {
            let data = Map(month_chart_stats_map.get(month_timestamp))

            for (let i = 1; i <= last_day_of_month; i++) {

                if (data.has(i.toString())) {
                    let current = List(data.getIn([i.toString(), "current"]))

                    chart_data[i - 1] = {
                        pri_04: current.get(3),
                        pri_03: current.get(2),
                        pri_02: current.get(1),
                        pri_01: current.get(0),
                    }

                    total_array.push(this.getTotal(current))
                }
            }
        }

        this.y_max = this.getMax(total_array)

        this.updateYDataAndChartData(chart_data)

        this.setState({
            chart_data: [...chart_data]
        })
    }

    getMax = (data) => {
        data.sort((a, b) => a - b)
        return data[data.length - 1]
    }

    getTotal = (array) => {
        return array.reduce((total, num) => total + num, 0)
    }

    updateYDataAndChartData = (chart_data) => {
        let closet_max = 0,
            diff_with_ten = this.y_max % 10

        closet_max = this.y_max + (10 - diff_with_ten)


        if (this.y_max <= 5) {
            this.number_of_ticks = this.y_max
        }

        else {
            this.number_of_ticks = 4
        }


        this.y_data = [0, this.y_max]
    }

    componentDidMount() {
        this.setState({
            chart_data: []
        }, () => { this.initChartData() })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.month_chart_stats !== prevProps.month_chart_stats) {
            this.updateChartData()
        }

        if (this.props.current_chosen_month_data !== prevProps.current_chosen_month_data) {
            this.setState({
                chart_data: []
            }, () => { this.initChartData() })
        }
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
                        {this.props.month_anno_current_time_text}
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

                            <MonthAnnotationCalendar
                                year_array={this.props.year_array}
                                chooseMonth={this.chooseMonth}
                                dismissCalendar={this.dismissCalendar}
                            />
                        </View>
                    </Modal>

                    :

                    null
                }

                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            height: 200,
                        }}
                    >
                        <YAxis
                            data={this.y_data}
                            contentInset={{
                                top: 7,
                                bottom: 5,
                            }}
                            numberOfTicks={this.number_of_ticks}
                            style={{
                                width: 50,
                                borderRightWidth: 1,
                                borderColor: "black",
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
                    <XAxis
                        current_chosen_month_data={this.props.current_chosen_month_data}
                    />
                </View>
            </View>
        )
    }
}

class XAxis extends React.PureComponent {

    render() {
        let number_of_days_in_month = new Date(this.props.current_chosen_month_data.year, this.props.current_chosen_month_data.month + 1, 0).getDate(),
            day_array = []

        for (let i = 1; i <= number_of_days_in_month; i++) {
            if (i === 1 || i === 5 || i === 10 || i === 15 || i === 20 || i === 25 || i === number_of_days_in_month) {
                day_array.push(
                    <XAxisDayTextHolder
                        key={`x-axis-day-text-${i}`}
                        day_text={i}
                    />
                )
            }

            else {
                day_array.push(
                    <XAxisDayTextHolder
                        key={`x-axis-day-text-${i}`}
                    />
                )
            }
        }
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
                {day_array}
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
                        fontSize: 9
                    }}
                >
                    {this.props.day_text}
                </Text>
            </View>
        )
    }
}