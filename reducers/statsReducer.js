import { Map } from 'immutable'

export const day_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_DAY_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_DAY_STATS":
            return state.delete(action.timestamp)

        default:
            return state
    }
}

export const week_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_WEEK_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_WEEK_STATS":
            return state.delete(action.timestamp)

        default:
            return state
    }
}

export const month_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_MONTH_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_MONTH_STATS":
            return state.delete(action.timestamp)

        default:
            return state
    }
}