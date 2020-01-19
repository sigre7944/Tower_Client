import { connect } from "react-redux";
import {
  updateHeaderText,
  returnCorrespondCreatedTask
} from "../../../../../../../shared/actions/otherAction";
import DayFlatlist from "./DayFlatlist";

const mapStateToProps = (state, ownProps) => {
  return {
    headerPressed: state["headerPressed"],
    currentJournalTab: state["currentJournalTab"],
    correspondToCreatedDayTask: state["correspondToCreatedDayTask"],
    chosenDateData: state["chosenDayDateData"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateHeaderText: data => dispatch(updateHeaderText(data)),
  returnCorrespondCreatedTask: data =>
    dispatch(
      returnCorrespondCreatedTask("RETURN_CORRESPOND_TO_CREATED_DAY_TASK", data)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(DayFlatlist);
