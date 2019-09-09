import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { PanGestureHandler, State, TouchableOpacity as KMTouchableOpacity } from 'react-native-gesture-handler'

export default class WeekAnnotationCalendar extends React.PureComponent {
    dimension_width = 350

    old_translateX = 0

    main_index = 0

    translateX_array = [new Animated.Value(0), new Animated.Value(this.dimension_width), new Animated.Value(-this.dimension_width)]

    record_translateX_array = [0, this.dimension_width, -this.dimension_width]

    opacity_array = [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]

    state = {
        month_array: [0, 0, 0],
        year_array: [0, 0, 0]
    }

    handleMonthYearWhenSwipe = (swipe_direction, main_index) => {
        let year_array = [... this.state.year_array],
            month_array = [...this.state.month_array]

        if (swipe_direction === 1) {
            if (main_index === 0) {
                month_array[2] = month_array[main_index] - 1
                year_array[2] = year_array[main_index]
                if (month_array[2] < 0) {
                    month_array[2] = 11
                    year_array[2] = year_array[main_index] - 1
                }
            }

            else {
                month_array[(main_index - 1) % 3] = month_array[main_index] - 1
                year_array[(main_index - 1) % 3] = year_array[main_index]
                if (month_array[(main_index - 1) % 3] < 0) {
                    month_array[(main_index - 1) % 3] = 11
                    year_array[(main_index - 1) % 3] = year_array[main_index] - 1
                }
            }
        }

        else {
            month_array[(main_index + 1) % 3] = month_array[main_index] + 1
            year_array[(main_index + 1) % 3] = year_array[main_index]
            if (month_array[(main_index + 1) % 3] > 11) {
                month_array[(main_index + 1) % 3] = 0
                year_array[(main_index + 1) % 3] = year_array[main_index] + 1
            }
        }

        this.setState({
            month_array: [...month_array],
            year_array: [...year_array]
        })

    }


    _onGestureEvent = Animated.event(
        [
            {},
        ],
        {
            listener: ({ nativeEvent }) => {
                this.record_translateX_array.forEach((translate, index, arr) => {
                    arr[index] += nativeEvent.translationX - this.old_translateX
                })

                this.translateX_array.forEach((translate, index, arr) => {
                    arr[index].setValue(this.record_translateX_array[index])
                })

                this.old_translateX = nativeEvent.translationX

                if (this.record_translateX_array[this.main_index] >= -120 && this.record_translateX_array[this.main_index] <= 120) {
                    this.opacity_array[(this.main_index + 1) % 3].setValue(1)

                    if (this.main_index === 0) {
                        this.opacity_array[2].setValue(1)
                    }
                    else {
                        this.opacity_array[(this.main_index - 1) % 3].setValue(1)
                    }
                }

                this.opacity_array[this.main_index].setValue((this.dimension_width - Math.abs(this.record_translateX_array[this.main_index])) / (this.dimension_width * 1.3))
            }
        }
    )

    handleAnimation = (main_index) => {
        if (this.record_translateX_array[main_index] >= -120 && this.record_translateX_array[main_index] <= 120) {
            this.opacity_array[main_index].setValue(1)

            this.record_translateX_array[main_index] = 0
            this.record_translateX_array[(main_index + 1) % 3] = this.dimension_width

            if (main_index - 1 < 0) {
                main_index = 6
            }

            this.record_translateX_array[(main_index - 1) % 3] = - this.dimension_width

            let animation_array = this.translateX_array.map((translate, index) =>
                Animated.spring(this.translateX_array[index], {
                    toValue: this.record_translateX_array[index]
                })
            )

            Animated.parallel(
                animation_array,
                {
                    stopTogether: true
                }
            ).start()
        }

        else if (this.record_translateX_array[main_index] < -120) {

            this.record_translateX_array[main_index] = - this.dimension_width
            this.record_translateX_array[(main_index + 1) % 3] = 0

            if (main_index - 1 < 0) {
                main_index = 6
            }

            this.record_translateX_array[(main_index - 1) % 3] = this.dimension_width

            this.translateX_array[(main_index - 1) % 3].setValue(this.dimension_width)

            let animation_array = this.translateX_array.map((translate, index) => {
                if (index !== (main_index - 1) % 3)
                    return (
                        Animated.spring(this.translateX_array[index], {
                            toValue: this.record_translateX_array[index]
                        })
                    )
            })

            Animated.parallel(
                animation_array,
                {
                    stopTogether: true
                }
            ).start()

            this.handleMonthYearWhenSwipe(-1, this.main_index)

            this.main_index = (main_index + 1) % 3
        }

        else if (this.record_translateX_array[main_index] > 120) {

            this.record_translateX_array[main_index] = this.dimension_width

            this.record_translateX_array[(main_index + 1) % 3] = - this.dimension_width

            this.translateX_array[(main_index + 1) % 3].setValue(-this.dimension_width)

            if (main_index - 1 < 0) {
                main_index = 6
            }
            this.record_translateX_array[(main_index - 1) % 3] = 0


            let animation_array = this.translateX_array.map((translate, index) => {
                if (index !== (main_index + 1) % 3)
                    return (
                        Animated.spring(this.translateX_array[index], {
                            toValue: this.record_translateX_array[index]
                        })
                    )
            })

            Animated.parallel(
                animation_array,
                {
                    stopTogether: true
                }
            ).start()

            this.handleMonthYearWhenSwipe(1, this.main_index)

            this.main_index = (main_index - 1) % 3
        }
    }

    _onHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            this.old_translateX = 0

            this.handleAnimation(this.main_index)
        }
    }

    componentDidMount() {
        this.setState({
            month_array: [...this.props.month_array],
            year_array: [...this.props.year_array]
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.month_array !== prevProps.month_array || this.props.year_array !== prevProps.year_array) {
            this.setState({
                month_array: [...this.props.month_array],
                year_array: [...this.props.year_array]
            })
        }
    }

    render() {
        return (
            <View
                style={{
                    width: 350,
                    height: 400,
                    borderRadius: 20,
                    backgroundColor: "white",
                    position: "absolute",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                }}
            >
                <PanGestureHandler
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={this._onHandlerStateChange}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            width: 350,
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [{ translateX: this.translateX_array[0] }],
                            opacity: this.opacity_array[0],
                        }}
                    >
                        <WeeksInMonth
                            month={this.state.month_array[0]}
                            year={this.state.year_array[0]}
                            chooseWeek={this.props.chooseWeek}
                            dismissCalendar={this.props.dismissCalendar}
                        />
                    </Animated.View>
                </PanGestureHandler>

                <PanGestureHandler
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={this._onHandlerStateChange}
                >
                    <Animated.View
                        style={{
                            height: 400,
                            width: 350,
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [{ translateX: this.translateX_array[1] }],
                            position: "absolute",
                            opacity: this.opacity_array[1],
                        }}
                    >
                        <WeeksInMonth
                            month={this.state.month_array[1]}
                            year={this.state.year_array[1]}
                            chooseWeek={this.props.chooseWeek}
                            dismissCalendar={this.props.dismissCalendar}
                        />
                    </Animated.View>
                </PanGestureHandler>

                <PanGestureHandler
                    onGestureEvent={this._onGestureEvent}
                    onHandlerStateChange={this._onHandlerStateChange}
                >
                    <Animated.View
                        style={{
                            height: 400,
                            width: 350,
                            justifyContent: "center",
                            alignItems: "center",
                            transform: [{ translateX: this.translateX_array[2] }],
                            position: "absolute",
                            opacity: this.opacity_array[2],
                        }}
                    >
                        <WeeksInMonth
                            month={this.state.month_array[2]}
                            year={this.state.year_array[2]}
                            chooseWeek={this.props.chooseWeek}
                            dismissCalendar={this.props.dismissCalendar}
                        />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        )
    }
}

class WeeksInMonth extends React.PureComponent {

    state = {
        month_data_array: []
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

    initMonthData = (month, year) => {
        let month_data_array = []

        let first_monday = this.getMonday(new Date(year, month, 1)),
            last_monday = this.getMonday(new Date(year, month + 1, 0)),

            first_week = this.getWeek(first_monday),
            last_week = this.getWeek(last_monday),
            monday_of_week = first_monday

        if (first_week > last_week) {
            let first_week_of_next_year = this.getWeek(this.getMonday(new Date(year, 0, 1))),
                last_week_of_current_year
            if (first_week_of_next_year >= 1 && first_week_of_next_year < 10) {
                last_week_of_current_year = this.getWeek(this.getMonday(new Date(new Date(year, 0, 1)).getTime() - 86400 * 1000 * 7))
                last_week += last_week_of_current_year
            }
            else {
                last_week_of_current_year = first_week_of_next_year
                last_week += last_week_of_current_year
            }


            for (let i = first_week; i <= last_week; i++) {
                let week = i % last_week_of_current_year === 0 ? last_week_of_current_year : i % last_week_of_current_year
                month_data_array.push({
                    week_row: true,
                    week,
                    start_day: monday_of_week.getDate(),
                    start_month: monday_of_week.getMonth(),
                    start_year: monday_of_week.getFullYear(),
                })

                for (let j = 0; j < 7; j++) {
                    let date = new Date(monday_of_week.getTime() + 86400 * 1000 * j)
                    month_data_array.push({
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        day_in_week: date.getDay(),
                        week
                    })
                }

                monday_of_week = new Date(monday_of_week.getTime() + 86400 * 1000 * 7)
            }
        }

        else {
            for (let i = first_week; i <= last_week; i++) {
                month_data_array.push({
                    week_row: true,
                    week: i,
                    start_day: monday_of_week.getDate(),
                    start_month: monday_of_week.getMonth(),
                    start_year: monday_of_week.getFullYear(),
                })

                for (let j = 0; j < 7; j++) {
                    let date = new Date(monday_of_week.getTime() + 86400 * 1000 * j)
                    month_data_array.push({
                        day: date.getDate(),
                        month: date.getMonth(),
                        year: date.getFullYear(),
                        day_in_week: date.getDay(),
                        week: i,
                    })
                }

                monday_of_week = new Date(monday_of_week.getTime() + 86400 * 1000 * 7)

            }
        }

        this.setState({
            month_data_array: [...month_data_array]
        })
    }

    componentDidMount() {
        this.initMonthData(this.props.month, this.props.year)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.month !== prevProps.month || this.props.year !== prevProps.year) {
            this.initMonthData(this.props.month, this.props.year)
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 20,
                    alignItems: "center"
                }}
            >
                <MonthHolder
                    month_data_array={this.state.month_data_array}
                    {...this.props}
                />
            </View>
        )
    }
}

class MonthHolder extends React.Component {

    day_texts = ["M", "T", "W", "T", "F", "S", "S"]
    month_texts = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    state = {
        day_text_array: null,
        month_row_data_array: [],
    }

    _toggleChooseMonth = () => {
        this.props.toggleChooseMonth()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.month_data_array !== prevProps.month_data_array) {
            let day_text_array = []

            day_text_array.push(
                <View
                    key={`week-text`}
                    style={{
                        height: 40,
                        width: 310 / 8,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        Week
            </Text>
                </View>
            )

            for (let i = 0; i < 7; i++) {
                day_text_array.push(
                    <View
                        key={`day-text-${i}`}
                        style={{
                            height: 40,
                            width: 310 / 8,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text>
                            {this.day_texts[i]}
                        </Text>
                    </View>
                )
            }

            let month_row_data_array = [],
                i = -1

            this.props.month_data_array.forEach((data, index) => {
                if (index % 8 === 0) {
                    i += 1
                    month_row_data_array[i] = []
                }
                month_row_data_array[i].push(data)
            })

            this.setState({
                day_text_array: [...day_text_array],
                month_row_data_array: [...month_row_data_array]
            })
        }
    }


    render() {
        return (
            <View>
                <View
                    style={{
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                        }}
                        onPress={this._toggleChooseMonth}
                    >
                        <Text>
                            {`${this.month_texts[this.props.month]} - ${this.props.year}`}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                >
                    {this.state.day_text_array}
                </View>

                {this.state.month_row_data_array.map((row_data, index) => {
                    return (
                        <WeekDayRow
                            key={`week-row-${index}`}
                            row_data={row_data}
                            {...this.props}
                        />
                    )
                })}
            </View>
        )
    }
}

class WeekDayRow extends React.PureComponent {
    _onPress = () => {
        let f_data = this.props.row_data[1],
            f_day = f_data.day,
            f_month = f_data.month,
            f_year = f_data.year,

            l_data = this.props.row_data[7],
            l_day = l_data.day,
            l_month = l_data.month,
            l_year = l_data.year

        this.props.chooseWeek(f_day, f_month, f_year, l_day, l_month, l_year)
        this.props.dismissCalendar()
    }
    render() {
        return (
            <KMTouchableOpacity
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
                onPress={this._onPress}
            >
                {this.props.row_data.map((data, index) => {
                    if (data.week_row) {
                        return (
                            <Week
                                key={`week-${index}`}
                                data={data}
                                {... this.props}
                            />
                        )
                    }
                    return (
                        <Day
                            key={`day-${index}`}
                            data={data}
                            {... this.props}
                        />
                    )
                })}
            </KMTouchableOpacity>
        )
    }
}

class Day extends React.PureComponent {
    render() {
        return (
            <View
                style={{
                    height: 50,
                    width: 310 / 8,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>
                    {this.props.data.day}
                </Text>
            </View>
        )
    }
}

class Week extends React.PureComponent {
    render() {
        return (
            <View
                style={{
                    height: 50,
                    width: 310 / 8,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Text>
                    {this.props.data.week}
                </Text>
            </View>
        )
    }
}