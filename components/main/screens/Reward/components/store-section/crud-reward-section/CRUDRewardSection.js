import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { Map, fromJS } from 'immutable'

import AddEditReward from './add-edit-reward.js/AddEditReward.Container'
import DeleteReward from './delete-reward/DeleteReward.Container'

export default class TrackingSection extends React.PureComponent {
    edit_reward_data = {}
    delete_reward_id = ""

    state = {
        should_flatlist_update: 0,
        reward_data: [],
        is_add_new_reward: false,
        is_edit_reward: false,
        is_delete_reward: false
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

    getReward = (reward_id, reward_value) => {
        let purchase_history = Map(this.props.purchase_history),
            rewards = Map(this.props.rewards),
            balance = parseInt(this.props.balance)

        // Can buy when have enough balance
        if (balance >= reward_value) {
            if (rewards.has(reward_id)) {
                let date = new Date(),
                    day_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

                if (purchase_history.has(day_timestamp)) {
                    let purchase_timestamp_data = Map(purchase_history.get(day_timestamp))

                    if (purchase_timestamp_data.has(reward_id)) {
                        let item_data = Map(purchase_timestamp_data.get(reward_id)).toMap().asMutable()
                        item_data.update("quantity", (value) => value + 1)
                        item_data.update("latest_timestamp", (value) => new Date().getTime())

                        let sending_obj = {
                            purchase_item_data: {
                                timestamp: day_timestamp,
                                id: reward_id,
                                data: item_data
                            },

                            amount: reward_value
                        }

                        this.props.updatePurchaseItemThunk(sending_obj)
                    }

                    else {
                        let item_data = Map().asMutable()
                        item_data.set("id", reward_id)
                        item_data.set("quantity", 1)
                        item_data.set("latest_timestamp", new Date().getTime())

                        let sending_obj = {
                            purchase_item_data: {
                                timestamp: day_timestamp,
                                id: reward_id,
                                data: item_data
                            },

                            amount: reward_value
                        }

                        this.props.addPurchaseItemThunk(sending_obj)
                    }
                }

                else {
                    let timestamp_obj = {
                        id: reward_id,
                        latest_timestamp: new Date().getTime(),
                        quantity: 1
                    }

                    let sending_obj = {
                        purchase_item_data: {
                            timestamp: day_timestamp,
                            id: reward_id,
                            data: fromJS(timestamp_obj)
                        },

                        amount: reward_value
                    }

                    this.props.addPurchaseItemThunk(sending_obj)
                }
            }
        }
    }

    _setFlatListRef = (ref) => {
        this._flatlistReft = ref
    }

    _keyExtractor = (item, index) => `reward_${index}`

    _renderItem = ({ item, index }) => {
        if (item["is_add_button"]) {
            return (
                <AddRewardHolder
                    addNewReward={this.addNewReward}
                />
            )
        }

        else {
            return (
                <RewardHolder
                    data={item}
                    editReward={this.editReward}
                    deleteReward={this.deleteReward}
                    getReward={this.getReward}
                />
            )
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
                    data={Map(this.props.rewards).valueSeq().toArray()}
                    extraData={this.state.should_flatlist_update}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    numColumns={2}
                    ref={this._setFlatListRef}
                    columnWrapperStyle={{
                        justifyContent: "space-between"
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

                            <>
                                {this.state.is_delete_reward ?
                                    <DeleteReward
                                        dismissAction={this.dismissAction}
                                        reward_id={this.delete_reward_id}
                                    />

                                    :

                                    null
                                }
                            </>
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

    _deleteReward = () => {
        this.props.deleteReward(this.props.data.id)
    }

    _getReward = () => {
        this.props.getReward(this.props.data.id, this.props.data.value)
    }

    render() {
        return (
            <View
                style={{
                    width: (Dimensions.get("window").width - 67) / 2,
                    height: 185,
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    marginBottom: 22,
                    borderRadius: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: (Dimensions.get("window").width - 67) / 2 - 14,
                        marginTop: 7,
                    }}
                >
                    <TouchableOpacity
                        onPress={this._editReward}
                    >
                        <Text
                            style={{
                                fontSize: 9,
                            }}
                        >
                            Edit
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._deleteReward}
                    >
                        <Text
                            style={{
                                fontSize: 9,
                            }}
                        >
                            Del
                    </Text>
                    </TouchableOpacity>
                </View>

                <Text
                    style={{
                        fontSize: 16,
                        lineHeight: 19,
                        fontWeight: "500",
                        color: "rgba(0, 0, 0, 0.5)",
                        textAlign: "center",
                        marginTop: 5,
                        letterSpacing: -0.02
                    }}
                >
                    {this.props.data.name}
                </Text>

                <Text
                    style={{
                        fontWeight: "500",
                        fontSize: 24,
                        lineHeight: 28,
                        textAlign: "center",
                        letterSpacing: -0.02,
                        color: "rgba(0, 0, 0, 0.87)",
                        marginTop: 21,
                    }}
                >
                    {this.props.data.value} €
                </Text>

                <TouchableOpacity
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 110,
                        height: 36,
                        backgroundColor: "rgba(0, 0, 0, 0.87)",
                        borderRadius: 28,
                        marginTop: 28,
                    }}

                    onPress={this._getReward}
                >
                    <Text
                        style={{
                            color: "white",
                            lineHeight: 19,
                            fontSize: 16,
                            fontWeight: "500"
                        }}
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
                style={{
                    width: (Dimensions.get("window").width - 67) / 2,
                    height: 185,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    marginBottom: 22,
                    borderRadius: 10
                }}

                onPress={this.addNewReward}
            >
                <Text
                    style={{
                        color: "#FFFFFF"
                    }}
                >
                    Add
                </Text>
            </TouchableOpacity>
        )
    }
}
