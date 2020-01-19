import { connect } from "react-redux";
import Daily from "./Daily";
import { updateGeneralSettings } from "../../../../../shared/actions/otherAction";
const mapDispatchToProps = (dispatch, ownProps) => ({
  updateGeneralSettings: (keyPath, notSetValue, updater) =>
    dispatch(updateGeneralSettings(keyPath, notSetValue, updater))
});
export default connect(null, mapDispatchToProps)(Daily);
