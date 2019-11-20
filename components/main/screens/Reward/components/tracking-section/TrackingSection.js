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

import LookingForMainRewardSVG from "../../../../../../assets/svgs/looking_for_main_reward.svg"

import Svg, { Circle, Path, Ellipse, TransformObject } from 'react-native-svg'

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
                        <View
                            style={{
                                aspectRatio: 1
                            }}
                        >
                            <Svg data-name="Layer 1" width={"100%"} height={"100%"} viewBox="0 0 100 100">
                                <Circle cx={397} cy={273.146} r={130} fill="#6c63ff" />
                                <Path
                                    d="M414 381.146c-72.234 0-131-58.766-131-131s58.766-131 131-131c72.233 0 131 58.766 131 131s-58.767 131-131 131zm0-260a129 129 0 10129 129 129.146 129.146 0 00-129-129z"
                                    fill="#3f3d56"
                                />
                                <Path d="M811 441H0V0h811zM2 439h807V2H2z" fill="#3f3d56" />
                                <Path
                                    fill="#f2f2f2"
                                    d="M27 35h178v18H27zM294 35h178v18H294zM561 35h178v18H561z"
                                />
                                <Path
                                    d="M217 45H37V25h180zM39 43h176V27H39zM484 45H304V25h180zm-178-2h176V27H306zM751 45H571V25h180zm-178-2h176V27H573z"
                                    fill="#3f3d56"
                                />
                                <Path fill="#2f2e41" d="M116.474 682.738h827.604v2.554H116.474z" />
                                <Path fill="#3f3d56" d="M393.5 483.5l63-122 17 10-72 117-8-5z" />
                                <Path
                                    d="M357 510s11.612 9.123 12.93-10.397a22.39 22.39 0 018.146-16.09c5.258-4.2 12.824-7.074 21.924-1.513 8.1 4.95 9.923 12.128 9.477 18.525a28.47 28.47 0 01-14.233 22.255c-9.027 5.358-23.277 9.391-38.244-3.78 0 0-9-10 0-9z"
                                    fill="#6c63ff"
                                />
                                <Circle cx={468.397} cy={196.775} r={24.266} fill="#ffb8b8" />
                                <Path
                                    d="M455.625 208.27s6.386 33.206 3.832 39.592 35.76-2.554 35.76-2.554-7.663-33.207-6.385-40.87-33.207 3.832-33.207 3.832zM413.479 323.215l2.554 34.483 12.677 54.156 3.926 14.812 6.386-22.989-6.386-52.364-2.169-23.575-16.988-4.523zM547.581 318.106v35.761s-3.831 45.978-11.494 57.473-10.218-45.978-10.218-45.978l6.005-42.147z"
                                    fill="#ffb8b8"
                                />
                                <Path
                                    d="M433.913 429.22s-6.385 7.663-1.277 85.57-2.554 134.103 14.049 134.103c0 0-5.109 16.603 8.94 17.88s20.435 2.554 21.712-1.277 3.832-21.712 0-21.712c0 0 0 5.109 2.554-15.326s2.555-117.5 8.94-130.271l20.435 47.255s0 21.712 3.832 31.93 10.217 68.966 10.217 68.966l-1.277 8.94s30.652 5.11 31.93 0 1.276-12.771 0-15.326-1.278-2.554 1.276-7.663 2.555-8.94 1.277-12.771-1.277-86.848-1.277-86.848-2.554-100.896-17.88-106.004-103.45 2.554-103.45 2.554z"
                                    fill="#2f2e41"
                                />
                                <Path
                                    d="M450.517 656.556l-10.218 17.88s-15.964-5.747-12.771 8.94c27.459 1.916 46.616-.638 46.616-.638s6.386 2.554 7.663-1.278-3.193-17.241-7.024-17.241-24.266-7.663-24.266-7.663zM524.592 651.447s-10.217 22.989-6.386 24.266 38.315 6.386 40.87 7.663 15.326 2.554 16.603-5.109-6.386-10.217-6.386-10.217-14.049-2.554-17.88-15.326-26.82-1.277-26.82-1.277z"
                                    fill="#2f2e41"
                                />
                                <Path
                                    d="M497.772 241.476s-34.484-6.386-42.147 0-39.592 19.158-39.592 25.544 16.603 68.967 16.603 68.967-8.94 94.51 0 97.064 24.266-5.108 42.147 3.832 68.967-7.663 68.967-7.663-19.158-81.739-14.05-97.065 8.941-67.69 8.941-67.69-21.712-22.989-40.87-22.989z"
                                    fill="#8985a8"
                                />
                                <Path
                                    d="M424.973 263.188l-8.94 2.554s-19.157 60.027-11.494 62.582 29.374 7.663 31.929 7.663-11.495-72.799-11.495-72.799zM518.206 256.802l20.435 7.663s26.82 49.81 20.435 56.196-34.484 12.771-34.484 12.771z"
                                    fill="#8985a8"
                                />
                                <Path
                                    d="M467.66 166.803a13.716 13.716 0 00-6.07.268 15.827 15.827 0 00-4.314 2.83 50.492 50.492 0 01-7.376 4.887c-2.07 1.123-4.294 2.163-5.74 4.023a12.211 12.211 0 00-1.619 3.066 36.74 36.74 0 00-1.932 19.996 9.191 9.191 0 00.851 2.745c1.328 2.446 4.26 3.41 6.729 4.692 4.689 2.434 8.243 6.533 12.09 10.155a23.634 23.634 0 004.776 3.68c5.487 2.992 12.193 2.016 18.352.959a3.307 3.307 0 003.3-3.34l4.862-21.865a35.673 35.673 0 001.246-9.944c-.339-5.308-3.212-12.661-7.108-16.431-4.539-4.394-12.114-5.093-18.047-5.72z"
                                    transform={{ translate: "-127.96097 - 100.9571" }}
                                    // transform = {TransformObject()}
                                    fill="#2f2e41"
                                />
                                <Ellipse cx={368} cy={681} rx={35} ry={2} fill="#6c63ff" />
                                <Ellipse cx={360} cy={685} rx={35} ry={2} fill="#6c63ff" />
                                <Ellipse cx={325} cy={673} rx={19} ry={1.086} fill="#6c63ff" />
                                <Ellipse cx={393} cy={697} rx={19} ry={1.086} fill="#6c63ff" />
                            </Svg>
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