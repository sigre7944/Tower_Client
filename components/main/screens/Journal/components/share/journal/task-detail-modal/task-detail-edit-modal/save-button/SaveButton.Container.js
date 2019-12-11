import { connect } from 'react-redux'

import { updateEditedTask } from './actions/updateThunk'
import SaveButton from './SaveButton'

const mapStateToProps = (state, ownProps) => ({
    categories: state["categories"],
    priorities: state["priorities"],
    completed_day_tasks: state["completed_day_tasks"],
    completed_week_tasks: state["completed_week_tasks"],
    completed_month_tasks: state["completed_month_tasks"],
    day_chart_stats: state["day_chart_stats"],
    week_chart_stats: state["week_chart_stats"],
    month_chart_stats: state["month_chart_stats"],
    year_chart_stats: state["year_chart_stats"],
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateEditedTask: (data) => dispatch(updateEditedTask(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveButton)