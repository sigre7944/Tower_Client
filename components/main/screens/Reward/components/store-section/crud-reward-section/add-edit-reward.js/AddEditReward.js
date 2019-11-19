import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    Modal,
    Switch,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faEdit,
    faDollarSign,
    faCheck,
    faTimes
} from "@fortawesome/free-solid-svg-icons";

import { styles } from "./styles/styles";

import { Map, fromJS } from "immutable";
const shortid = require("shortid")

export default class AddEditReward extends React.PureComponent {

    state = {
        reward_title: "",
        reward_value: "",
        is_main: false,
        toggle_delete: false
    }

    _dismissAction = () => {
        this.props.dismissAction()
    }

    _toggleDelete = () => {
        this.setState(prevState => ({
            toggle_delete: !prevState.toggle_delete
        }))
    }

    _delete = () => {
        let edit_reward_data_map = Map(this.props.edit_reward_data),
            sending_obj = {
                delete_reward_data: {
                    keyPath: [edit_reward_data_map.get("id")]
                }
            }

        this.props.deleteReward(sending_obj)
        this.props.dismissAction()
    }

    _cancel = () => {
        this.props.dismissAction()
    }

    onChangeRewardTitle = (e) => {
        this.setState({
            reward_title: e.nativeEvent.text
        })
    }

    onChangeRewardValue = (e) => {
        this.setState({
            reward_value: e.nativeEvent.text.replace(/[,]/g, ".")
        })
    }

    onChangeTrackReward = () => {
        this.setState(prevState => ({
            is_main: !prevState.is_main
        }))
    }

    _save = () => {
        if (this.state.reward_title.length > 0 && this.state.reward_value.length > 0) {
            if (this.props.edit) {
                let edit_reward_data_map = Map(this.props.edit_reward_data),
                    sending_obj = {
                        edit_reward_data: {
                            keyPath: [edit_reward_data_map.get("id")],
                            notSetValue: {},
                            updater: (value) => fromJS({
                                id: edit_reward_data_map.get("id"),
                                name: this.state.reward_title,
                                value: parseFloat(this.state.reward_value),
                                created_at: edit_reward_data_map.get("created_at"),
                            })
                        },

                        update_main_reward_data: {
                            should_update: this.state.is_main,
                            id: edit_reward_data_map.get("id")
                        }
                    }

                this.props.editRewardAndMainReward(sending_obj)
            }

            else {
                let reward_id = `reward-${shortid.generate()}`,
                    sending_obj = {
                        new_reward_data: {
                            keyPath: [reward_id],
                            notSetValue: {},
                            updater: (value) => fromJS({
                                id: reward_id,
                                name: this.state.reward_title,
                                value: parseFloat(this.state.reward_value),
                                created_at: new Date().getTime()
                            })
                        },
                        update_main_reward_data: {
                            should_update: this.state.is_main,
                            id: reward_id
                        }
                    }

                this.props.addRewardAndMainReward(sending_obj)
            }
        }

        this.props.dismissAction()
    }

    componentDidMount() {

        if (this.props.edit) {
            let { edit_reward_data } = this.props

            this.setState({
                reward_title: Map(edit_reward_data).get("name"),
                reward_value: `${Map(edit_reward_data).get("value")}`,
                is_main: Map(edit_reward_data).get("id") === this.props.main_reward
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
                    <TouchableWithoutFeedback
                        onPress={this._dismissAction}
                    >
                        <View
                            style={{
                                flex: 1,
                                width: Dimensions.get("window").width,
                                backgroundColor: "black",
                                opacity: 0.5
                            }}
                        >

                        </View>
                    </TouchableWithoutFeedback>

                    {this.state.toggle_delete ?
                        <View
                            style={{
                                position: "absolute",
                                width: 331,
                                borderRadius: 10,
                                backgroundColor: "white",
                                paddingHorizontal: 32,
                                paddingVertical: 32,
                            }}
                        >
                            <Text
                                style={styles.delete_warning_text}
                            >
                                Are you sure you want to delete this reward?
                            </Text>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 32
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.cancel_container}
                                    onPress={this._toggleDelete}
                                >
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        color="white"
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ ...styles.save_container, ...{ backgroundColor: "#EB5757" } }}

                                    onPress={this._delete}
                                >
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        :


                        <View
                            style={{
                                position: "absolute",
                                width: 331,
                                borderRadius: 10,
                                backgroundColor: "white",
                                paddingHorizontal: 32,
                                paddingVertical: 32,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                {!this.props.edit ?
                                    <>
                                        <FontAwesomeIcon
                                            icon={faDollarSign}
                                            color="#2C2C2C"
                                            size={17}
                                        />

                                        <Text
                                            style={styles.title}
                                        >
                                            Add Reward
                                    </Text>
                                    </>

                                    :

                                    <>
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            color="#2C2C2C"
                                            size={17}
                                        />

                                        <Text
                                            style={styles.title}
                                        >
                                            Edit Reward
                                    </Text>
                                    </>
                                }
                            </View>

                            <View
                                style={{
                                    marginTop: 32
                                }}
                            >
                                <Text
                                    style={styles.reward_title_informer}
                                >
                                    Title
                            </Text>
                                <TextInput
                                    style={styles.reward_input}

                                    onChange={this.onChangeRewardTitle}
                                    maxLength={24}
                                    value={this.state.reward_title}
                                    placeholder={this.props.edit_reward_data ? `${this.props.edit_reward_data.name}` : "Enter a reward title"}
                                />
                            </View>

                            <View
                                style={{
                                    marginTop: 22
                                }}
                            >
                                <Text
                                    style={styles.reward_title_informer}
                                >
                                    Value
                            </Text>
                                <TextInput
                                    style={styles.reward_input}

                                    onChange={this.onChangeRewardValue}
                                    value={this.state.reward_value}
                                    keyboardType={"numeric"}
                                    placeholder={this.props.edit_reward_data ? `${this.props.edit_reward_data.value}` : "Enter a value for the reward"}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 22,
                                }}
                            >
                                <Text
                                    style={styles.set_as_main_reward_text}
                                >
                                    Set as main reward
                            </Text>

                                <Switch
                                    value={this.state.is_main}
                                    onValueChange={this.onChangeTrackReward}
                                    trackColor={{
                                        false: "rgba(189, 189, 189, 0.2)",
                                        true: "#05838B"
                                    }}
                                    ios_backgroundColor="rgba(189, 189, 189, 0.2)"
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 40,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={this._toggleDelete}
                                >
                                    <Text
                                        style={styles.delete_reward_text}
                                    >
                                        {this.props.edit ?
                                            `Delete reward`
                                            :

                                            null

                                        }
                                    </Text>
                                </TouchableOpacity>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.cancel_container}

                                        onPress={this._cancel}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            color="white"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.save_container}

                                        onPress={this._save}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            color="white"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </View>
            </Modal>
        )
    }
}