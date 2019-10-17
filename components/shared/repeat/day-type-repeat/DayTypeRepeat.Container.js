import {connect} from 'react-redux'

import DayTypeRepeat from './DayTypeRepeat'

const mapStateToProps = (state) => ({
    currentDayTask: state.get("currentDayTask"),
})

const mapDispatchToProps = (dispatch) => ({
    updateThunk: (data) => dispatch(updateThunk(data)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DayTypeRepeat)