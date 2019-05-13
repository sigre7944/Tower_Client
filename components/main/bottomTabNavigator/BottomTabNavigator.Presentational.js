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
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from 'react-native';

import AddTaskButton from './layouts/AddTaskButton'

export default class BottomTabNavigator extends React.Component{

    state = {
        addClicked: false,
        renderAddTaskUI: null,
        keyboardHeight: 0,
        addTaskDisplayProperty: 'none',
        calendarChosen: false
    }

    addTaskButtonActionProp = () => {
        this.setState(prevState => ({
            addClicked: !prevState.addClicked,
            calendarChosen: false
        }))
    }

    chooseCalenderOption = () => {
        this.setState({addTaskDisplayProperty: 'none'})
        this.setState(prevState=> ({
            calendarChosen: !prevState.calendarChosen
        }))

        Keyboard.dismiss
        this.taskTextInput.blur()
    }

    componentDidMount(){
        this.keyboardWillShowListener = Keyboard.addListener(
            'keyboardWillShow',
            (e) => {
                this.setState({
                    keyboardHeight: e.endCoordinates.height,
                })
            }
        )

        
    }

    componentDidUpdate = (prepProps, prevState) => {
        if(this.state.addClicked && this.state.addClicked !== prevState.addClicked){
            this.setState({
                addTaskDisplayProperty: 'flex'
            })
        }
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
                                        addClicked: !prevState.addClicked
                                    }))
                                }}
                            >
                                <View style={{
                                    flex: 1,
                                    backgroundColor: "black",
                                    opacity: 0.5,
                                }}>
                                </View>
                            </TouchableWithoutFeedback>

                            <KeyboardAvoidingView>
                            <View style={{
                                display: this.state.addTaskDisplayProperty,
                                position: "absolute",
                                bottom: this.state.keyboardHeight,
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
                                        onLayout = {() => {setTimeout(() => {this.taskTextInput.focus()}, 50)}}
                                        ref= {(ref) => {this.taskTextInput = ref}}
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

                                        onPress={this.chooseCalenderOption}
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
                            {this.state.calendarChosen ?
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
                    : 

                    <></>
                }
                {this.props.routeName === "Daily" || this.props.routeName === "Weekly" || this.props.routeName === "Monthly" ?
                    
                    <AddTaskButton addTaskButtonActionProp = {this.addTaskButtonActionProp}/>

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