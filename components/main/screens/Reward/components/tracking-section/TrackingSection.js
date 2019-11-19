import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts'
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';

import { Map, fromJS } from 'immutable'
import NoMainRewardSVG from "../../../../../../assets/svgs/looking_for_main_reward.svg";
// import NoMainRewardSVG from "./components/NoMainRewardSVG";
import Svg from "react-native-svg";
import SvgUri from "react-native-svg-uri";
import { styles } from "./styles/styles";

const window_width = Dimensions.get("window").width

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

    render() {
        // let rewards = Map(this.props.rewards),
        //     { main_reward } = this.props,
        //     is_there_a_main_reward = false,
        //     main_reward_name,
        //     main_reward_value,
        //     balance = parseInt(this.props.balance),
        //     progress_percent = 0

        // if (rewards.has(main_reward)) {
        //     is_there_a_main_reward = true
        //     main_reward_name = rewards.get(main_reward).name
        //     main_reward_value = rewards.get(main_reward).value
        //     progress_percent = balance / parseInt(main_reward_value)
        // }

        let { main_reward } = this.props,
            no_main_reward_bool = false

        if (main_reward.length === 0 || main_reward === "") {
            no_main_reward_bool = true
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
                        <SvgUri 
                            width={window_width - 44}
                            height={236}
                            svgXmlData={NoMainRewardSVG}
                        />
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
                                    1112222225 3666564 1213
                            </Text>

                                <Text
                                    style={styles.main_value_cheering}
                                >
                                    You are almost there!
                            </Text>

                                <TouchableOpacity
                                    style={styles.get_button_container}

                                // onPress={this.getReward}
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
                                    progress={3750 / 5000}
                                    progressColor={"#05838B"}
                                    backgroundColor={"rgba(0, 0, 0, 0.05)"}
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
                                        style={styles.balance_text}
                                    >
                                        3750
                                </Text>

                                    {/* main reward value */}
                                    <Text
                                        style={styles.reward_value_text}
                                    >
                                        5000
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