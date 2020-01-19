import {connect} from 'react-redux'

import DayTypeRepeat from './DayTypeRepeat'
import {updateThunk} from './actions/updateThunk'

const mapStateToProps = (state) => ({
    currentTask: state["currentDayTask"],
})

const mapDispatchToProps = (dispatch) => ({
    updateThunk: (data) => dispatch(updateThunk(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DayTypeRepeat)