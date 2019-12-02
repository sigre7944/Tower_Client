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

import { Map, fromJS } from "immutable";

import axios from "axios";

import { EXCHANGERATES } from "../../../../../../api/endPoints";

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
        this.props.updateGeneralSettings(
            ["currency"],
            "EUR",
            (v) => value
        )
    }

    _getLatestEURRate = () => {
        return axios({
            method: "GET",
            url: EXCHANGERATES + 'latest?symbols=JPY,USD,GBP&base=EUR'
        })
    }

    _getLatestUSDRate = () => {
        return axios({
            method: "GET",
            url: EXCHANGERATES + 'latest?symbols=JPY,EUR,GBP&base=USD'
        })
    }

    _getLatestGBPRate = () => {
        return axios({
            method: "GET",
            url: EXCHANGERATES + 'latest?symbols=JPY,USD,EUR&base=GBP'
        })
    }

    _getLatestJPYRate = () => {
        return axios({
            method: "GET",
            url: EXCHANGERATES + 'latest?symbols=EUR,USD,GBP&base=JPY'
        })
    }

    _updateLatestCurrencyRatesRemotely = async () => {
        try {
            let promises = [this._getLatestEURRate(), this._getLatestUSDRate(), this._getLatestGBPRate(), this._getLatestJPYRate()]
            const latest_results = await axios.all(promises)

            let sending_data = {}

            latest_results.forEach((result, index) => {
                let base = result.data["base"]
                sending_data[base] = result.data
            })

            this.props.updateGeneralSettings(
                ["exchange_rates"],
                {},
                (v) => fromJS(sending_data)
            )
        }

        catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        // this._updateLatestCurrencyRatesRemotely()
        this.props.updateCurrencyExchangeRatesAsync()
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