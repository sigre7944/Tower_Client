import { connect } from 'react-redux'
import WeekChartHolder from './WeekChartHolder'

const mapStateToProps = (state) => ({
    week_chart_stats: state.get("week_chart_stats"),
})

export default connect(
    mapStateToProps,
    null
)(WeekChartHolder)