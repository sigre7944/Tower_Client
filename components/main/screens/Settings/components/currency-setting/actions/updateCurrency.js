import { batchActions } from "redux-batched-actions";

import { updateGeneralSettings } from '../../../../../../shared/actions/otherAction'


export const updateCurrency = ({ general_settings, balance }) => (dispatch, getState) => {
    let action_array = [
        updateGeneralSettings(general_settings.keyPath, general_settings.notSetValue, general_settings.updater),
        { type: "UPDATE_BALANCE_AMOUNT", amount: balance.amount }
    ]

    dispatch(batchActions(action_array))
}