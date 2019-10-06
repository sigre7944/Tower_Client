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
    FlatList
} from 'react-native';
import { Map } from 'immutable'
import PurchaseDate from './purchase-date/PurchaseDate'

export default class PurchaseHistory extends React.PureComponent {
    static navigationOptions = {
        // header: null,
        swipeable: false
    };

    state = {
        purchase_history_data: []
    }

    _keyExtractor = (item, index) => `purchased-item-${item.id}`

    _renderItem = ({ item, index }) => (
        <PurchaseDate
            data={item}
        />
    )

    loadPurchaseHistoryData = () => {
        this.setState({
            purchase_history_data: Map(this.props.purchase_history).toArray()
        })

        console.log(Map(this.props.purchase_history).toArray())
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
                    data={this.state.purchase_history_data}
                />
            </View>
        )
    }
}