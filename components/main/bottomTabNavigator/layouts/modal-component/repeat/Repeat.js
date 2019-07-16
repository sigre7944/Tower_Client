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

    TouchableWithoutFeedback
} from 'react-native';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const shortMonthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

export default class Repeat extends Component {

    state = {
        bottomStyleProperty: 100,
        topStyleProperty: 100,

        datePickerHeight: 0,
        chosenDate: new Date(),

        endOnDateClicked: false,

    }

    toggleEndOnDate = () => {
        this.setState(prevState => ({
            endOnDateClicked: !prevState.endOnDateClicked
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
                                        <></>

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
                                chosenDate = {this.state.chosenDate}
                            />

                        </KeyboardAvoidingView>

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

                            <></>
                        }

                    </>
                    :

                    <></>
                }
            </>
        )
    }
}

RepeatTitle = (props) => (
    <View style={{
        height: 24,
        marginTop: 30,
        marginLeft: 30,
        justifyContent: "center"
    }}>
        <Text>Repeat</Text>
    </View>
)

SeparateLine = (props) => (
    <View style={{
        height: 1,
        backgroundColor: "gainsboro",
        marginHorizontal: 27,
        marginTop: 25,
    }}>

    </View>
)

EndRepeatTitle = (props) => (
    <View style={{
        height: 24,
        marginTop: 26,
        marginLeft: 30,
        justifyContent: "center"
    }}>
        <Text>End</Text>
    </View>
)




class DayRepeatEveryHolder extends Component {
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

    chooseCustom = () => {
        this.handleChoosing(3)
    }

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

                    <TouchableHighlight
                        style={this.state.holderStyle_arr[3]}

                        underlayColor="black"
                        onPress={this.chooseCustom}
                    >
                        <Text
                            style={this.state.textStyle_arr[3]}
                        >
                            Custom
                    </Text>

                    </TouchableHighlight>
                </View>

                {this.currentIndex === 0 ?
                    <DailyRepeatOption />

                    :

                    <></>

                }

            </View>
        )
    }

}


class DailyRepeatOption extends Component {
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

export class EndRepeatHolder extends Component {

    state = {
        afterOccurranceValue: "",
        chosenDate: ""
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

    doWhenKeyboardWillShow = () => {
        this.props.setStyleToTransit()
    }

    doWhenKeyboardWillHide = () => {
        this.props.resetStyle()
    }

    openDatePickerIOS = () => {
        this.props.toggleEndOnDate()
    }

    converDateString = (date) => {
        let dateTime = new Date(date)
        return dateTime.getDate() + " " + shortMonthNames[dateTime.getMonth()] + " " + dateTime.getFullYear()
    }

    componentDidMount(){
        this.setState({
            chosenDate: this.converDateString(this.props.chosenDate)
        })
    }

    componentWillUnmount() {
        this._onBlur()
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.chosenDate !== prevProps.chosenDate){
            this.setState({
                chosenDate: this.converDateString(this.props.chosenDate)
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
                <View style={{
                    flexDirection: "row",
                    height: 24,
                    justifyContent: "space-between"
                }}>
                    <Text>
                        Never
                    </Text>

                    <TouchableHighlight
                        style={{
                            height: 16,
                            width: 16,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: "black"
                        }}
                    >
                        <></>
                    </TouchableHighlight>
                </View>

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
                        style={{
                            height: 16,
                            width: 16,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: "black"
                        }}
                    >
                        <></>
                    </TouchableHighlight>
                </View>

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
                        style={{
                            height: 16,
                            width: 16,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: "black"
                        }}
                    >
                        <></>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}