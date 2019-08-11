export const currentMonthTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_NEW_MONTH_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}