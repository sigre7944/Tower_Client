import { combineReducers } from 'redux'
import { priorities } from './priorityReducer'

import {
    currentChosenCategory,
    categories
} from './categoryReducer'

import {
    completed_day_tasks,
    completed_week_tasks,
    completed_month_tasks,
    currentDayTask,
    currentMonthTask,
    currentWeekTask,
    day_tasks,
    month_tasks,
    week_tasks,
} from './taskReducer'

import {
    addTaskDescription,
    addTaskTitle,
    currentAnnotation,
    currentRoute,
    currentWeekInMonth,
    headerPressed,
    headerText
} from './otherReducer'

import {
    day_stats,
    month_stats,
    week_stats
} from './statsReducer'

import {
    month_chart_stats,
    week_chart_stats,
    year_chart_stats
} from './chartStatsReducer'


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
    currentChosenCategory,

    day_stats,
    month_stats,
    week_stats,

    month_chart_stats,
    week_chart_stats,
    year_chart_stats
})

export default rootReducer