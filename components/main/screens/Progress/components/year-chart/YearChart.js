import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { StackedBarChart, YAxis } from 'react-native-svg-charts'
import { Map, List } from 'immutable'

export default class MonthChart extends React.PureComponent {

    y_data = []
    y_max = 0
    number_of_ticks = 0
    colors = ['#C4C4C4', '#ADB0B3', '#8B9199', '#000000']
    keys = ['pri_04', 'pri_03', 'pri_02', 'pri_01']

    month_texts = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    state = {
        chart_data: [],

        should_update: 0
    }

    initChartData = () => {
        let chart_data = []

        for (let i = 0; i < 11; i++) {
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
        let year_timestamp = this.props.current_chosen_year,
            year_chart_stats_map = Map(this.props.year_chart_stats),
            chart_data = [...this.state.chart_data],
            total_array = []

        if (year_chart_stats_map.has(year_timestamp)) {
            let data = Map(year_chart_stats_map.get(year_timestamp))

            for (let i = 0; i < 11; i++) {
                if (data.has(i)) {
                    let current = List(data.getIn([i.toString(), "current"]))
                    chart_data[i] = {
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
        if (this.props.year_chart_stats !== prevProps.year_chart_stats) {
            this.updateChartData()
        }

        if (this.props.current_chosen_year !== prevProps.current_chosen_year) {
            this.setState({
                chart_data: []
            }, () => { this.initChartData() })
        }
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        marginTop: 17,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <Text>
                        {this.props.current_chosen_year}
                    </Text>
                </View>

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
                    <XAxis />
                </View>
            </View>
        )
    }
}

class XAxis extends React.PureComponent {
    short_month_texts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    render() {
        let month_array = []

        for (let i = 0; i < 11; i++) {
            month_array.push(
                <XAxisMonthTextHolder
                    key={`x-axis-month-text-${i}`}
                    text={`${this.short_month_texts[i]}`}
                />
            )

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
                {month_array}
            </View>
        )
    }
}

class XAxisMonthTextHolder extends React.PureComponent {

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
                    {this.props.text}
                </Text>
            </View>
        )
    }
}