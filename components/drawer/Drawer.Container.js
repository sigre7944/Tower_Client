import { connect } from "react-redux";
import { chooseCategory } from "../shared/actions/categoryAction";
import {
  deleteTasksAndHistory,
  deleteOnlyTasks
} from "./actions/deleteActionThunk";
import { updateGeneralSettings } from "../shared/actions/otherAction";
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

    generalSettings: state["generalSettings"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  chooseCategory: category => dispatch(chooseCategory(category)),
  deleteTasksAndHistory: data => dispatch(deleteTasksAndHistory(data)),
  deleteOnlyTasks: data => dispatch(deleteOnlyTasks(data)),
  updateGeneralSettings: data => dispatch(updateGeneralSettings(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
