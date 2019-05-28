import {connect} from 'react-redux'

import DayAnnotationPanel from './DayAnnotationPanel.Presentational'

const mapStateToProps = (state) => ({
    monthComponent_arr: state.monthComponent_arr
})

export default connect(
    mapStateToProps,
    null
)(DayAnnotationPanel)