import { stringify } from "querystring";

const task = {
    title: 'Task 1', // should be global variable
    description: "description",
    category: 'inbox_123', //using category id

    // repeat object will hold 1 combination.
    repeat: {
        // these properties are used for 'Day' type task
        type: "daily", //weekly, monthly for 'day' type task. Used for editting task components
        interval: {
            value:  2 // timestamp for repetition. 86400 * 1000 = miliseconds in a day, 2 = number of repetitive days
        },

        // these properties are used for 'Day' type task
        type: "weekly",
        interval: {
            value: 7 * 2, // timestamp for weekly repetition. 86400 * 1000 * 7 = miliseconds in a week, 2 = number of repetitive weeks
            daysInWeek: [0, 1, 2, 3] // indexes for days in a week. Sunday = 0, Monday = 1, Tuesday = 2
        },

        // these properties are used for 'Day' type task
        type: "monthly",
        interval: {
            value: 2 // number of months for monthly repetition. This is calculated based on the need of users.
            // If users want to repeat a task that has starting date at 31/8 for example, the task will
            // be repeated at 30/9 because September has no 31th or 28(29)/2 (meaning the last day of month).
            // Only the 31th and Feburary are considered.
        },

        // these properties are used for 'Week' type task
        type: "weekly-w",
        interval: {
            value: 2
        },

        type: "weekly-m",
        interval: {
            value: 2
        },

        // these properties are used for 'Month' type task
        type: "monthly-m",
        interval: {
            value: 2 // number of repetitive months
        }
    },

    goal: {
        max: 5,
        current: 1, // tracking the current completions. This will be reset after 1 repeat.
    },

    // end data will hold 1 combination.
    end: {
        //there are 3 types of "endData": never, on, after.
        //for each repeatType, represent each structure based on each "endData".

        // never
        type: "never",


        // on date
        type: "on",
        endAt: 1212121212, // timestamp of ending date.


        // after occurances
        type: "after",
        occurrence: 5 // If users set the repetition of a task to be repeated every 2 days. This value will determine
        // that the task will be expired in 10 days.
    },

    schedule: {
        year: 2019, // Calendar component will use this for displaying and styling
        month: 6, // Calendar component will use this for displaying and styling
        day: 26, // Calendar component will use this for displaying and styling

    },

    priority: {
        value: "pri_01", //use priority id
    },

    reward: {
        value: 50
    }
}

const category = {
    // use id of each category as key
    inbox_123: {
        name: "Inbox",
        color: "red",
        quantity: 0, // number of tasks
    }
}

const priority = {
    // use id of each priority as key
    pri_01: {
        name: "Do First",
        importance: 1,
        urgency: 1
    },

}


const day_tasks = {
    task_id: {
        id: task_id, //use uuid()
        title: 'Task 1',
        description: "description",
        category: 'cate_0', //using category id
        repeat: {
            type: "daily",
            interval: {
                value: 2 // every 2 days
            },

            /* OR */
            type: "weekly",
            interval: {
                value: 2, // every 2 weeks
                daysInWeek: [0, 1, 2, 3] // indexes for days in a week. Sunday = 0, Monday = 1, Tuesday = 2
            },

            /* OR */
            type: "monthly",
            interval: {
                value: 2 // every 2 months
            },
        },

        goal: {
            max: 5,
        },

        end: {
            type: "never",

            /* OR */
            type: "on",
            endAt: 1212121212, // timestamp of ending date.


            /* OR */
            type: "after",
            occurrence: 5 // If users set the repetition of a task to be repeated every 2 days. This value will determine
            // that the task will be expired in 10 days.
        },

        //startTime = new Date(year, month, day).getTime()
        schedule: {
            year: 2019,
            month: 6,
            day: 26,
        },

        priority: {
            value: "pri_01", //use priority id
        },

        reward: {
            value: 50
        }
    }
}

const day_completed_tasks = {
    task_id: {
        id: task_id,
        // The completion_timestamp_x will be calculated based on a rule, involving the day, month, year of the completion time.
        completion_timestamp_1: {
            current: 1 //the current goal value of the task. For example, a task has a goal of 5 times completion each occurrence. The value shows that
            // at the time of completion_timestamp_1, the task has been completed 1 time (1/5)
        },

        completion_timestamp_2: {
            current: 1
        },
    }
}

const week_tasks = {
    task_id: {
        id: task_id, //use uuid()
        title: 'Task 1',
        description: "description",
        createdAt: 11111111,
        startTime: 1111111,
        trackingTime: 3333333, // currently not used (*)
        type: 'day',
        category: 'cate_0', //using category id
        repeat: {
            type: "weekly-w",
            interval: {
                value: 2 // every 2 weeks
            },

            /* OR */
            type: "monthly-w",
            interval: {
                value: 2 // every 2 months
            }
        },

        goal: {
            max: 5,
        },

        end: {
            type: "never",

            /* OR */
            type: "on",
            endAt: 1212121212, // timestamp of ending date.


            /* OR */
            type: "after",
            occurrence: 5 // If users set the repetition of a task to be repeated every 2 days. This value will determine
            // that the task will be expired in 10 days.
        },

        schedule: {
            year: 2019,
            month: 6,
            day: 26,
            week: 35,
            noWeekInMonth: 3
        },

        priority: {
            value: "pri_01", //use priority id
            reward: 50
        },
    },
}

const week_completed_tasks = {
    task_id: {
        id: task_id,
        category: category_id,
        priority_value: priority_value,
        // The completion_timestamp_x will be calculated based on a rule, involving the first monday of the week, month, year of the completion time.
        completion_timestamp_1: {
            current: 1, //the current goal value of the task. For example, a task has a goal of 5 times completion each occurrence. The value shows that
            // at the time of completion_timestamp_1, the task has been completed 1 time (1/5)
            priority_value: priority_value,
        },

        completion_timestamp_2: {
            current: 1,
            priority_value: priority_value,
        },
    }
}

const month_task = {
    task_id: {
        id: task_id, //use uuid()
        title: 'Task 1',
        description: "description",
        createdAt: 11111111,
        startTime: 1111111,
        trackingTime: 3333333, // currently not used (*)
        type: 'day',
        category: 'cate_0', //using category id
        repeat: {
            type: "monthly-m",
            interval: {
                value: 2 // every 2 months
            }
        },

        goal: {
            max: 5,
        },

        end: {
            type: "never",

            /* OR */
            type: "on",
            endAt: 1212121212, // timestamp of ending date.


            /* OR */
            type: "after",
            occurrence: 5 // If users set the repetition of a task to be repeated every 2 days. This value will determine
            // that the task will be expired in 10 days.
        },

        schedule: {
            year: 2019,
            month: 6,
            day: 26,
            week: 35,
            noWeekInMonth: 3
        },

        priority: {
            value: "pri_01", //use priority id
            reward: 50
        },
    },
}

const month_completed_tasks = {
    task_id: {
        id: task_id,
        // The completion_timestamp_x will be calculated based on a rule, involving the first monday of the month, year of the completion time.
        completion_timestamp_1: {
            current: 1 //the current goal value of the task. For example, a task has a goal of 5 times completion each occurrence. The value shows that
            // at the time of completion_timestamp_1, the task has been completed 1 time (1/5)
        },

        completion_timestamp_2: {
            current: 1
        },
    }
}

const day_stats = {
    day_timestamp: {
        // doFirst: 3,
        // plan: 2,
        // delay: 4,
        // delegate: 1,
        current: [3, 2, 4, 1],
    }
}

const week_stats = {
    week_timestamp: {
        // doFirst: 1,
        // plan: 2,
        // delay: 0,
        // delegate: 0,
        current: [1, 2, 0, 0],
    }
}

const month_stats = {
    month_timestamp: {
        // doFirst: 1,
        // plan: 3,
        // delay: 4,
        // delegate: 0,
        current: [1, 3, 4, 0],
    }
}

const week_chart_stats = {
    week_timestamp: {
        //monday
        0: {
            current: [1, 0, 1, 0]
        },
    }
}

const month_chart_stats = {
    month_timestamp: {
        //first day of month
        1: {
            current: [1, 0, 1, 0]
        }
    }
}

const year_chart_stats = {
    year_timestamp: {
        //January
        0: {
            current: [1, 0, 1, 0]
        }
    }
}