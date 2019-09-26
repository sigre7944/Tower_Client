import {connect} from 'react-redux'

import OverlayModal from './OverlayModal'

const updateAccordingTask = (type, data) => ({
    type,
    data
})

const mapStateToProps = (state) => ({
    currentDayTask: state.get("currentDayTask"),
    currentWeekTask: state.get("currentWeekTask"),
    currentMonthTask: state.get("currentMonthTask"),
})

const mapDispatchToProps = (dispatch) => ({
    updateAccordingTask: (type, data) => dispatch(updateAccordingTask(type, data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverlayModal)