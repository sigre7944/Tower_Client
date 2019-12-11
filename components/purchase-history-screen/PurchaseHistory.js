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
    TouchableOpacity,
    TouchableWithoutFeedback
} from 'react-native';

import { Map, OrderedMap } from 'immutable'

import PurchaseHistoryHeader from "./header/PurchaseHistoryHeader";
import { styles } from "./styles/styles";

import Collapsible from "react-native-collapsible";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const window_width = Dimensions.get("window").width

export default class PurchaseHistory extends React.PureComponent {
    static navigationOptions = ({ navigation, navigationOptions }) => ({
        header: <PurchaseHistoryHeader navigation={navigation} />,
    })

    state = {
        purchase_history_data: []
    }

    _keyExtractor = (item, index) => `purchased-item-timestamp-${item[0]}`

    _renderItem = ({ item, index }) => (
        <PurchasedTimestamp
            timestamp_toString={item[0]}
            day_timestamp_purchased_data={item[1]}
            _deleteRecordsInDay={this._deleteRecordsInDay}
        />
    )

    loadPurchaseHistoryData = () => {
        let purchase_history_map = OrderedMap(this.props.purchase_history),
            purchase_history_data = []

        purchase_history_map.entrySeq().forEach((entry, index) => {
            purchase_history_data.push([])
        })
    }

    _deleteRecordsInDay = (day_timestamp_toString) => {
        let sending_data = {
            delete_purchase_data: {
                keyPath: [day_timestamp_toString]
            }
        }

        this.props.deleteRecordsInDayThunk(sending_data)
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
                    backgroundColor: "white"
                }}
            >
                <FlatList
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    data={OrderedMap(this.props.purchase_history).toArray().reverse()}
                />
            </View>
        )
    }
}

class PurchasedTimestamp extends React.PureComponent {
    day_in_week_text_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    month_text_array = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    state = {
        should_flatlist_update: 0,
        should_display_options_collasped: true,
    }

    _keyExtractor = (item, index) => `purchased-detailed-timestamp-${this.props.timestamp_toString}-id-${item[0]}`

    _renderItem = ({ item, index }) => {
        return (
            <PurchasedDetailedTimestamp
                purchased_item_data={item[1]}
                detail_timestamp={item[0]}
            />
        )
    }
    _ToggleDisplayingOptionsBool = () => {
        this.setState(prevState => ({
            should_display_options_collasped: !prevState.should_display_options_collasped
        }))
    }

    _deleteRecordsInDay = () => {
        this.props._deleteRecordsInDay(this.props.timestamp_toString)
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
                <TouchableOpacity
                    onPress={this._ToggleDisplayingOptionsBool}
                >
                    <Text
                        style={styles.timestamp_text}
                    >
                        {displaying_date}
                    </Text>
                </TouchableOpacity>

                <Collapsible collapsed={this.state.should_display_options_collasped}>
                    <View
                        style={{
                            marginTop: 22,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                paddingHorizontal: 22,
                            }}

                            onPress={this._deleteRecordsInDay}
                        >
                            <FontAwesomeIcon
                                icon={faTrashAlt}
                                color="#EB5757"
                                size={16}
                            />

                            <Text
                                style={styles.delete_all_records_text}
                            >
                                Delete all records
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Collapsible>

                <View
                    style={{
                        marginTop: 16
                    }}
                >
                    <FlatList
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        extraData={this.state.should_flatlist_update}
                        data={OrderedMap(this.props.day_timestamp_purchased_data).toArray()}
                    />
                </View>
            </View>
        )
    }
}

class PurchasedDetailedTimestamp extends React.PureComponent {

    _keyExtractor = (item, index) => `purchase-item-detailed-timestamp-${this.props.detail_timestamp}-id-${item[0]}`

    _renderItem = ({ item, index }) => {
        return (
            <PurchasedItem
                data={item[1]}
            />
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    data={Map(this.props.purchased_item_data).toArray()}
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
                        {`${item_value} pts`}
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