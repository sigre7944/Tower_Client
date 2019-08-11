import {combineReducers} from 'redux'
import {currentRoute} from './currentRoute'
import {currentWeekInMonth} from './currentWeekInMonth'
import {day_tasks, week_tasks, month_tasks} from './tasks'
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
    day_tasks,
    week_tasks,
    month_tasks,
    currentTask,
    categories,
    priorities,
    currentDayTask,
    currentWeekTask,
    currentMonthTask,
    currentAnnotation
})

export default rootReducer