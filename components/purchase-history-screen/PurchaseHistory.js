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
    Text
} from 'react-native';
import { Map, OrderedMap } from 'immutable'

import PurchaseHistoryHeader from "./header/PurchaseHistoryHeader";
import { styles } from "./styles/styles";
export default class PurchaseHistory extends React.PureComponent {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        header: <PurchaseHistoryHeader navigation={navigation} />,
        swipeable: false
    })

    state = {
        purchase_history_data: []
    }

    _keyExtractor = (item, index) => `purchased-item-timestamp-${item[0]}`

    _renderItem = ({ item, index }) => (
        <PurchasedTimestamp
            timestamp_toString={item[0]}
            purchase_data={item[1]}
        />
    )

    loadPurchaseHistoryData = () => {
        let purchase_history_map = OrderedMap(this.props.purchase_history),
            purchase_history_data = []

        purchase_history_map.entrySeq().forEach((entry, index) => {
            purchase_history_data.push([])
        })
    }

    componentDidMount() {
        const didFocusScreen = this.props.navigation.addListener(
            'didFocus',
            payload => {
                this.props.changeRouteAction(payload.state.routeName)
            }
        )

        this.loadPurchaseHistoryData()
    }


    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <FlatList
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    data={OrderedMap(this.props.purchase_history).toArray()}
                />
            </View>
        )
    }
}

class PurchasedTimestamp extends React.PureComponent {
    day_in_week_text_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    month_text_array = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    state = {
        should_flatlist_update: 0
    }

    _keyExtractor = (item, index) => `purchased-item-timestamp-${this.props.timestamp_toString}-id-${item[0]}`

    _renderItem = ({ item, index }) => {
        return (
            <PurchasedItem
                data={item[1]}
            />
        )
    }

    render() {
        let timestamp = parseInt(this.props.timestamp_toString),
            date = new Date(timestamp),
            displaying_date = `${this.day_in_week_text_array[date.getDay()]} ${date.getDate()} ${this.month_text_array[date.getMonth()]} ${date.getFullYear()}`
        return (
            <View
                style={{
                    marginTop: 32,
                }}
            >
                <Text
                    style={styles.timestamp_text}
                >
                    {displaying_date}
                </Text>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    extraData={this.state.should_flatlist_update}
                    data={Map(this.props.purchase_data).toArray()}
                />
            </View>
        )
    }
}

class PurchasedItem extends React.PureComponent {

    render() {
        let data_map = Map(this.props.data),
            item_title = data_map.get("name"),
            item_value = data_map.get("value"),
            item_quantity = data_map.get("quantity"),
            item_latest_timestamp = data_map.get("latest_timestamp"),
            date = new Date(item_latest_timestamp),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            displaying_hours = hours.toString(),
            display_minutes = minutes.toString()

        if (hours < 10) {
            displaying_hours = `0${hours}`
        }

        if (minutes < 10) {
            display_minutes = `0${minutes}`
        }

        return (
            <View
                style={{
                    marginTop: 6,
                    flexDirection: "row",
                    height: 72,
                    backgroundColor: "white",
                    shadowOffset: {
                        width: 4,
                        height: 4,
                    },
                    shadowRadius: 15,
                    shadowOpacity: 1,
                    shadowColor: "rgba(0, 0, 0, 0.08)",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 22,
                }}
            >
                <View
                    style={{
                        height: 72,
                        justifyContent: "center"
                    }}
                >
                    <Text
                        style={styles.item_title}
                    >
                        {item_title}
                    </Text>

                    <Text
                        style={styles.item_latest_timestamp}
                    >
                        {`Purchased at ${displaying_hours}:${display_minutes}`}
                    </Text>
                </View>

                <View
                    style={{
                        height: 72,
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <Text
                        style={styles.item_value}
                    >
                        {`${item_value} €`}
                    </Text>

                    <Text
                        style={styles.item_quantity}
                    >
                        {item_quantity <= 1 ? "" : `x ${item_quantity}`}
                    </Text>
                </View>
            </View>
        )
    }
}