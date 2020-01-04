import { Map } from "immutable";

export const day_chart_stats = (state = Map(), action) => {
  switch (action.type) {
    case "UPDATE_DAY_CHART_STATS":
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "RETURN_NEW_DAY_CHART_STATS":
      return action.data.toMap();

    case "RESET_DAY_CHART_STATS":
      return Map();

    default:
      return state;
  }
};

export const week_chart_stats = (state = Map(), action) => {
  switch (action.type) {
    case "UPDATE_WEEK_CHART_STATS":
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "RETURN_NEW_WEEK_CHART_STATS":
      return action.data.toMap();

    case "RESET_WEEK_CHART_STATS":
      return Map();

    default:
      return state;
  }
};

export const month_chart_stats = (state = Map(), action) => {
  switch (action.type) {
    case "UPDATE_MONTH_CHART_STATS":
      // console.log(
      //   "\n",
      //   state.updateIn(action.keyPath, action.notSetValue, action.updater)
      // );
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "RETURN_NEW_MONTH_CHART_STATS":
      return action.data.toMap();

    case "RESET_MONTH_CHART_STATS":
      return Map();

    default:
      return state;
  }
};

export const year_chart_stats = (state = Map(), action) => {
  switch (action.type) {
    case "UPDATE_YEAR_CHART_STATS":
      return state.updateIn(action.keyPath, action.notSetValue, action.updater);

    case "RETURN_NEW_YEAR_CHART_STATS":
      return action.data.toMap();

    case "RESET_YEAR_CHART_STATS":
      return Map();

    default:
      return state;
  }
};
