import {connect} from 'react-redux'
import Goal from './Goal'
import {updateGoal} from './actions/updateGoal'

const mapStateToProps = (state) => ({
    currentDayTask: state.currentDayTask,
    currentWeekTask: state.currentWeekTask,
    currentMonthTask: state.currentMonthTask,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateGoal: (type, data) => dispatch(updateGoal(type, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Goal)