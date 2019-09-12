import {connect} from 'react-redux'
import MonthChart from './MonthChart'

const mapStateToProps = (state) => ({
    month_chart_stats: state.month_chart_stats,
})

export default connect(
    mapStateToProps,
    null
)(MonthChart)