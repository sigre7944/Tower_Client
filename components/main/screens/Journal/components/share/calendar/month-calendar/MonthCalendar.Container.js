import { connect } from "react-redux";
import { updateTaskSchedule } from "./actions/updateThunk";
import { returnCorrespondCreatedTask } from "../../../../../../../shared/actions/otherAction";

import MonthCalendar from "./MonthCalendar";

const mapStateToProps = (state, ownProps) => {
  if (!ownProps.edit) {
    return {
      task_data: state["currentMonthTask"]
    };
  }

  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTaskSchedule: data => dispatch(updateTaskSchedule(data)),
  returnCorrespondCreatedTask: data =>
    dispatch(
      returnCorrespondCreatedTask("RETURN_CORRESPOND_TO_CREATED_MONTH_TASK", data)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthCalendar);
