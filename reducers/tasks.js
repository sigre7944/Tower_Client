export const day_tasks = (state = [], action) => {
    switch (action.type){
        case 'ADD_NEW_DAY_TASK':
            return [... state, action.data]

        default:
            return state
    }
}

export const week_tasks = (state = [], action) => {
    switch (action.type){
        case 'ADD_NEW_WEEK_TASK':
            return [... state, action.data]

        default:
            return state
    }
}

export const month_tasks = (state = [], action) => {
    switch (action.type){
        case 'ADD_NEW_MONTH_TASK':
            return [... state, action.data]

        default:
            return state
    }
}