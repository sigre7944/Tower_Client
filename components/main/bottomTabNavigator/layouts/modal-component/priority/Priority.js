import React, { Component } from 'react';

import {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    Keyboard,
    Modal,
    Picker,
    Animated,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native';

export default class Priority extends React.Component {

    decision_matrix = [["Delegate", "Delay"], ["Plan", "Do First"]]
    importance_index = 1
    urgency_index = 1

    customConfigLayoutAnimation = {
        duration: 200,
        create: {
            type: LayoutAnimation.Types.linear,
            property: LayoutAnimation.Properties.scaleXY
        },
        update: {
            type: LayoutAnimation.Types.easeInEaseOut
        }
    }

    constructor(props) {
        super(props)

        if (Platform.OS === "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    regExp = new RegExp(/^\d+$/)

    state = {
        translateYAnim: new Animated.Value(0),
        priority_value: "Do First",
        priority_picker_chosen: false,
        matrix_helper_chosen: false,

        reward_value: "0"
    }

    changeViewToMatrix = () => {
        // LayoutAnimation.configureNext(this.customConfigLayoutAnimation)

        this.setState(prevState => ({
            matrix_helper_chosen: !prevState.matrix_helper_chosen
        }))
    }

    togglePriorityPicker = () => {
        this.setState(prevState => ({
            priority_picker_chosen: !prevState.priority_picker_chosen
        }))
    }

    changeRewardValue = (value) => {
        this.setState({
            reward_value: value.replace(/[^0-9]/g, "")
        })
    }

    changePriorityValue = (value) => {
        this.setState({
            priority_value: value
        })

        if (value === "Do First") {
            this.importance_index = 1
            this.urgency_index = 1

        }

        else if (value === "Plan") {
            this.importance_index = 1
            this.urgency_index = 0

        }

        else if (value === "Delay") {
            this.importance_index = 0
            this.urgency_index = 1

        }

        else if (value === "Delegate") {
            this.importance_index = 0
            this.urgency_index = 0

        }
    }

    decidePriorityValue = ({ type, value }) => {
        if (type === "Importance") {
            this.importance_index = value
        }

        else if (type === "Urgency") {
            this.urgency_index = value
        }

        this.setState({
            priority_value: this.decision_matrix[this.importance_index][this.urgency_index]
        })
    }

    toDoWhenKeyBoardWillShow = () => {
        Animated.timing(
            this.state.translateYAnim,
            {
                toValue: -100,
                duration: 200,
            }
        ).start()
    }

    toDoWhenKeyboardWillHide = () => {
        Animated.timing(
            this.state.translateYAnim,
            {
                toValue: 0,
                duration: 200,
            }
        ).start()
    }

    _updatePriority = () => {
        let {priorities} = this.props
        for(let key in priorities){
            if(priorities.hasOwnProperty(key)){
                if(priorities[key].name === this.state.priority_value){
                    this.props.updatePriority({
                        value: key,
                        reward: parseInt(this.state.reward_value)
                    })
                }
            }
        }
    }

    save = () => {
        this._updatePriority()
        this.props.disableAllTabs()
    }

    componentDidMount() {
        this.keyboardWillShowListener = Keyboard.addListener(
            "keyboardWillShow",
            this.toDoWhenKeyBoardWillShow
        )

        this.keyboardWillHideListener = Keyboard.addListener(
            "keyboardWillHide",
            this.toDoWhenKeyboardWillHide
        )

        let {priority} = this.props.currentTask,
            priorities = this.props.priorities
        
        this.changePriorityValue(priorities[priority.value].name)
        
        if(parseInt(priority.reward) > 0){
            this.setState({
                reward_value: `${priority.reward}`
            })
        }
    }

    componentWillUnmount() {
        Keyboard.removeListener("keyboardWillShow", this.toDoWhenKeyBoardWillShow)
        Keyboard.removeListener("keyboardWillHide", this.toDoWhenKeyboardWillHide)
    }

    render() {
        return (
            <>
                {!this.state.matrix_helper_chosen ?

                    <Animated.View
                        style={{
                            position: "absolute",
                            width: 338,
                            height: 316,
                            backgroundColor: "white",
                            borderRadius: 10,
                            paddingHorizontal: 30,
                            paddingVertical: 30,
                            transform: [{ translateY: this.state.translateYAnim }]
                        }}
                    >
                        <PriorityTopRow
                            togglePriorityPicker={this.togglePriorityPicker}
                            priority_value={this.state.priority_value}
                            changeViewToMatrix={this.changeViewToMatrix}
                        />

                        <ImportanceUrgencyRow
                            label={"Importance"}
                            decidePriorityValue={this.decidePriorityValue}
                            decision_index={this.importance_index}
                        />

                        <ImportanceUrgencyRow
                            label={"Urgency"}
                            decidePriorityValue={this.decidePriorityValue}
                            decision_index={this.urgency_index}
                        />

                        <Reward
                            changeRewardValue = {this.changeRewardValue}
                            reward_value = {this.state.reward_value}
                        />

                        <View
                            style={{
                                height: 60,
                                marginBottom: 10,
                                backgroundColor: 'white',
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: 'center'
                            }}
                        >
                            <TouchableHighlight
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'gray',
                                    marginRight: 20
                                }}
                            >
                                <Text
                                    style={{
                                        color: "white"
                                    }}
                                >
                                    X
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 50,
                                    width: 50,
                                    borderRadius: 25,
                                    backgroundColor: 'gray',
                                    marginRight: 10
                                }}

                                onPress={this.save}
                            >
                                <Text
                                    style={{
                                        color: "white"
                                    }}
                                >
                                    OK
                                </Text>
                            </TouchableHighlight>
                        </View>

                        {this.state.priority_picker_chosen ?
                            <PriorityPicker
                                togglePriorityPicker={this.togglePriorityPicker}
                                priority_value={this.state.priority_value}
                                changePriorityValue={this.changePriorityValue}
                            />

                            :

                            <></>
                        }

                    </Animated.View>

                    :

                    <DecisionMatrix
                        changeViewToMatrix={this.changeViewToMatrix}
                    />
                }
            </>
        )
    }

}

class PriorityTopRow extends React.PureComponent {

    togglePriorityPicker = () => {
        this.props.togglePriorityPicker()
    }

    changeViewToMatrix = () => {
        this.props.changeViewToMatrix()
    }

    render() {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Text
                    style={{
                        color: "red"
                    }}
                >Priority</Text>

                <TouchableHighlight
                    style={{
                        marginLeft: 50,
                        width: 73,
                        height: 25,
                        borderBottomWidth: 1,
                        borderColor: "red",
                        justifyContent: "center",
                        alignItems: "center"
                    }}

                    onPress={this.togglePriorityPicker}
                >
                    <Text
                        style={{
                            color: "red"
                        }}
                    >
                        {this.props.priority_value}
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={{
                        width: 21,
                        height: 21,
                        marginLeft: 32,
                        borderRadius: 21,
                        backgroundColor: "red"
                    }}

                    onPress={this.changeViewToMatrix}
                >
                    <></>
                </TouchableHighlight>
            </View>
        )
    }
}

class ImportanceUrgencyRow extends React.PureComponent {

    currentIndex = 0

    state = {
        bulletTransformX: new Animated.Value(15),
        barWidth: new Animated.Value(20)
    }

    chooseLow = () => {
        this.props.decidePriorityValue({ type: this.props.label, value: 0 })

        this.currentIndex = 0

        Animated.parallel([
            Animated.timing(
                this.state.bulletTransformX,
                {
                    toValue: -5,
                    duration: 100
                }
            ),
            Animated.timing(
                this.state.barWidth,
                {
                    toValue: 0,
                    duration: 100
                }
            )
        ]).start()
    }

    chooseHigh = () => {
        this.props.decidePriorityValue({ type: this.props.label, value: 1 })

        this.currentIndex = 1

        Animated.parallel([
            Animated.timing(
                this.state.bulletTransformX,
                {
                    toValue: 15,
                    duration: 100
                }
            ),
            Animated.timing(
                this.state.barWidth,
                {
                    toValue: 20,
                    duration: 100
                }
            )
        ]).start()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.decision_index === 0 && this.props.decision_index !== prevProps.decision_index) {
            this.chooseLow()
        }

        else if (this.props.decision_index === 1 && this.props.decision_index !== prevProps.decision_index) {
            this.chooseHigh()
        }
    }

    render() {
        return (
            <View
                style={{
                    marginTop: 30,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <Text>{this.props.label}</Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <TouchableHighlight
                        onPress={this.chooseLow}
                    >
                        <Text>Low</Text>
                    </TouchableHighlight>

                    <View
                        style={{
                            marginHorizontal: 10,
                            position: "relative",
                            justifyContent: "center",
                            width: 20,
                            height: 2,
                            backgroundColor: "gainsboro"
                        }}
                    >
                        {/* Bar */}
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: this.state.barWidth,
                                height: 2,
                                backgroundColor: "black",
                            }}
                        >

                        </Animated.View>

                        {/* Bullet */}
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: 10,
                                height: 10,
                                backgroundColor: "black",
                                borderRadius: 10,
                                transform: [{ translateX: this.state.bulletTransformX }]
                            }}
                        >

                        </Animated.View>

                    </View>

                    <TouchableHighlight
                        onPress={this.chooseHigh}
                    >
                        <Text>High</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}


class Reward extends React.PureComponent {

    _onChange = (e) => {
        this.props.changeRewardValue(e.nativeEvent.text)
    }

    render() {
        return (
            <View
                style={{
                    marginTop: 43,
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <Text>
                    Rewards
                    </Text>

                <TextInput
                    style={{
                        marginLeft: 40,
                        textAlign: "center",
                        height: 22,
                        width: 42,
                        borderBottomWidth: 1,
                        borderColor: "gainsboro"
                    }}

                    keyboardType={"numbers-and-punctuation"}
                    value={this.props.reward_value}
                    onChange={this._onChange}
                    maxLength={4}
                    placeholder={"0"}
                />

                <Text
                    style={{
                        marginLeft: 20,
                    }}
                >
                    €
                    </Text>
            </View>
        )
    }
}

class PriorityPicker extends React.PureComponent {
    togglePriorityPicker = () => {
        this.props.togglePriorityPicker()
    }

    _onValueChange = (itemValue, itemIndex) => {
        this.props.changePriorityValue(itemValue)
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <TouchableHighlight
                    style={{
                        flex: 1,
                        backgroundColor: "black",
                        opacity: 0.5
                    }}

                    onPress={this.togglePriorityPicker}
                >
                    <></>
                </TouchableHighlight>

                <View
                    style={{
                        bottom: 0,
                        right: 0,
                        left: 0,
                        height: 200,
                        justifyContent: "center",
                        position: "absolute",
                        backgroundColor: "white",
                    }}
                >
                    <Picker
                        selectedValue={this.props.priority_value}
                        onValueChange={this._onValueChange}
                    >
                        <Picker.Item
                            label={"Do First"}
                            value={"Do First"}
                        />

                        <Picker.Item
                            label={"Plan"}
                            value={"Plan"}
                        />

                        <Picker.Item
                            label={"Delay"}
                            value={"Delay"}
                        />

                        <Picker.Item
                            label={"Delegate"}
                            value={"Delegate"}
                        />
                    </Picker>
                </View>
            </Modal>
        )
    }
}

class DecisionMatrix extends React.PureComponent {
    scaleXY = new Animated.Value(0.7)

    state = {
    }

    changeViewToMatrix = () => {
        this.props.changeViewToMatrix()
    }

    componentDidMount() {
        Animated.timing(
            this.scaleXY,
            {
                toValue: 1,
                duration: 200
            }
        ).start()
    }

    render() {
        return (
            <Animated.View
                style={{
                    position: "absolute",
                    width: 338,
                    height: 390,
                    backgroundColor: "white",
                    borderRadius: 10,
                    paddingHorizontal: 30,
                    paddingVertical: 30,
                    transform: [{ scaleX: this.scaleXY }, { scaleY: this.scaleXY }]
                }}
            >
                <View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 248,
                        height: 22,
                    }}
                >
                    <Text>
                        The Eisenhower Decision Matrix
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 24,
                        flexDirection: "row",
                        flex: 1,
                        height: 125,
                        position: "relative",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                color: "red"
                            }}
                        >
                            Urgent
                        </Text>

                        <View
                            style={{
                                width: 122,
                                height: 100,
                                marginTop: 7,
                                position: "relative",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text
                                style={{
                                    color: "red"
                                }}
                            >
                                1. DO FIRST
                            </Text>

                            <View
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    height: 100,
                                    width: 10,
                                    borderRadius: 30,
                                    backgroundColor: "red"
                                }}
                            >

                            </View>

                            <View
                                style={{
                                    alignItems: "center",
                                    position: "absolute",
                                    width: 100,
                                    height: 18,
                                    left: 0,
                                    transform: [{ rotate: "-90deg" }, { translateY: -60 }],
                                }}
                            >
                                <Text
                                    style={{
                                        color: "red"
                                    }}
                                >
                                    Important
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <Text>Not Urgent</Text>

                        <View
                            style={{
                                width: 122,
                                height: 100,
                                marginTop: 7,
                                position: "relative",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text>2. PLAN</Text>

                            <View
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    height: 100,
                                    width: 10,
                                    borderRadius: 30,
                                    backgroundColor: "gray"
                                }}
                            >

                            </View>
                        </View>
                    </View>

                </View>

                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        flex: 1,
                        height: 100,
                        position: "relative",
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                width: 122,
                                height: 100,
                                marginTop: 7,
                                position: "relative",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text>3. DELAY</Text>

                            <View
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    height: 100,
                                    width: 10,
                                    borderRadius: 30,
                                    backgroundColor: "gray"
                                }}
                            >

                            </View>

                            <View
                                style={{
                                    alignItems: "center",
                                    position: "absolute",
                                    width: 100,
                                    height: 18,
                                    left: 0,
                                    transform: [{ rotate: "-90deg" }, { translateY: -60 }],
                                }}
                            >
                                <Text>Not Important</Text>
                            </View>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                width: 122,
                                height: 100,
                                marginTop: 7,
                                position: "relative",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text>4. DELEGATE</Text>

                            <View
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    height: 100,
                                    width: 10,
                                    borderRadius: 30,
                                    backgroundColor: "gray"
                                }}
                            >

                            </View>
                        </View>
                    </View>

                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end"
                    }}
                >
                    <TouchableHighlight
                        style={{
                            width: 50,
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center"
                        }}

                        onPress={this.changeViewToMatrix}
                    >
                        <Text>OK</Text>
                    </TouchableHighlight>
                </View>
            </Animated.View>
        )
    }
}