import { Map } from 'immutable'

export const week_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_WEEK_CHART_STATS":
            // return state.set(action.timestamp, action.data)
            return state.set(action.keyPath, action.notSetValue, action.updater)

        case "RETURN_NEW_WEEK_CHART_STATS":
            return action.data.toMap()

        default:
            return state
    }
}

export const month_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_MONTH_CHART_STATS":
            // return state.set(action.timestamp, action.data)
            return state.set(action.keyPath, action.notSetValue, action.updater)

        case "RETURN_NEW_MONTH_CHART_STATS":
            return action.data.toMap()

        default:
            return state
    }
}

export const year_chart_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_YEAR_CHART_STATS":
            // return state.set(action.timestamp, action.data)
            return state.set(action.keyPath, action.notSetValue, action.updater)

        case "RETURN_NEW_YEAR_CHART_STATS":
            return action.data.toMap()

        default:
            return state
    }
}