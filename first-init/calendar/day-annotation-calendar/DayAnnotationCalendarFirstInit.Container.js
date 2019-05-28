import {connect} from 'react-redux'
import {updateMonthComponentArr} from './actions/updateMonthComponentArr'

import DayAnnotationCalendarFirstInit from './DayAnnotationCalendarFirstInit.Presentational'

const mapStateToProps = (state) => ({
    monthComponent_arr: state.monthComponent_arr
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateMonthComponentArr : (monthComponent_arr) => dispatch(updateMonthComponentArr(monthComponent_arr))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DayAnnotationCalendarFirstInit)