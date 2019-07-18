import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    DatePickerIOS,
    Keyboard,
    KeyboardAvoidingView,
    Modal,
    Picker,
    TouchableWithoutFeedback
} from 'react-native';

const shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

export default class Repeat extends Component {

    state = {
        bottomStyleProperty: 100,
        topStyleProperty: 100,

        datePickerHeight: 0,
        chosenDate: new Date(),

        endOnDateClicked: false,
        week_option_in_weekly_task_clicked: false,


        weekly_repeat_picker_value: "weeks"
    }

    setWeeklyRepeatPickerValue = (value) => {
        this.setState({
            weekly_repeat_picker_value: value
        })
    }

    toggleEndOnDate = () => {
        this.setState(prevState => ({
            endOnDateClicked: !prevState.endOnDateClicked
        }))
    }

    //To active Modal for choosing 'Every ... weeks/months'
    toggleWeekOptionInWeeklyTask = () => {
        this.setState(prevState => ({
            week_option_in_weekly_task_clicked: !prevState.week_option_in_weekly_task_clicked
        }))
    }

    setStyleToTransit = () => {
        this.setState({
            bottomStyleProperty: 150,
            topStyleProperty: 50,
        })
    }

    resetStyle = () => {
        this.setState({
            bottomStyleProperty: 100,
            topStyleProperty: 100,
        })
    }

    setDate = (newDate) => {
        this.setState({
            chosenDate: newDate
        })
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardWillShow', this.toDoWhenWillShowKeyboard)
        Keyboard.removeListener('keyboardWillHide', this.toDoWhenWillHideKB)
    }

    render() {
        return (
            <>
                {this.props.repeatClicked ?
                    <>
                        {/* Using KeyboardAvoidingView to generate smooth transitions for keyboard listeners */}
                        {/* Avoid using its prop of 'behavior' because it will cause unwanted results in transitting */}
                        <KeyboardAvoidingView
                            style={{
                                position: 'absolute',
                                top: this.state.topStyleProperty,
                                bottom: this.state.bottomStyleProperty,
                                right: 25,
                                left: 25,
                                backgroundColor: 'white',
                                borderRadius: 10,
                            }}
                            enabled
                        >
                            <RepeatTitle />

                            {this.props.currentAnnotation === "day" ?

                                <DayRepeatEveryHolder />

                                :

                                <>
                                    {this.props.currentAnnotation === "week" ?
                                        <WeeklyRepeatOption
                                            toggleWeekOptionInWeeklyTask={this.toggleWeekOptionInWeeklyTask}
                                            weekly_repeat_picker_value={this.state.weekly_repeat_picker_value}
                                        />

                                        :

                                        <></>
                                    }
                                </>
                            }

                            <SeparateLine />

                            <EndRepeatTitle />

                            <EndRepeatHolder
                                setStyleToTransit={this.setStyleToTransit}
                                resetStyle={this.resetStyle}
                                toggleEndOnDate={this.toggleEndOnDate}
                                chosenDate={this.state.chosenDate}
                            />

                        </KeyboardAvoidingView>

                        {/* Date picker IOS implementation */}
                        {/* When user click on date option of 'On', we toggle the modal covering */}
                        {/* The modal's gray transparently area will be used as switche off button to get rid of date picker */}
                        {this.state.endOnDateClicked ?
                            <Modal
                                transparent={true}
                            >
                                <TouchableWithoutFeedback
                                    onPress={this.toggleEndOnDate}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: "black",
                                            opacity: 0.5,
                                        }}
                                    >

                                    </View>
                                </TouchableWithoutFeedback>

                                <View style={{
                                    position: "absolute",
                                    bottom: 0,
                                    height: 250,
                                    right: 0,
                                    left: 0,
                                    justifyContent: "center",
                                    backgroundColor: "#EFEFEF"
                                }}>
                                    <DatePickerIOS
                                        date={this.state.chosenDate}
                                        mode="date"
                                        onDateChange={this.setDate}
                                    />
                                </View>

                            </Modal>

                            :
                            <>
                                {this.state.week_option_in_weekly_task_clicked ?
                                    <WeeklyRepeatWeekMonthModal
                                        toggleWeekOptionInWeeklyTask={this.toggleWeekOptionInWeeklyTask}
                                        setWeeklyRepeatPickerValue={this.setWeeklyRepeatPickerValue}
                                        weekly_repeat_picker_value={this.state.weekly_repeat_picker_value}
                                    />

                                    :

                                    <></>
                                }

                            </>
                        }

                    </>
                    :

                    <></>
                }
            </>
        )
    }
}

class RepeatTitle extends React.PureComponent {

    render() {
        return (
            <View style={{
                height: 24,
                marginTop: 30,
                marginLeft: 30,
                justifyContent: "center"
            }}>
                <Text>Repeat</Text>
            </View>
        )
    }
}

class SeparateLine extends React.PureComponent {
    render() {
        return (
            <View style={{
                height: 1,
                backgroundColor: "gainsboro",
                marginHorizontal: 27,
                marginTop: 25,
            }}>

            </View>
        )
    }
}

class EndRepeatTitle extends React.PureComponent {

    render() {
        return (
            <View style={{
                height: 24,
                marginTop: 26,
                marginLeft: 30,
                justifyContent: "center"
            }}>
                <Text>End</Text>
            </View>
        )
    }
}



// Holder for top option bars of Daily, Weekly, Monthly (Creating Daily Task)
class DayRepeatEveryHolder extends React.PureComponent {
    static styles = StyleSheet.create({
        unChosenOption: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
        },

        chosenOption: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "black"
        },

        textUnChosen: {
            color: "black"
        },

        textChosen: {
            color: "white"
        }
    })

    //To keep track of current/last chosen options
    currentIndex = -1
    lastIndex = -1

    state = {
        holderStyle_arr: [],
        textStyle_arr: []

    }

    handleChoosing = (index) => {
        this.lastIndex = this.currentIndex
        this.currentIndex = index

        if (this.lastIndex === this.currentIndex) {
            this.lastIndex = -1
        }

        let holderStyle_arr = [... this.state.holderStyle_arr],
            textStyle_arr = [... this.state.textStyle_arr]

        holderStyle_arr[this.currentIndex] = DayRepeatEveryHolder.styles.chosenOption
        textStyle_arr[this.currentIndex] = DayRepeatEveryHolder.styles.textChosen

        holderStyle_arr[this.lastIndex] = DayRepeatEveryHolder.styles.unChosenOption
        textStyle_arr[this.lastIndex] = DayRepeatEveryHolder.styles.textUnChosen

        this.setState({
            holderStyle_arr: [...holderStyle_arr],
            textStyle_arr: [...textStyle_arr]
        })
    }

    chooseDaily = () => {
        this.handleChoosing(0)
    }

    chooseWeekly = () => {
        this.handleChoosing(1)
    }

    chooseMonthly = () => {
        this.handleChoosing(2)
    }

    //To intially set the styles for holders to avoid a second re-rendering
    //(This is optional because the number of components to rerender is not big(4))
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.holderStyle_arr.length === 0) {
            let holderStyle_arr = [],
                textStyle_arr = []

            for (let i = 0; i < 4; i++) {
                holderStyle_arr.push(DayRepeatEveryHolder.styles.unChosenOption)
                textStyle_arr.push(DayRepeatEveryHolder.styles.textUnChosen)
            }

            return ({
                holderStyle_arr: [...holderStyle_arr],
                textStyle_arr: [...textStyle_arr]
            })
        }
        return null
    }

    componentDidMount() {
        this.chooseDaily()
    }

    render() {
        return (
            <View style={{
                marginTop: 25,
                alignItems: "center"
            }}>
                {/* Option bar at the top holding Daily, Weekly, Monthly*/}
                <View style={{
                    flexDirection: "row",
                    marginHorizontal: 25,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#CCCCCC",
                    height: 26,
                    borderRadius: 30,
                }}>
                    <TouchableHighlight
                        style={this.state.holderStyle_arr[0]}

                        underlayColor="black"
                        onPress={this.chooseDaily}
                    >
                        <Text
                            style={this.state.textStyle_arr[0]}
                        >
                            Daily
                    </Text>

                    </TouchableHighlight>

                    <TouchableHighlight
                        style={this.state.holderStyle_arr[1]}

                        underlayColor="black"
                        onPress={this.chooseWeekly}
                    >
                        <Text
                            style={this.state.textStyle_arr[1]}
                        >
                            Weekly
                    </Text>

                    </TouchableHighlight>

                    <TouchableHighlight
                        style={this.state.holderStyle_arr[2]}

                        underlayColor="black"
                        onPress={this.chooseMonthly}
                    >
                        <Text
                            style={this.state.textStyle_arr[2]}
                        >
                            Monthly
                    </Text>

                    </TouchableHighlight>

                </View>

                {this.currentIndex === 0 ?
                    <DailyRepeatOption />

                    :

                    <>
                        {this.currentIndex === 1 ?
                            <DayWeeklyRepeatOption />

                            :

                            <>
                                {this.currentIndex === 2 ?
                                    <MonthlyRepeatOption />

                                    :
                                    <></>
                                }
                            </>

                        }
                    </>

                }

            </View>
        )
    }

}

// Render 'Every 1 days' (Creating Daily Task)
class DailyRepeatOption extends React.PureComponent {
    styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 24,
        }
    })

    state = {
        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    render() {
        return (
            <View
                style={this.styles.container}
            >
                <Text>Every</Text>

                <TextInput
                    keyboardType="numbers-and-punctuation"
                    placeholder="1"
                    onChange={this._onChange}
                    value={this.state.value}
                    maxLength={2}
                    style={{
                        width: 27,
                        height: 20,
                        borderBottomWidth: 1,
                        borderStyle: "solid",
                        borderBottomColor: "gainsboro",
                        textAlign: "center",
                        marginLeft: 10
                    }}
                />

                <Text
                    style={{
                        marginLeft: 10,
                    }}
                >
                    days
                </Text>
            </View>
        )
    }
}

// Render days in a week (Creating Daily Task)
class DayWeeklyRepeatOption extends React.PureComponent {
    styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 24,
            marginHorizontal: 25,
            height: 26,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#CCCCCC"
        }
    })



    state = {
        currentIndex: -1,
        lastIndex: -1,

        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    changeCurrentIndex = (index) => {
        this.setState(prevState => ({
            currentIndex: index,
            lastIndex: prevState.currentIndex
        }))
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <View
                    style={this.styles.container}
                >
                    <WeeklyOption
                        day="Mon"
                        noLeftBorder={true}
                        currentIndex={this.state.currentIndex}
                        lastIndex={this.state.lastIndex}
                        index={0}
                        changeCurrentIndex={this.changeCurrentIndex} />

                    <WeeklyOption
                        day="Tue"
                        currentIndex={this.state.currentIndex}
                        lastIndex={this.state.lastIndex}
                        index={1}
                        changeCurrentIndex={this.changeCurrentIndex} />

                    <WeeklyOption
                        day="Wed"
                        currentIndex={this.state.currentIndex}
                        lastIndex={this.state.lastIndex}
                        index={2}
                        changeCurrentIndex={this.changeCurrentIndex} />

                    <WeeklyOption
                        day="Thu"
                        currentIndex={this.state.currentIndex}
                        lastIndex={this.state.lastIndex}
                        index={3}
                        changeCurrentIndex={this.changeCurrentIndex} />

                    <WeeklyOption
                        day="Fri"
                        currentIndex={this.state.currentIndex}
                        lastIndex={this.state.lastIndex}
                        index={4}
                        changeCurrentIndex={this.changeCurrentIndex} />

                    <WeeklyOption
                        day="Sat"
                        currentIndex={this.state.currentIndex}
                        lastIndex={this.state.lastIndex}
                        index={5}
                        changeCurrentIndex={this.changeCurrentIndex} />

                    <WeeklyOption
                        day="Sun"
                        currentIndex={this.state.currentIndex}
                        lastIndex={this.state.lastIndex}
                        index={6}
                        changeCurrentIndex={this.changeCurrentIndex} />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 24,
                    }}
                >
                    <Text>Every</Text>

                    <TextInput
                        keyboardType="numbers-and-punctuation"
                        placeholder="1"
                        onChange={this._onChange}
                        value={this.state.value}
                        maxLength={2}
                        style={{
                            width: 27,
                            height: 20,
                            borderBottomWidth: 1,
                            borderStyle: "solid",
                            borderBottomColor: "gainsboro",
                            textAlign: "center",
                            marginLeft: 10
                        }}
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        weeks
                    </Text>
                </View>
            </>
        )
    }
}

// A day in a week such as Mon, Tue, Thu, etc (Creating Daily Task)
class WeeklyOption extends React.PureComponent {
    static styles = StyleSheet.create({
        holderStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        textStyle: {
            color: "black"
        }
    })

    state = {
        holderStyle: WeeklyOption.styles.holderStyle,
        textStyle: WeeklyOption.styles.textStyle,
        chosen: false
    }

    _onPress = () => {
        // this.props.changeCurrentIndex(this.props.index)
        this.setState(prevState => ({
            chosen: !prevState.chosen,
        }))

        if (this.state.holderStyle.hasOwnProperty("backgroundColor")) {
            if (this.state.holderStyle["backgroundColor"] === "black") {
                this.setState({
                    holderStyle: { ...WeeklyOption.styles.holderStyle },
                    textStyle: { ...WeeklyOption.styles.textStyle }
                })
            }
        }

        else {
            this.setState({
                holderStyle: { ...WeeklyOption.styles.holderStyle, backgroundColor: "black" },
                textStyle: { ...WeeklyOption.styles.textStyle, color: "white" }
            })
        }
    }

    // // Use to only update 2 components at a time when want to use componentDidUpdate
    // shouldComponentUpdate(nextProps, nextState){
    //     return (this.props.currentIndex !== nextProps.currentIndex && (nextProps.currentIndex === this.props.index || this.props.currentIndex === this.props.index))
    //             || (this.state.holderStyle !== nextState.holderStyle && this.state.textStyle !== nextState.textStyle)
    // }

    // Use to only update 2 components at a time for getDerivedStateFromProp
    // shouldComponentUpdate(nextProps, nextState) {
    //     return (this.props.index === nextProps.currentIndex) || (this.props.index === nextProps.lastIndex)
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     //nextProps.index is fixed
    //     if (nextProps.currentIndex === nextProps.index) {
    //         return ({
    //             holderStyle: { ... WeeklyOption.styles.holderStyle, backgroundColor: "black" },
    //             textStyle: { ... WeeklyOption.styles.textStyle, color: "white" }
    //         })
    //     }

    //     else if(nextProps.lastIndex === nextProps.index){
    //         return ({
    //             holderStyle: WeeklyOption.styles.holderStyle,
    //             textStyle: WeeklyOption.styles.textStyle
    //         })
    //     }

    //     return null
    // }

    componentDidMount() {
    }

    // // Will render a second rerendering and require additional condition for state updating in shouldComponentUpdate
    // componentDidUpdate(prevProps, prevState){
    //     // When choosing this option - being the currentIndex
    //     if(this.props.index === this.props.currentIndex && this.props.currentIndex !== prevProps.currentIndex){
    //         this.setState({
    //             holderStyle: {... this.styles.holderStyle, backgroundColor: "black"},
    //             textStyle: {... this.styles.textStyle, color: "white"}
    //         })
    //     }

    //     // When this is the last chosen one - being the previous prop of currentIndex
    //     else if(this.props.index === prevProps.currentIndex && this.props.currentIndex !== prevProps.currentIndex){
    //         this.setState({
    //             holderStyle: this.styles.holderStyle,
    //             textStyle: this.styles.textStyle
    //         })
    //     }
    // }

    render() {
        return (
            <>
                {this.props.noLeftBorder ?
                    <TouchableHighlight
                        style={this.state.holderStyle}
                        onPress={this._onPress}
                    >
                        <Text style={this.state.textStyle}>{this.props.day}</Text>
                    </TouchableHighlight>
                    :

                    <TouchableHighlight
                        style={{ ...this.state.holderStyle, ... { borderLeftWidth: 1, borderColor: "#CCCCCC" } }}
                        onPress={this._onPress}
                    >
                        <Text style={this.state.textStyle}>{this.props.day}</Text>
                    </TouchableHighlight>
                }
            </>
        )
    }
}

// 'Every 1 months' (Creating Daily Task)
class MonthlyRepeatOption extends React.PureComponent {
    styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 24,
        }
    })

    state = {
        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    render() {
        return (
            <View
                style={this.styles.container}
            >
                <Text>Every</Text>

                <TextInput
                    keyboardType="numbers-and-punctuation"
                    placeholder="1"
                    onChange={this._onChange}
                    value={this.state.value}
                    maxLength={2}
                    style={{
                        width: 27,
                        height: 20,
                        borderBottomWidth: 1,
                        borderStyle: "solid",
                        borderBottomColor: "gainsboro",
                        textAlign: "center",
                        marginLeft: 10
                    }}
                />

                <Text
                    style={{
                        marginLeft: 10,
                    }}
                >
                    months
                </Text>
            </View>
        )
    }
}


class WeeklyRepeatOption extends React.PureComponent {
    styles = StyleSheet.create({
        container: {
            marginTop: 24,
        }
    })

    state = {
        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text.replace(/[^0-9]/g, "")
        })
    }

    _toggleWeekOptionInWeeklyTask = () => {
        this.props.toggleWeekOptionInWeeklyTask()
    }

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Text>
                    Every
                </Text>

                <TextInput
                    style={{
                        height: 20,
                        width: 27,
                        textAlign: "center",
                        borderColor: "gainsboro",
                        borderBottomWidth: 1,
                        marginLeft: 10,
                    }}

                    placeholder="1"
                    keyboardType="numbers-and-punctuation"
                    maxLength={2}

                    value={this.state.value}
                    onChange={this._onChange}
                />

                <TouchableHighlight
                    style={{
                        marginLeft: 10,
                        height: 20,
                        width: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: "gainsboro",
                        borderBottomWidth: 1,

                    }}

                    onPress={this._toggleWeekOptionInWeeklyTask}
                >
                    <Text>{this.props.weekly_repeat_picker_value}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class WeeklyRepeatWeekMonthModal extends React.PureComponent {

    _toggleWeekOptionInWeeklyTask = () => {
        this.props.toggleWeekOptionInWeeklyTask()
    }

    _onValueChange = (itemValue, itemIndex) => {
        this.props.setWeeklyRepeatPickerValue(itemValue)
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <TouchableWithoutFeedback
                    onPress={this._toggleWeekOptionInWeeklyTask}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "black",
                            opacity: 0.5,
                        }}
                    >

                    </View>
                </TouchableWithoutFeedback>

                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        height: 250,
                        right: 0,
                        left: 0,
                        justifyContent: "center",
                        backgroundColor: "#EFEFEF"
                    }}
                >
                    <Picker
                        selectedValue={this.props.weekly_repeat_picker_value}
                        onValueChange={this._onValueChange}
                    >
                        <Picker.Item label="weeks" value="weeks" />
                        <Picker.Item label="months" value="months" />
                    </Picker>
                </View>

            </Modal>
        )
    }
}

// 'End' holder
export class EndRepeatHolder extends React.PureComponent {

    styles = StyleSheet.create({
        unChosenRadioStyle: {
            height: 16,
            width: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "black"
        },

        chosenRadioStyle: {
            height: 16,
            width: 16,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: "black",
            backgroundColor: "black"
        }
    })

    currentIndex = -1
    lastIndex = -1

    convertDateString = (date) => {
        let dateTime = new Date(date)
        return dateTime.getDate() + " " + shortMonthNames[dateTime.getMonth()] + " " + dateTime.getFullYear()
    }

    //We can initialize values directly inside state to avoid a second render.
    //For this to work, need to put used functions and variables before declaring state or they will be undefined.
    state = {
        afterOccurranceValue: "",
        chosenDate: this.convertDateString(this.props.chosenDate),

        radio_style_arr: Array.from(Array(3), (value, index) => this.styles.unChosenRadioStyle), //value will be undefine because Array(3) has 3 undefined values
    }

    _onChange = (e) => {
        this.setState({
            afterOccurranceValue: e.nativeEvent.text.replace(/[^0-9]/g, "")
        })
    }

    _onFocus = (e) => {
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.doWhenKeyboardWillShow
        )

        this.keyboardWillHideListener = Keyboard.addListener(
            'keyboardWillHide',
            this.doWhenKeyboardWillHide
        )
    }

    _onBlur = (e) => {
        Keyboard.removeListener('keyboardWillShow', this.doWhenKeyboardWillShow)
        Keyboard.removeListener('keyboardWillHide', this.doWhenKeyboardWillHide)
    }

    chooseOptionRadio = (index) => {
        this.lastIndex = this.currentIndex
        this.currentIndex = index

        if (this.lastIndex === this.currentIndex) {
            this.lastIndex = -1
        }

        let radio_style_arr = [... this.state.radio_style_arr]

        radio_style_arr[this.currentIndex] = this.styles.chosenRadioStyle
        radio_style_arr[this.lastIndex] = this.styles.unChosenRadioStyle

        this.setState({
            radio_style_arr: [...radio_style_arr]
        })
    }

    doWhenKeyboardWillShow = () => {
        this.props.setStyleToTransit()
    }

    doWhenKeyboardWillHide = () => {
        this.props.resetStyle()
    }

    openDatePickerIOS = () => {
        this.props.toggleEndOnDate()
    }



    componentDidMount() {
        this.chooseOptionRadio(0)
    }

    componentWillUnmount() {
        this._onBlur()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.chosenDate !== prevProps.chosenDate) {
            this.setState({
                chosenDate: this.convertDateString(this.props.chosenDate)
            })
        }
    }

    render() {
        return (
            <View style={{
                marginLeft: 30,
                marginTop: 25,
                marginRight: 27,
            }}>
                {/* Render the row of 'Never' */}
                <View style={{
                    flexDirection: "row",
                    height: 24,
                    justifyContent: "space-between"
                }}>
                    <Text>
                        Never
                    </Text>

                    <TouchableHighlight
                        style={this.state.radio_style_arr[0]}

                        onPress={this.chooseOptionRadio.bind(this, 0)}
                    >
                        <></>
                    </TouchableHighlight>
                </View>

                {/* Render the row of 'On' */}
                <View style={{
                    flexDirection: "row",
                    height: 24,
                    justifyContent: "space-between",
                    marginTop: 23,
                }}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Text>
                            On
                        </Text>

                        <TouchableHighlight
                            style={{
                                width: 150,
                                marginLeft: 20,
                                height: 20,
                                borderBottomWidth: 1,
                                borderBottomColor: "gainsboro",
                                alignItems: "center"
                            }}

                            onPress={this.openDatePickerIOS}
                        >
                            <Text>{this.state.chosenDate}</Text>
                        </TouchableHighlight>
                    </View>


                    <TouchableHighlight
                        style={this.state.radio_style_arr[1]}

                        onPress={this.chooseOptionRadio.bind(this, 1)}
                    >
                        <></>
                    </TouchableHighlight>
                </View>


                {/* Render the row of 'After' */}
                <View style={{
                    flexDirection: "row",
                    height: 24,
                    justifyContent: "space-between",
                    marginTop: 23,
                }}>
                    <View style={{
                        flexDirection: "row"
                    }}>
                        <Text>
                            After
                        </Text>


                        <TextInput
                            style={{
                                width: 27,
                                height: 19,
                                borderBottomWidth: 1,
                                borderColor: "gainsboro",
                                textAlign: "center",
                                marginLeft: 10
                            }}
                            onFocus={this._onFocus}
                            onBlur={this._onBlur}
                            onChange={this._onChange}
                            value={this.state.afterOccurranceValue}
                            placeholder="0"
                            keyboardType="numbers-and-punctuation"
                            maxLength={2}
                        />

                        <Text style={{
                            marginLeft: 10
                        }}>
                            occurrances
                        </Text>
                    </View>


                    <TouchableHighlight
                        style={this.state.radio_style_arr[2]}

                        onPress={this.chooseOptionRadio.bind(this, 2)}
                    >
                        <></>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}