export const currentMonthTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_NEW_MONTH_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}

export const currentDayTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_NEW_DAY_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}

export const currentWeekTask = (state = {}, action) => {
    switch (action.type){
        case 'UPDATE_NEW_WEEK_TASK':
            return {... state, ... action.data}

        default:
            return state
    }
}