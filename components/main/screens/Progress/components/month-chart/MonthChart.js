import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import { StackedBarChart, XAxis, YAxis } from 'react-native-svg-charts'
import MonthAnnotationCalendar from './month-anno-calendar/MonthAnnotationCalendar'

export default class MonthChart extends React.PureComponent {
    data = [
        {
            month: 1000,
            apples: 3840,
            bananas: 1920,
            cherries: 960,
            dates: 400,
            oranges: 400,
        },
        {
            month: 1000,
            apples: 1600,
            bananas: 1440,
            cherries: 960,
            dates: 400,
        },
        {
            month: 1000,
            apples: 640,
            bananas: 960,
            cherries: 3640,
            dates: 400,
        },
        {
            month: 1000,
            apples: 3320,
            bananas: 480,
            cherries: 640,
            dates: 400,
        },
    ]

    x_data = [0, 1, 2, 3]
    y_data = [10, 11]
    colors = ['red', '#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
    keys = ['month', 'apples', 'bananas', 'cherries', 'dates']

    month_texts = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    state = {
        calendar_chosen_bool: false,
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
                            data={this.data}
                            showGrid={true}
                            animate={true}
                            animationDuration={1000}
                            contentInset={{
                                top: 20,
                                bottom: 20,
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
