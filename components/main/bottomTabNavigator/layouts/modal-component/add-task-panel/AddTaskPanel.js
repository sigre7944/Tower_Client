import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';

TaskTitleElement = (props) => (
    <View style={{
        flex: 1,
        marginHorizontal: 20
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
            ref= {(ref) => {props.setTaskTextInputRef(ref)}}
            onLayout = {() => {
                setTimeout(() => {props.taskTextInputRef.focus()}, 50)
            }}
            style={{
                flex: 1,
                fontSize: 16,
                borderBottomColor: 'gainsboro',
                borderBottomWidth: 1,
                
            }}
            placeholder="Add a task here"
        />
    </View>
)

TaskDescriptionElement = (props) => (
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
        />
    </View>
)

export default class AddTaskPanel extends Component{

    constructor(props){
        super(props)

        taskTextInputRef = React.createRef()
    }

    setTaskTextInputRef = (ref) => {
        this.taskTextInputRef = ref
    }

    render(){
        return(
            <KeyboardAvoidingView>
            <View style={{
                display: this.props.addTaskDisplayProperty,
                position: "absolute",
                bottom: this.props.keyboardHeight,
                backgroundColor: 'white',
                width: Dimensions.get('window').width,
                height: 200,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                flexDirection: "column",
                justifyContent: "center",
                paddingTop: 10,
            }}>
                
                <TaskTitleElement 
                    setTaskTextInputRef = {this.setTaskTextInputRef} 
                    taskTextInputRef = {this.taskTextInputRef}
                />

                <TaskDescriptionElement />

                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <TouchableHighlight
                        style= {{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,  
                        }}

                        onPress={() => {
                            this.props.chooseCalenderOption()
                            this.taskTextInputRef.blur()
                        }}
                        activeOpacity={0.5}
                        underlayColor="gainsboro"
                    >
                        <Text>Cal</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style= {{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"

                        }}
                    >
                        <Text>Cat</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style= {{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"

                        }}
                    >
                        <Text>Pri</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style= {{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"

                        }}
                    >
                        <Text>Rep</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        style= {{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,    

                        }}

                        onPress={() => console.log(true)}
                        activeOpacity={0.5}
                        underlayColor="gainsboro"
                    >
                        <Text>ok</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}