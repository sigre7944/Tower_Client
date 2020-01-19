import { batchActions } from 'redux-batched-actions'
import { deleteKeyPathPurchaseHistory } from "../../shared/actions/rewardAction";
export const deleteRecordsInDayThunk = ({ delete_purchase_data }) => (dispatch, getState) => {
    let action_arrays = [
        deleteKeyPathPurchaseHistory(delete_purchase_data.keyPath)
    ]

    dispatch(batchActions(action_arrays))
}