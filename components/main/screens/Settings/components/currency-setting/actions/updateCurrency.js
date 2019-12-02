import { call, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { EXCHANGERATES } from "../../../../../../../api/endPoints";

function* getLatestExchangeRate() {
    const result = yield axios({
        method: "GET",
        url: EXCHANGERATES + 'latest'
    })

    console.log(result)
}

export const getUpdateCurrencyExchangeRate = () => {
    getLatestExchangeRate()
}