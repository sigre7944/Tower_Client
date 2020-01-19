import {connect} from 'react-redux'

import WeekTypeRepeat from './MonthTypeRepeat'
import {updateThunk} from './actions/updateThunk'

const mapStateToProps = (state) => ({
    currentTask: state["currentMonthTask"],
})

const mapDispatchToProps = (dispatch) => ({
    updateThunk: (data) => dispatch(updateThunk(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeekTypeRepeat)