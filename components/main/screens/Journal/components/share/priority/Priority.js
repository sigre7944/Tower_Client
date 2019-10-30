import React from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Easing,
    Switch,
    TextInput,
    ScrollView,
    Keyboard,
    UIManager,
    Dimensions
} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faExclamationTriangle,
    faQuestion,
    faTrophy,
    faTimes,
    faCheck
} from '@fortawesome/free-solid-svg-icons'

import { styles } from './styles/styles'
import { Map, fromJS } from "immutable"

import PriorityPicker from './priority-picker/PriorityPicker'

const panel_width = 338
const panel_height = 375
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)
const window_height = Dimensions.get("window").height

const extra_margin_from_keyboard = 10

const text_input_state = TextInput.State

export default class Priority extends React.PureComponent {
    opacity_value = new Animated.Value(0.3)
    scale_value = new Animated.Value(0.3)
    translate_y_value = new Animated.Value(0)

    priority_stored_rewards = {
        pri_01: {
            defaultValue: Map(this.props.priorities).getIn(["pri_01", "defaultValue"]),
            setValue: Map(this.props.priorities).getIn(["pri_01", "defaultValue"])
        },

        pri_02: {
            defaultValue: Map(this.props.priorities).getIn(["pri_02", "defaultValue"]),
            setValue: Map(this.props.priorities).getIn(["pri_02", "defaultValue"])
        },

        pri_03: {
            defaultValue: Map(this.props.priorities).getIn(["pri_03", "defaultValue"]),
            setValue: Map(this.props.priorities).getIn(["pri_03", "defaultValue"])
        },

        pri_04: {
            defaultValue: Map(this.props.priorities).getIn(["pri_04", "defaultValue"]),
            setValue: Map(this.props.priorities).getIn(["pri_04", "defaultValue"])
        },
    }

    state = {
        selected_priority_value: "Do first",

        is_important: true,

        is_urgent: true,

        reward_value: "5",

        should_display_priority_picker: false,
    }

    _choosePriorityPicker = () => {
        this.setState({
            should_display_priority_picker: true
        })
    }

    _closePriorityPicker = () => {
        this.setState({
            should_display_priority_picker: false
        })
    }

    _setPriorityValue = (value) => {
        if (value === "Do first") {
            this.setState({
                selected_priority_value: value,
                is_important: true,
                is_urgent: true,
                reward_value: Map(this.props.priorities).getIn(["pri_01", "defaultValue"]).toString()
            })
        }

        else if (value === "Plan") {
            this.setState({
                selected_priority_value: value,
                is_important: true,
                is_urgent: false,
                reward_value: Map(this.props.priorities).getIn(["pri_02", "defaultValue"]).toString()
            })
        }

        else if (value === "Delay") {
            this.setState({
                selected_priority_value: value,
                is_important: false,
                is_urgent: true,
                reward_value: Map(this.props.priorities).getIn(["pri_03", "defaultValue"]).toString()
            })
        }

        else {
            this.setState({
                selected_priority_value: value,
                is_important: false,
                is_urgent: false,
                reward_value: Map(this.props.priorities).getIn(["pri_04", "defaultValue"]).toString()
            })
        }
    }

    _onImportanceChange = (value) => {
        if (value === true) {
            if (this.state.is_urgent) {
                this.setState({
                    is_important: value,
                    selected_priority_value: "Do first",
                    reward_value: Map(this.props.priorities).getIn(["pri_01", "defaultValue"]).toString()
                })
            }

            else {
                this.setState({
                    is_important: value,
                    selected_priority_value: "Plan",
                    reward_value: Map(this.props.priorities).getIn(["pri_02", "defaultValue"]).toString()
                })
            }
        }

        else {
            if (this.state.is_urgent) {
                this.setState({
                    is_important: value,
                    selected_priority_value: "Delay",
                    reward_value: Map(this.props.priorities).getIn(["pri_03", "defaultValue"]).toString()
                })
            }

            else {
                this.setState({
                    is_important: value,
                    selected_priority_value: "Delegate",
                    reward_value: Map(this.props.priorities).getIn(["pri_04", "defaultValue"]).toString()
                })
            }
        }
    }

    _onUrgencyChange = (value) => {
        if (value === true) {
            if (this.state.is_important) {
                this.setState({
                    is_urgent: value,
                    selected_priority_value: "Do first",
                    reward_value: Map(this.props.priorities).getIn(["pri_01", "defaultValue"]).toString()
                })
            }

            else {
                this.setState({
                    is_urgent: value,
                    selected_priority_value: "Delay",
                    reward_value: Map(this.props.priorities).getIn(["pri_03", "defaultValue"]).toString()
                })
            }
        }

        else {
            if (this.state.is_important) {
                this.setState({
                    is_urgent: value,
                    selected_priority_value: "Plan",
                    reward_value: Map(this.props.priorities).getIn(["pri_02", "defaultValue"]).toString()
                })
            }

            else {
                this.setState({
                    is_urgent: value,
                    selected_priority_value: "Delegate",
                    reward_value: Map(this.props.priorities).getIn(["pri_04", "defaultValue"]).toString()
                })
            }
        }
    }

    _onRewardValueChange = (e) => {
        this.setState({
            reward_value: e.nativeEvent.text.replace(/[,]/g, ".")
        })
    }


    _animate = () => {
        Animated.parallel([
            Animated.timing(
                this.opacity_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.scale_value,
                {
                    toValue: 1,
                    duration: animation_duration,
                    easing,
                    useNativeDriver: true
                }
            )
        ]).start()
    }

    _cancel = () => {
        this.props.hideAction()
    }

    _save = () => {
        let { selected_priority_value, reward_value } = this.state

        let priority_id = ""

        if (selected_priority_value === "Do first") {
            priority_id = "pri_01"
        }

        else if (selected_priority_value === "Plan") {
            priority_id = "pri_02"
        }

        else if (selected_priority_value === "Delay") {
            priority_id = "pri_03"
        }

        else {
            priority_id = "pri_04"
        }

        let sending_obj = {
            keyPath: ["priority"],
            notSetValue: {},
            updater: (value) => fromJS({
                value: priority_id,
                reward: parseFloat(reward_value)
            })
        }

        this.props.updateTaskPriority(sending_obj)

        this.props.hideAction()
    }

    _setDefaultRewardValue = () => {
        if (this.state.selected_priority_value === "Do first") {
            this.setState({
                reward_value: Map(this.props.priorities).getIn(["pri_01", "defaultValue"]).toString()
            })
        }

        else if (this.state.selected_priority_value === "Plan") {
            this.setState({
                reward_value: Map(this.props.priorities).getIn(["pri_02", "defaultValue"]).toString()
            })
        }

        else if (this.state.selected_priority_value === "Delay") {
            this.setState({
                reward_value: Map(this.props.priorities).getIn(["pri_03", "defaultValue"]).toString()
            })
        }

        else {
            this.setState({
                reward_value: Map(this.props.priorities).getIn(["pri_04", "defaultValue"]).toString()
            })
        }
    }

    _keyboardWillHideHandler = (e) => {
        if (this.state.reward_value.length === 0) {
            this._setDefaultRewardValue()
        }

        Animated.timing(
            this.translate_y_value,
            {
                toValue: 0,
                duration: e.duration,
                useNativeDriver: true
            }
        ).start()
    }

    _keyboardWillShowHandler = (e) => {
        let keyboard_height = e.endCoordinates.height,
            keyboard_duration = e.duration

        let currently_focused_input = text_input_state.currentlyFocusedField()

        UIManager.measure(currently_focused_input, (x, y, width, height, pageX, pageY) => {
            let input_height = height,
                input_py = pageY

            let gap = (window_height - keyboard_height) - (input_height + input_py) - extra_margin_from_keyboard

            if(gap < 0){
                Animated.timing(
                    this.translate_y_value,
                    {
                        toValue: gap,
                        duration: keyboard_duration,
                        useNativeDriver: true
                    }
                ).start()
            }
        })
    }


    componentDidMount() {
        this._animate()

        this.keyboardWillHideListener = Keyboard.addListener("keyboardWillHide", this._keyboardWillHideHandler)
        this.keyboardWillShowListener = Keyboard.addListener("keyboardWillShow", this._keyboardWillShowHandler)

        let priority_id = Map(this.props.task_data).getIn(["priority", "value"]),
            reward_value = Map(this.props.task_data).getIn(["priority", "reward"]).toString()

        let priority_value = Map(this.props.priorities).getIn([priority_id, "name"])

        this.setState({
            selected_priority_value: priority_value,
            reward_value
        })
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillHide", this._keyboardWillHideHandler)
        Keyboard.removeListener("keyboardWillShow", this._keyboardWillShowHandler)
    }

    render() {
        let priority_container_style = styles.priority_do_first_container,
            priority_text_style = styles.priority_do_first_text

        if (this.state.selected_priority_value === "Plan") {
            priority_container_style = styles.priority_plan_container
            priority_text_style = styles.priority_plan_text
        }

        else if (this.state.selected_priority_value === "Delay") {
            priority_container_style = styles.priority_delay_container
            priority_text_style = styles.priority_delay_text
        }

        else if (this.state.selected_priority_value === "Delegate") {
            priority_container_style = styles.priority_delegate_container
            priority_text_style = styles.priority_delegate_text
        }

        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: panel_width,
                    height: panel_height,
                    backgroundColor: "white",
                    borderRadius: 10,
                    overflow: "hidden",
                    transform: [{ scale: this.scale_value }],
                    opacity: this.opacity_value,
                }}
            >
                <Animated.View
                    style={{
                        transform: [{ translateY: this.translate_y_value }]
                    }}
                >
                    <ScrollView
                        scrollEnabled={false}
                        keyboardDismissMode="on-drag"
                    >
                        <View
                            style={{
                                marginTop: 30,
                                marginHorizontal: 30,
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
                                <FontAwesomeIcon
                                    icon={faExclamationTriangle}
                                    size={14}
                                    color="#2C2C2C"
                                />

                                <Text
                                    style={styles.title}
                                >
                                    Priority
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: 15,
                                        height: 15,
                                        borderRadius: 15,
                                        backgroundColor: "#2D9CDB",
                                        marginLeft: 15,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faQuestion}
                                        color="white"
                                        size={7}
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={priority_container_style}

                                onPress={this._choosePriorityPicker}
                            >
                                <Text
                                    style={priority_text_style}
                                >
                                    {this.state.selected_priority_value}
                                </Text>
                            </TouchableOpacity>

                            <PriorityPicker
                                _closePriorityPicker={this._closePriorityPicker}
                                _setPriorityValue={this._setPriorityValue}
                                selected_priority_value={this.state.selected_priority_value}
                                should_display_priority_picker={this.state.should_display_priority_picker}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginLeft: 59,
                                marginRight: 30,
                                marginTop: 30,
                            }}

                        >
                            <Text
                                style={styles.normal_text}
                            >
                                Importance
                                    </Text>

                            <Switch
                                value={this.state.is_important}
                                onValueChange={this._onImportanceChange}
                                trackColor={{
                                    false: "rgba(189, 189, 189, 0.2)",
                                    true: "#05838B"
                                }}
                                ios_backgroundColor="rgba(189, 189, 189, 0.2)"
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginLeft: 59,
                                marginRight: 30,
                                marginTop: 30,
                            }}
                        >
                            <Text
                                style={styles.normal_text}
                            >
                                Urgency
                                    </Text>

                            <Switch
                                value={this.state.is_urgent}
                                onValueChange={this._onUrgencyChange}
                                trackColor={{
                                    false: "rgba(189, 189, 189, 0.2)",
                                    true: "#05838B"
                                }}
                                ios_backgroundColor="rgba(189, 189, 189, 0.2)"
                            />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                height: 1,
                                flexDirection: "row",
                                backgroundColor: "rgba(0, 0, 0, 0.15)",
                                marginHorizontal: 30,
                                marginTop: 30,
                            }}
                        >

                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: 30,
                                marginHorizontal: 30
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faTrophy}
                                    size={14}
                                    color="#2C2C2C"
                                />

                                <Text
                                    style={styles.title}
                                >
                                    Reward
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <TextInput
                                    style={styles.reward_input}
                                    maxLength={4}
                                    value={this.state.reward_value}
                                    onChange={this._onRewardValueChange}
                                    keyboardType="numeric"

                                />

                                <Text
                                    style={styles.currency}
                                >
                                    €
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                marginTop: 28,
                                marginHorizontal: 30,
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                marginBottom: 35,
                            }}
                        >
                            <TouchableOpacity
                                style={styles.close_icon_holder}
                                onPress={this._cancel}
                            >
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    color="white"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.save_icon_holder}
                                onPress={this._save}
                            >
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animated.View>
            </Animated.View >
        )
    }
}