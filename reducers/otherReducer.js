import { Map, fromJS } from "immutable";

export const addTaskTitle = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_ADD_TASK_TITLE":
      return action.title;

    default:
      return state;
  }
};

export const addTaskDescription = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_ADD_TASK_DESCRIPTION":
      return action.description;

    default:
      return state;
  }
};

export const currentAnnotation = (state = "day", action) => {
  switch (action.type) {
    case "CHANGE_CURRENT_ANNOTATION":
      return action.annotation;

    default:
      return state;
  }
};

export const currentRoute = (state = "", action) => {
  switch (action.type) {
    case "CHANGE_ROUTE":
      return (state = action.routeName);

    default:
      return state;
  }
};

export const headerText = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_HEADER_TEXT":
      return action.data;

    default:
      return state;
  }
};

export const headerPressed = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_RETURN":
      return !state;

    default:
      return state;
  }
};

export const currentWeekInMonth = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE":
      return (state = { ...action });

    default:
      return state;
  }
};

export const chosenDayDateData = (state = Map(), action) => {
  switch (action.type) {
    case "RETURN_NEW_CHOSEN_DAY_DATE_DATA":
      return action.data;

    default:
      return state;
  }
};

export const chosenWeekDateData = (state = Map(), action) => {
  switch (action.type) {
    case "RETURN_NEW_CHOSEN_WEEK_DATE_DATA":
      return action.data;

    default:
      return state;
  }
};

export const chosenMonthDateData = (state = Map(), action) => {
  switch (action.type) {
    case "RETURN_NEW_CHOSEN_MONTH_DATE_DATA":
      return action.data;

    default:
      return state;
  }
};

export const currentChosenJournalType = (state = "day", action) => {
  switch (action.type) {
    case "UPDATE_CURRENT_CHOSEN_JOURNAL_TYPE":
      return action.data;
    default:
      return state;
  }
};

let initial_sort_settings = fromJS([
  true, //sort by priority
  false, // sort by name
  false // sort by reward
]);

export const sortSettings = (state = initial_sort_settings, action) => {
  switch (action.type) {
    case "RETURN_NEW_SORT_SETTINGS":
      return action.data.toList();

    default:
      return state;
  }
};

let initial_general_settings = fromJS({
  net_info: {
    is_internet_reachable: true,
    connection_type: "wifi"
  },
  account: {
    isLoggedIn: false,
    package: {
      plan: "free"
    }
  },

  sound: true,
  vibration: true,

  package_limitations: {
    free: {
      number_of_tasks_per_category: 10,
      number_of_categories: 5,
      number_of_rewards: 5,
      chart_change_calendar_available: false
    },

    premium: {
      number_of_tasks_per_category: 99,
      number_of_categories: 99,
      number_of_rewards: 99,
      chart_change_calendar_available: true
    }
  },

  active_info: {
    latest_timestamp: Date.now(),
    should_beta_suggest_login: false,
    session_time: 30 * 60 * 1000
  }

  // currency: "EUR",
  // exchange_rates: {
  //   EUR: {
  //     base: "EUR",
  //     date: "2019-11-29",
  //     rates: {
  //       JPY: 120.43,
  //       USD: 1.0982,
  //       GBP: 0.85225
  //     }
  //   },

  //   USD: {
  //     rates: {
  //       EUR: 0.9105809506,
  //       JPY: 109.6612638864,
  //       GBP: 0.7760426152
  //     },
  //     base: "USD",
  //     date: "2019-11-29"
  //   },

  //   GBP: {
  //     rates: {
  //       EUR: 1.1733646231,
  //       JPY: 141.3083015547,
  //       USD: 1.288589029
  //     },
  //     base: "GBP",
  //     date: "2019-11-29"
  //   },

  //   JPY: {
  //     rates: {
  //       EUR: 0.0083035788,
  //       USD: 0.0091189903,
  //       GBP: 0.0070767251
  //     },
  //     base: "JPY",
  //     date: "2019-11-29"
  //   }
  // }
});

export const generalSettings = (state = initial_general_settings, action) => {
  switch (action.type) {
    case "UPDATE_GENERAL_SETTINGS":
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "RETURN_NEW_GENERAL_SETTINGS":
      return action.data.toMap();

    default:
      return state;
  }
};

export const correspondToCreatedDayTask = (state = Map(), action) => {
  switch (action.type) {
    case "RETURN_CORRESPOND_TO_CREATED_DAY_TASK":
      return action.data.toMap();

    default:
      return state;
  }
};

export const correspondToCreatedWeekTask = (state = Map(), action) => {
  switch (action.type) {
    case "RETURN_CORRESPOND_TO_CREATED_WEEK_TASK":
      return action.data.toMap();

    default:
      return state;
  }
};

export const correspondToCreatedMonthTask = (state = Map(), action) => {
  switch (action.type) {
    case "RETURN_CORRESPOND_TO_CREATED_MONTH_TASK":
      return action.data.toMap();

    default:
      return state;
  }
};
