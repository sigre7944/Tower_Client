import { Map } from 'immutable'

export const deleted_day_tasks = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_DELETED_DAY_TASK":
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case "DELETE_DELETED_KEYPATH_DAY_TASK":
            return state.deleteIn(action.keyPath)

        case "RETURN_NEW_DELETED_DAY_TASKS":
            return action.data.toMap()

        default:
            return state
    }
}

export const deleted_week_tasks = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_DELETED_WEEK_TASK":
            console.log(state.updateIn(action.keyPath, action.notSetValue, action.updater))
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case "DELETE_DELETED_KEYPATH_WEEK_TASK":
            return state.deleteIn(action.keyPath)

        case "RETURN_NEW_DELETED_WEEK_TASKS":
            return action.data.toMap()

        default:
            return state
    }
}

export const deleted_month_tasks = (state = Map(), action) => {
    switch (action.type) {
        case "UPDATE_DELETED_MONTH_TASK":
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case "DELETE_DELETED_KEYPATH_MONTH_TASK":
            return state.deleteIn(action.keyPath)

        case "RETURN_NEW_DELETED_MONTH_TASKS":
            return action.data.toMap()

        default:
            return state
    }
}