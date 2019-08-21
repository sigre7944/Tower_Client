import React from 'react'

import {
    View,
    Text,
    TouchableHighlight,
} from 'react-native';

import AddTaskButton from './layouts/AddTaskButton'
import OverlayModal from './layouts/modal-component/OverlayModal.Container'

export default class BottomTabNavigator extends React.Component {

    state = {
        addTaskClicked: false,
        renderAddTaskUI: null,
        keyboardHeight: 0,
        should_AddTaskButton_be_displayed: "flex"
    }

    //START of ./AddTaskButton.js
    addTaskButtonActionProp = () => {
        this.setState(prevState => ({
            addTaskClicked: !prevState.addTaskClicked,
        }))
    }
    //END of ./AddTaskButton.js

    chooseNewScreen = (routeName) => {
        this.props.navigation.navigate({ routeName })

        // this.props.changeRouteAction(routeName)
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.routeName !== prevProps.routeName) {
            if ((this.props.routeName === "Day" || this.props.routeName === "Week" || this.props.routeName === "Month")) {
                this.setState({
                    should_AddTaskButton_be_displayed: "flex"
                })
            }


            else {
                this.setState({
                    should_AddTaskButton_be_displayed: "none"
                })
            }
        }
    }

    render() {
        return (
            <>
                <View style={{
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                }}>
                    {
                        this.state.addTaskClicked ?
                            <OverlayModal
                                addTaskButtonActionProp={this.addTaskButtonActionProp}
                            />

                            :

                            <></>
                    }


                    <AddTaskButton
                        addTaskButtonActionProp={this.addTaskButtonActionProp}
                        should_AddTaskButton_be_displayed={this.state.should_AddTaskButton_be_displayed}
                    />


                    <View
                        style={{
                            display: "flex",
                            backgroundColor: 'gainsboro',
                            flexDirection: "row",
                            justifyContent: "space-around",
                            height: 60,
                        }}
                    >
                        <ScreenComponent
                            chooseNewScreen={this.chooseNewScreen}
                            screen_route_name={"Journal"}
                        />

                        <ScreenComponent
                            chooseNewScreen={this.chooseNewScreen}
                            screen_route_name={"Progress"}
                        />

                        <ScreenComponent
                            chooseNewScreen={this.chooseNewScreen}
                            screen_route_name={"Reward"}
                        />

                        <ScreenComponent
                            chooseNewScreen={this.chooseNewScreen}
                            screen_route_name={"Settings"}
                        />
                    </View>
                </View>
            </>
        )
    }
}

class ScreenComponent extends React.PureComponent {

    _onPress = () => {
        this.props.chooseNewScreen(this.props.screen_route_name)
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this._onPress}
                style={{
                    flex: 1,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{
                    fontSize: 12
                }}>
                    {this.props.screen_route_name}
                </Text>
            </TouchableHighlight>
        )
    }
}