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
import SortPanel from './sort-panel/SortPanel.Container';

const window_width = Dimensions.get("window").width
const animation_duration = 100
const easing = Easing.in()

export default class ChooseOptions extends React.PureComponent {

    translate_y_value = new Animated.Value(200)

    sort_scale_value = new Animated.Value(0.3)
    sort_opacity_value = this.sort_scale_value.interpolate({
        inputRange: [0, 0.3, 0.5, 0.7, 1],
        outputRange: [0, 0.3, 0.5, 0.7, 1],
        extrapolate: "clamp"
    })

    state = {
        should_display_sort_panel: false
    }

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

    _animateSortStart = () => {
        Animated.timing(
            this.sort_scale_value,
            {
                toValue: 1,
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

    _animateSortEnd = (callback) => {
        Animated.timing(
            this.sort_scale_value,
            {
                toValue: 0,
                duration: animation_duration,
                easing,
                useNativeDriver: true
            }
        ).start(() => {
            callback()
        })
    }

    _close = () => {
        if (this.state.should_display_sort_panel) {
            this._animateSortEnd(this._chooseSortBy)
            this._animateStart()
        }

        else {
            this._animateEnd(this.props._toggleEditMultipleTasksAction)
        }
    }

    _chooseEditMultipleTasks = () => {
        this._animateEnd(() => {
            this.props._toggleEditMultipleTasksAction()
            this.props.navigation.navigate("EditMultipleTasks")
        })
    }

    _chooseSortBy = () => {
        this.setState(prevState => ({
            should_display_sort_panel: !prevState.should_display_sort_panel
        }), () => {
            if (this.state.should_display_sort_panel) {
                this._animateSortStart()
            }
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
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center"
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
                    {this.state.should_display_sort_panel ?
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: 327,
                                paddingVertical: 33,
                                backgroundColor: "white",
                                borderRadius: 10,
                                opacity: this.sort_opacity_value,
                                transform: [{ scale: this.sort_scale_value }],
                                paddingHorizontal: 33,
                            }}
                        >
                            <SortPanel
                                hideAction={this._close}
                            />
                        </Animated.View>
                        :

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
                                onPress={this._chooseSortBy}
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
                    }
                </View>
            </Modal>
        )
    }

}   