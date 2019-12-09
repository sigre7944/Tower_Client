import { connect } from "react-redux";
import { saveEditThunk } from "./actions/saveEditThunk";
import { updateTask } from "../shared/actions/taskAction";
import EditMultipleTasks from "./EditMultipleTasks";

const mapStateToProps = state => {
  let currentChosenJournalType = state["currentChosenJournalType"];
  if (currentChosenJournalType === "day") {
    return {
      chosenDateData: state["chosenDayDateData"],
      tasks: state["day_tasks"],
      deleted_tasks: state["deleted_day_tasks"],
      completed_tasks: state["completed_day_tasks"],
      currentChosenJournalType: state["currentChosenJournalType"],
      priorities: state["priorities"],
      categories: state["categories"],
      current_chosen_category: state["currentChosenCategory"],
      deleted_tasks: state["deleted_day_tasks"],
      sortSettings: state["sortSettings"],
    };
  } else if (currentChosenJournalType === "week") {
    return {
      chosenDateData: state["chosenWeekDateData"],
      tasks: state["week_tasks"],
      deleted_tasks: state["deleted_week_tasks"],
      completed_tasks: state["completed_week_tasks"],
      currentChosenJournalType: state["currentChosenJournalType"],
      priorities: state["priorities"],
      categories: state["categories"],
      current_chosen_category: state["currentChosenCategory"],
      deleted_tasks: state["deleted_week_tasks"],
      sortSettings: state["sortSettings"],
    };
  }

  return {
    chosenDateData: state["chosenMonthDateData"],
    tasks: state["month_tasks"],
    deleted_tasks: state["deleted_month_tasks"],
    completed_tasks: state["completed_month_tasks"],
    currentChosenJournalType: state["currentChosenJournalType"],
    priorities: state["priorities"],
    categories: state["categories"],
    current_chosen_category: state["currentChosenCategory"],
    deleted_tasks: state["deleted_month_tasks"],
    sortSettings: state["sortSettings"],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveEditThunk: data => dispatch(saveEditThunk(data)),
  updateTask: (type, keyPath, notSetValue, updater) =>
    dispatch(updateTask(type, keyPath, notSetValue, updater))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditMultipleTasks);
