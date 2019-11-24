import React from 'react'

import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import AddTaskButton from './components/AddTaskButton'
import OverlayModal from './components/modal-component/OverlayModal.Container'
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

    toggleAddTask = () => {
        this.setState(prevState => ({
            addTaskClicked: !prevState.addTaskClicked,
        }))
    }

    chooseNewScreen = (routeName) => {
        this.props.navigation.navigate({ routeName })
    }

    componentDidMount(){
        if ((this.props.routeName === "Day" || this.props.routeName === "Week" || this.props.routeName === "Month")) {
            this.setState({
                should_AddTaskButton_be_displayed: true
            })
        }
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
                                toggleAddTask={this.toggleAddTask}
                            />

                            :
                            null
                    }

                    {this.state.should_AddTaskButton_be_displayed ?
                        <AddTaskButton
                            toggleAddTask={this.toggleAddTask}
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
                            routeName={this.props.routeName}
                        />

                        <ScreenComponent
                            chooseNewScreen={this.chooseNewScreen}
                            screen_route_name={"Progress"}
                            routeName={this.props.routeName}
                        />

                        <ScreenComponent
                            chooseNewScreen={this.chooseNewScreen}
                            screen_route_name={"Reward"}
                            routeName={this.props.routeName}
                        />

                        <ScreenComponent
                            chooseNewScreen={this.chooseNewScreen}
                            screen_route_name={"Settings"}
                            routeName={this.props.routeName}
                        />
                    </View>
                </View>
            </>
        )
    }
}

class ScreenComponent extends React.Component {

    state = {
        icon_style: styles.not_chosen_screen_component_icon,
        icon_text_style: styles.not_chosen_screen_component_text
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.routeName === "Day" || nextProps.routeName === "Week" || nextProps.routeName === "Month") && nextProps.screen_route_name === "Journal") {
            return ({
                icon_style: styles.chosen_screen_component_icon,
                icon_text_style: styles.chosen_screen_component_text
            })
        }

        if (nextProps.routeName === nextProps.screen_route_name) {
            return ({
                icon_style: styles.chosen_screen_component_icon,
                icon_text_style: styles.chosen_screen_component_text
            })
        }
        else {
            return ({
                icon_style: styles.not_chosen_screen_component_icon,
                icon_text_style: styles.not_chosen_screen_component_text
            })
        }
    }

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
                                style={this.state.icon_style}
                            />

                            <Text
                                style={this.state.icon_text_style}
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
                                        style={this.state.icon_style}
                                    />

                                    <Text
                                        style={this.state.icon_text_style}
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
                                                style={this.state.icon_style}
                                            />

                                            <Text
                                                style={this.state.icon_text_style}
                                            >
                                                {this.props.screen_route_name}
                                            </Text>
                                        </>

                                        :

                                        <>
                                            < FontAwesomeIcon
                                                icon={faSlidersH}
                                                size={20}
                                                style={this.state.icon_style}
                                            />

                                            <Text
                                                style={this.state.icon_text_style}
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