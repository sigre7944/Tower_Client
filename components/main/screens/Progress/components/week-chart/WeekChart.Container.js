import {connect} from 'react-redux'
import WeekChart from './WeekChart'

const mapStateToProps = (state) => ({
    week_chart_stats: state.week_chart_stats,
})

export default connect(
    mapStateToProps,
    null
)(WeekChart)