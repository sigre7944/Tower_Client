import { Map, is } from 'immutable'

export const day_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_DAY_STATS":
            // return state.set(action.timestamp, action.data)
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case "RETURN_NEW_DAY_STATS":
            return action.data.toMap()

        default:
            return state
    }
}

export const week_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_WEEK_STATS":
            // return state.set(action.timestamp, action.data)
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)
            
        case "RETURN_NEW_WEEK_STATS":
            return action.data.toMap()

        default:
            return state
    }
}

export const month_stats = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_MONTH_STATS":
            // return state.set(action.timestamp, action.data)
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case "RETURN_NEW_MONTH_STATS":
            return action.data.toMap()

        default:
            return state
    }
}