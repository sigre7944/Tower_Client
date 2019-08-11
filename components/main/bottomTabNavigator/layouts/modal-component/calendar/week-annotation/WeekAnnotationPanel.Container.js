import {connect} from 'react-redux'
import {updateCurrentWeekInMonth} from './actions/updateCurrentWeekInMonth'
import {updateStartingDate} from './actions/updateStartingDate'
import WeekAnnotationPanel from './WeekAnnotationPanel'

const mapStateToProps = (state) => ({
    currentWeekTask: state.currentWeekTask,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCurrentWeekInMonth: (week_data) => dispatch(updateCurrentWeekInMonth(week_data)),
    updateStartingDate: (data) => dispatch(updateStartingDate(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeekAnnotationPanel)