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

import { styles } from './styles/styles'

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

                {/* <View
                    style={{
                        flex: 1,
                        height: 1,
                        borderWidth: 0.5,
                        backgroundColor: "rgba(0, 0, 0, 0.15)",
                        marginVertical: 15,
                        marginHorizontal: 20,
                    }}
                >

                </View> */}

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
                marginTop: 13,
            }}>
                <Text
                    style={styles.title_description_text}
                >
                    Task Title
                </Text>
                <TextInput
                    ref={this.setTaskTextInputRef}
                    style={styles.title_description_text_input}
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
                marginHorizontal: 20,
                marginTop: 15,
            }}>
                <Text
                    style={styles.title_description_text}
                >
                    Task Description
                </Text>
                <TextInput
                    style={styles.title_description_text_input}
                    placeholder="Add task description"
                    autoCorrect={false}
                    value={this.props.description_value}
                    onChange={this._onChange}
                />
            </View>
        )
    }
}