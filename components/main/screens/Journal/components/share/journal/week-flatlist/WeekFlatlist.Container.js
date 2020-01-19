import { connect } from "react-redux";
import {
  updateHeaderText,
  returnCorrespondCreatedTask
} from "../../../../../../../shared/actions/otherAction";
import WeekFlatlist from "./WeekFlatlist";

const mapStateToProps = (state, ownProps) => {
  return {
    headerPressed: state["headerPressed"],
    currentJournalTab: state["currentJournalTab"],
    correspondToCreatedWeekTask: state["correspondToCreatedWeekTask"],
    chosenDateData: state["chosenWeekDateData"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateHeaderText: data => dispatch(updateHeaderText(data)),
  returnCorrespondCreatedTask: data =>
    dispatch(
      returnCorrespondCreatedTask(
        "RETURN_CORRESPOND_TO_CREATED_WEEK_TASK",
        data
      )
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekFlatlist);
