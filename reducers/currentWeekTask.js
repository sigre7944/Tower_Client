export const currentWeekTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_NEW_WEEK_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}