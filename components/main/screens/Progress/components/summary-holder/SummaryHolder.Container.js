import { connect } from 'react-redux'
import SummaryHolder from './SummaryHolder'

const mapStateToProps = (state) => ({
    month_chart_stats: state["month_chart_stats"],
})

export default connect(
    mapStateToProps,
    null
)(SummaryHolder)