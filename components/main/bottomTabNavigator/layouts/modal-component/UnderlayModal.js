import React, { Component } from 'react'

import {
    View,
    Text,
    TouchableHighlight,
    Keyboard,
    TextInput,
    Dimensions,
    Modal,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';


DismissElement = (props) => (
    <TouchableWithoutFeedback
        onPress={() => {
            props.dismissAddTaskProcessWhenClickOnUnderlayModal()
        }}
    >
        <View style={{
            flex: 1,
            backgroundColor: "black",
            opacity: 0.5,
        }}>
        </View>
    </TouchableWithoutFeedback>
)

export default class UnderlayModal extends Component {

    render(){
        return(
            <Modal
                visible={true}
                transparent={true}
            >   
                <DismissElement dismissAddTaskProcessWhenClickOnUnderlayModal = {this.props.dismissAddTaskProcessWhenClickOnUnderlayModal}/>

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
                            ref= {(ref) => {this.taskTextInput = ref}}
                            onLayout = {() => {setTimeout(() => {this.taskTextInput.focus()}, 50)}}
                            style={{
                                flex: 1,
                                fontSize: 16,
                                borderBottomColor: 'gainsboro',
                                borderBottomWidth: 1,
                                
                            }}
                            placeholder="Add a task here"
                        />
                    </View>
                    
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
                                this.taskTextInput.blur()
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
                
                {/* Calendar View */}
                {this.props.calendarChosen ?
                <View 
                    style={{
                        position: 'absolute',
                        top: 100,
                        bottom: 100,
                        right: 25,
                        left: 25,
                        backgroundColor: 'white',
                        borderRadius: 10,

                    }}
                >
                    <View style={{
                        height: 80,
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                    }}>
                        <View style={{
                            height: 35,
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: "gainsboro",
                            flexDirection: "row",
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                backgroundColor: "gainsboro",
                                borderRadius: 25,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        paddingHorizontal: 20,
                                        fontWeight: "700"
                                    }}
                                >Today</Text>
                            </View>

                            <View style={{
                                backgroundColor: "gainsboro",
                                borderRadius: 25,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        paddingHorizontal: 10,
                                        fontWeight: "700"
                                    }}
                                >Tomorrow</Text>
                            </View>

                            <View style={{
                                backgroundColor: "gainsboro",
                                borderRadius: 25,
                                alignItems: "center",
                                justifyContent: "center",
                                
                            }}>
                                <Text
                                    style={{
                                        color: 'white',
                                        paddingHorizontal: 10,
                                        fontWeight: "700"
                                    }}
                                >Next Monday</Text>
                            </View>
                        </View>
                    </View>
                    
                </View>

                :

                <></>
                }
                    
            </Modal>
        )
    }
}