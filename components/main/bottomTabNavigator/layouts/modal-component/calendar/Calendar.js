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


export default class Calendar extends Component{


    render(){
        return(
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
        )
    }
}