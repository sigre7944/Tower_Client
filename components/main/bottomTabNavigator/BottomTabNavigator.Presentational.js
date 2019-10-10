import React from 'react'

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import AddTaskButton from './layouts/AddTaskButton'
import OverlayModal from './layouts/modal-component/OverlayModal.Container'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
    faClipboardList,
    faChartBar,
    faMoneyBill,
    faSlidersH
} from '@fortawesome/free-solid-svg-icons'

import { styles } from './styles/styles'

export default class BottomTabNavigator extends React.Component {

    state = {
        addTaskClicked: false,
        renderAddTaskUI: null,
        keyboardHeight: 0,
        should_AddTaskButton_be_displayed: false,
    }

    activateAddTask = () => {
        this.setState({
            addTaskClicked: true
        })
    }

    dismissAddTask = () => {
        this.setState({
            addTaskClicked: false
        })
    }

    addTaskButtonActionProp = () => {
        this.setState(prevState => ({
            addTaskClicked: !prevState.addTaskClicked,
        }))
    }

    chooseNewScreen = (routeName) => {
        this.props.navigation.navigate({ routeName })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.routeName !== prevProps.routeName) {
            if ((this.props.routeName === "Day" || this.props.routeName === "Week" || this.props.routeName === "Month")) {
                this.setState({
                    should_AddTaskButton_be_displayed: true
                })
            }

            else {
                this.setState({
                    should_AddTaskButton_be_displayed: false
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
                                dismissAddTask={this.dismissAddTask}
                            />

                            :

                            <></>
                    }

                    {this.state.should_AddTaskButton_be_displayed ?
                        <AddTaskButton
                            activateAddTask={this.activateAddTask}
                        />
                        :

                        null
                    }


                    <View
                        style={{
                            display: "flex",
                            backgroundColor: '#FFFFFF',
                            flexDirection: "row",
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
            <TouchableOpacity
                onPress={this._onPress}
                style={{
                    flex: 1,
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {this.props.screen_route_name === "Journal" ?
                        <>
                            < FontAwesomeIcon
                                icon={faClipboardList}
                                size={20}
                                style={styles.screen_component_icon}
                            />

                            <Text
                                style={styles.screen_component_text}
                            >
                                {this.props.screen_route_name}
                            </Text>
                        </>
                        :
                        <>
                            {this.props.screen_route_name === "Progress" ?
                                <>
                                    < FontAwesomeIcon
                                        icon={faChartBar}
                                        size={20}
                                        style={styles.screen_component_icon}
                                    />

                                    <Text
                                        style={styles.screen_component_text}
                                    >
                                        {this.props.screen_route_name}
                                    </Text>
                                </>

                                :

                                <>
                                    {this.props.screen_route_name === "Reward" ?
                                        <>
                                            < FontAwesomeIcon
                                                icon={faMoneyBill}
                                                size={20}
                                                style={styles.screen_component_icon}
                                            />

                                            <Text
                                                style={styles.screen_component_text}
                                            >
                                                {this.props.screen_route_name}
                                            </Text>
                                        </>

                                        :

                                        <>
                                            < FontAwesomeIcon
                                                icon={faSlidersH}
                                                size={20}
                                                style={styles.screen_component_icon}
                                            />

                                            <Text
                                                style={styles.screen_component_text}
                                            >
                                                {this.props.screen_route_name}
                                            </Text>
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </View>
            </TouchableOpacity>
        )
    }
}