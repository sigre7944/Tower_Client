import { batchActions } from "redux-batched-actions";
import { } from "../../../../shared/actions/otherAction";
export const updateGeneralSettings = ({ }) => (dispatch, getState) => {
    let action_array = []

    dispatch(batchActions(action_array))
}