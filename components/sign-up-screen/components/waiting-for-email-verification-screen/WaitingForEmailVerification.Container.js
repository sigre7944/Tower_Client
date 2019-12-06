import { connect } from "react-redux";
import WaitingForEmailVerification from "./WaitingForEmailVerification";

const mapStateToProps = (state, ownProps) => {
  return {
    generalSettings: state["generalSettings"]
  };
};

export default connect(mapStateToProps, null)(WaitingForEmailVerification);
