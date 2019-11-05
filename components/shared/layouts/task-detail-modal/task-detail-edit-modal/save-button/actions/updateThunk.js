import { batchActions } from 'redux-batched-actions'

import { updateTask } from '../../../../../actions/taskAction'
import { updateStats } from '../../../../../actions/statsAction'
import { updateChartStats } from '../../../../../actions/chartStatsAction'


export const updateEditedOptions = () => (dispatch, getState) => {
    let action_arrays = [

    ]

    dispatch(batchActions(action_arrays))
}