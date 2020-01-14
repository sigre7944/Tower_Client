import { connect } from "react-redux";
import {
  updateHeaderText,
  returnCorrespondCreatedTask
} from "../../../../../../../shared/actions/otherAction";
import MonthFlatlist from "./MonthFlatlist";

const mapStateToProps = (state, ownProps) => {
  return {
    headerPressed: state["headerPressed"],
    currentJournalTab: state["currentJournalTab"],
    correspondToCreatedMonthTask: state["correspondToCreatedMonthTask"],
    chosenDateData: state["chosenMonthDateData"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateHeaderText: data => dispatch(updateHeaderText(data)),
  returnCorrespondCreatedTask: data =>
    dispatch(
      returnCorrespondCreatedTask(
        "RETURN_CORRESPOND_TO_CREATED_MONTH_TASK",
        data
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthFlatlist);
