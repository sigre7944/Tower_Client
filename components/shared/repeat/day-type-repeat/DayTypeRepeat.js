import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
    Dimensions,
    Animated,
    Easing,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';

import { styles } from './styles/styles'

import RepeatValueHolder from './repeat-value-holder/RepeatValueHolder'
import ChooseDayInWeekOption from './choose-day-in-week-option/ChooseDayInWeekOption'

import RepeatEndOptionsHolder from './repeat-end-options-holder/RepeatEndOptionsHolder'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faFlag,
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

const animation_duration = 250
const easing = Easing.inOut(Easing.linear)
const window_width = Dimensions.get("window").width
const margin_bottom_of_last_row = 35

export default class DayTypeRepeat extends React.PureComponent {

    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = new Animated.Value(0.3)

    state = {
        selected_repeat_type: "days",

        repeat_input_value: "1",

        after_occurrence_value: "1",

        goal_value: "1",

        should_animate_translate_y: true
    }

    _setRepeatType = (repeat_type) => {
        this.setState({
            selected_repeat_type: repeat_type
        })
    }

    _onChangeRepeatInput = (e) => {
        this.setState({
            repeat_input_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    _resetRepeatInput = () => {
        if (this.state.repeat_input_value.length === 0) {
            this.setState({
                repeat_input_value: "1"
            })
        }
    }

    _onChangeAfterOccurrenceValue = (e) => {
        this.setState({
            after_occurrence_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    _resetAfterOccurrenceInput = () => {
        if (this.state.after_occurrence_value.length === 0) {
            this.setState({
                after_occurrence_value: "1"
            })
        }
    }

    _onChangeGoalValue = (e) => {
        this.setState({
            goal_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    _resetGoalValueInput = () => {
        if (this.state.goal_value.length === 0) {
            this.setState({
                goal_value: "1"
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

    _dontAnimateRepeatWhenFocusInput = () => {
        this.setState({
            should_animate_translate_y: false
        })
    }

    _keyboardWillHideHandler = (e) => {
        this.setState({
            should_animate_translate_y: true
        })

        this._resetRepeatInput()
        this._resetAfterOccurrenceInput()
        this._resetGoalValueInput()
    }

    close = () => {
        this.props.hideAction()
    }

    save = () => {
        this.props.hideAction()
    }

    componentDidMount() {
        this.animateRepeat()

        this._keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", this._keyboardWillHideHandler)
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillHide", this._keyboardWillHideHandler)
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: 338,
                    transform: [{ scale: this.repeat_scale_value }],
                    backgroundColor: 'white',
                    borderRadius: 10,
                    opacity: this.repeat_opacity_value,
                    overflow: "hidden"
                }}
            >
                <KeyboardAvoidingView
                    behavior={"position"}
                    enabled={this.state.should_animate_translate_y}
                >
                    <ScrollView
                        keyboardDismissMode="on-drag"
                        scrollEnabled={false}
                    >

                        <RepeatValueHolder
                            repeat_input_value={this.state.repeat_input_value}
                            _onChangeRepeatInput={this._onChangeRepeatInput}
                            _dontAnimateRepeatWhenFocusInput={this._dontAnimateRepeatWhenFocusInput}
                            selected_repeat_type={this.state.selected_repeat_type}
                            _setRepeatType={this._setRepeatType}
                        />

                        <ChooseDayInWeekOption />

                        {/* Separating line */}
                        <View
                            style={styles.separating_line}
                        >
                        </View>

                        <RepeatEndOptionsHolder
                            after_occurrence_value={this.state.after_occurrence_value}
                            _onChangeAfterOccurrenceValue={this._onChangeAfterOccurrenceValue}
                        />

                        {/* Separating line */}
                        <View
                            style={styles.separating_line}
                        >
                        </View>

                        <GoalHolder
                            goal_value={this.state.goal_value}
                            _onChangeGoalValue={this._onChangeGoalValue}
                        />

                        <View
                            style={{
                                marginTop: 30,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginHorizontal: 30,
                                marginBottom: margin_bottom_of_last_row,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.close_button_container}
                                onPress={this.close}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    color="white"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.save_button_container}
                                onPress={this.save}
                            >
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>

            </Animated.View >
        )
    }
}

class GoalHolder extends React.PureComponent {

    _onPress = () => {
        if (this._text_input_ref) {
            this._text_input_ref.focus()
        }
    }

    _setRef = (r) => {
        this._text_input_ref = r
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
                        icon={faFlag}
                        color="#2C2C2C"
                        size={14}
                    />

                    <Text
                        style={styles.title_text}
                    >
                        Goal
                    </Text>
                </View>

                <TouchableOpacity
                    style={{
                        marginTop: 25,
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 39,
                    }}

                    onPress={this._onPress}
                >
                    <TextInput
                        style={styles.every_option_input}
                        keyboardType="numbers-and-punctuation"
                        maxLength={2}
                        placeholder="1"
                        value={this.props.goal_value}
                        onChange={this.props._onChangeGoalValue}
                        ref={this._setRef}
                        autoCorrect={false}
                    />

                    <View
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        <Text
                            style={styles.every_option_text}
                        >
                            times per day
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}