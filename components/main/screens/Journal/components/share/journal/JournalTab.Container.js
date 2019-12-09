import { connect } from "react-redux";
import {
  changeRouteAction,
  returnNewChosenDateData
} from "../../../../../../shared/actions/otherAction";
import JournalTab from "./JournalTab";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.type === "day") {
    return {
      routeName: state["currentRoute"],
      tasks: state["day_tasks"],
      categories: state["categories"],
      priorities: state["priorities"],
      completed_tasks: state["completed_day_tasks"],
      current_chosen_category: state["currentChosenCategory"],
      deleted_tasks: state["deleted_day_tasks"],
      sortSettings: state["sortSettings"],
      generalSettings: state["generalSettings"]
    };
  } else if (ownProps.type === "week") {
    return {
      routeName: state["currentRoute"],
      tasks: state["week_tasks"],
      categories: state["categories"],
      priorities: state["priorities"],
      completed_tasks: state["completed_week_tasks"],
      current_chosen_category: state["currentChosenCategory"],
      deleted_tasks: state["deleted_week_tasks"],
      sortSettings: state["sortSettings"],
      generalSettings: state["generalSettings"]
    };
  }

  return {
    routeName: state["currentRoute"],
    tasks: state["month_tasks"],
    categories: state["categories"],
    priorities: state["priorities"],
    completed_tasks: state["completed_month_tasks"],
    current_chosen_category: state["currentChosenCategory"],
    deleted_tasks: state["deleted_month_tasks"],
    sortSettings: state["sortSettings"],
    generalSettings: state["generalSettings"]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeRouteAction: routeName => dispatch(changeRouteAction(routeName)),
  returnNewChosenDateData: (type, data) =>
    dispatch(returnNewChosenDateData(type, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalTab);
