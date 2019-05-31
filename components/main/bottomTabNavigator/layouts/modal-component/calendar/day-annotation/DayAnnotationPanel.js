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

import CalendarDisplayHolder from './calendar-display-holder/CalendarDisplayHolder'

export default class DayAnnotationPanel extends Component{

    state = {
        currentMonthInText: 'May',
        currentYear: '2019',
        renderDaysInMonth: null
    }

    

    componentDidMount(){
        
    }


    render(){
        return(
            <>
            <View style={{
                height: 80,
                paddingHorizontal: 30,
                paddingTop: 30,
                paddingBottom: 10,
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
                    flex: 1,
                }}
            >
                <ScrollView
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={(Dimensions.get('window').width - 50) * 2}
                    snapToAlignment="start"
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd = {() => {

                    }}
                >
                    <CalendarDisplayHolder 
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                        marginRight: (Dimensions.get('window').width - 50)
                    }} 
                    month={new Date().getMonth()} year={new Date().getFullYear()}/>

                    <CalendarDisplayHolder 
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                        marginRight: (Dimensions.get('window').width - 50)
                    }} 
                    month={(new Date().getMonth() + 1) > 11 ? 1 : new Date().getMonth() + 1 } 
                    year={(new Date().getMonth() + 1) > 11 ? new Date().getFullYear() + 1 : new Date().getFullYear()}
                    />
                    
                    <CalendarDisplayHolder 
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width - 50,
                    }} 
                    month={(new Date().getMonth() + 2) > 11 ? 1 : new Date().getMonth() + 2 } 
                    year={(new Date().getMonth() + 2) > 11 ? new Date().getFullYear() + 1 : new Date().getFullYear()}
                    />

                </ScrollView>
            </View>

            </>
        )
    }
}