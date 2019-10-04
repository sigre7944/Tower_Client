
import {createReward, updateMainReward, updateReward} from '../../../../../../../../shared/actions/rewardAction'
import { batchActions } from 'redux-batched-actions'

export const updateRewardAndMainReward = ({
    createReward_data,
    updateMainReward_data,
    updateReward_data,
}) => (dispatch, getState) => {
    let action_array = []

    if(updateMainReward_data.should_update){
        action_array.push(
            updateMainReward(updateMainReward_data.id)
        )
    }

    if(createReward_data.should_update){
        action_array.push(
            createReward(createReward_data.data.id, createReward_data.data)
        )
    }

    if(updateReward_data.should_update){
        action_array.push(
            updateReward(updateReward_data.data.id, updateReward_data.data)
        )
    }

    dispatch(batchActions(action_array))
}