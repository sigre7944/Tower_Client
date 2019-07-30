import {connect} from 'react-redux'
import MonthAnnotationPanel from './MonthAnnotationPanel'
import {updateStartingDate} from './actions/updateStartingDate'

const mapStateToProps = (state) => ({
    currentTask: state.currentTask
})

const maptDispatchToProps = (dispatch, ownProps) => ({
    updateStartingDate: (data) => dispatch(updateStartingDate(data))
}) 

export default connect(
    mapStateToProps,
    maptDispatchToProps
)(MonthAnnotationPanel)