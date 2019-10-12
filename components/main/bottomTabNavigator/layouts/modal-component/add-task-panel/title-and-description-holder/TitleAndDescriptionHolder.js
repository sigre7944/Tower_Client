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


export default class TitleAndDescriptionHolder extends React.PureComponent {

    render() {
        return (
            <View>
                <TaskTitleElement
                    setTaskTextInputRef={this.props.setTaskTextInputRef}
                    currentAnnotation={this.props.currentAnnotation}

                    title_value={this.props.addTaskTitle}
                    updateTitle={this.props.updateTitle}
                />

                <TaskDescriptionElement
                    currentAnnotation={this.props.currentAnnotation}

                    description_value={this.props.addTaskDescription}
                    updateDescription={this.props.updateDescription}
                />
            </View>
        )
    }
}


class TaskTitleElement extends React.PureComponent {
    textInputRef = React.createRef()

    _onChange = (e) => {
        this.props.updateTitle(e.nativeEvent.text)
    }

    setTaskTextInputRef = (ref) => {
        this.props.setTaskTextInputRef(ref)
        this.textInputRef = ref
    }

    _onLayout = () => {
        setTimeout(() => { this.textInputRef.focus() }, 50)
    }

    render() {
        return (
            <View style={{
                height: 52,
                marginHorizontal: 20,
                marginTop: 10,
            }}>
                <Text
                    style={{
                        fontSize: 12,
                        color: 'gainsboro',
                    }}
                >
                    Task Title
                </Text>
                <TextInput
                    ref={this.setTaskTextInputRef}
                    style={{
                        flex: 1,
                        fontSize: 16,
                        borderBottomColor: 'gainsboro',
                        borderBottomWidth: 1,

                    }}
                    placeholder="Add a task here"
                    autoCorrect={false}
                    value={this.props.title_value}
                    onChange={this._onChange}
                    onLayout={this._onLayout}
                />
            </View>
        )
    }
}

class TaskDescriptionElement extends React.PureComponent {
    
    _onChange = (e) => {
        this.props.updateDescription(e.nativeEvent.text)
    }

    render() {
        return (
            <View style={{
                height: 52,
                margin: 20,
            }}>
                <Text style={{
                    fontSize: 12,
                    color: 'gainsboro',
                }}>
                    Task Description
                </Text>
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 16,
                        borderBottomColor: 'gainsboro',
                        borderBottomWidth: 1,
                    }}

                    placeholder="Add task description"
                    autoCorrect={false}
                    value={this.props.description_value}
                    onChange={this._onChange}
                />
            </View>
        )
    }
}