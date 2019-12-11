import {connect} from 'react-redux'

import RepeatValueHolder from './RepeatValueHolder'

const mapStateToProps = (state) => ({
    currentMonthTask: state["currentMonthTask"],
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepeatValueHolder)