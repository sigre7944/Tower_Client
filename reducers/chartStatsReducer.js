import { Map } from 'immutable'

export const week_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_WEEK_CHART_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_WEEK_CHART_STATS":
            return state.delete(action.timestamp)

        default:
            return state
    }
}

export const month_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_MONTH_CHART_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_MONTH_CHART_STATS":
            return state.delete(action.timestamp)

        default:
            return state
    }
}

export const year_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_YEAR_CHART_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_YEAR_CHART_STATS":
            return state.delete(action.timestamp)

        default:
            return state
    }
}