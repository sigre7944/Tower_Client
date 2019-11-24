import {connect} from 'react-redux'

import OverlayModal from './OverlayModal'

import {updateThunk} from './actions/updateThunk'

const mapStateToProps = (state) => ({
    currentDayTask: state["currentDayTask"],
    currentWeekTask: state["currentWeekTask"],
    currentMonthTask: state["currentMonthTask"],
})

const mapDispatchToProps = (dispatch) => ({
    updateThunk: (data) => dispatch(updateThunk(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverlayModal)