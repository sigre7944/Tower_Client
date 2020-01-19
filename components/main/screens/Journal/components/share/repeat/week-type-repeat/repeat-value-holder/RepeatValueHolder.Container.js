import {connect} from 'react-redux'

import RepeatValueHolder from './RepeatValueHolder'

const mapStateToProps = (state) => ({
    currentWeekTask: state["currentWeekTask"],
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepeatValueHolder)