import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { Map, fromJS } from 'immutable'

export default class TrackingSection extends React.PureComponent {

    getReward = () => {
        let purchase_history = Map(this.props.purchase_history),
            rewards = Map(this.props.rewards),
            balance = parseInt(this.props.balance),
            reward_id = this.props.main_reward,
            reward_value = rewards.get(reward_id).value

        // Can buy when have enough balance
        if (balance >= reward_value) {
            if (rewards.has(reward_id)) {
                let date = new Date(),
                    day_timestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

                if (purchase_history.has(day_timestamp)) {
                    let purchase_timestamp_data = Map(purchase_history.get(day_timestamp))

                    if (purchase_timestamp_data.has(reward_id)) {
                        let purchase_item_data = Map(purchase_timestamp_data.get(reward_id)).toMap().asMutable()
                        purchase_item_data.update("quantity", (value) => value + 1)
                        purchase_item_data.update("latest_timestamp", (value) => new Date().getTime())

                        let sending_obj = {
                            purchase_item_data: {
                                timestamp: day_timestamp,
                                id: reward_id,
                                data: purchase_item_data
                            },

                            amount: reward_value
                        }

                        this.props.updatePurchaseItemThunk(sending_obj)
                    }

                    else {
                        let purchase_timestamp_data = Map()
                        purchase_timestamp_data.set("id", reward_id)
                        purchase_timestamp_data.set("quantity", 1)
                        purchase_timestamp_data.set("latest_timestamp", new Date().getTime())

                        let sending_obj = {
                            purchase_item_data: {
                                timestamp: day_timestamp,
                                id: reward_id,
                                data: purchase_timestamp_data
                            },

                            amount: reward_value
                        }

                        this.props.updatePurchaseItemThunk(sending_obj)
                    }
                }

                else {
                    let timestamp_obj = {}
                    timestamp_obj[reward_id] = {
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

    render() {
        let rewards = Map(this.props.rewards),
            { main_reward } = this.props,
            is_there_a_main_reward = false,
            main_reward_name,
            main_reward_value,
            balance = parseInt(this.props.balance),
            progress_percent = 0

        if (rewards.has(main_reward)) {
            is_there_a_main_reward = true
            main_reward_name = rewards.get(main_reward).name
            main_reward_value = rewards.get(main_reward).value
            progress_percent = balance / parseInt(main_reward_value)
        }

        return (
            <View
                style={{
                    height: 300,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F2F2F2"
                }}
            >
                <View
                    style={{
                        height: 236,
                        width: 363,
                        borderRadius: 10,
                        backgroundColor: "#FAFAFA",
                        shadowOffset: {
                            width: 0,
                            height: 4
                        },
                        shadowOpacity: 1,
                        shadowRadius: 4,
                        shadowColor: "rgba(0, 0, 0, 0.12)",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 22,
                        paddingVertical: 49
                    }}
                >

                    {is_there_a_main_reward ?

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center"
                                }}
                            >
                                {/* main reward title */}
                                <Text
                                    style={{
                                        width: 100,
                                        height: 30,
                                        fontWeight: "500",
                                        fontSize: 24,
                                        lineHeight: 28,
                                        letterSpacing: -0.02,
                                        color: "rgba(0, 0, 0, 0.87)"
                                    }}
                                >
                                    {main_reward_name}
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 4,
                                        height: 23,
                                        fontSize: 14,
                                        lineHeight: 16,
                                        letterSpacing: -0.02,
                                        color: "rgba(0, 0, 0, 0.5)"
                                    }}
                                >
                                    You are almost there!
                            </Text>

                                <TouchableOpacity
                                    style={{
                                        marginTop: 11,
                                        width: 110,
                                        height: 36,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                        borderRadius: 28,
                                    }}

                                    onPress={this.getReward}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: 16,
                                            lineHeight: 19,
                                            color: "#FFFFFF"
                                        }}
                                    >
                                        Get
                                </Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    position: "relative",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <ProgressCircle
                                    style={{
                                        height: 159,
                                        width: 159,
                                    }}
                                    progress={progress_percent}
                                    progressColor={"#000000"}
                                    strokeWidth={15}
                                    cornerRadius={0}
                                    animate={true}
                                />

                                <View
                                    style={{
                                        position: "absolute",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    {/* Current balance */}
                                    <Text
                                        style={{
                                            fontWeight: "500",
                                            fontSize: 24,
                                            lineHeight: 28,
                                            color: "black",
                                            fontStyle: "normal",
                                        }}
                                    >
                                        {balance}
                                    </Text>

                                    {/* main reward value */}
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            lineHeight: 16,
                                            letterSpacing: -0.02,
                                            color: "rgba(0, 0, 0, 0.25)"
                                        }}
                                    >
                                        {main_reward_value}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        :

                        <Text>
                            No main reward is available.
                    </Text>
                    }

                </View>
            </View>
        )
    }
}