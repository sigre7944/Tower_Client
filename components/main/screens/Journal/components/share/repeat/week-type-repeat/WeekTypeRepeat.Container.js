import {connect} from 'react-redux'

import WeekTypeRepeat from './WeekTypeRepeat'
import {updateThunk} from './actions/updateThunk'

const mapStateToProps = (state) => ({
    currentTask: state["currentWeekTask"],
})

const mapDispatchToProps = (dispatch) => ({
    updateThunk: (data) => dispatch(updateThunk(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeekTypeRepeat)