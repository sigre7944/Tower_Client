import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Animated,
    Easing,
    Keyboard,
    ScrollView
} from 'react-native';

import TaskAnnotationTypeHolder from './task-annotation-type-holder/TaskAnnotationTypeHolder.Container'
import TitleAndDescriptionHolder from './title-and-description-holder/TitleAndDescriptionHolder.Container'

import TagDataHolder from './tag-data-holder/TagDataHolder.Container'

import BottomOptionsHolder from "./bottom-options-holder/BottomOptionsHolder.Container"

export default class AddTaskPanel extends Component {
    taskTextInputRef = React.createRef()

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    translateY_value = new Animated.Value(0)
    opacity_value = this.translateY_value.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: "clamp"
    })

    state = {
        tag_data: [],
    }

    setTaskTextInputRef = (ref) => {
        this.taskTextInputRef = ref
    }

    toDoWhenWillShowKeyboard = (e) => {
        Animated.timing(
            this.translateY_value,
            {
                toValue: - e.endCoordinates.height,
                duration: e.duration,
                easing: Easing.in()
                // useNativeDriver: true
            }
        ).start()
    }

    _animateEnd = (callback) => {
        Animated.timing(
            this.translateY_value,
            {
                toValue: 0,
                duration: 250,
                easing: Easing.in()
                // useNativeDriver: true
            }
        ).start(() => {
            callback()
        })
    }

    _close = () => {
        this._animateEnd(this.props.toggleAddTask)
    }

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.toDoWhenWillShowKeyboard,
        )
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardWillShow', this.toDoWhenWillShowKeyboard)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.should_call_end_animation_from_parent !== prevProps.should_call_end_animation_from_parent) {
            this._close()
        }
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: "absolute",
                    width: Dimensions.get('window').width,
                    bottom: 0,
                    transform: [{ translateY: this.translateY_value }],
                    height: 409,
                    backgroundColor: "white",
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    opacity: this.opacity_value,
                    backgroundColor: "#FFFFFF",
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowRadius: 15,
                    shadowColor: "rgba(0, 0, 0, 0.06)"
                }}
            >
                <TaskAnnotationTypeHolder
                    setCurrentAnnotation={this.props.setCurrentAnnotation}
                    currentAnnotation={this.props.currentAnnotation}
                />

                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={{
                        flex: 1,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <TitleAndDescriptionHolder
                        currentAnnotation={this.props.currentAnnotation}
                        setTaskTextInputRef={this.setTaskTextInputRef}

                        _closeAddTaskPanel={this._close}
                        currentAnnotation={this.props.currentAnnotation}
                    />

                    <TagDataHolder
                        currentAnnotation={this.props.currentAnnotation}
                    />

                </ScrollView>

                <BottomOptionsHolder
                    chooseCalenderOption={this.props.chooseCalenderOption}
                    chosenCategoryOption={this.props.chosenCategoryOption}
                    choosePriorityOption={this.props.choosePriorityOption}
                    chooseRepeatOption={this.props.chooseRepeatOption}
                    _closeAddTaskPanel={this._close}
                    currentAnnotation={this.props.currentAnnotation}
                />
            </Animated.View>
        )
    }
}
