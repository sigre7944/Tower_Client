import {combineReducers} from 'redux'
import {allTodos} from './allTodos'
import {allCompletedTodos} from './allCompletedTodos'
import {currentRoute} from './currentRoute'
import {currentWeekInMonth} from './currentWeekInMonth'

const rootReducer = combineReducers({
    allTodos,
    allCompletedTodos,
    currentRoute,
    currentWeekInMonth
})

export default rootReducer