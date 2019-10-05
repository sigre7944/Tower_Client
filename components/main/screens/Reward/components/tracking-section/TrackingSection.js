import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { Map } from 'immutable'

export default class TrackingSection extends React.PureComponent {

    getReward = () => {
        let purchase_history = Map(this.props.purchase_history),
            rewards = Map(this.props.rewards),
            balance = parseInt(this.props.balance),
            reward_id = this.props.main_reward,
            reward_value = rewards.get(reward_id).value

        if (balance >= reward_value) {
            if (rewards.has(reward_id)) {
                if (purchase_history.has(reward_id)) {
                    let sending_obj = {
                        purchase_item_data: { ...purchase_history.get(reward_id) },
                        amount: reward_value
                    }

                    sending_obj.purchase_item_data.lastest_timestamp = new Date().getTime()
                    sending_obj.purchase_item_data.quantity += 1

                    this.props.updatePurchaseItemThunk(sending_obj)
                }

                else {
                    let sending_obj = {
                        purchase_item_data: {
                            id: reward_id,
                            lastest_timestamp: new Date().getTime(),
                            quantity: 1,
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