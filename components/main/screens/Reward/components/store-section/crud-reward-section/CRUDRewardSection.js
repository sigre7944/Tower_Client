import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard,
    Animated,
    Modal,
    Switch
} from 'react-native';

export default class TrackingSection extends React.PureComponent {
    state = {
        should_flatlist_update: 0,
        reward_data: [],
        is_add_new_reward: false
    }

    addNewReward = () => {
        this.setState({
            is_add_new_reward: true
        })
    }

    dismissAddNewReward = () => {
        this.setState({
            is_add_new_reward: false
        })
    }

    _setFlatListRef = (ref) => {
        this._flatlistReft = ref
    }

    _keyExtractor = (item, index) => `reward_${index}`

    _renderItem = ({ item, index }) => {
        if (item.name === "add a reward") {
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
                />
            )
        }
    }

    componentDidMount() {
        let reward_data = [{
            name: "add a reward"
        }]

        for (let i = 0; i < 4; i++) {
            reward_data.push({
                name: `Reward No.${i + 1}`,
                value: (i + 1) * 10,
                isTracked: false,
            })
        }

        this.setState({
            reward_data: [...reward_data]
        })
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
                        justifyContent: "space-between"
                    }}
                />

                {this.state.is_add_new_reward ?
                    <NewRewardHolder
                        dismissAddNewReward={this.dismissAddNewReward}
                    />
                    :
                    null
                }

            </View>
        )
    }
}


class RewardHolder extends React.PureComponent {

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
                        justifyContent: "flex-end",
                        width: (Dimensions.get("window").width - 67) / 2 - 14,
                        marginTop: 7,
                    }}
                >
                    <TouchableOpacity>
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

class NewRewardHolder extends React.PureComponent {

    state = {
        reward_title: "",
        reward_value: "",
        is_tracked: false
    }

    _dismissAddNewReward = () => {
        this.props.dismissAddNewReward()
    }

    onChangeRewardTitle = (e) => {
        this.setState({
            reward_title: e.nativeEvent.text
        })
    }

    onChangeRewardValue = (e) => {
        this.setState({
            reward_value: e.nativeEvent.text.replace(/[^0-9]/g, "")
        })
    }

    onChangeTrackReward = () => {
        this.setState(prevState => ({
            is_tracked: !prevState.is_tracked
        }))
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
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            width: Dimensions.get("window").width,
                            backgroundColor: "black",
                            opacity: 0.5
                        }}

                        onPress={this._dismissAddNewReward}
                    >

                    </TouchableOpacity>

                    <View
                        style={{
                            position: "absolute",
                            width: 300,
                            height: 330,
                            borderRadius: 10,
                            backgroundColor: "white",
                            paddingHorizontal: 22,
                            paddingVertical: 32,
                        }}
                    >
                        <View>
                            <Text>
                                Reward title:
                            </Text>
                            <TextInput
                                style={{
                                    width: 256,
                                    height: 40,
                                    borderRadius: 7,
                                    backgroundColor: "gainsboro",
                                    marginTop: 10,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                }}

                                onChange={this.onChangeRewardTitle}
                                value={this.state.reward_title}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 20,
                                alignItems: "center"
                            }}
                        >
                            <Text>
                                Reward value:
                            </Text>
                            <TextInput
                                style={{
                                    width: 100,
                                    height: 40,
                                    borderRadius: 7,
                                    backgroundColor: "gainsboro",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    marginLeft: 20,
                                }}

                                onChange={this.onChangeRewardValue}
                                value={this.state.reward_value}
                                keyboardType={"numbers-and-punctuation"}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 20,
                            }}
                        >
                            <Text>
                                Track reward
                            </Text>

                            <Switch
                                style={{
                                    marginLeft: 20,
                                }}

                                value={this.state.is_tracked}
                                onValueChange={this.onChangeTrackReward}
                            />
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                marginTop: 40,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Text>
                                    Clear
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 10,
                                }}
                            >
                                <Text>
                                    X
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    width: 50,
                                    height: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginLeft: 10,
                                }}
                            >
                                <Text>
                                    Add
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}