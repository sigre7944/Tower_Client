import { connect } from 'react-redux'
import { updateCurrency } from "./actions/updateCurrency";
import CurrencySetting from './CurrencySetting'

const mapStateToProps = (state) => ({
    generalSettings: state["generalSettings"],
    balance: state["balance"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateLatestCurrencyExchangeRatesAsync: () => dispatch({ type: "UPDATE_CURRENCY_EXCHANGE_RATES_ASYNC" }),
    updateCurrency: (data) => dispatch(updateCurrency(data))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencySetting)