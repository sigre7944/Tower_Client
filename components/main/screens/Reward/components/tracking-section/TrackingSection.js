import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import { Map, fromJS, OrderedMap, isKeyed } from 'immutable'
import { styles } from "./styles/styles";
import { Haptics } from "expo";
import { Audio } from "expo-av";

const window_width = Dimensions.get("window").width
const looking_for_main_reward_image = require("../../../../../../assets/pngs/looking_for_main_reward.png")

export default class TrackingSection extends React.PureComponent {

    _playingSound = async () => {
        try {
            const completing_sound = new Audio.Sound()
            await completing_sound.loadAsync(require("../../../../../../assets/sounds/GetReward01.wav"))
            await completing_sound.playAsync()
        }

        catch (error) {
            console.log(error)
        }
    }


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

                let general_settings = Map(this.props.generalSettings)

                if (general_settings.get("vibration")) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                }

                if (general_settings.get("sound")) {
                    this._playingSound()
                }
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
                            backgroundColor: "white",
                            marginHorizontal: 22,
                        }}
                    >
                        <View
                            style={{
                                height: 284,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={looking_for_main_reward_image}
                                resizeMode="center"
                            />
                        </View>
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