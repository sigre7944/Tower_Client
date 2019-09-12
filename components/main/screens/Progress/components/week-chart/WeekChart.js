import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import { StackedBarChart, YAxis} from 'react-native-svg-charts'
import { Map } from 'immutable'
import WeekAnnotationCalendar from './week-anno-calendar/WeekAnnotationCalendar'

export default class WeekChart extends React.PureComponent {
    short_day_text = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    x_data = [1, 2, 3, 4, 5, 6, 0]
    y_data = []
    number_of_ticks = 0
    y_max = 0

    colors = ['#C4C4C4', '#ADB0B3', '#8B9199', '#000000']
    keys = ['pri_04', 'pri_03', 'pri_02', 'pri_01']

    month_texts = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    state = {
        calendar_chosen_bool: false,
        chart_data: []
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
        this.props.setWeekAnnoMonthYearData(f_day, f_month, f_year)
        this.props.setWeekAnnoText(f_day, f_month, f_year, l_day, l_month, l_year)
    }

    updateChartData = () => {
        let { day, month, year } = this.props.current_chosen_week_data,
            week_timestamp = new Date(year, month, day).getTime(),
            week_chart_stats_map = Map(this.props.week_chart_stats),
            chart_data = [],
            total_array = []

        for (let i = 0; i < 7; i++) {
            chart_data.push({
                pri_04: 0,
                pri_03: 0,
                pri_02: 0,
                pri_01: 0,
            })
        }

        if (week_chart_stats_map.has(week_timestamp)) {
            let data = week_chart_stats_map.get(week_timestamp)

            for (let i = 0; i < 7; i++) {
                let index = 0
                if (i === 6) {
                    index = 0
                }
                else {
                    index = i + 1
                }
                if (data.hasOwnProperty(index)) {
                    let current = [...data[index].current]
                    chart_data[index] = {
                        pri_04: current[3],
                        pri_03: current[2],
                        pri_02: current[1],
                        pri_01: current[0],
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
        this.setState({
            chart_data: [...chart_data]
        })
    }

    _formatLabelX = (value, index) => `${this.short_day_text[value]}`

    componentDidMount() {
        this.updateChartData()
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.current_chosen_week_data !== prevProps.current_chosen_week_data)
            || (this.props.week_chart_stats !== prevProps.week_chart_stats)) {
            this.updateChartData()
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
                        {this.props.week_anno_current_time_text}
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
                            showGrid={true}
                            animate={true}
                            contentInset={{
                                top: 7,
                                bottom: 0,
                            }}
                            svg={{
                                strokeOpacity: 0.5,
                                strokeWidth: 3,
                                scale: 0.5
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

class XAxis extends React.PureComponent{

    render(){
        return(
            <View
                style={{
                    flexDirection: "row",
                    marginLeft: 50,
                    height: 50,
                    borderTopWidth: 1,
                    borderColor: "black",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Mon
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Tue
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Wed
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Thu
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Fri
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Sat
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Sun
                    </Text>
                </View>
            </View>
        )
    }
}