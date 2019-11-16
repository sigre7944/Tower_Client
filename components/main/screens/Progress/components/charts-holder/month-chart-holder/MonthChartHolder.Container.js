import { connect } from 'react-redux'
import MonthChartHolder from './MonthChartHolder'

const mapStateToProps = (state) => ({
    month_chart_stats: state.get("month_chart_stats"),
})

export default connect(
    mapStateToProps,
    null
)(MonthChartHolder)