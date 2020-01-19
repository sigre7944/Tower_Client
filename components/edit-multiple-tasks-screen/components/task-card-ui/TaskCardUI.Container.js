import { connect } from "react-redux";
import TaskCardUI from "./TaskCardUI";

const mapStateToProps = state => {
  return {
    generalSettings: state["generalSettings"],
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCardUI);
