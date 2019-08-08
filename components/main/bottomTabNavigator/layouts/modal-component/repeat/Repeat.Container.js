import {connect} from 'react-redux'
import Repeat from './Repeat'
import {updateRepetition} from './actions/updateRepetition'
import {updateEnd} from './actions/updateEnd'

const mapStateToProps = (state) => ({
    currentWeekInMonth: state.currentWeekInMonth,
    currentDayTask: state.currentDayTask,
    currentWeekTask: state.currentWeekTask,
    currentMonthTask: state.currentMonthTask,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateRepetition: (type, data) => dispatch(updateRepetition(type, data)),
    updateEnd: (type, data) => dispatch(updateEnd(type, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Repeat)