import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Switch,
    Picker
} from 'react-native';

import { styles } from "./styles/styles";
import Collapsible from "react-native-collapsible";

import { Map } from "immutable";

const window_width = Dimensions.get("window").width

const euro_symbol = "\u20AC"
const dollar_symbol = "\u0024"
const pound_symbol = "\u00A3"
const yen_symbol = "\u00A5"
const dong_symbol = "\u20AB"

export default class CurrencySetting extends React.PureComponent {

    balance = 100 // euros

    state = {
        currency_choosing_collapsed: true,
    }

    _toggleCurrencyChoosingCollapsed = () => {
        this.setState(prevState => ({
            currency_choosing_collapsed: !prevState.currency_choosing_collapsed
        }))
    }

    _onCurrencySelectionChange = (value, index) => {
        let sending_data = {
            general_settings: {},
            balance: {}
        }

        sending_data.general_settings = {
            keyPath: ["currency"],
            notSetValue: "EUR",
            updater: (v) => value
        }

        let current_balance = parseFloat(this.props.balance),
            general_settings = Map(this.props.generalSettings),
            current_currency = general_settings.get("currency"),
            new_currency = value,
            rate = parseFloat(general_settings.getIn(["exchange_rates", current_currency, "rates", new_currency])),
            new_balance = rate * current_balance

        sending_data.balance = {
            amount: new_balance.toFixed(2)
        }

        this.props.updateCurrency(sending_data)
    }

    componentDidMount() {
        this.props.updateLatestCurrencyExchangeRatesAsync()
    }

    render() {
        let currency_selection = Map(this.props.generalSettings).getIn(["currency"]),
            currency_symbol = euro_symbol

        if (currency_selection === "USD") {
            currency_symbol = dollar_symbol
        }

        else if (currency_selection === "EUR") {
            currency_symbol = euro_symbol
        }

        else if (currency_selection === "GBP") {
            currency_symbol = pound_symbol
        }

        else if (currency_selection === "JPY") {
            currency_symbol = yen_symbol
        }

        // else {
        //     currency_symbol = dong_symbol
        // }

        return (
            <>
                <TouchableOpacity
                    style={{
                        height: 59,
                        width: window_width,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: 22,
                        paddingVertical: 18
                    }}

                    onPress={this._toggleCurrencyChoosingCollapsed}
                >
                    <Text
                        style={styles.normal_text}
                    >
                        Currency
                    </Text>

                    <Text
                        style={styles.currency_symbol}
                    >
                        {currency_symbol}
                    </Text>

                </TouchableOpacity>

                <Collapsible collapsed={this.state.currency_choosing_collapsed}>
                    <Picker
                        style={{
                            borderTopWidth: 1,
                            borderColor: "#D6D6D6"
                        }}
                        itemStyle={{

                        }}
                        selectedValue={currency_selection}
                        onValueChange={this._onCurrencySelectionChange}
                    >
                        <Picker.Item value={"USD"} label={dollar_symbol} />
                        <Picker.Item value={"EUR"} label={euro_symbol} />
                        <Picker.Item value={"GBP"} label={pound_symbol} />
                        <Picker.Item value={"JPY"} label={yen_symbol} />
                        {/* <Picker.Item value={"VND"} label={dong_symbol} /> */}
                    </Picker>
                </Collapsible>
            </>
        )
    }

}