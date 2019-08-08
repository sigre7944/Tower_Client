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
import {currentAnnotation} from './currentAnnotation'

const rootReducer = combineReducers({
    currentRoute,
    currentWeekInMonth,
    tasks,
    currentTask,
    categories,
    priorities,
    currentDayTask,
    currentWeekTask,
    currentMonthTask,
    currentAnnotation
})

export default rootReducer