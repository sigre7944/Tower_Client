import { Map, fromJS } from "immutable";

export const addTaskTitle = (state = "", action) => {
    switch (action.type) {
        case "CHANGE_ADD_TASK_TITLE":
            return action.title

        default:
            return state
    }
}

export const addTaskDescription = (state = "", action) => {
    switch (action.type) {
        case "CHANGE_ADD_TASK_DESCRIPTION":
            return action.description

        default:
            return state
    }
}

export const currentAnnotation = (state = "day", action) => {
    switch (action.type) {
        case "CHANGE_CURRENT_ANNOTATION":
            return action.annotation

        default:
            return state
    }
}

export const currentRoute = (state = "", action) => {
    switch (action.type) {
        case 'CHANGE_ROUTE':
            return state = action.routeName

        default:
            return state
    }
}


export const headerText = (state = "", action) => {
    switch (action.type) {
        case 'UPDATE_HEADER_TEXT':
            return action.data

        default:
            return state
    }
}

export const headerPressed = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_RETURN':
            return !state

        default:
            return state
    }
}

export const currentWeekInMonth = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE':
            return state = { ...action }

        default:
            return state
    }
}

export const chosenDayDateData = (state = Map(), action) => {
    switch (action.type) {
        case 'RETURN_NEW_CHOSEN_DAY_DATE_DATA':
            return action.data

        default:
            return state
    }
}

export const chosenWeekDateData = (state = Map(), action) => {
    switch (action.type) {
        case 'RETURN_NEW_CHOSEN_WEEK_DATE_DATA':
            return action.data

        default:
            return state
    }
}

export const chosenMonthDateData = (state = Map(), action) => {
    switch (action.type) {
        case 'RETURN_NEW_CHOSEN_MONTH_DATE_DATA':
            return action.data

        default:
            return state
    }
}

export const currentChosenJournalType = (state = "day", action) => {
    switch (action.type) {
        case 'UPDATE_CURRENT_CHOSEN_JOURNAL_TYPE':
            return action.data
        default:
            return state
    }
}

let initial_sort_settings = fromJS([
    true, //sort by priority
    false, // sort by name
    false // sort by reward
])

export const sortSettings = (state = initial_sort_settings, action) => {
    switch (action.type) {
        case 'RETURN_NEW_SORT_SETTINGS':
            return action.data.toList()

        default:
            return state
    }

}


let initial_general_settings = fromJS({
    account: {
        isLoggedIn: false,
        userId: "",
        email: "",
        deviceId: "",
        plan: "free"
    },

    sound: true,
    vibration: true,
    currency: "EUR",
    exchange_rates: {
        EUR: {
            base: "EUR",
            date: "2019-11-29",
            rates: {
                "JPY": 120.43,
                "USD": 1.0982,
                "GBP": 0.85225,
            }
        },

        USD: {
            "rates": {
                "EUR": 0.9105809506,
                "JPY": 109.6612638864,
                "GBP": 0.7760426152
            },
            "base": "USD",
            "date": "2019-11-29"
        },

        GBP: {
            "rates": {
                "EUR": 1.1733646231,
                "JPY": 141.3083015547,
                "USD": 1.288589029
            },
            "base": "GBP",
            "date": "2019-11-29"
        },

        JPY: {
            "rates": {
                "EUR": 0.0083035788,
                "USD": 0.0091189903,
                "GBP": 0.0070767251
            },
            "base": "JPY",
            "date": "2019-11-29"
        }
    }
})

export const generalSettings = (state = initial_general_settings, action) => {
    switch (action.type) {
        case 'UPDATE_GENERAL_SETTINGS':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'RETURN_NEW_GENERAL_SETTINGS':
            return action.data.toMap()

        default:
            return state
    }
}
