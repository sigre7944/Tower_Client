import { updateMainReward, deleteReward } from '../../../../../../../../shared/actions/rewardAction'
import { batchActions } from 'redux-batched-actions'

export const deleteActionThunk = (
    delete_reward_id
) => (dispatch, getState) => {
    let action_array = [
        updateMainReward(""),
        deleteReward(delete_reward_id)
    ]

    dispatch(batchActions(action_array))
}