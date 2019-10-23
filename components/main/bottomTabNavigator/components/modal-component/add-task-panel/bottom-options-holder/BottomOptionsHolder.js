import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Animated,
    Keyboard,
    ScrollView
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faCalendarAlt,
    faList,
    faExclamationTriangle,
    faCheck,
    faRedoAlt
} from '@fortawesome/free-solid-svg-icons'

import { primary_color } from "../../../../../../shared/styles/style";

import { styles } from "./styles/styles";

export default class BottomOptionsHolder extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    height: 57,
                    width: Dimensions.get("window").width,
                    backgroundColor: "white",
                    flexDirection: 'row',
                    shadowOffset: {
                        width: 0,
                        height: -4,
                    },
                    shadowRadius: 7,
                    shadowColor: "black",
                    shadowOpacity: 0.03,
                }}
            >
                <BottomOptionElement
                    chooseOption={this.props.chooseCalenderOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faCalendarAlt}
                />

                <BottomOptionElement
                    chooseOption={this.props.chooseRepeatOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faRedoAlt}
                />

                <BottomOptionElement
                    chooseOption={this.props.chosenCategoryOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faList}
                />

                <BottomOptionElement
                    chooseOption={this.props.choosePriorityOption}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    icon={faExclamationTriangle}
                />

                <BottomConfirmElement
                    chooseOption={this.props.toggleAddTask}
                    disableAddTaskPanel={this.props.disableAddTaskPanel}
                    {... this.props}

                    title_value={this.props.addTaskTitle}
                    description_value={this.props.addTaskDescription}

                    updateTitle={this.props.updateTitle}
                    updateDescription={this.props.updateDescription}

                    icon={faCheck}
                />
            </View>
        )
    }
}


class BottomOptionElement extends React.PureComponent {

    _onPress = () => {
        this.props.chooseOption()
        this.props.disableAddTaskPanel()
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.option_container}
                onPress={this._onPress}
            >
                <FontAwesomeIcon
                    icon={this.props.icon}
                    color={primary_color}
                    size={16}
                />
            </TouchableOpacity>
        )
    }
}

class BottomConfirmElement extends React.PureComponent {

    render() {
        return (
            <TouchableOpacity
                style={styles.confirm_container}
            >
                <FontAwesomeIcon
                    icon={this.props.icon}
                    color={"white"}
                    size={16}
                />
            </TouchableOpacity>
        )
    }
}
