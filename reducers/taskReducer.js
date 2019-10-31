import { Map, fromJS } from 'immutable'

export const day_tasks = (state = Map(), action) => {
    switch (action.type) {
        case 'ADD_NEW_DAY_TASK':
            return state.set(action.data.id, action.data)

        case 'ADD_EDIT_DAY_TASK':
            return state.update(action.data.id, (value) => action.data)

        case 'EDIT_DAY_TASK':
            return state.updateIn(action.keyPath, (value) => action.data)

        case 'UPDATE_DAY_TASK':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'DELETE_DAY_TASK':
            return state.delete(action.id)

        case 'DELETE_ALL_DAY_TASKS_WITH_CATEGORY':
            return state.filterNot((task) => task.category === action.id)

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

        case 'EDIT_WEEK_TASK':
            return state.updateIn(action.keyPath, (value) => action.data)

        case 'UPDATE_WEEK_TASK':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'DELETE_WEEK_TASK':
            return state.delete(action.id)

        case 'DELETE_ALL_WEEK_TASKS_WITH_CATEGORY':
            return state.filterNot((task) => task.category === action.id)

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

        case 'EDIT_MONTH_TASK':
            return state.updateIn(action.keyPath, (value) => action.data)

        case 'UPDATE_MONTH_TASK':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'DELETE_MONTH_TASK':
            return state.delete(action.id)

        case 'DELETE_ALL_MONTH_TASKS_WITH_CATEGORY':
            return state.filterNot((task) => task.category === action.id)

        default:
            return state
    }
}

export const completed_day_tasks = (state = Map(), action) => {
    switch (action.type) {
        case 'UPDATE_COMPLETED_DAY_TASK':
            return state.set(action.data.get("id"), action.data)

        case 'DELETE_COMPLETED_DAY_TASK':
            return state.delete(action.id)

        case 'DELETE_ALL_COMPLETED_DAY_TASKS_WITH_CATEGORY':
            return state.filterNot((task) => task.get("category") === action.id)

        case 'RETURN_NEW_COMPLETED_DAY_TASKS':
            return action.data.toMap()

        default:
            return state
    }
}

export const completed_week_tasks = (state = Map(), action) => {
    switch (action.type) {
        case 'UPDATE_COMPLETED_WEEK_TASK':
            return state.set(action.data.get("id"), action.data)

        case 'DELETE_COMPLETED_WEEK_TASK':
            return state.delete(action.id)

        case 'DELETE_ALL_COMPLETED_WEEK_TASKS_WITH_CATEGORY':
            return state.filterNot((task) => task.get("category") === action.id)

        case 'RETURN_NEW_COMPLETED_WEEK_TASKS':
            return action.data.toMap()

        default:
            return state
    }
}


export const completed_month_tasks = (state = Map(), action) => {
    switch (action.type) {
        case 'UPDATE_COMPLETED_MONTH_TASK':
            return state.set(action.data.get("id"), action.data)

        case 'DELETE_COMPLETED_MONTH_TASK':
            return state.delete(action.id)

        case 'DELETE_ALL_COMPLETED_MONTH_TASKS_WITH_CATEGORY':
            return state.filterNot((task) => task.get("category") === action.id)

        case 'RETURN_NEW_COMPLETED_MONTH_TASKS':
            return action.data.toMap()

        default:
            return state
    }
}

function getWeek(date) {
    var target = new Date(date);
    var dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    var firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() != 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target) / 604800000);
}

function getMonday(date) {
    let dayInWeek = new Date(date).getDay()
    let diff = dayInWeek === 0 ? 6 : dayInWeek - 1
    return new Date(new Date(date).getTime() - (diff * 86400 * 1000))
}

function getSunday(date) {
    let monday = getMonday(new Date(date))
    let sunday = new Date(monday)
    sunday.setDate(monday.setDate() + 6)

    return sunday
}

function getNoWeekInMonth(date) {
    let nearest_monday_timestamp = getMonday(date).getTime()
    let first_monday_of_month_timestamp = getMonday(new Date(date.getFullYear(), date.getMonth(), 1)).getTime()

    return Math.floor((nearest_monday_timestamp - first_monday_of_month_timestamp) / (7 * 86400 * 1000)) + 1
}

let date = new Date(),
    timestamp = date.getTime()

let initial_currentMonthTask = fromJS({
    schedule: {
        month: date.getMonth(),
        year: date.getFullYear()
    },
    category: "cate_0",
    repeat: {
        type: "monthly-m",
        interval: {
            value: 1
        }
    },
    end: {
        type: "never"
    },

    priority: {
        value: "pri_01",
    },

    reward: {
        value: 5,
    },

    goal: {
        max: 1
    }
}),
    initial_currentWeekTask = fromJS({
        schedule: {
            monday: getMonday(date).getDate(),
            sunday: getSunday(date).getDate(),
            week: getWeek(date),
            start_month: getMonday(date).getMonth(),
            end_month: getSunday(date).getMonth(),
            chosen_month: date.getMonth(),
            start_year: getMonday(date).getFullYear(),
            end_year: getSunday(date).getFullYear(),
            chosen_year: date.getFullYear(),
            start_noWeekInMonth: getNoWeekInMonth(getMonday(date)),
            end_noWeekInMonth: getNoWeekInMonth(getSunday(date)),
        },
        category: "cate_0",
        repeat: {
            type: "weekly-w",
            interval: {
                value: 1
            }
        },
        end: {
            type: "never"
        },
        priority: {
            value: "pri_01",
        },

        reward: {
            value: 5,
        },

        goal: {
            max: 1
        }
    }),

    initial_currentDayTask = fromJS({
        schedule: {
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
        },
        category: "cate_0",
        repeat: {
            type: "daily",
            interval: {
                value: 1
            }
        },
        end: {
            type: "never"
        },
        priority: {
            value: "pri_01",
        },

        reward: {
            value: 5
        },

        goal: {
            max: 1
        }
    })


export const currentMonthTask = (state = initial_currentMonthTask, action) => {
    switch (action.type) {

        case 'UPDATE_NEW_MONTH_TASK':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'RESET_NEW_MONTH_TASK':
            return Map(initial_currentMonthTask).toMap()

        default:
            return state
    }
}

export const currentDayTask = (state = initial_currentDayTask, action) => {
    switch (action.type) {

        case 'UPDATE_NEW_DAY_TASK':
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'RESET_NEW_DAY_TASK':
            return Map(initial_currentDayTask).toMap()

        default:
            return state
    }
}

export const currentWeekTask = (state = initial_currentWeekTask, action) => {
    switch (action.type) {

        case 'UPDATE_NEW_WEEK_TASK':
            // let new_state = state.updateIn(action.keyPath, action.notSetValue, action.updater)
            // console.log(new_state)
            return state.updateIn(action.keyPath, action.notSetValue, action.updater)

        case 'RESET_NEW_WEEK_TASK':
            return Map(initial_currentWeekTask).toMap()

        default:
            return state
    }
}