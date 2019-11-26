import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
    Animated,
    Easing
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
    faEdit,
    faSortAmountUpAlt,
    faShareSquare
} from "@fortawesome/free-solid-svg-icons";

import {
    styles
} from './styles/styles'

const window_width = Dimensions.get("window").width
const animation_duration = 100
const easing = Easing.in()
export default class EditMultipleTasks extends React.PureComponent {

    translate_y_value = new Animated.Value(200)

    _animateStart = () => {
        Animated.timing(
            this.translate_y_value,
            {
                toValue: 0,
                duration: animation_duration,
                easing,
                useNativeDriver: true
            }
        ).start()
    }

    _animateEnd = (callback) => {
        Animated.timing(
            this.translate_y_value,
            {
                toValue: 200,
                duration: animation_duration,
                useNativeDriver: true
            }
        ).start(() => {
            callback()
        })
    }

    _close = () => {
        this._animateEnd(this.props._toggleEditMultipleTasksAction)
    }

    _chooseEditMultipleTasks = () => {
        this._animateEnd(() => {
            this.props._toggleEditMultipleTasksAction()
            this.props.navigation.navigate("EditMultipleTasks")
        })
    }

    componentDidMount() {
        this._animateStart()
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        position: "relative"
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={this._close}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: window_width,
                                backgroundColor: "black",
                                opacity: 0.2
                            }}
                        >

                        </View>
                    </TouchableWithoutFeedback>

                    <Animated.View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                            backgroundColor: "white",
                            transform: [{ translateY: this.translate_y_value }],
                            paddingVertical: 5
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                justifyContent: "center",
                                alignItems: "center"
                            }}

                            onPress={this._close}
                        >
                            <View
                                style={{
                                    width: 37,
                                    height: 5,
                                    backgroundColor: "#E0E0E0",
                                    borderRadius: 3
                                }}
                            >

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginTop: 5,
                                paddingHorizontal: 33,
                                flexDirection: "row",
                                alignItems: "center",
                                height: 60,
                            }}

                            onPress={this._chooseEditMultipleTasks}
                        >
                            <FontAwesomeIcon
                                icon={faEdit}
                                size={20}
                                color="#05838B"
                            />

                            <Text
                                style={styles.edit_text}
                            >
                                Edit multiple tasks
                            </Text>
                        </TouchableOpacity>

                        <View
                            style={styles.separating_line}
                        >
                        </View>

                        <TouchableOpacity
                            style={{
                                marginTop: 5,
                                paddingHorizontal: 33,
                                flexDirection: "row",
                                alignItems: "center",
                                height: 60,
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faSortAmountUpAlt}
                                size={20}
                                color="#05838B"
                            />

                            <Text
                                style={styles.edit_text}
                            >
                                Sort by
                            </Text>
                        </TouchableOpacity>

                        <View
                            style={styles.separating_line}
                        >
                        </View>

                        <TouchableOpacity
                            style={{
                                marginTop: 5,
                                paddingHorizontal: 33,
                                flexDirection: "row",
                                alignItems: "center",
                                height: 60,
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faShareSquare}
                                size={20}
                                color="#05838B"
                            />

                            <Text
                                style={styles.edit_text}
                            >
                                Share
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
        )
    }

}   