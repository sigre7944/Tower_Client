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

    _animateEnd = () => {
        Animated.timing(
            this.translate_y_value,
            {
                toValue: 200,
                duration: animation_duration,
                useNativeDriver: true
            }
        ).start(() => {
            this.props.toggleEditMultipleTasksAction()
        })
    }

    _close = () => {
        this._animateEnd()
    }

    componentDidMount() {
        if (this.props.toggleEditMultipleTasks) {
            this._animateStart()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.toggleEditMultipleTasks !== prevProps.toggleEditMultipleTasks) {
            if (this.props.toggleEditMultipleTasks) {
                this._animateStart()
            }
        }
    }

    render() {
        return (
            <>
                {
                    this.props.toggleEditMultipleTasks ?
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
                                        height: 200,
                                        left: 0,
                                        right: 0,
                                        borderTopLeftRadius: 10,
                                        borderTopRightRadius: 10,
                                        backgroundColor: "white",
                                        transform: [{ translateY: this.translate_y_value }]
                                    }}
                                >

                                </Animated.View>
                            </View>
                        </Modal>
                        :

                        null
                }
            </>
        )
    }

}   