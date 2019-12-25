import { connect } from "react-redux";
import { chooseCategory } from "../shared/actions/categoryAction";
import {
  deleteCategoryWithTasksAndHistory,
  deleteTasksAndHistoryNotCategory,
  resetApplication
} from "./actions/deleteActionThunk";
import Drawer from "./Drawer";

const mapStateToProps = (state, ownProps) => {
  return {
    currentRoute: state["currentRoute"],
    categories: state["categories"],
    priorities: state["priorities"],

    day_tasks: state["day_tasks"],
    week_tasks: state["week_tasks"],
    month_tasks: state["month_tasks"],

    completed_day_tasks: state["completed_day_tasks"],
    completed_week_tasks: state["completed_week_tasks"],
    completed_month_tasks: state["completed_month_tasks"],

    day_chart_stats: state["day_chart_stats"],
    month_chart_stats: state["month_chart_stats"],
    week_chart_stats: state["week_chart_stats"],
    year_chart_stats: state["year_chart_stats"],

    current_chosen_category: state["currentChosenCategory"],

    deleted_day_tasks: state["deleted_day_tasks"],
    deleted_week_tasks: state["deleted_week_tasks"],
    deleted_month_tasks: state["deleted_month_tasks"],

    generalSettings: state["generalSettings"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  chooseCategory: category => dispatch(chooseCategory(category)),
  deleteCategoryWithTasksAndHistory: data =>
    dispatch(deleteCategoryWithTasksAndHistory(data)),
  deleteTasksAndHistoryNotCategory: data =>
    dispatch(deleteTasksAndHistoryNotCategory(data)),
  resetApplication: (data) => dispatch(resetApplication(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
