import {connect} from 'react-redux'
import Repeat from './Repeat'

const mapStateToProps = (state) => ({
    currentWeekInMonth: state.currentWeekInMonth
})

export default connect(
    mapStateToProps,
    null
)(Repeat)