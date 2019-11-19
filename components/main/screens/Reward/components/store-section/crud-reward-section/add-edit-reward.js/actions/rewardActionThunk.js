import { updateMainReward, updateKeyPathReward, deleteKeyPathReward } from '../../../../../../../../shared/actions/rewardAction'
import { batchActions } from 'redux-batched-actions'

export const addRewardAndMainReward = ({
    new_reward_data,
    update_main_reward_data
}) => (dispatch, getState) => {
    let action_array = [
        updateKeyPathReward(new_reward_data.keyPath, new_reward_data.notSetValue, new_reward_data.updater)
    ]

    if (update_main_reward_data.should_update) {
        action_array.push(
            updateMainReward(update_main_reward_data.id)
        )
    }

    dispatch(batchActions(action_array))
}

export const editRewardAndMainReward = ({
    edit_reward_data,
    update_main_reward_data
}) => (dispatch, getState) => {
    let action_array = [
        updateKeyPathReward(edit_reward_data.keyPath, edit_reward_data.notSetValue, edit_reward_data.updater)
    ]

    if (update_main_reward_data.should_update) {
        action_array.push(
            updateMainReward(update_main_reward_data.id)
        )
    }

    dispatch(batchActions(action_array))
}

export const deleteReward = ({
    delete_reward_data
}) => (dispatch, getState) => {
    let action_array = [
        deleteKeyPathReward(delete_reward_data.keyPath),
        updateMainReward("")
    ]

    dispatch(batchActions(action_array))
}
