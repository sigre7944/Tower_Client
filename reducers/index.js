import {combineReducers} from 'redux'
import {currentRoute} from './currentRoute'
import {currentWeekInMonth} from './currentWeekInMonth'
import {tasks} from './tasks'
import {currentTask} from './currentTask'
import {categories} from './categories'

const rootReducer = combineReducers({
    currentRoute,
    currentWeekInMonth,
    tasks,
    currentTask,
    categories
})

export default rootReducer