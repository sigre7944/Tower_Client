import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native';


let dayAnnotationColor= '#b0b0b0',
    weekAnnotationColor= '#9a9a9a',
    monthAnnotationColor= '#848484'

export default class AddTaskPanel extends Component{

    constructor(props){
        super(props)

        taskTextInputRef = React.createRef()

        this.state = {
            dayAnnotationColor: dayAnnotationColor,
            weekAnnotationColor: weekAnnotationColor,
            monthAnnotationColor: monthAnnotationColor,
        }
    }

    setTaskTextInputRef = (ref) => {
        this.taskTextInputRef = ref
    }

    chooseAnnotation = (annotation) => {
        if(annotation === "day"){
            this.setState({
                dayAnnotationColor: "black",
                weekAnnotationColor: weekAnnotationColor,
                monthAnnotationColor: monthAnnotationColor,
            })
        }

        else if(annotation === "week"){
            this.setState({
                dayAnnotationColor: dayAnnotationColor,
                weekAnnotationColor: "black",
                monthAnnotationColor: monthAnnotationColor,
            })
        }

        else{
            this.setState({
                dayAnnotationColor: dayAnnotationColor,
                weekAnnotationColor: weekAnnotationColor,
                monthAnnotationColor: "black",
            })
        }
    }

    render(){
        return(
            <KeyboardAvoidingView>
            <View style={{
                position: "absolute",
                width: Dimensions.get('window').width,
                bottom: this.props.keyboardHeight,
                display: this.props.addTaskDisplayProperty,
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
                    
                    onPress = {this.chooseAnnotation.bind(this, 'day')}
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
                        width: Dimensions.get('window').width * 2/3,
                        left: Dimensions.get('window').width * 1/3,
                        height: 100,
                        backgroundColor: this.state.weekAnnotationColor,
                        borderTopLeftRadius: 20,
                    }}

                    onPress = {this.chooseAnnotation.bind(this, 'week')}
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
                        position: 'absolute',
                        width: Dimensions.get('window').width * 1/3,
                        left: Dimensions.get('window').width * 2/3,
                        height: 100,
                        backgroundColor: this.state.monthAnnotationColor,
                        borderTopLeftRadius: 20,
                    }}

                    onPress = {this.chooseAnnotation.bind(this, 'month')}
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
                        setTaskTextInputRef = {this.setTaskTextInputRef} 
                        taskTextInputRef = {this.taskTextInputRef}
                    />

                    <TaskDescriptionElement />

                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        
                        <BottomOptionElement 
                            chooseOption = {this.props.chooseCalenderOption} 
                            taskTextInputRef = {this.taskTextInputRef}
                            title = "Cal"
                        />

                        <BottomOptionElement 
                            chooseOption = {() => {console.log(true)}} 
                            taskTextInputRef = {this.taskTextInputRef}
                            title = "Cat"
                        />

                        <BottomOptionElement 
                            chooseOption = {() => {console.log(true)}} 
                            taskTextInputRef = {this.taskTextInputRef}
                            title = "Pri"
                        />

                        <BottomOptionElement 
                            chooseOption = {() => {console.log(true)}} 
                            taskTextInputRef = {this.taskTextInputRef}
                            title = "Rep"
                        />

                        <BottomOptionElement 
                            chooseOption = {() => {console.log(true)}} 
                            taskTextInputRef = {this.taskTextInputRef}
                            title = "Ok"
                        />
                    </View>
                </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}


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

BottomOptionElement = (props) => (
    <TouchableHighlight
        style= {{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,  
        }}

        onPress={() => {
            props.chooseOption()
            props.taskTextInputRef.blur()
        }}
        activeOpacity={0.5}
        underlayColor="gainsboro"
    >
        <Text>{props.title}</Text>
    </TouchableHighlight>
)

