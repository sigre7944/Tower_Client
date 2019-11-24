import { connect } from 'react-redux'
import ChartsHolder from './ChartsHolder'

const mapStateToProps = (state) => ({
    day_chart_stats: state["day_chart_stats"],
    week_chart_stats: state["week_chart_stats"],
    month_chart_stats: state["month_chart_stats"],
    year_chart_stats: state["year_chart_stats"],
})

export default connect(
    mapStateToProps,
    null
)(ChartsHolder)