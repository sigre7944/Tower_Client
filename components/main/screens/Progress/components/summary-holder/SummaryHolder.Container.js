import { connect } from 'react-redux'
import SummaryHolder from './SummaryHolder'

const mapStateToProps = (state) => ({
    day_chart_stats: state.get("day_chart_stats"),
    week_chart_stats: state.get("week_chart_stats"),
    month_chart_stats: state.get("month_chart_stats"),
    year_chart_stats: state.get("year_chart_stats"),
})

export default connect(
    mapStateToProps,
    null
)(SummaryHolder)