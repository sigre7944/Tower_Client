import React from 'react'

import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    Keyboard,
    TextInput,
    Dimensions,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';

export default class BottomTabNavigator extends React.Component{

    state = {
        addClicked: false,
        renderAddTaskUI: null,
        keyboardHeight: 0,
        addTaskUIDisplayProperty: 'none'
    }

    componentDidMount(){
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            (e) => {
                this.setState({
                    keyboardHeight: e.endCoordinates.height,
                    addTaskUIDisplayProperty: 'flex'
                })
            }
        )

    }

    componentDidUpdate = (prepProps, prevState) => {


    }

    componentWillUnmount(){
        this.keyboardWillShowListener.remove();
    }

    render(){
        return(
            <>
            <View style={{
                height: 60,
                display: "flex",
                alignItems: "center",
            }}> 
                {this.state.addClicked ?
                    <Modal 
                        visible={true}
                        transparent={true}
                    >   
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss
                                this.setState(prevState => ({
                                    keyboardHeight: 0,
                                    addTaskUIDisplayProperty: 'none',
                                    addClicked: !prevState.addClicked
                                }))
                            }}
                        >
                            <View style={{
                                backgroundColor: "black",
                                opacity: 0.5,
                                flex: 1
                            }}>

                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{
                            display: this.state.addTaskUIDisplayProperty,
                            position: "absolute",
                            bottom: this.state.keyboardHeight,
                            backgroundColor: 'gainsboro',
                            width: Dimensions.get('window').width,
                            height: 200,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                            flexDirection: "column",
                            // alignItems: 'center',
                            justifyContent: "center",
                            paddingHorizontal: 20,
                            paddingTop: 10,
                        }}>
                            <View style={{
                                flex: 1,
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    color: 'white'
                                }}>
                                    Task Title
                                </Text>
                                <TextInput autoFocus={true} style={{
                                    
                                    flex: 1
                                }}/>
                            </View>
                            
                            <View style={{
                                flex: 1,
                                marginVertical: 5
                            }}>
                                <Text style={{
                                    fontSize: 13,
                                    color: 'white'
                                }}>
                                    Task Description
                                </Text>
                                <TextInput autoFocus={true} style={{
                                    flex: 1
                                }}/>
                            </View>

                            <View style={{
                                flex: 1,

                            }}>
                            </View>
                        </View>
                    
                    </Modal>
                    : 

                    <></>
                }
                {this.props.routeName === "Daily" || this.props.routeName === "Weekly" || this.props.routeName === "Monthly" ?
                    <TouchableHighlight
                        onPress = {() => this.setState(prevState => ({addClicked: !prevState.addClicked}))}
                        style= {{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            backgroundColor: 'black',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: -35,
                            zIndex: 10
                        }}
                    >
                            <Text style={{
                                color: 'white'
                            }}>add</Text>
                    </TouchableHighlight>

                    : 

                    <>
                    </>
                }
                

                <View
                    style={{
                        display: "flex",
                        backgroundColor: 'gainsboro',
                        flexDirection: "row",
                        justifyContent: "space-around",
                        height: 60,
                    }}
                >
                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Journal'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Journal</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Progress'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Progress</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Reward'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Reward</Text>
                    </TouchableHighlight>

                    <TouchableHighlight
                        onPress = {() => this.props.navigation.navigate({routeName: 'Settings'})}
                        style={{
                            flex: 1,
                            height: 60,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text>Settings</Text>
                    </TouchableHighlight>
                </View>
            </View>
            </>
        )
    }
}