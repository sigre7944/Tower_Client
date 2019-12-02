import React from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import { Map } from "immutable";
import { styles } from "./styles/styles";

const euro_symbol = "\u20AC"
const dollar_symbol = "\u0024"
const pound_symbol = "\u00A3"
const yen_symbol = "\u00A5"

export default class BalanceHolder extends React.PureComponent {

    // shouldComponentUpdate(nextProps, nextState) {
    //     let old_currency = Map(this.props.generalSettings).get("currency"),
    //         new_currency = Map(nextProps.generalSettings).get("currency")
    //     return old_currency !== new_currency
    // }

    render() {
        // let currency = Map(this.props.generalSettings).get("currency"),
        //     currency_symbol = euro_symbol

        // if (currency === "EUR") {
        //     currency_symbol = euro_symbol
        // }

        // else if (currency === "USD") {
        //     currency_symbol = dollar_symbol
        // }

        // else if (currency === "GBP") {
        //     currency_symbol = pound_symbol
        // }

        // else {
        //     currency_symbol = yen_symbol
        // }

        let currency = "point"

        if (this.props.balance > 1) {
            currency = "points"
        }

        return (
            <View>
                <Text
                    style={styles.balance_title}
                >
                    Balance
                </Text>

                <Text
                    style={styles.balance_value}
                >
                    {this.props.balance} {currency}
                </Text>
            </View>
        )
    }
}