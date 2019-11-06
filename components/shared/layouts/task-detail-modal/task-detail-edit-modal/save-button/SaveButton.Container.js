import { connect } from 'react-redux'

import { updateEditedTask } from './actions/updateThunk'
import SaveButton from './SaveButton'

const mapStateToProps = (state, ownProps) => ({
    categories: state.get("categories"),
    priorities: state.get("priorities"),
    day_stats: state.get("day_stats"),
    week_stats: state.get("week_stats"),
    month_stats: state.get("month_stats"),
    completed_day_tasks: state.get("completed_day_tasks"),
    completed_week_tasks: state.get("completed_week_tasks"),
    completed_month_tasks: state.get("completed_month_tasks"),
    week_chart_stats: state.get("week_chart_stats"),
    month_chart_stats: state.get("month_chart_stats"),
    year_chart_stats: state.get("year_chart_stats"),
})


const mapDispatchToProps = (dispatch, ownProps) => ({
    updateEditedTask: (data) => dispatch(updateEditedTask(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SaveButton)