import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Keyboard
} from 'react-native';

export default class Goal extends React.Component {

    render() {
        return (
            <View
                style={{
                    position: "absolute",
                    width: 338,
                    height: 204,
                    borderRadius: 10,
                    backgroundColor: "white",
                    paddingVertical: 33,
                    paddingHorizontal: 30,
                }}
            >
                <Text>Goal</Text>

                <GoalPerTimesRow
                    currentAnnotation={this.props.currentAnnotation}
                    updateGoal={this.props.updateGoal}
                    {... this.props}
                />
            </View>
        )
    }
}

class GoalPerTimesRow extends React.PureComponent {

    regExp = new RegExp(/^\d+$/)

    state = {
        interval: "",
        value: "1"
    }

    data = {}

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text.replace(/[^0-9]/g, "")
        })
    }

    toDoWillHide = () => {
        if (this.state.value === "" || this.state.value === "0") {
            this.setState({
                value: "1"
            })
        }
    }

    _updateGoal = (value) => {
        this.data = {
            max: parseInt(value),
            current: 0,
        }

        if (this.props.currentAnnotation === "day") {
            this.props.updateGoal("UPDATE_NEW_DAY_TASK", this.data)
        }

        else if (this.props.currentAnnotation === "week") {
            this.props.updateGoal("UPDATE_NEW_WEEK_TASK", this.data)
        }

        else if (this.props.currentAnnotation === "month") {
            this.props.updateGoal("UPDATE_NEW_MONTH_TASK", this.data)
        }
    }

    save = () => {
        this._updateGoal(this.state.value)
        this.props.disableAllTabs()
    }

    componentDidMount() {
        if (this.props.currentAnnotation === "day") {
            let { goal } = this.props.currentDayTask

            this.setState(prevState => ({
                interval: "times per day",
                value: goal && parseInt(goal.max) > 0 ? `${goal.max}` : "1"
            }))
        }

        else if (this.props.currentAnnotation === "week") {
            let { goal } = this.props.currentWeekTask

            this.setState(prevState => ({
                interval: "times per week",
                value: goal && parseInt(goal.max) > 0 ? `${goal.max}` : "1"
            }))
        }

        else {
            let { goal } = this.props.currentMonthTask

            this.setState(prevState => ({
                interval: " times per month",
                value: goal && parseInt(goal.max) > 0 ? `${goal.max}` : "1"
            }))
        }

        this.willHideListener = Keyboard.addListener(
            "keyboardWillHide",
            this.toDoWillHide
        )
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillHide", this.toDoWillHide)
    }

    render() {
        return (
            <>
                <View
                    style={{
                        marginTop: 26,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextInput
                        style={{
                            width: 27,
                            height: 20,
                            borderBottomWidth: 1,
                            borderColor: "gainsboro",
                            textAlign: "center"
                        }}

                        value={this.state.value}
                        onChange={this._onChange}
                        placeholder={"0"}
                        keyboardType={"numbers-and-punctuation"}
                        autoCorrect={false}
                        maxLength={2}
                    />

                    <Text
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        {this.state.interval}
                    </Text>


                </View>
                <View
                    style={{
                        height: 60,
                        marginBottom: 10,
                        backgroundColor: 'white',
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: 'center'
                    }}
                >
                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 20
                        }}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            X
                        </Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: 'gray',
                            marginRight: 10
                        }}

                        onPress={this.save}
                    >
                        <Text
                            style={{
                                color: "white"
                            }}
                        >
                            OK
                        </Text>
                    </TouchableHighlight>
                </View>
            </>
        )
    }
}