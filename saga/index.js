import { call, put, all, takeEvery } from "redux-saga/effects";

import { watchUpdateCurrencyAsync } from "./currency-exchange-rates/";

export default function* rootSaga() {
    yield all([
        watchUpdateCurrencyAsync()
    ])
}