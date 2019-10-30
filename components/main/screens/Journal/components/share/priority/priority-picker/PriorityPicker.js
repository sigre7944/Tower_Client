import React from 'react'

import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Animated,
    Easing,
    Switch,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Picker,
    Modal,
    Dimensions
} from 'react-native'

import { styles } from './styles/styles'

const window_width = Dimensions.get("window").width

export default class PriorityPicker extends React.PureComponent {

    state = {
        current_selected_priority: "Do first"
    }

    _changePickerValue = (value, index) => {
        this.setState({
            current_selected_priority: value
        })
    }

    _chooseDonePicker = () => {
        this.props._setPriorityValue(this.state.current_selected_priority)
        this.props._closePriorityPicker()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.selected_priority_value !== prevProps.selected_priority_value) {
            this.setState({
                current_selected_priority: this.props.selected_priority_value
            })
        }
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.should_display_priority_picker}
            >
                <View
                    style={{
                        flex: 1,
                        position: "relative"
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: window_width,
                            backgroundColor: "black",
                            opacity: 0.2
                        }}

                        onPress={this.props._closePriorityPicker}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            height: 200,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: "white",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                top: 20,
                                left: 0,
                                right: 0,
                                position: "absolute",
                                zIndex: 15,
                                height: 30,
                                paddingHorizontal: 30,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}

                                onPress={this.props._closePriorityPicker}
                            >
                                <Text
                                    style={styles.picker_cancel_option_text}
                                >
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}

                                onPress={this._chooseDonePicker}
                            >
                                <Text
                                    style={styles.picker_done_option_text}
                                >
                                    Done
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <Picker
                            selectedValue={this.state.current_selected_priority}
                            onValueChange={this._changePickerValue}
                            itemStyle={styles.picker_value_text}
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                zIndex: 10,
                                marginTop: 50,
                            }}
                        >
                            <Picker.Item
                                label="Do first"
                                value="Do first"
                                color="#F78096"
                            />
                            <Picker.Item
                                label="Plan"
                                value="Plan"
                                color="#EFDA6E"
                            />
                            <Picker.Item
                                label="Delay"
                                value="Delay"
                                color="#6F73D9"
                            />
                            <Picker.Item
                                label="Delegate"
                                value="Delegate"
                                color="#CBC8C8"
                            />
                        </Picker>
                    </View>
                </View>
            </Modal>
        )
    }
}