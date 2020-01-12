import { connect } from "react-redux";
import {
  updateCurrentChosenJournalType,
  changeRouteAction
} from "../../../../shared/actions/otherAction";
import CustomTabBarComponent from "./CustomTabBarComponent";

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateCurrentChosenJournalType: data =>
    dispatch(updateCurrentChosenJournalType(data)),
  changeRouteAction: routeName => dispatch(changeRouteAction(routeName))
});

export default connect(null, mapDispatchToProps)(CustomTabBarComponent);
