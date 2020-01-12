import { connect } from "react-redux";
import {
  updateCurrentChosenJournalType,
  changeRouteAction,
  updateCurrentJournalTab
} from "../../../../shared/actions/otherAction";
import CustomTabBarComponent from "./CustomTabBarComponent";

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCurrentChosenJournalType: data =>
    dispatch(updateCurrentChosenJournalType(data)),
  changeRouteAction: routeName => dispatch(changeRouteAction(routeName)),
  updateCurrentJournalTab: data => dispatch(updateCurrentJournalTab(data))
});

export default connect(null, mapDispatchToProps)(CustomTabBarComponent);
