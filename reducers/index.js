import {combineReducers} from 'redux'
import {currentRoute} from './currentRoute'
import {currentWeekInMonth} from './currentWeekInMonth'
import {day_tasks, week_tasks, month_tasks} from './tasks'
import {categories} from './categories'
import {priorities} from './priorities'
import {currentDayTask, currentWeekTask, currentMonthTask} from './currentTasks'
import {currentAnnotation} from './currentAnnotation'
import {edittingTask} from './edittingTask'

const rootReducer = combineReducers({
    currentRoute,
    currentWeekInMonth,
    day_tasks,
    week_tasks,
    month_tasks,
    categories,
    priorities,
    currentDayTask,
    currentWeekTask,
    currentMonthTask,
    currentAnnotation,
    edittingTask
})

export default rootReducer