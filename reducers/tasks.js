export const day_tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NEW_DAY_TASK':
            return [...state, action.data]

        case 'ADD_EDIT_DAY_TASK':
            let edit_task = action.data,
                arr = [...state]

            arr[edit_task.index] = { ...edit_task }

            return [...arr]

        default:
            return state
    }
}

export const week_tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NEW_WEEK_TASK':
            return [...state, action.data]

        case 'ADD_EDIT_WEEK_TASK':
            let edit_task = action.data,
                arr = [...state]

            arr[edit_task.index] = { ...edit_task }

            return [...arr]

        default:
            return state
    }
}

export const month_tasks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NEW_MONTH_TASK':
            return [...state, action.data]

        case 'ADD_EDIT_MONTH_TASK':
            let edit_task = action.data,
                arr = [...state]

            arr[edit_task.index] = { ...edit_task }

            return [...arr]

        default:
            return state
    }
}