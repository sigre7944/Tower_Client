import {connect} from 'react-redux'
import {updateCurrentWeekInMonth} from './actions/updateCurrentWeekInMonth'
import WeekAnnotationPanel from './WeekAnnotationPanel'

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateCurrentWeekInMonth: (week_data) => dispatch(updateCurrentWeekInMonth(week_data))
})

export default connect(
    null,
    mapDispatchToProps
)(WeekAnnotationPanel)