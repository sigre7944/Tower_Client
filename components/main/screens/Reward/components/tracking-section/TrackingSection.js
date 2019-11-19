import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import { Map, fromJS, OrderedMap } from 'immutable'
import { styles } from "./styles/styles";

const window_width = Dimensions.get("window").width

export default class TrackingSection extends React.PureComponent {

    _getReward = () => {
        let purchase_history_map = OrderedMap(this.props.purchase_history),
            rewards = OrderedMap(this.props.rewards),
            balance = parseFloat(this.props.balance),
            main_reward_map = rewards.get(this.props.main_reward),
            reward_id = main_reward_map.get("id"),
            reward_value = main_reward_map.get("value"),
            reward_name = main_reward_map.get("name")

        // Can buy when have enough balance
        if (balance >= reward_value) {
            if (rewards.has(reward_id)) {
                let date = new Date(),
                    day_timestamp_toString = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime().toString(),
                    sending_obj = {
                        purchase_item_data: {

                        },
                        balance_data: {
                            type: "WITHDRAW_BALANCE_AMOUNT",
                            amount: reward_value
                        }
                    }

                if (purchase_history_map.hasIn([day_timestamp_toString, reward_id, "quantity"])) {
                    sending_obj.purchase_item_data = {
                        keyPath: [day_timestamp_toString, reward_id, "quantity"],
                        notSetValue: 0,
                        updater: (value) => value + 1
                    }
                }

                else {
                    sending_obj.purchase_item_data = {
                        keyPath: [day_timestamp_toString, reward_id],
                        notSetValue: {},
                        updater: (value) => fromJS({
                            id: reward_id,
                            value: reward_value,
                            name: reward_name,
                            quantity: 1,
                            latest_timestamp: new Date().getTime()
                        })
                    }
                }

                this.props.updatePurchaseItemThunk(sending_obj)
            }
        }
    }

    render() {
        let { main_reward } = this.props,
            no_main_reward_bool = false,
            main_reward_name = "",
            main_reward_value = 0,
            progress_percent = 0,
            balance = parseFloat(this.props.balance),
            rewards_map = OrderedMap(this.props.rewards),
            can_get_reward_bool = false

        if (main_reward.length === 0 || main_reward === "") {
            no_main_reward_bool = true
        }

        else {
            main_reward_name = rewards_map.getIn([main_reward, "name"])
            main_reward_value = rewards_map.getIn([main_reward, "value"])
            progress_percent = balance / parseFloat(main_reward_value)

            if (progress_percent >= 1) {
                can_get_reward_bool = true
            }
        }


        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 40,
                }}
            >
                {no_main_reward_bool ?
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: window_width,
                            height: 236,
                            shadowColor: "rgba(0, 0, 0, 0.08)",
                            shadowOffset: {
                                width: 4,
                                height: 4
                            },
                            shadowOpacity: 1,
                            shadowRadius: 15,
                            borderRadius: 10,
                            backgroundColor: "white",
                            marginHorizontal: 22,
                            marginVertical: 49,
                        }}
                    >
                    </View>
                    :

                    <View
                        style={{
                            borderRadius: 10,
                            backgroundColor: "white",
                            shadowOffset: {
                                width: 4,
                                height: 4
                            },
                            shadowOpacity: 1,
                            shadowRadius: 15,
                            shadowColor: "rgba(0, 0, 0, 0.08)",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: 22,
                            paddingVertical: 49,
                            marginHorizontal: 22
                        }}
                    >
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
                                    style={styles.main_value_title}
                                >
                                    {main_reward_name}
                                </Text>

                                <Text
                                    style={styles.main_value_cheering}
                                >
                                    You are almost there!
                            </Text>

                                <TouchableOpacity
                                    style={can_get_reward_bool ? styles.can_get_button_container : styles.cannot_get_button_container}

                                    onPress={this._getReward}
                                >
                                    <Text
                                        style={styles.get_text}
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
                                    height: 139,
                                }}
                            >
                                <ProgressCircle
                                    style={{
                                        flex: 1,
                                        width: 159,
                                    }}
                                    progress={progress_percent}
                                    progressColor={"#05838B"}
                                    backgroundColor={"rgba(0, 0, 0, 0.05)"}
                                    strokeWidth={15}
                                    cornerRadius={0}
                                    animate={false}
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
                                        style={styles.balance_text}
                                    >
                                        {balance}
                                    </Text>

                                    {/* main reward value */}
                                    <Text
                                        style={styles.reward_value_text}
                                    >
                                        {main_reward_value}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            </View>
        )
    }
}