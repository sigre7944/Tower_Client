import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Animated,
    Keyboard,
    ScrollView
} from 'react-native';

import TaskAnnotationTypeHolder from './task-annotation-type-holder/TaskAnnotationTypeHolder.Container'
import TitleAndDescriptionHolder from './title-and-description-holder/TitleAndDescriptionHolder.Container'

import TagDataHolder from './tag-data-holder/TagDataHolder.Container'

import BottomOptionsHolder from "./bottom-options-holder/BottomOptionsHolder.Container"

import { styles } from './styles/styles'

const uuidv1 = require('uuid')

export default class AddTaskPanel extends Component {
    taskTextInputRef = React.createRef()

    daysInWeekText = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    monthNames = ["January", "Febuary", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    month_names_in_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    translateY_value = new Animated.Value(0)
    opacity_value = new Animated.Value(0)

    state = {
        AddTaskPanelDisplayProperty: 'flex',
        tag_data: [],
    }

    setTaskTextInputRef = (ref) => {
        this.taskTextInputRef = ref
    }


    disableAddTaskPanel = () => {
        this.setState({
            AddTaskPanelDisplayProperty: 'none'
        })
    }

    toDoWhenWillShowKeyboard = (e) => {
        Animated.parallel([
            Animated.timing(
                this.translateY_value,
                {
                    toValue: - e.endCoordinates.height,
                    duration: e.duration,
                    useNativeDriver: true
                }
            ),
            Animated.timing(
                this.opacity_value,
                {
                    toValue: 1,
                    duration: e.duration,
                    useNativeDriver: true
                }
            )
        ],
        ).start()
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

    render() {
        return (
            <Animated.View
                style={{
                    position: "absolute",
                    width: Dimensions.get('window').width,
                    bottom: 0,
                    transform: [{ translateY: this.translateY_value }],
                    display: this.state.AddTaskPanelDisplayProperty,
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
                    toggleAddTask={this.props.toggleAddTask}
                    disableAddTaskPanel={this.disableAddTaskPanel}
                />
            </Animated.View>
        )
    }
}
