import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    Switch,
    KeyboardAvoidingView
} from 'react-native';

const shortid = require("shortid")

export default class AddEditReward extends React.PureComponent {

    state = {
        reward_title: "",
        reward_value: "",
        is_tracked: false
    }

    _dismissAction = () => {
        this.props.dismissAction()
    }

    cancel = () => {
        this.props.dismissAction()
    }

    onChangeRewardTitle = (e) => {
        this.setState({
            reward_title: e.nativeEvent.text
        })
    }

    onChangeRewardValue = (e) => {
        this.setState({
            reward_value: e.nativeEvent.text.replace(/[^0-9]/g, "")
        })
    }

    onChangeTrackReward = () => {
        this.setState(prevState => ({
            is_tracked: !prevState.is_tracked
        }))
    }

    add = () => {
        if (this.state.reward_title.length > 0 && this.state.reward_value.length > 0) {
            let sending_obj = {
                createReward_data: {
                    should_update: false
                },
                updateMainReward_data: {
                    should_update: false
                },
                updateReward_data: {
                    should_update: false
                },
            }


            if (!this.props.edit) {
                let reward_id = shortid.generate()

                sending_obj.createReward_data.should_update = true
                sending_obj.createReward_data.data = {
                    id: reward_id,
                    name: this.state.reward_title,
                    value: this.state.reward_value
                }


                if (this.state.is_tracked) {
                    sending_obj.updateMainReward_data.should_update = true
                    sending_obj.updateMainReward_data.id = reward_id
                }
            }

            else {
                sending_obj.updateReward_data.should_update = true
                sending_obj.updateReward_data.data = {
                    id: this.props.edit_reward_data.id,
                    name: this.state.reward_title,
                    value: this.state.reward_value
                }

                if (this.state.is_tracked) {
                    sending_obj.updateMainReward_data.should_update = true
                    sending_obj.updateMainReward_data.id = this.props.edit_reward_data.id
                }
            }

            this.props.updateRewardAndMainReward(sending_obj)
        }

        this.props.dismissAction()
    }

    componentDidMount() {
        let { edit_reward_data } = this.props

        if (edit_reward_data) {
            this.setState({
                reward_title: edit_reward_data.name,
                reward_value: edit_reward_data.value,
                is_tracked: this.props.main_reward === edit_reward_data.id
            })
        }
    }

    render() {
        return (
            <Modal
                transparent={true}
            >
                <View
                    style={{
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: Dimensions.get("window").width,
                            backgroundColor: "black",
                            opacity: 0.5
                        }}

                        onPress={this._dismissAction}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            width: 300,
                            height: 330,
                            borderRadius: 10,
                            backgroundColor: "white",
                            paddingHorizontal: 22,
                            paddingVertical: 32,
                        }}
                    >
                        <Text
                            style={{
                                textAlign: "center"
                            }}
                        >
                            {
                                this.props.edit ?
                                    "Add New Reward" : "Edit Reward"
                            }
                        </Text>

                        <View
                            style={{
                                marginTop: 10
                            }}
                        >
                            <Text>
                                Reward title:
                            </Text>
                            <TextInput
                                style={{
                                    width: 256,
                                    height: 40,
                                    borderRadius: 7,
                                    backgroundColor: "gainsboro",
                                    marginTop: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                }}

                                onChange={this.onChangeRewardTitle}
                                value={this.state.reward_title}
                                placeholder={this.props.edit_reward_data ? `${this.props.edit_reward_data.name}` : ""}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 20,
                                alignItems: "center"
                            }}
                        >
                            <Text>
                                Reward value:
                            </Text>
                            <TextInput
                                style={{
                                    width: 100,
                                    height: 40,
                                    borderRadius: 7,
                                    backgroundColor: "gainsboro",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    marginLeft: 20,
                                }}

                                onChange={this.onChangeRewardValue}
                                value={this.state.reward_value}
                                keyboardType={"numbers-and-punctuation"}
                                placeholder={this.props.edit_reward_data ? `${this.props.edit_reward_data.value}` : ""}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 20,
                            }}
                        >
                            <Text>
                                Track reward
                            </Text>

                            <Switch
                                style={{
                                    marginLeft: 20,
                                }}

                                value={this.state.is_tracked}
                                onValueChange={this.onChangeTrackReward}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginTop: 40,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}

                                onPress={this.cancel}
                            >
                                <Text>
                                    X
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 10,
                                }}

                                onPress={this.add}
                            >
                                <Text>
                                    Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        )
    }
}