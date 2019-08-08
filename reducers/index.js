import {combineReducers} from 'redux'
import {currentRoute} from './currentRoute'
import {currentWeekInMonth} from './currentWeekInMonth'
import {tasks} from './tasks'
import {currentTask} from './currentTask'
import {categories} from './categories'
import {priorities} from './priorities'
import {currentDayTask} from './currentDayTask'
import {currentWeekTask} from './currentWeekTask'
import {currentMonthTask} from './currentMonthTask'

const rootReducer = combineReducers({
    currentRoute,
    currentWeekInMonth,
    tasks,
    currentTask,
    categories,
    priorities,
    currentDayTask,
    currentWeekTask,
    currentMonthTask
})

export default rootReducer