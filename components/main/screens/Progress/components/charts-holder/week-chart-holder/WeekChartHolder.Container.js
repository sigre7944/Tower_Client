import { connect } from 'react-redux'
import WeekChartHolder from './WeekChartHolder'

const mapStateToProps = (state) => ({
    week_chart_stats: state["week_chart_stats"],
    generalSettings: state["generalSettings"]
})

export default connect(
    mapStateToProps,
    null
)(WeekChartHolder)