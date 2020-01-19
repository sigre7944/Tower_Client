import { batchActions } from 'redux-batched-actions'
import { updateBalance, updatePurchaseItem } from '../../../../../../shared/actions/rewardAction'

export const updatePurchaseItemThunk = ({ purchase_item_data, balance_data }) => (dispatch, getState) => {
    let action_arrays = [
        updatePurchaseItem(purchase_item_data.keyPath, purchase_item_data.notSetValue, purchase_item_data.updater),
        updateBalance(balance_data.type, balance_data.amount)
    ]

    dispatch(batchActions(action_arrays))
}