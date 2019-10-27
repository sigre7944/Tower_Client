import {connect} from 'react-redux'

import OverlayModal from './OverlayModal'

import {updateThunk} from './actions/updateThunk'

const mapStateToProps = (state) => ({
    currentDayTask: state.get("currentDayTask"),
    currentWeekTask: state.get("currentWeekTask"),
    currentMonthTask: state.get("currentMonthTask"),
})

const mapDispatchToProps = (dispatch) => ({
    updateThunk: (data) => dispatch(updateThunk(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OverlayModal)