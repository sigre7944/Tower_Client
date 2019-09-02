import {combineReducers} from 'redux'
import {currentRoute} from './currentRoute'
import {currentWeekInMonth} from './currentWeekInMonth'
import {day_tasks, week_tasks, month_tasks, completed_day_tasks, completed_week_tasks, completed_month_tasks} from './tasks'
import {categories} from './categories'
import {priorities} from './priorities'
import {currentDayTask, currentWeekTask, currentMonthTask} from './currentTasks'
import {currentAnnotation} from './currentAnnotation'
import {headerText, headerPressed} from './headerText'
import {addTaskDescription, addTaskTitle} from './addTaskPanel'
import {currentChosenCategory} from './currentChosenCategory'

const rootReducer = combineReducers({
    currentRoute,
    currentWeekInMonth,


    day_tasks,
    week_tasks,
    month_tasks,


    completed_day_tasks,
    completed_week_tasks,
    completed_month_tasks,


    categories,
    priorities,
    currentDayTask,
    currentWeekTask,
    currentMonthTask,
    currentAnnotation,
    headerText,
    headerPressed,

    addTaskDescription,
    addTaskTitle,

    currentChosenCategory
})

export default rootReducer