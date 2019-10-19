import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    DatePickerIOS,
    Keyboard,
    Modal,
    Picker,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    Easing
} from 'react-native';

import { styles } from './styles/styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faRedoAlt,
    faHourglassEnd
} from '@fortawesome/free-solid-svg-icons'

const shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)
const window_width = Dimensions.get("window").width

export default class DayTypeRepeat extends React.PureComponent {

    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = new Animated.Value(0.3)

    state = {
        selected_repeat_type: "days",

        is_picker_opened: false,

        repeat_input_value: "1"
    }

    _changePickerValue = (itemValue, itemIndex) => {
        this.setState({
            selected_repeat_type: itemValue
        })
    }

    _openPicker = () => {
        this.setState({
            is_picker_opened: true
        })
    }

    _closePicker = () => {
        this.setState({
            is_picker_opened: false
        })
    }

    _onRepeatInputChange = (e) => {
        if (e.nativeEvent.text.length === 0) {
            this.setState({
                repeat_input_value: "1"
            })
        }

        else {
            this.setState({
                repeat_input_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
            })
        }
    }

    animateRepeat = () => {
        Animated.parallel([
            Animated.timing(
                this.repeat_opacity_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.repeat_scale_value,
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
        this.animateRepeat()
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: 338,
                    height: 484,
                    transform: [{ scale: this.repeat_scale_value }],
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: this.repeat_opacity_value
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 30,
                        marginTop: 35,
                        alignItems: "center"
                    }}
                >
                    <FontAwesomeIcon
                        icon={faRedoAlt}
                        color="#2C2C2C"
                        size={14}
                    />

                    <Text
                        style={styles.title_text}
                    >
                        Repeat
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 25,
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 59,
                    }}
                >
                    <Text
                        style={styles.every_option_text}
                    >
                        Every
                    </Text>

                    <TextInput
                        style={styles.every_option_input}
                        maxLength={2}
                        keyboardType="numbers-and-punctuation"
                        value={this.state.repeat_input_value}
                        onChange={this._onRepeatInputChange}
                    />

                    <TouchableOpacity
                        style={styles.picker_button_container}

                        onPress={this._openPicker}
                    >
                        <Text
                            style={styles.every_option_text}
                        >
                            {this.state.selected_repeat_type}
                        </Text>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={this.state.is_picker_opened}
                    >
                        <View
                            style={{
                                flex: 1,
                                position: "relative"
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    width: window_width,
                                    backgroundColor: "#000000",
                                    opacity: 0.2,
                                }}

                                onPress={this._closePicker}
                            >
                            </TouchableOpacity>

                            <View
                                style={{
                                    position: "absolute",
                                    height: 200,
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    backgroundColor: "white",
                                    justifyContent: "center",
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                }}
                            >

                                <Picker
                                    selectedValue={this.state.selected_repeat_type}
                                    onValueChange={this._changePickerValue}
                                    itemStyle={styles.picker_value_text}
                                >
                                    <Picker.Item
                                        label="days"
                                        value="days"
                                    />
                                    <Picker.Item
                                        label="weeks"
                                        value="weeks"
                                    />
                                    <Picker.Item
                                        label="months"
                                        value="months"
                                    />
                                </Picker>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View
                    style={{
                        marginTop: 25,
                        flexDirection: "row",
                        alignItems: "center",
                        marginHorizontal: 30,
                    }}
                >
                    <ChooseDayInWeekOption />
                </View>

                {/* Separating line */}
                <View
                    style={styles.separating_line}
                >
                </View>

                <RepeatEndOptionsHolder />
            </Animated.View>
        )
    }
}

class ChooseDayInWeekOption extends React.PureComponent {

    render() {
        return (
            <>
                <DayInWeekOptionHolder
                    index={0}
                    day_in_week={"Mon"}
                />
                <DayInWeekOptionHolder
                    index={1}
                    day_in_week={"Tue"}
                />
                <DayInWeekOptionHolder
                    index={2}
                    day_in_week={"Wed"}
                />
                <DayInWeekOptionHolder
                    index={3}
                    day_in_week={"Thu"}
                />
                <DayInWeekOptionHolder
                    index={4}
                    day_in_week={"Fri"}
                />
                <DayInWeekOptionHolder
                    index={5}
                    day_in_week={"Sat"}
                />
                <DayInWeekOptionHolder
                    index={6}
                    day_in_week={"Sun"}
                />
            </>
        )
    }
}


class DayInWeekOptionHolder extends React.PureComponent {

    handleIndex = (index) => {
        if (index === 0) {
            return styles.unchosen_left_end_day_in_week_container
        }

        else if (index === 6) {
            return styles.unchosen_right_end_day_in_week_container
        }
        else {
            return styles.unchosen_normal_day_in_week_container
        }
    }

    state = {
        container_style: this.handleIndex(this.props.index),
        text_style: styles.unchosen_day_in_week_text,

        is_chosen: false,
    }

    _onChooseDayInWeek = () => {
        let { index } = this.props

        this.setState(prevState => ({
            is_chosen: !prevState.is_chosen
        }), () => {
            if (this.state.is_chosen) {
                if (index === 0) {
                    this.setState({
                        container_style: styles.chosen_left_end_day_in_week_container,
                        text_style: styles.chosen_day_in_week_text
                    })
                }

                else if (index === 6) {
                    this.setState({
                        container_style: styles.chosen_right_end_day_in_week_container,
                        text_style: styles.chosen_day_in_week_text
                    })
                }

                else {
                    this.setState({
                        container_style: styles.chosen_normal_day_in_week_container,
                        text_style: styles.chosen_day_in_week_text
                    })
                }
            }

            else {
                if (index === 0) {
                    this.setState({
                        container_style: styles.unchosen_left_end_day_in_week_container,
                        text_style: styles.unchosen_day_in_week_text
                    })
                }

                else if (index === 6) {
                    this.setState({
                        container_style: styles.unchosen_right_end_day_in_week_container,
                        text_style: styles.unchosen_day_in_week_text
                    })
                }

                else {
                    this.setState({
                        container_style: styles.unchosen_normal_day_in_week_container,
                        text_style: styles.unchosen_day_in_week_text
                    })
                }
            }
        })

    }

    render() {
        return (
            <>
                {this.props.index === 0 ?
                    <TouchableOpacity
                        style={this.state.container_style}
                        onPress={this._onChooseDayInWeek}
                    >
                        <Text
                            style={this.state.text_style}
                        >
                            {this.props.day_in_week}
                        </Text>
                    </TouchableOpacity>

                    :

                    <>
                        {this.props.index === 6 ?
                            <TouchableOpacity
                                style={this.state.container_style}
                                onPress={this._onChooseDayInWeek}
                            >
                                <Text
                                    style={this.state.text_style}
                                >
                                    {this.props.day_in_week}
                                </Text>
                            </TouchableOpacity>
                            :

                            <TouchableOpacity
                                style={this.state.container_style}
                                onPress={this._onChooseDayInWeek}
                            >
                                <Text
                                    style={this.state.text_style}
                                >
                                    {this.props.day_in_week}
                                </Text>
                            </TouchableOpacity>
                        }
                    </>
                }
            </>
        )
    }
}

class RepeatEndOptionsHolder extends React.PureComponent {

    state = {
        current_index: 0,
        last_index: -1
    }

    chooseEndOption = (index) => {
        if (this.state.current_index !== index) {
            this.setState(prevState => ({
                current_index: index,
                last_index: prevState.current_index
            }))
        }
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        marginLeft: 30,
                        marginTop: 25,
                        alignItems: "center"
                    }}
                >
                    <FontAwesomeIcon
                        icon={faHourglassEnd}
                        color="#2C2C2C"
                        size={14}
                    />

                    <Text
                        style={styles.title_text}
                    >
                        Repeat end
                    </Text>
                </View>

                <RepeatEndNeverOptionRow
                    index={0}
                    chooseEndOption={this.chooseEndOption}
                    current_index={this.state.current_index}
                    last_index={this.state.last_index}
                />

                <RepeatEndOnOptionRow
                    index={1}
                    chooseEndOption={this.chooseEndOption}
                    current_index={this.state.current_index}
                    last_index={this.state.last_index}
                />
            </View>
        )
    }
}

class RepeatEndNeverOptionRow extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.index === nextProps.current_index && this.props.current_index !== nextProps.current_index)
            || (this.props.index === nextProps.last_index && this.props.last_index !== nextProps.last_index)
    }

    _chooseEndOption = () => {
        this.props.chooseEndOption(this.props.index)
    }

    render() {
        let text_style = styles.unchosen_every_option_text,
            button_container = styles.repeat_end_chosen_button_container_deactivated,
            activated = this.props.index === this.props.current_index

        if (this.props.index === this.props.current_index) {
            text_style = styles.every_option_text
            button_container = styles.repeat_end_chosen_button_container
        }

        else if (this.props.index === this.props.last_index) {
            text_style = styles.unchosen_every_option_text
            button_container = styles.repeat_end_chosen_button_container_deactivated
        }

        return (
            <TouchableOpacity
                style={{
                    marginTop: 25,
                    marginLeft: 59,
                    marginRight: 30,
                }}

                onPress={this._chooseEndOption}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={text_style}
                    >
                        Never
                        </Text>

                    <View
                        style={button_container}
                    >
                        {activated ?
                            <View
                                style={styles.repeat_end_chosen_button_activated}
                            >

                            </View>
                            :
                            null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

class RepeatEndOnOptionRow extends React.Component {

    date = new Date()

    state = {
        is_date_picker_chosen: false,
        day: this.date.getDate().toString(),
        month: this.date.getMonth().toString(),
        year: this.date.getFullYear().toString()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.index === nextProps.current_index && this.props.current_index !== nextProps.current_index)
            || (this.props.index === nextProps.last_index && this.props.last_index !== nextProps.last_index)
            || (this.state !== nextState)
    }

    _chooseEndOption = () => {
        this.props.chooseEndOption(this.props.index)
        this.setState({
            is_date_picker_chosen: true
        })
    }

    closeDatePicker = () => {
        this.setState({
            is_date_picker_chosen: false
        })
    }

    _changeDayPickerValue = (itemValue, itemIndex) => {
        let year = parseInt(this.state.year),
            month = parseInt(this.state.month),
            day = parseInt(itemValue)

        let date = new Date(year, month, day)

        if (date.getMonth() !== month) {
            date = new Date(year, month + 1, 0)
        }

        this.setState({
            day: date.getDate().toString()
        })
    }

    _changeMonthPickerValue = (itemValue, itemIndex) => {
        this.setState({
            month: itemValue
        })
    }

    _changeYearPickerValue = (itemValue, itemIndex) => {
        this.setState({
            year: itemValue
        })
    }


    render() {
        let text_style = styles.unchosen_every_option_text,
            button_container = styles.repeat_end_chosen_button_container_deactivated,
            activated = this.props.index === this.props.current_index

        if (this.props.index === this.props.current_index) {
            text_style = styles.every_option_text
            button_container = styles.repeat_end_chosen_button_container
        }

        else if (this.props.index === this.props.last_index) {
            text_style = styles.unchosen_every_option_text
            button_container = styles.repeat_end_chosen_button_container_deactivated
        }

        return (
            <>
                <TouchableOpacity
                    style={{
                        marginTop: 25,
                        marginLeft: 59,
                        marginRight: 30,
                    }}

                    onPress={this._chooseEndOption}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={text_style}
                            >
                                On
                        </Text>

                            <View
                                style={{
                                    marginLeft: 20,
                                }}
                            >
                                <Text
                                    style={text_style}
                                >

                                </Text>
                            </View>
                        </View>

                        <View
                            style={button_container}
                        >
                            {activated ?
                                <View
                                    style={styles.repeat_end_chosen_button_activated}
                                >

                                </View>
                                :
                                null
                            }
                        </View>
                    </View>
                </TouchableOpacity>

                <Modal
                    transparent={true}
                    visible={this.state.is_date_picker_chosen}
                >
                    <View
                        style={{
                            flex: 1,
                            position: "relative"
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                width: window_width,
                                backgroundColor: "black",
                                opacity: 0.2
                            }}

                            onPress={this.closeDatePicker}
                        >

                        </TouchableOpacity>

                        <DatePickerWheel
                            day={this.state.day}
                            month={this.state.month}
                            year={this.state.year}
                            _changeDayPickerValue={this._changeDayPickerValue}
                            _changeMonthPickerValue={this._changeMonthPickerValue}
                            _changeYearPickerValue={this._changeYearPickerValue}
                        />
                    </View>
                </Modal>
            </>
        )
    }
}

class DatePickerWheel extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    position: "absolute",
                    height: 200,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: "white",
                    justifyContent: "center",
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <DayPickerValueHolder
                        day={this.props.day}
                        _changeDayPickerValue={this.props._changeDayPickerValue}
                    />
                    <MonthPickerValueHolder
                        month={this.props.month}
                        _changeMonthPickerValue={this.props._changeMonthPickerValue}
                    />
                    <YearPickerValueHolder
                        year={this.props.year}
                        _changeYearPickerValue={this.props._changeYearPickerValue}
                    />
                </View>
            </View>
        )
    }
}

class DayPickerValueHolder extends React.PureComponent {

    render() {
        return (
            <Picker
                selectedValue={this.props.day}
                onValueChange={this.props._changeDayPickerValue}
                itemStyle={styles.picker_value_text}
                style={{
                    height: 50,
                    flex: 1,
                    justifyContent: "center"
                }}
            >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
                <Picker.Item label="12" value="12" />
                <Picker.Item label="13" value="13" />
                <Picker.Item label="14" value="14" />
                <Picker.Item label="15" value="15" />
                <Picker.Item label="16" value="16" />
                <Picker.Item label="17" value="17" />
                <Picker.Item label="18" value="18" />
                <Picker.Item label="19" value="19" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="21" value="21" />
                <Picker.Item label="22" value="22" />
                <Picker.Item label="23" value="23" />
                <Picker.Item label="24" value="24" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="26" value="26" />
                <Picker.Item label="27" value="27" />
                <Picker.Item label="28" value="28" />
                <Picker.Item label="29" value="29" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="31" value="31" />
            </Picker>
        )
    }
}

class MonthPickerValueHolder extends React.PureComponent {

    render() {
        return (
            <Picker
                selectedValue={this.props.month}
                onValueChange={this.props._changeMonthPickerValue}
                itemStyle={styles.picker_value_text}
                style={{
                    height: 50,
                    flex: 1,
                    justifyContent: "center"
                }}
            >
                <Picker.Item label="January" value="0" />
                <Picker.Item label="Febuary" value="1" />
                <Picker.Item label="March" value="2" />
                <Picker.Item label="April" value="3" />
                <Picker.Item label="May" value="4" />
                <Picker.Item label="June" value="5" />
                <Picker.Item label="July" value="6" />
                <Picker.Item label="August" value="7" />
                <Picker.Item label="September" value="8" />
                <Picker.Item label="October" value="9" />
                <Picker.Item label="November" value="10" />
                <Picker.Item label="December" value="11" />
            </Picker>
        )
    }
}

class YearPickerValueHolder extends React.PureComponent {
    year = new Date().getFullYear()
    render() {
        return (
            <Picker
                selectedValue={this.props.year}
                onValueChange={this.props._changeYearPickerValue}
                itemStyle={styles.picker_value_text}
                style={{
                    height: 50,
                    flex: 1,
                    justifyContent: "center"
                }}
            >
                <Picker.Item label={`${this.year}`} value={`${this.year}`} />
                <Picker.Item label={`${this.year + 1}`} value={`${this.year + 1}`} />
                <Picker.Item label={`${this.year + 2}`} value={`${this.year + 2}`} />
                <Picker.Item label={`${this.year + 3}`} value={`${this.year + 3}`} />
                <Picker.Item label={`${this.year + 4}`} value={`${this.year + 4}`} />
            </Picker>
        )
    }
}