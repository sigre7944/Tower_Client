import React from "react";
import { DrawerActions } from "react-navigation-drawer";
import {
  TouchableOpacity,
  Text,
  View,
  Modal,
  TextInput,
  FlatList,
  Dimensions,
  Animated
} from "react-native";

import { styles } from "./styles/styles";

import { user_icon } from "../../../shared/icons";

import * as firebase from "firebase";

import { fromJS, Map } from "immutable";
import ChangePlanToPremium from "../../../shared/components/change-plan-to-premium/ChangePlanToPremium";
import ChangePlanToFree from "../../../shared/components/change-plan-to-free/ChangePlanToFree";
import axios from "axios";
import { SERVER_URL } from "../../../../config";

export default class AccountRow extends React.PureComponent {
  state = {
    is_logged_in: false,
    account_name: "",
    image: null,

    should_display_change_plan_banner: false,
    change_plan_banner: "premium"
  };

  _toggleShouldDisplayChangePlanBanner = () => {
    this.setState(prevState => ({
      should_display_change_plan_banner: !prevState.should_display_change_plan_banner
    }));
  };

  _goToSignInSignUp = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate("SignInScreen");
  };

  _goToProfileScreen = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate("Settings");
    this.props.navigation.navigate("SettingsAccountScreen");
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

  _updateAccountLogInState = (full_name, is_logged_in) => {
    this.setState({
      is_logged_in,
      account_name: full_name
    });
  };

  _shouldDisplayChangePlanBanner = new_plan => {
    let current_plan = Map(this.props.generalSettings).getIn([
      "account",
      "package",
      "plan"
    ]);

    if (current_plan !== new_plan) {
      if (new_plan === "free") {
        this.setState(prevState => ({
          should_display_change_plan_banner: !prevState.should_display_change_plan_banner,
          change_plan_banner: new_plan
        }));
      } else {
        this.setState(prevState => ({
          should_display_change_plan_banner: !prevState.should_display_change_plan_banner,
          change_plan_banner: new_plan
        }));
      }
    }
  };

  _unsuscribeToDb = uuid =>
    firebase
      .firestore()
      .collection("users")
      .doc(uuid)
      .onSnapshot(doc => {});

  _validateSubscription = async (receipt_data, uuid) => {
    try {
      let validate_sub_response = axios({
        method: "POST",
        url: SERVER_URL + "payments/?action=validateSubscription",
        data: {
          receipt_data,
          uuid
        }
      });
    } catch (err) {
      // TO DO
    }
  };

  _validateExpiryTimestamp = async uuid => {
    try {
      let validate_expiry_timestamp_response = axios({
        method: "POST",
        url: SERVER_URL + "users/?action=validateExpiryTimestamp",
        data: {
          uuid
        }
      });
    } catch (err) {
      // TO DO
    }
  };

  _validateProcess = async (receipt_data, uuid) => {
    try {
      let promises = [
        this._validateSubscription(receipt_data, uuid),
        this._validateExpiryTimestamp(uuid)
      ];

      let promises_results = await Promise.all(promises);

      alert(`${(promises_results[0], promises_results[1])}`);
    } catch (err) {
      // TO DO
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) {
          if (user.emailVerified) {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .onSnapshot(
                doc => {
                  let doc_data = doc.data();

                  if (doc_data.expiryTimestamp < Date.now()) {
                    this._validateExpiryTimestamp(doc_data.uuid)
                  }
                  // If logged in account is a paid account
                  if (doc_data.package.billed) {
                    // If its renewal timestamp is past date, we need to validate the subscription to see
                    // whether the subscriptions expires or not

                    if (doc_data.package.renewalTimestamp < Date.now()) {
                      this._validateSubscription(doc_data.iosLatestReceipt, doc_data.uuid)
                    }
                  }

                  this._shouldDisplayChangePlanBanner(doc.data().package.plan);
                  this._updateAccountRedux(doc.data(), true);
                  this._updateAccountLogInState(doc_data.fullName, true);
                },
                err => {
                  this._updateAccountRedux(
                    { package: { plan: "free" } },
                    false
                  );
                  this._updateAccountLogInState("", false);
                }
              );
          } else {
            firebase
              .auth()
              .signOut()
              .then(() => {
                this._unsuscribeToDb(user.uid);
                this._updateAccountRedux({ package: { plan: "free" } }, false);
                this._updateAccountLogInState("", false);
              })
              .catch(err => {
                this._updateAccountRedux({ package: { plan: "free" } }, false);
                this._updateAccountLogInState("", false);
              });
          }
        } else {
          this._updateAccountRedux({ package: { plan: "free" } }, false);
          this._updateAccountLogInState("", false);
        }
      },
      err => {
        this._updateAccountRedux({ package: { plan: "free" } }, false);
        this._updateAccountLogInState("", false);
      }
    );
  }

  render() {
    return (
      <>
        {!this.state.is_logged_in ? (
          <TouchableOpacity
            style={{
              marginTop: 45,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 22
            }}
            onPress={this._goToSignInSignUp}
          >
            <View
              style={{
                width: 34,
                height: 34,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 17,
                backgroundColor: "white"
              }}
            >
              {user_icon(26, "#05838B")}
            </View>

            <View
              style={{
                marginLeft: 16
              }}
            >
              <Text style={styles.sign_in_sign_up_text}>
                Sign in or Sign up
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              marginTop: 45,
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 22
            }}
            onPress={this._goToProfileScreen}
          >
            <View
              style={{
                width: 34,
                height: 34,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 17,
                backgroundColor: "white"
              }}
            >
              {user_icon(26, "#05838B")}
            </View>

            <View
              style={{
                marginLeft: 16
              }}
            >
              <Text style={styles.email_text}>{this.state.account_name}</Text>
            </View>
          </TouchableOpacity>
        )}

        {this.state.should_display_change_plan_banner ? (
          <>
            {this.state.change_plan_banner === "free" ? (
              <ChangePlanToFree
                dismissAction={this._toggleShouldDisplayChangePlanBanner}
              />
            ) : (
              <ChangePlanToPremium
                dismissAction={this._toggleShouldDisplayChangePlanBanner}
              />
            )}
          </>
        ) : null}
      </>
    );
  }
}
