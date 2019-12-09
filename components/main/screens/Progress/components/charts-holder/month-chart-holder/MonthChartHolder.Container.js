import { connect } from 'react-redux'
import MonthChartHolder from './MonthChartHolder'

const mapStateToProps = (state) => ({
    month_chart_stats: state["month_chart_stats"],
    generalSettings: state["generalSettings"]
})

export default connect(
    mapStateToProps,
    null
)(MonthChartHolder)