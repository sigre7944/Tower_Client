import {connect} from 'react-redux'
import Repeat from './Repeat'
import {updateRepetition} from './actions/updateRepetition'
import {updateEnd} from './actions/updateEnd'

const mapStateToProps = (state) => ({
    currentWeekInMonth: state.currentWeekInMonth,
    currentTask: state.currentTask
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateRepetition: (data) => dispatch(updateRepetition(data)),
    updateEnd: (data) => dispatch(updateEnd(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Repeat)