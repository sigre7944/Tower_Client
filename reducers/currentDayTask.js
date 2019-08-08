export const currentDayTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_NEW_DAY_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}