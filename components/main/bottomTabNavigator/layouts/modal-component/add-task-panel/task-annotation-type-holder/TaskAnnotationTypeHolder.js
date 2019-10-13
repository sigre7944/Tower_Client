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

import { styles } from './styles/styles'

export default class TaskAnnotationTypeHolder extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    marginTop: 30,
                    marginHorizontal: 24,
                    marginBottom: 11,
                }}
            >
                <AnnotationButton
                    annotation_text={"Day"}
                    annotation_lowercase="day"
                    action_type="UPDATE_NEW_DAY_TASK"
                    {...this.props}
                />

                <AnnotationButton
                    annotation_text={"Week"}
                    annotation_lowercase="week"
                    action_type="UPDATE_NEW_WEEK_TASK"
                    {...this.props}
                />

                <AnnotationButton
                    annotation_text={"Month"}
                    annotation_lowercase="month"
                    action_type="UPDATE_NEW_MONTH_TASK"
                    {...this.props}
                />
            </View>
        )
    }
}

class AnnotationButton extends React.PureComponent {

    state = {
        annotation_holder_style: styles.not_chosen_annotation_holder,
        annotation_text_style: styles.not_chosen_annotation_text
    }

    _setCurrentAnnotation = () => {
        this.props.setCurrentAnnotation(this.props.annotation_lowercase)
        let sending_obj = {
            keyPath: ["type"],
            notSetValue: this.props.annotation_lowercase,
            updater: (value) => this.props.annotation_lowercase
        }
        // this.props.updateType("UPDATE_NEW_DAY_TASK", this.props.annotation_lowercase)

        this.props.updateType("UPDATE_NEW_DAY_TASK", ["type"], this.props.annotation_lowercase, (value) => this.props.annotation_lowercase)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.currentAnnotation === nextProps.annotation_lowercase) {
            return ({
                annotation_holder_style: styles.chosen_annotation_holder,
                annotation_text_style: styles.chosen_annotation_text
            })
        }

        else {
            return ({
                annotation_holder_style: styles.not_chosen_annotation_holder,
                annotation_text_style: styles.not_chosen_annotation_text
            })
        }
        return null
    }


    render() {
        return (
            <TouchableOpacity
                style={this.state.annotation_holder_style}
                onPress={this._setCurrentAnnotation}
            >
                <Text
                    style={this.state.annotation_text_style}
                >
                    {this.props.annotation_text}
                </Text>
            </TouchableOpacity>
        )
    }
}