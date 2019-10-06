import { batchActions } from 'redux-batched-actions'
import { withdrawBalance, addPurchaseItem, updatePurchaseItem } from '../../../../../../../shared/actions/rewardAction'

export const addPurchaseItemThunk = ({ purchase_item_data, amount }) => (dispatch, getState) => {
    let action_arrays = [
        addPurchaseItem(purchase_item_data.timestamp, purchase_item_data.data),
        withdrawBalance(amount)
    ]

    dispatch(batchActions(action_arrays))
}

export const updatePurchaseItemThunk = ({ purchase_item_data, amount }) => (dispatch, getState) => {
    let action_arrays = [
        updatePurchaseItem(purchase_item_data.timestamp, purchase_item_data.id, purchase_item_data.data),
        withdrawBalance(amount)
    ]

    dispatch(batchActions(action_arrays))
}