import React from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
    Switch,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
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

const panel_width = 338
const animation_duration = 250
const easing = Easing.inOut(Easing.linear)

export default class Priority extends React.PureComponent {
    repeat_opacity_value = new Animated.Value(0.3)
    repeat_scale_value = new Animated.Value(0.3)

    priority_colors = ["#F78096", "#EFDA6E", "#6F73D9", "#CBC8C8"]

    state = {
        selected_priority_value: "Do first",
        selected_priority_color: "#F78096",

        is_important: false,

        is_urgent: false,

        reward_value: "5"
    }

    _onImportanceChange = (value) => {
        this.setState({
            is_important: value
        })
    }

    _onUrgencyChange = (value) => {
        this.setState({
            is_urgent: value
        })
    }

    _onRewardValueChange = (e) => {
        this.setState({
            reward_value: e.nativeEvent.text.replace(/[^0-9]/g, '')
        })
    }

    _animate = () => {
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
        this._animate()
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    width: panel_width,
                    backgroundColor: "white",
                    borderRadius: 10,
                    overflow: "hidden",
                    transform: [{ scale: this.repeat_scale_value }],
                    opacity: this.repeat_opacity_value,
                }}
            >
                <ScrollView
                    scrollEnabled={false}
                    keyboardDismissMode="on-drag"
                >
                    <KeyboardAvoidingView
                        behavior="position"
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
                                style={{
                                    paddingHorizontal: 15,
                                    paddingVertical: 5,
                                    borderRadius: 15,
                                    backgroundColor: this.state.selected_priority_color
                                }}
                            >
                                <Text>
                                    {this.state.selected_priority_value}
                                </Text>
                            </TouchableOpacity>
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

                                    value={this.state.reward_value}
                                    onChange={this._onRewardValueChange}
                                    maxLength={2}
                                    keyboardType="numbers-and-punctuation"
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
                    </KeyboardAvoidingView>
                </ScrollView>
            </Animated.View>
        )
    }
}