import { connect } from "react-redux";
import { addTaskThunk } from "./actions/addTaskThunk";

import BottomOptionsHolder from "./BottomOptionsHolder";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.currentAnnotation === "day") {
    return {
      task_data: state["currentDayTask"],

      categories: state["categories"],
      priorities: state["priorities"],

      addTaskDescription: state["addTaskDescription"],
      addTaskTitle: state["addTaskTitle"],
      generalSettings: state["generalSettings"]
    };
  } else if (ownProps.currentAnnotation === "week") {
    return {
      task_data: state["currentWeekTask"],

      categories: state["categories"],
      priorities: state["priorities"],

      addTaskDescription: state["addTaskDescription"],
      addTaskTitle: state["addTaskTitle"],
      generalSettings: state["generalSettings"]
    };
  } else
    return {
      task_data: state["currentMonthTask"],

      categories: state["categories"],
      priorities: state["priorities"],

      addTaskDescription: state["addTaskDescription"],
      addTaskTitle: state["addTaskTitle"],
      generalSettings: state["generalSettings"]
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addTaskThunk: data => {
    dispatch(addTaskThunk(data));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomOptionsHolder);
