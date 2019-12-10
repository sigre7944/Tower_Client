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

import { fromJS } from "immutable";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default class AccountRow extends React.PureComponent {
  state = {
    is_logged_in: false,
    account_email: "",

    image: null
  };

  _goToSignInSignUp = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate("SignInScreen");
  };

  _goToProfileScreen = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
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

  _updateAccountLogInState = (email, is_logged_in) => {
    let email_name = String(email).substring(0, String(email).indexOf("@"));

    if (email_name.length > 24) {
      email_name = email_name.substring(0, 24) + "...";
    }

    this.setState({
      is_logged_in: true,
      account_email: email_name
    });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          try {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .onSnapshot(doc => {
                this._updateAccountRedux(doc.data(), true);
                this._updateAccountLogInState(user.email, false);
              });
          } catch (err) {}
        } else {
          firebase
            .auth()
            .signOut()
            .then(() => {
              this._updateAccountRedux({ package: { plan: "free" } }, false);
              this._updateAccountLogInState("", false);
            })
            .catch(err => {
              // TO DO
            });
        }
      } else {
        let sending_data = {
          isLoggedIn: false,
          package: {
            plan: "free"
          }
        };
        this.props.updateGeneralSettings(["account"], {}, value =>
          fromJS(sending_data)
        );
        this.setState({
          is_logged_in: false
        });
      }
    });
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
              <Text style={styles.email_text}>{this.state.account_email}</Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  }
}
