import { Map } from 'immutable'

export const day_tasks = (state = Map(), action) => {
    switch (action.type) {

        case 'ADD_NEW_DAY_TASK':
            return state.set(action.data.id, action.data)

        case 'ADD_EDIT_DAY_TASK':
            return state.update(action.data.id, (value) => action.data)

        case 'DELETE_DAY_TASK':
            return state.delete(action.id)

        default:
            return state
    }
}

export const week_tasks = (state = Map(), action) => {
    switch (action.type) {
        case 'ADD_NEW_WEEK_TASK':
            return state.set(action.data.id, action.data)

        case 'ADD_EDIT_WEEK_TASK':
            return state.update(action.data.id, (value) => action.data)

        case 'DELETE_WEEK_TASK':
            return state.delete(action.id)

        default:
            return state
    }
}

export const month_tasks = (state = Map(), action) => {
    switch (action.type) {
        case 'ADD_NEW_MONTH_TASK':
            return state.set(action.data.id, action.data)

        case 'ADD_EDIT_MONTH_TASK':
            return state.update(action.data.id, (value) => action.data)

        case 'DELETE_MONTH_TASK':
            return state.delete(action.id)

        default:
            return state
    }
}

export const completed_day_tasks = (state = Map(), action) => {
    switch(action.type){
        case 'UPDATE_COMPLETED_DAY_TASK':
            return state.set(action.data.id, action.data)

        case 'DELETE_COMPLETED_DAY_TASK':
            return state.delete(action.id)

        default:
            return state
    }
}

export const completed_week_tasks = (state = Map(), action) => {
    switch(action.type){
        case 'UPDATE_COMPLETED_WEEK_TASK':
            return state.set(action.data.id, action.data)

        case 'DELETE_COMPLETED_WEEK_TASK':
            return state.delete(action.id)

        default:
            return state
    }
}

export const completed_month_tasks = (state = Map(), action) => {
    switch(action.type){
        case 'UPDATE_COMPLETED_MONTH_TASK':
            return state.set(action.data.id, action.data)

        case 'DELETE_COMPLETED_MONTH_TASK':
            return state.delete(action.id)

        default:
            return state
    }
}