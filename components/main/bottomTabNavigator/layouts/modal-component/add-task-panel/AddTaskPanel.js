import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';


let dayAnnotationColor = '#b0b0b0',
    weekAnnotationColor = '#9a9a9a',
    monthAnnotationColor = '#848484'

export default class AddTaskPanel extends Component {
    taskTextInputRef = React.createRef()

    state = {
        dayAnnotationColor: dayAnnotationColor,
        weekAnnotationColor: weekAnnotationColor,
        monthAnnotationColor: monthAnnotationColor,
        AddTaskPanelDisplayProperty: 'flex',
        keyboardHeight: 0,
    }

    setTaskTextInputRef = (ref) => {
        this.taskTextInputRef = ref
    }

    disableAddTaskPanel = () => {
        this.setState({
            AddTaskPanelDisplayProperty: 'none'
        })
    }

    chooseAnnotation = (annotation) => {
        if (annotation === "day") {
            this.setState({
                dayAnnotationColor: "black",
                weekAnnotationColor: weekAnnotationColor,
                monthAnnotationColor: monthAnnotationColor,
            })
        }

        else if (annotation === "week") {
            this.setState({
                dayAnnotationColor: dayAnnotationColor,
                weekAnnotationColor: "black",
                monthAnnotationColor: monthAnnotationColor,
            })
        }

        else {
            this.setState({
                dayAnnotationColor: dayAnnotationColor,
                weekAnnotationColor: weekAnnotationColor,
                monthAnnotationColor: "black",
            })
        }
        this.props.setCurrentAnnotation(annotation)
    }

    toDoWhenWillShowKeyboard = (e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
    }

    componentDidMount() {
        this.chooseAnnotation('day') //automatically choose day annotation when loaded as default

        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            this.toDoWhenWillShowKeyboard
        )
    }

    componentWillUnmount() {
        Keyboard.removeListener('keyboardWillShow', this.toDoWhenWillShowKeyboard)
    }

    render() {
        return (
            <KeyboardAvoidingView style={{
                position: "absolute",
                width: Dimensions.get('window').width,
                bottom: this.state.keyboardHeight,
                display: this.state.AddTaskPanelDisplayProperty,
                height: 250,
            }}>
                <View style={{
                    height: 100,
                    position: 'relative',
                    flexDirection: "row",
                }}>
                    <TouchableHighlight
                        style={{
                            position: 'absolute',
                            height: 100,
                            width: Dimensions.get('window').width,
                            backgroundColor: this.state.dayAnnotationColor,
                            borderTopLeftRadius: 20,
                        }}

                        onPress={this.chooseAnnotation.bind(this, 'day')}
                        underlayColor="transparent"
                    >
                        <Text style={{
                            color: "white",
                            marginTop: 10,
                            marginLeft: 50,
                            fontSize: 20,
                            fontWeight: "500",
                        }}>Day</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            position: 'absolute',
                            width: Dimensions.get('window').width * 2 / 3,
                            left: Dimensions.get('window').width * 1 / 3,
                            height: 100,
                            backgroundColor: this.state.weekAnnotationColor,
                            borderTopLeftRadius: 20,
                        }}

                        onPress={this.chooseAnnotation.bind(this, 'week')}
                        underlayColor="transparent"
                    >
                        <Text style={{
                            color: "white",
                            marginTop: 10,
                            marginLeft: 50,
                            fontSize: 20,
                            fontWeight: "500",
                        }}>Week</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style={{
                            width: Dimensions.get('window').width * 1 / 3,
                            left: Dimensions.get('window').width * 2 / 3,
                            height: 100,
                            backgroundColor: this.state.monthAnnotationColor,
                            borderTopLeftRadius: 20,
                        }}

                        onPress={this.chooseAnnotation.bind(this, 'month')}
                        underlayColor="transparent"
                    >
                        <Text style={{
                            color: "white",
                            marginTop: 10,
                            marginLeft: 50,
                            fontSize: 20,
                            fontWeight: "500",
                        }}>Month</Text>
                    </TouchableHighlight>
                </View>

                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    height: 200,
                    width: Dimensions.get('window').width,
                    backgroundColor: 'white',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    flexDirection: "column",
                    justifyContent: "center",
                    paddingTop: 10,
                }}>

                    <TaskTitleElement
                        setTaskTextInputRef={this.setTaskTextInputRef}
                        taskTextInputRef={this.taskTextInputRef}

                        updateTitle={this.props.updateTitle}
                    />

                    <TaskDescriptionElement
                        updateDescription={this.props.updateDescription}
                    />

                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>

                        <BottomOptionElement
                            chooseOption={this.props.chooseCalenderOption}
                            taskTextInputRef={this.taskTextInputRef}
                            disableAddTaskPanel={this.disableAddTaskPanel}
                            title="Cal"
                        />

                        <BottomOptionElement
                            chooseOption={this.props.chosenCategoryOption}
                            taskTextInputRef={this.taskTextInputRef}
                            disableAddTaskPanel={this.disableAddTaskPanel}
                            title="Cat"
                        />

                        <BottomOptionElement
                            chooseOption={this.props.choosePriorityOption}
                            taskTextInputRef={this.taskTextInputRef}
                            disableAddTaskPanel={this.disableAddTaskPanel}
                            title="Pri"
                        />

                        <BottomOptionElement
                            chooseOption={this.props.chooseGoalOption}
                            taskTextInputRef={this.taskTextInputRef}
                            disableAddTaskPanel={this.disableAddTaskPanel}
                            title="Goal"
                        />

                        <BottomOptionElement
                            chooseOption={this.props.addTaskButtonActionProp}
                            currentTask = {this.props.currentTask}
                            taskTextInputRef={this.taskTextInputRef}
                            disableAddTaskPanel={this.disableAddTaskPanel}
                            title="Ok"
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}




class TaskTitleElement extends React.PureComponent {
    constructor(props) {
        super(props)

        this.textInputRef = React.createRef()
    }

    state = {
        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text
        })

    }

    setTaskTextInputRef = (ref) => {
        this.props.setTaskTextInputRef(ref)
        this.textInputRef = ref
    }

    _onLayout = () => {
        setTimeout(() => { this.textInputRef.focus() }, 50)

    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.value !== prevState.value){
            this.props.updateTitle(this.state.value)
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
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
                    value={this.state.value}
                    onChange={this._onChange}
                    onLayout={this._onLayout}
                />
            </View>
        )
    }
}

class TaskDescriptionElement extends React.PureComponent {
    state = {
        value: ""
    }

    _onChange = (e) => {
        this.setState({
            value: e.nativeEvent.text
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.value !== prevState.value){
            this.props.updateDescription(this.state.value)
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
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
                    value={this.state.value}
                    onChange={this._onChange}
                />
            </View>
        )
    }
}


class BottomOptionElement extends React.Component {

    _onPress = () => {
        this.props.chooseOption()
        this.props.taskTextInputRef.blur()
        this.props.disableAddTaskPanel()

        if(this.props.currentTask){
            console.log(this.props.currentTask)
        }
    }

    render() {
        return (
            <TouchableHighlight
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                }}

                onPress={this._onPress}
                activeOpacity={0.5}
                underlayColor="gainsboro"
            >
                <Text>{this.props.title}</Text>
            </TouchableHighlight>
        )
    }
}

