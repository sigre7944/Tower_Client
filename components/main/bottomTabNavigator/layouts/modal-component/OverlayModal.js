import React, { Component } from 'react'

import {
    View,
    Text,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions
} from 'react-native';

import AddTaskPanel from './add-task-panel/AddTaskPanel.Container'
import Calendar from './calendar/Calendar'
import Category from './category/Category.Container'
import Priority from './priority/Priority.Container'
import Goal from './goal/Goal.Container'

class DismissElement extends React.PureComponent {
    _onPress = () => {
        if (this.props.addTaskMenuChosen) {
            this.props.addTaskButtonActionProp()
        }

        this.props.disableAllTabs()
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this._onPress}
            >
                <View style={{
                    flex: 1,
                    width: Dimensions.get("window").width,
                    backgroundColor: "black",
                    opacity: 0.5,
                }}>
                </View>
            </TouchableWithoutFeedback>
        )
    }

}

export default class UnderlayModal extends Component {

    state = {
        currentAnnotation: 'day',
        calendarChosen: false,
        categoryChosen: false,
        priorityChosen: false,
        goalChosen: false,
        addTaskMenuChosen: true,

        shouldCallBackKeyboard: false
    }

    setCurrentAnnotation = (annotation) => {
        this.setState({ currentAnnotation: annotation })
    }

    disableAllTabs = () => {
        this.setState({
            calendarChosen: false,
            categoryChosen: false,
            priorityChosen: false,
            goalChosen: false,
            addTaskMenuChosen: true,
        })
    }

    chooseCalenderOption = () => {
        this.setState(prevState => ({
            calendarChosen: !prevState.calendarChosen,
            categoryChosen: false,
            priorityChosen: false,
            goalChosen: false,
            addTaskMenuChosen: false,
        }))
    }

    chooseGoalOption = () => {
        this.setState(prevState => ({
            calendarChosen: false,
            goalChosen: !prevState.goalChosen,
            categoryChosen: false,
            priorityChosen: false,
            addTaskMenuChosen: false,
        }))
    }

    chosenCategoryOption = () => {
        this.setState(prevState => ({
            calendarChosen: false,
            goalChosen: false,
            priorityChosen: false,
            categoryChosen: !prevState.categoryChosen,
            addTaskMenuChosen: false,
        }))
    }

    choosePriorityOption = () => {
        this.setState(prevState => ({
            calendarChosen: false,
            categoryChosen: false,
            priorityChosen: !prevState.priorityChosen,
            goalChosen: false,
            addTaskMenuChosen: false,
        }))
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
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <DismissElement
                        addTaskButtonActionProp={this.props.addTaskButtonActionProp}
                        disableAllTabs={this.disableAllTabs}
                        addTaskMenuChosen={this.state.addTaskMenuChosen}

                    />

                    {
                        this.state.addTaskMenuChosen ?
                            <AddTaskPanel
                                chooseCalenderOption={this.chooseCalenderOption}
                                chosenCategoryOption={this.chosenCategoryOption}
                                chooseGoalOption={this.chooseGoalOption}
                                choosePriorityOption={this.choosePriorityOption}

                                setCurrentAnnotation={this.setCurrentAnnotation}
                                currentAnnotation={this.state.currentAnnotation}

                                addTaskButtonActionProp = {this.props.addTaskButtonActionProp}

                                currentTask = {this.props.currentTask}
                            />

                            :

                            <>
                                {/* Calendar Panel */}
                                {this.state.calendarChosen ?
                                    <Calendar
                                        currentAnnotation={this.state.currentAnnotation}
                                        calendarChosen={this.state.calendarChosen}

                                        disableAllTabs={this.disableAllTabs}
                                    />

                                    :

                                    <>
                                        {/* Category Panel */}
                                        {this.state.categoryChosen ?
                                            <Category
                                                disableAllTabs={this.disableAllTabs}
                                                currentAnnotation={this.state.currentAnnotation}
                                            />

                                            :

                                            <>
                                                {/* Repeat Panel */}
                                                {this.state.goalChosen ?
                                                    <Goal
                                                        currentAnnotation={this.state.currentAnnotation}
                                                        disableAllTabs={this.disableAllTabs}
                                                    />

                                                    :

                                                    <>
                                                        {/* Priority Panel */}
                                                        {this.state.priorityChosen ?
                                                            <Priority
                                                                disableAllTabs={this.disableAllTabs}
                                                                currentAnnotation={this.state.currentAnnotation}
                                                            />

                                                            :

                                                            <></>
                                                        }
                                                    </>
                                                }

                                            </>
                                        }
                                    </>
                                }
                            </>
                    }
                </View>

            </Modal>
        )
    }
}