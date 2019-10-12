import React from 'react';

import {
    View,
    ScrollView,
    StyleSheet,
    Keyboard,
    Animated,
    KeyboardAvoidingView,
    Dimensions,
    Modal,
    FlatList,
    Text,

} from 'react-native';

import { Map } from 'immutable'

export default class PurchaseDate extends React.PureComponent {

    day_in_week_text = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    month_text = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    _keyExtractor = (item, index) => `purchased-item-${item[0]}`

    _renderItem = ({ item, index }) => (
        <PurchasedItemHolder
            data={item}
            rewards={this.props.rewards}
        />
    )

    render() {
        let date = new Date(parseInt(this.props.data[0])),
            date_string = `${this.day_in_week_text[date.getDay()]} ${date.getDate()} ${this.month_text[date.getMonth()]} ${date.getFullYear()}`
        return (
            <View
                style={{
                }}
            >
                <Text>
                    {date_string}
                </Text>

                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    <FlatList
                        data={Map(this.props.data[1]).toArray()}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </View>
            </View>
        )
    }
}

class PurchasedItemHolder extends React.PureComponent {

    render() {
        let rewards = Map(this.props.rewards),
            reward_id = this.props.data[0],
            reward_name = rewards.get(reward_id).name,
            reward_value = rewards.get(reward_id).value,
            quantity = Map(this.props.data[1]).get("quantity")

        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                    height: 50,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "black",
                    marginBottom: 10,
                    paddingHorizontal: 20,
                }}
            >
                <Text>{reward_name}</Text>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <Text>
                        {reward_value} €
                    </Text>

                    <Text
                        style={{
                            marginLeft: 20,
                        }}
                    >
                        x{quantity}
                    </Text>
                </View>
            </View>
        )
    }
}