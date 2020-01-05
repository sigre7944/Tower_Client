import { connect } from "react-redux";
import { updateTask } from "../../../../../../../shared/actions/taskAction";
import { updateBulkThunk } from "./actions/taskCardThunk";

import TaskCard from "./TaskCard";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.type === "day") {
    return {
      completed_tasks: state["completed_day_tasks"],
      day_chart_stats: state["day_chart_stats"],
      week_chart_stats: state["week_chart_stats"],
      month_chart_stats: state["month_chart_stats"],
      year_chart_stats: state["year_chart_stats"],
      priorities: state["priorities"],
      categories: state["categories"],
      generalSettings: state["generalSettings"]
    };
  } else if (ownProps.type === "week") {
    return {
      completed_tasks: state["completed_week_tasks"],
      day_chart_stats: state["day_chart_stats"],
      week_chart_stats: state["week_chart_stats"],
      month_chart_stats: state["month_chart_stats"],
      year_chart_stats: state["year_chart_stats"],
      priorities: state["priorities"],
      categories: state["categories"],
      generalSettings: state["generalSettings"]
    };
  }

  return {
    completed_tasks: state["completed_month_tasks"],
    day_chart_stats: state["day_chart_stats"],
    week_chart_stats: state["week_chart_stats"],
    month_chart_stats: state["month_chart_stats"],
    year_chart_stats: state["year_chart_stats"],
    priorities: state["priorities"],
    categories: state["categories"],
    generalSettings: state["generalSettings"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateBulkThunk: data => dispatch(updateBulkThunk(data)),

  updateTask: (keyPath, notSetValue, updater) =>
    dispatch(updateTask(keyPath, notSetValue, updater))
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCard);
