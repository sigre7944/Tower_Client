import {connect} from 'react-redux'

import RepeatValueHolder from './RepeatValueHolder'

const mapStateToProps = (state) => ({
    currentDayTask: state["currentDayTask"],
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepeatValueHolder)