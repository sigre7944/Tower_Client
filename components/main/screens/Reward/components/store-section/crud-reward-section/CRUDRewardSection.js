import React from 'react';
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';

import { Map, fromJS, OrderedMap } from 'immutable'

import AddEditReward from './add-edit-reward.js/AddEditReward.Container'
import DeleteReward from './delete-reward/DeleteReward.Container'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faPlus,
    faEdit
} from "@fortawesome/free-solid-svg-icons";
import { styles } from "./styles/styles";

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
                    getReward={this.getReward}
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
                        marginTop: 10,
                        paddingHorizontal: 10,
                    }}
                >
                    <TouchableOpacity
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
