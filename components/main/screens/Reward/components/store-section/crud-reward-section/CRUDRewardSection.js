import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    FlatList
} from 'react-native';

export default class TrackingSection extends React.PureComponent {


    state = {
        should_flatlist_update: 0,
        reward_data: []
    }

    _setFlatListRef = (ref) => {
        this._flatlistReft = ref
    }

    _keyExtractor = (item, index) => `reward_${index}`

    _renderItem = ({ item, index }) => {
        if (item.name === "add a reward") {
            return (
                <AddRewardHolder
                    {...this.props}
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