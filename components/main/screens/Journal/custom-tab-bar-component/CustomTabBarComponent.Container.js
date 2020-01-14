import { connect } from "react-redux";
import {
  updateCurrentChosenJournalType,
  changeRouteAction,
  updateCurrentJournalTab
} from "../../../../shared/actions/otherAction";
import CustomTabBarComponent from "./CustomTabBarComponent";

const mapStateToProps = (state, ownProps) => ({
  taskTypeCreated: state["taskTypeCreated"]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCurrentChosenJournalType: data =>
    dispatch(updateCurrentChosenJournalType(data)),
  changeRouteAction: routeName => dispatch(changeRouteAction(routeName)),
  updateCurrentJournalTab: data => dispatch(updateCurrentJournalTab(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBarComponent);
