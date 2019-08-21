import {combineReducers} from 'redux'
import {currentRoute} from './currentRoute'
import {currentWeekInMonth} from './currentWeekInMonth'
import {day_tasks, week_tasks, month_tasks} from './tasks'
import {categories} from './categories'
import {priorities} from './priorities'
import {currentDayTask, currentWeekTask, currentMonthTask} from './currentTasks'
import {currentAnnotation} from './currentAnnotation'
import {headerText, headerPressed} from './headerText'
import {addTaskDescription, addTaskTitle} from './addTaskPanel'


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
    headerText,
    headerPressed,

    addTaskDescription,
    addTaskTitle
})

export default rootReducer