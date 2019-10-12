import {connect} from 'react-redux'
import PurchaseDate from './PurchaseDate'

const mapStateToProps = (state) => ({
    rewards: state.get("rewards")
})

export default connect(
    mapStateToProps,
    null
)(PurchaseDate)