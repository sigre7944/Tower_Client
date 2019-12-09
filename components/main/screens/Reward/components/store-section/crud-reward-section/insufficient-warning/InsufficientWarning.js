import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Animated,
    Easing
} from 'react-native';

import { styles } from "./styles/styles";

const easing = Easing.in()
const anim_duration = 250
const window_width = Dimensions.get("window").width

export default class InsufficientWarning extends React.PureComponent {
    warning_scale_value = new Animated.Value(0)
    warning_opacity_value = this.warning_scale_value.interpolate({
        inputRange: [0, 0.3, 0.5, 0.7, 1],
        outputRange: [0, 0.3, 0.5, 0.7, 1],
        extrapolate: "clamp"
    })

    _animateStartWarning = () => {
        Animated.timing(
            this.warning_scale_value,
            {
                toValue: 1,
                duration: anim_duration,
                easing
            }
        ).start()
    }

    _animateEndWarning = (callback) => {
        Animated.timing(
            this.warning_scale_value,
            {
                toValue: 0,
                duration: anim_duration,
                easing
            }
        ).start(() => { callback() })
    }

    _closeWarning = () => {
        this._animateEndWarning(this.props.dismissAction)
    }

    componentDidMount() {
        this._animateStartWarning()
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative"
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={this._closeWarning}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: window_width,
                                backgroundColor: "black",
                                opacity: 0.2
                            }}
                        />
                    </TouchableWithoutFeedback>

                    <Animated.View
                        style={{
                            position: "absolute",
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingVertical: 22,
                            paddingHorizontal: 22,
                            width: 300,
                            transform: [{ scale: this.warning_scale_value }],
                            opacity: this.warning_opacity_value
                        }}
                    >
                        <Text
                            style={{ ...styles.warning_text, ...{ color: "#EB5757", fontSize: 21, lineHeight: 24 } }}
                        >
                            Insufficient points!
                        </Text>

                        <Text
                            style={{ ...styles.warning_text, ...{ marginTop: 3 } }}
                        >
                            Let's complete tasks to earn points.
                        </Text>
                    </Animated.View>
                </View>
            </Modal>
        )
    }
}
