import { Map, fromJS } from 'immutable'

export const day_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_DAY_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_ALL_DAY_TASKS_IN_CATEGORY":
            return action.data

        default:
            return state
    }
}

export const week_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_WEEK_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_ALL_WEEK_TASKS_IN_CATEGORY":
            return action.data

        default:
            return state
    }
}

export const month_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_MONTH_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_ALL_MONTH_TASKS_IN_CATEGORY":
            return action.data

        default:
            return state
    }
}