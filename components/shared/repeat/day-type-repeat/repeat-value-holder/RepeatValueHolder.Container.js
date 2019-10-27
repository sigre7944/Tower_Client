import {connect} from 'react-redux'

import RepeatValueHolder from './RepeatValueHolder'

const mapStateToProps = (state) => ({
    currentDayTask: state.get("currentDayTask"),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepeatValueHolder)