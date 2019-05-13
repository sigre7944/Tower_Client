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

import AddTaskPanel from './add-task-panel/AddTaskPanel'

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

    state = {
    }

    render(){
        return(
            <Modal
                visible={true}
                transparent={true}
            >   
                <DismissElement dismissAddTaskProcessWhenClickOnUnderlayModal = {this.props.dismissAddTaskProcessWhenClickOnUnderlayModal}/>

                <AddTaskPanel 
                    addTaskDisplayProperty = {this.props.addTaskDisplayProperty}
                    keyboardHeight = {this.props.keyboardHeight}
                    chooseCalenderOption = {this.props.chooseCalenderOption}
                />
                
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