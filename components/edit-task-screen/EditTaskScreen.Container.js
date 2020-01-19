import { connect } from "react-redux";
import { updateTask } from "../shared/actions/taskAction";
import { updateCategory } from "../shared/actions/categoryAction";
import { updatePriority } from "../shared/actions/priorityAction";
import EditTaskScreen from "./EditTaskScreen";

const mapStateToProps = state => {
  return {
    day_tasks: state["day_tasks"],
    week_tasks: state["week_tasks"],
    month_tasks: state["month_tasks"],
    categories: state["categories"],
    priorities: state["priorities"],
    editTaskId: state["editTaskId"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTask: (type, keyPath, notSetValue, updater) =>
    dispatch(updateTask(type, keyPath, notSetValue, updater)),
  updateCategory: (keyPath, notSetValue, updater) =>
    dispatch(updateCategory(keyPath, notSetValue, updater)),
  updatePriority: (keyPath, notSetValue, updater) =>
    dispatch(updatePriority(keyPath, notSetValue, updater))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskScreen);
