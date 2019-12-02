import { connect } from 'react-redux'
import { updateGeneralSettings } from '../../../../../shared/actions/otherAction'
import { getUpdateCurrencyExchangeRate } from "./actions/updateCurrency";
import CurrencySetting from './CurrencySetting'

const mapStateToProps = (state) => ({
    generalSettings: state["generalSettings"]
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    updateGeneralSettings: (keyPath, notSetValue, updater) => dispatch(updateGeneralSettings(keyPath, notSetValue, updater)),
    updateCurrencyExchangeRatesAsync: () => dispatch({ type: "UPDATE_CURRENCY_EXCHANGE_RATES_ASYNC" })
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrencySetting)