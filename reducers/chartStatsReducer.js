import { Map } from 'immutable'

export const week_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_WEEK_CHART_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_CATEGORY_AFFECTS_WEEK_CHART":
            return Map(action.data)

        default:
            return state
    }
}

export const month_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_MONTH_CHART_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_CATEGORY_AFFECTS_MONTH_CHART":
            return Map(action.data)

        default:
            return state
    }
}

export const year_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_YEAR_CHART_STATS":
            return state.set(action.timestamp, { ...action.data })

        case "DELETE_CATEGORY_AFFECTS_YEAR_CHART":
            return Map(action.data)

        default:
            return state
    }
}