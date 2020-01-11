import { connect } from "react-redux";
import { updateHeaderText } from "../../../../../../../shared/actions/otherAction";
import MonthFlatlist from "./MonthFlatlist";

const mapStateToProps = (state, ownProps) => {
  return {
    headerPressed: state["headerPressed"],
    currentRoute: state["currentRoute"],
    correspondToCreatedMonthTask: state["correspondToCreatedMonthTask"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateHeaderText: data => dispatch(updateHeaderText(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthFlatlist);
