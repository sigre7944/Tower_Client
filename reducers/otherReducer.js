import { Map } from "immutable";

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