// import { combineReducers as immutableCombineReducers } from 'redux-immutable'
import { combineReducers } from "redux";
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
    headerText,
    toggleEditMultipleTasks
} from './otherReducer'

import {
    day_chart_stats,
    month_chart_stats,
    week_chart_stats,
    year_chart_stats
} from './chartStatsReducer'

import {
    rewards,
    balance,
    main_reward,
    purchase_history
} from './rewardReducer'

import {
    deleted_day_tasks,
    deleted_week_tasks,
    deleted_month_tasks
} from "./deletedTasksReducer";

import { } from "immutable";

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

    day_chart_stats,
    month_chart_stats,
    week_chart_stats,
    year_chart_stats,

    rewards,
    balance,
    main_reward,
    purchase_history,

    deleted_day_tasks,
    deleted_week_tasks,
    deleted_month_tasks,

    toggleEditMultipleTasks
})

export default rootReducer