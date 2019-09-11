import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import { StackedBarChart, XAxis, YAxis } from 'react-native-svg-charts'
import { Map } from 'immutable'
import WeekAnnotationCalendar from './week-anno-calendar/WeekAnnotationCalendar'

export default class WeekChart extends React.PureComponent {
    // data = [
    //     {
    //         month: 1000,
    //         apples: 3840,
    //         bananas: 1920,
    //         cherries: 960,
    //         dates: 400,
    //         oranges: 400,
    //     },
    //     {
    //         month: 1000,
    //         apples: 1600,
    //         bananas: 1440,
    //         cherries: 960,
    //         dates: 400,
    //     },
    //     {
    //         month: 1000,
    //         apples: 640,
    //         bananas: 960,
    //         cherries: 3640,
    //         dates: 400,
    //     },
    //     {
    //         month: 1000,
    //         apples: 3320,
    //         bananas: 480,
    //         cherries: 640,
    //         dates: 400,
    //     },
    // ]

    x_data = [0, 1, 2, 3]
    y_data = [10, 11]

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
            chart_data = []

        for (let i = 0; i < 7; i++) {
            chart_data.push({
                pri_04: 1,
                pri_03: 1,
                pri_02: 1,
                pri_01: 1,
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
                    let { current } = data[index]
                    chart_data[index] = {
                        pri_04: current[3],
                        pri_03: current[2],
                        pri_02: current[1],
                        pri_01: current[0],
                    }
                }
            }
        }

        this.setState({
            chart_data: [...chart_data]
        })
    }

    componentDidMount() {
        this.updateChartData()
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.current_chosen_week_data !== prevProps.current_chosen_week_data)
            || (this.props.week_chart_stats !== prevProps.week_chart_stats)) {
            this.updateChartData()
        }

        if(this.props.month_chart_stats !== prevProps.month_chart_stats){
        }

        if(this.props.year_chart_stats !== prevProps.year_chart_stats){
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
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                        }}
                    >
                        {/* <YAxis
              data={this.y_data}
              contentInset={{
                top: 20,
                bottom: 20,
              }}
              numberOfTicks={3}
              style={{
                width: 30,
              }}
            /> */}
                        <StackedBarChart
                            style={{
                                height: 200,
                                flex: 1,
                            }}
                            keys={this.keys}
                            colors={this.colors}
                            data={this.state.chart_data}
                            showGrid={true}
                            animate={true}
                            contentInset={{
                                top: 20,
                                bottom: 20,
                            }}
                            svg={{
                                strokeOpacity: 0.5,
                                strokeWidth: 3,
                                scale: 0.5
                            }}
                        />
                    </View>
                    {/* <XAxis
            data={this.x_data}
            style={{
              marginLeft: 30,
            }}
            contentInset={{ left: 10, right: 10 }}
          /> */}
                </View>
            </View>
        )
    }
}