import { connect } from "react-redux";
import { updateTaskSchedule } from "./actions/updateThunk";
import { returnCorrespondCreatedTask } from "../../../../../../../shared/actions/otherAction";
import DayCalendar from "./DayCalendar";

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.edit) {
    return {
      task_data: state["currentDayTask"]
    };
  }

  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTaskSchedule: data => dispatch(updateTaskSchedule(data)),
  returnCorrespondCreatedTask: data =>
    dispatch(
      returnCorrespondCreatedTask("RETURN_CORRESPOND_TO_CREATED_DAY_TASK", data)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(DayCalendar);
