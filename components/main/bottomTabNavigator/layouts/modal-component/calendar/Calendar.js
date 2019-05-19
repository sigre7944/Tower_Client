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

    state = {
        currentMonth: 'This month',
        nextMonthColor: 'white',
        nextMonthTextColor: 'gray',
        thisMonthColor: 'black',
        thisMonthTextColor: 'white'
    }

    chooseMonthOption = (monthOption) => {
        if(monthOption === "This month"){
            this.setState({
                thisMonthColor: 'black',
                thisMonthTextColor: 'white',
                nextMonthColor: 'white',
                nextMonthTextColor: 'gray'
            })
        }

        else if(monthOption === "Next month"){
            this.setState({
                thisMonthColor: 'white',
                thisMonthTextColor: 'gray',
                nextMonthColor: 'black',
                nextMonthTextColor: 'white'
            })
        }
    }

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
                {/* <View style={{
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
                            backgroundColor: "black",
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
                </View> */}
                
                <View
                    style={{
                        height: 80,
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                    }}
                >
                    <View 
                        style={{
                            height: 35,
                            borderRadius: 25,
                            borderWidth: 1,
                            borderColor: "gainsboro",
                            flexDirection: "row",
                        }}
                    >
                        <TouchableHighlight 
                            style={{
                                backgroundColor: this.state.thisMonthColor,
                                borderRadius: 25,
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                            }}
                            onPress={this.chooseMonthOption.bind(this, "This month")}
                            underlayColor="transparent"
                        >
                            <Text
                                style={{
                                    color: this.state.thisMonthTextColor
                                }}
                            >This month</Text>
                        </TouchableHighlight>
                        
                        <TouchableHighlight 
                            style={{
                                backgroundColor: this.state.nextMonthColor,
                                borderRadius: 25,
                                alignItems: "center",
                                justifyContent: "center",
                                flex: 1,
                            }}
                            onPress={this.chooseMonthOption.bind(this, "Next month")}    
                            underlayColor="transparent"
                        >
                            <Text
                                style={{
                                    color: this.state.nextMonthTextColor
                                }}
                            >Next month</Text>
                        </TouchableHighlight>
                    </View>

                </View>
            </View>
        )
    }
}