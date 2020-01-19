import { connect } from "react-redux";
import { updateGeneralSettings } from "../shared/actions/otherAction";
import ActiveActions from "./ActiveActions";

const mapStateToProps = state => ({
  generalSettings: state["generalSettings"]
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateGeneralSettings: (keyPath, notSetValue, updater) =>
    dispatch(updateGeneralSettings(keyPath, notSetValue, updater))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveActions);
