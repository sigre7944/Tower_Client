import { connect } from 'react-redux'
import YearChartHolder from './YearChartHolder'

const mapStateToProps = (state) => ({
    year_chart_stats: state.get("year_chart_stats"),
})

export default connect(
    mapStateToProps,
    null
)(YearChartHolder)