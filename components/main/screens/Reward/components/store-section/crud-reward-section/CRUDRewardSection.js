import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { Map, fromJS, OrderedMap, isKeyed } from 'immutable'

import AddEditReward from './add-edit-reward/AddEditReward.Container'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faPlus,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/styles";
import { Haptics } from "expo";
import { Audio } from "expo-av";

const window_width = Dimensions.get("window").width
const number_of_columns = 2
const reward_holder_width = (window_width - (22 * 2 + 23 * (number_of_columns - 1))) / number_of_columns //22 = paddingHorizontal value, 23 = margin between 2 cols

export default class CRUDRewardSection extends React.PureComponent {
    edit_reward_data = {}
    delete_reward_id = ""

    state = {
        should_flatlist_update: 0,
        reward_data: [],
        is_add_new_reward: false,
        is_edit_reward: false,
        is_delete_reward: false,
    }

    addNewReward = () => {
        this.setState({
            is_add_new_reward: true,
            is_edit_reward: false,
            is_delete_reward: false
        })
    }

    editReward = (edit_reward_data) => {
        this.setState({
            is_add_new_reward: false,
            is_edit_reward: true,
            is_delete_reward: false
        })

        this.edit_reward_data = edit_reward_data
    }

    deleteReward = (reward_id) => {
        this.setState({
            is_add_new_reward: false,
            is_edit_reward: false,
            is_delete_reward: true
        })

        this.delete_reward_id = reward_id
    }

    dismissAction = () => {
        this.setState({
            is_add_new_reward: false,
            is_edit_reward: false,
            is_delete_reward: false,
        })
    }

    _playingSound = async () => {
        try {
            const completing_sound = new Audio.Sound()
            await completing_sound.loadAsync(require("../../../../../../../assets/sounds/GetReward01.wav"))
            await completing_sound.playAsync()
        }

        catch (error) {
            console.log(error)
        }
    }

    _getReward = (reward_id, reward_name, reward_value) => {
        let purchase_history_map = OrderedMap(this.props.purchase_history),
            rewards = OrderedMap(this.props.rewards),
            balance = parseFloat(this.props.balance)

        // Can buy when have enough balance
        if (balance >= reward_value) {
            if (rewards.has(reward_id)) {
                let date = new Date(),
                    day_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
                    day_timestamp_toString = day_timestamp.toString(),
                    timestamp_without_seconds = day_timestamp + (date.getHours() * 3600 * 1000) + (date.getMinutes() * 60 * 1000),
                    timestamp_without_seconds_toString = timestamp_without_seconds.toString(),
                    sending_obj = {
                        purchase_item_data: {

                        },
                        balance_data: {
                            type: "WITHDRAW_BALANCE_AMOUNT",
                            amount: reward_value
                        }
                    }

                if (purchase_history_map.hasIn([day_timestamp_toString, timestamp_without_seconds_toString, reward_id, "quantity"])) {
                    sending_obj.purchase_item_data = {
                        keyPath: [day_timestamp_toString, timestamp_without_seconds_toString, reward_id, "quantity"],
                        notSetValue: 0,
                        updater: (value) => value + 1
                    }
                }

                else {
                    if (purchase_history_map.hasIn([day_timestamp_toString, timestamp_without_seconds_toString])) {
                        let updater_data = OrderedMap(purchase_history_map.getIn([day_timestamp_toString, timestamp_without_seconds_toString])).asMutable()

                        updater_data.set(reward_id, fromJS({
                            id: reward_id,
                            value: reward_value,
                            name: reward_name,
                            quantity: 1,
                            latest_timestamp: timestamp_without_seconds
                        }))

                        sending_obj.purchase_item_data = {
                            keyPath: [day_timestamp_toString, timestamp_without_seconds_toString],
                            notSetValue: {},
                            updater: (value) => updater_data.toOrderedMap()
                        }
                    }

                    else {
                        if (purchase_history_map.has(day_timestamp_toString)) {
                            let updater_data = {}

                            updater_data[reward_id] = {
                                id: reward_id,
                                value: reward_value,
                                name: reward_name,
                                quantity: 1,
                                latest_timestamp: timestamp_without_seconds
                            }

                            sending_obj.purchase_item_data = {
                                keyPath: [day_timestamp_toString, timestamp_without_seconds_toString],
                                notSetValue: {},
                                updater: (value) => fromJS(updater_data, (key, value, path) => {
                                    return isKeyed(value) ? value.toOrderedMap() : value.toList()
                                })
                            }
                        }

                        else {
                            let updater_data = {}
                            updater_data[timestamp_without_seconds_toString] = {}
                            updater_data[timestamp_without_seconds_toString][reward_id] = {
                                id: reward_id,
                                value: reward_value,
                                name: reward_name,
                                quantity: 1,
                                latest_timestamp: timestamp_without_seconds
                            }

                            sending_obj.purchase_item_data = {
                                keyPath: [day_timestamp_toString],
                                notSetValue: {},
                                updater: (value) => fromJS(updater_data, (key, value, path) => {
                                    return isKeyed(value) ? value.toOrderedMap() : value.toList()
                                })
                            }
                        }
                    }
                }

                this.props.updatePurchaseItemThunk(sending_obj)
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                this._playingSound()
            }
        }
    }

    _setFlatListRef = (ref) => {
        this._flatlistReft = ref
    }

    _keyExtractor = (item, index) => `reward-CRUD-Store-${item[0]}`

    _renderItem = ({ item, index }) => {
        if (item[0] === "is_add_button") {
            return (
                <AddRewardHolder
                    addNewReward={this.addNewReward}
                />
            )
        }

        else {
            return (
                <RewardHolder
                    data={item[1]}
                    editReward={this.editReward}
                    deleteReward={this.deleteReward}
                    _getReward={this._getReward}
                />
            )
        }
    }

    _updateRewardData = () => {
        let rewards_map = OrderedMap(this.props.rewards),
            reward_data = []

        reward_data.push(["is_add_button", {
            is_add_button: true
        }])

        rewards_map.entrySeq().forEach((entry, index) => {
            reward_data.push(entry)
        })

        this.setState({
            reward_data
        })
    }

    componentDidMount() {
        this._updateRewardData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.rewards !== prevProps.rewards) {
            this._updateRewardData()
        }
    }

    render() {
        return (
            <View
                style={{
                    marginTop: 22,
                }}
            >
                <FlatList
                    data={this.state.reward_data}
                    extraData={this.state.should_flatlist_update}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    numColumns={2}
                    ref={this._setFlatListRef}
                    columnWrapperStyle={{
                        justifyContent: "space-between",
                        marginTop: 22
                    }}
                />

                {this.state.is_add_new_reward ?
                    <AddEditReward
                        dismissAction={this.dismissAction}
                    />
                    :

                    <>
                        {this.state.is_edit_reward ?
                            <AddEditReward
                                dismissAction={this.dismissAction}
                                edit={true}
                                edit_reward_data={this.edit_reward_data}
                            />

                            :

                            null
                        }
                    </>
                }

            </View>
        )
    }
}


class RewardHolder extends React.PureComponent {
    _editReward = () => {
        this.props.editReward(this.props.data)
    }

    _getReward = () => {
        let data_map = Map(this.props.data)
        this.props._getReward(data_map.get("id"), data_map.get("name"), data_map.get("value"))
    }

    render() {
        let reward_value = Map(this.props.data).get("value"),
            reward_name = Map(this.props.data).get("name")
        return (
            <View
                style={
                    { ...{ width: reward_holder_width }, ...styles.reward_holder_container }
                }
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        width: reward_holder_width,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: 24,
                            width: 24,
                            alignItems: "flex-start",
                            justifyContent: "flex-end"
                        }}
                        onPress={this._editReward}
                    >
                        <FontAwesomeIcon
                            icon={faEdit}
                            color="#05838B"
                            size={14}
                        />
                    </TouchableOpacity>
                </View>

                <Text
                    style={reward_name}
                >
                    {reward_name}
                </Text>

                <Text
                    style={styles.reward_value}
                >
                    {reward_value} €
                </Text>

                <TouchableOpacity
                    style={styles.reward_get_button_container}

                    onPress={this._getReward}
                >
                    <Text
                        style={styles.reward_get_text}
                    >
                        Get
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

class AddRewardHolder extends React.PureComponent {

    addNewReward = () => {
        this.props.addNewReward()
    }

    render() {
        return (
            <TouchableOpacity
                style={
                    { ...{ width: reward_holder_width }, ...styles.add_button_container }
                }

                onPress={this.addNewReward}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    color="white"
                    size={45}
                />
            </TouchableOpacity>
        )
    }
}
