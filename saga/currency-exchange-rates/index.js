import { call, put, all, takeEvery, apply } from "redux-saga/effects";
import axios from "axios";
import { EXCHANGERATES } from "../../api/endPoints";
import { fromJS } from "immutable";

import { updateGeneralSettings } from "../../components/shared/actions/otherAction";

function _getLatestRate(base) {
    let post_string = ""

    if (base === "EUR") {
        post_string = "latest?symbols=USD,GBP,JPY&base=EUR"
    }

    else if (base === "USD") {
        post_string = "latest?symbols=EUR,GBP,JPY&base=USD"
    }

    else if (base === "GBP") {
        post_string = "latest?symbols=EUR,USD,JPY&base=GBP"
    }

    else {
        post_string = "latest?symbols=EUR,GBP,USD&base=JPY"
    }

    return axios({
        method: "GET",
        url: EXCHANGERATES + post_string
    })
}

function* updateCurrencyExchangeRates() {
    let promises = [
        _getLatestRate("EUR"),
        _getLatestRate("USD"),
        _getLatestRate("GBP"),
        _getLatestRate("JPY")
    ]

    const latest_results = yield call(axios.all, promises)

    let sending_data = {}

    latest_results.forEach((result, index) => {
        let base = result.data["base"]
        if(base === "euro"){
            base = "EUR"
        }
        sending_data[base] = result.data
    })

    yield put(updateGeneralSettings(
        ["exchange_rates"],
        {},
        (v) => fromJS(sending_data)
    ))
}

export function* watchUpdateCurrencyAsync() {
    yield takeEvery("UPDATE_CURRENCY_EXCHANGE_RATES_ASYNC", updateCurrencyExchangeRates)
}