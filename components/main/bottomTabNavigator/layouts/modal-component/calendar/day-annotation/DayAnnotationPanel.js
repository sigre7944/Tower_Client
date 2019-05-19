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
    ScrollView
} from 'react-native';

export default class DayAnnotationPanel extends Component{

    state = {
        currentMonth: 'May',
        currentYear: '2019',
    }


    render(){
        return(
            <>
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
            </View> 


            <View 
                style = {{
                    marginTop: 10,
                    flex: 1,
                }}
            >
                <ScrollView
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={Dimensions.get('window').width - 50}
                    snapToAlignment="center"

                    showsHorizontalScrollIndicator={false}

                >
                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                            
                    }}>
                        <View style={{
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: "500"
                                    }}
                                >
                                    {this.state.currentMonth}
                                </Text>
                                <Text
                                    style={{
                                        color: "gray",
                                        fontSize: 14,
                                        marginLeft: 5
                                    }}
                                >
                                    {this.state.currentYear}
                                </Text>
                            </View>
                            
                        </View>
                    </View>


                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                            
                    }}>
                        <View style={{
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Text>
                                February 2019
                            </Text>
                        </View>
                    </View>


                    <View style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                            
                    }}>
                        <View style={{
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Text>
                                February 2019
                            </Text>
                        </View>
                    </View>


                </ScrollView>
            </View>

            </>
        )
    }
}