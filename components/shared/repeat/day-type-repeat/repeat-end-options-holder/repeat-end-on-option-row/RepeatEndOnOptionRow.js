import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    Picker
} from 'react-native';

import { styles } from './styles/styles'

const window_width = Dimensions.get("window").width

export default class RepeatEndOnOptionRow extends React.Component {

    month_names = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
        let year = parseInt(this.state.year),
            month = parseInt(itemValue),
            day = parseInt(this.state.day)

        let date = new Date(year, month, day)

        if (date.getMonth() !== month) {
            date = new Date(year, month + 1, 0)
        }

        this.setState({
            month: itemValue,
            day: date.getDate().toString()
        })
    }

    _changeYearPickerValue = (itemValue, itemIndex) => {
        let year = parseInt(itemValue),
            month = parseInt(this.state.month),
            day = parseInt(this.state.day)


        let date = new Date(year, month, day)

        if (date.getMonth() !== month) {
            date = new Date(year, month + 1, 0)
        }

        this.setState({
            year: itemValue,
            day: date.getDate().toString()

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
                                    {`${this.state.day} ${this.month_names[this.state.month]} ${this.state.year}`}
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

                            closeDatePicker={this.closeDatePicker}
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
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        top: 20,
                        left: 0,
                        right: 0,
                        position: "absolute",
                        zIndex: 15,
                        height: 30,
                        paddingHorizontal: 30,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center"
                        }}

                        onPress={this.props.closeDatePicker}
                    >
                        <Text
                            style={styles.picker_cancel_option_text}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            height: 30,
                            justifyContent: "center",
                            alignItems: "center"
                        }}

                        onPress={this._chooseDonePicker}
                    >
                        <Text
                            style={styles.picker_done_option_text}
                        >
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 70,
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