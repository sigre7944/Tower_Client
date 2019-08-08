import {connect} from 'react-redux'
import Priority from './Priority'
import {updatePriority} from './actions/updatePriority'

const mapStateToProps = (state) => ({
    priorities: state.priorities,
    currentDayTask: state.currentDayTask,
    currentWeekTask: state.currentWeekTask,
    currentMonthTask: state.currentMonthTask,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updatePriority: (type, data) => dispatch(updatePriority(type, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Priority)