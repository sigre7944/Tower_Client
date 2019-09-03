import {connect} from 'react-redux'

import OverlayModal from './OverlayModal'

const updateAccordingTask = (type, data) => ({
    type,
    data
})

const mapStateToProps = (state) => ({
    currentDayTask: state.currentDayTask,
    currentWeekTask: state.currentWeekTask,
    currentMonthTask: state.currentMonthTask,
})

const mapDispatchToProps = (dispatch) => ({
    updateAccordingTask: (type, data) => dispatch(updateAccordingTask(type, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverlayModal)