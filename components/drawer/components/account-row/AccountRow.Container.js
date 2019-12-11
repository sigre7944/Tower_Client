import { connect } from "react-redux";
import { updateGeneralSettings } from "../../../shared/actions/otherAction";
import AccountRow from "./AccountRow";

const mapStateToProps = (state, ownProps) => {
  return {
    generalSettings: state["generalSettings"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateGeneralSettings: (keyPath, notSetValue, updater) =>
    dispatch(updateGeneralSettings(keyPath, notSetValue, updater))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountRow);
