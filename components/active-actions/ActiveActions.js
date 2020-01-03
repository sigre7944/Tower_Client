import React from "react";
import { AppState } from "react-native";
import BetaWelcome from "./components/beta-welcome/BetaWelcome.Container";
import * as firebase from "firebase";
import { Map, fromJS } from "immutable";
import axios from "axios";
import { SERVER_URL } from "../../config";

export default class ActiveActions extends React.PureComponent {
  state = {
    appState: AppState.currentState
  };

  _updateAccountRedux = (data, is_logged_in) => {
    let sending_data = {
      ...data,
      ...{ isLoggedIn: is_logged_in }
    };

    this.props.updateGeneralSettings(["account"], {}, value =>
      fromJS(sending_data)
    );
  };

  _validateSubscription = (receipt_data, uuid) => {
    return axios({
      method: "POST",
      url: SERVER_URL + "payments/?action=validateSubscription",
      data: {
        receipt_data,
        uuid
      }
    });
  };

  _validateExpiryTimestamp = uuid => {
    return axios({
      method: "POST",
      url: SERVER_URL + "users/?action=validateExpiryTimestamp",
      data: {
        uuid
      }
    });
  };

  _checkAndUpdateCurrentUserAccount = async () => {
    let account = Map(this.props.generalSettings).get("account"),
      is_logged_in = Map(account).get("isLoggedIn");

    try {
      // If there is current logged in user, we do validations on subscription and expiry timestamp
      if (is_logged_in) {
        let billed = Map(account).getIn(["package", "billed"]),
          uuid = Map(account).get("uuid"),
          expiry_timestamp = Map(account).get("expiryTimestamp");

        // If expiry timestamp is past date, we have to validate with server
        if (expiry_timestamp < Date.now()) {
          let validate_expiry_timestamp_response = await this._validateExpiryTimestamp(
            uuid
          );
        }

        // If paid account, we validate its subscription
        if (billed) {
          let receipt_data = Map(account).get("iosLatestReceipt");

          let validate_sub_response = await this._validateSubscription(
            receipt_data,
            uuid
          );
        }

        let get_user_doc = await firebase
          .firestore()
          .collection("users")
          .doc(uuid)
          .get();

        this._updateAccountRedux(get_user_doc.data(), true);
      } else {
        let sign_out_response = await firebase.auth().signOut();
        this._updateAccountRedux({ package: { plan: "free" } }, false);
      }
    } catch (err) {
      // let sign_out_response = await firebase.auth().signOut();
      this._updateAccountRedux({ package: { plan: "free" } }, false);
    }
  };

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // Update latest active timestamp
      this.props.updateGeneralSettings(
        ["active_info", "latest_timestamp"],
        Date.now(),
        v => Date.now()
      );
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    // initially check and update current user account
    this._checkAndUpdateCurrentUserAccount();

    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  render() {
    return (
      <>
        <BetaWelcome />
      </>
    );
  }
}
