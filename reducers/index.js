import {combineReducers} from 'redux'
import {allTodos} from './allTodos'
import {allCompletedTodos} from './allCompletedTodos'
import {currentRoute} from './currentRoute'
import {monthComponent_arr} from './calendar/day-annotation-calendar/dayAnnotationCalendar'

const rootReducer = combineReducers({
    allTodos,
    allCompletedTodos,
    currentRoute,
    monthComponent_arr
})

export default rootReducer