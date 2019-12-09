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
  Animated,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { styles } from "./styles/styles";

import { user_icon, plus_icon } from "../../../shared/icons";

import * as firebase from "firebase";

import { fromJS } from "immutable";
import axios from "axios";
import { Notifications } from "expo";
import { SERVER_URL } from "../../../../config";

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

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let permission = await this.getPermissionAsync();

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (err) {}
  };

  componentDidMount() {
    Notifications.addListener(event_subscription => {
      console.log(event_subscription);
    });

    // Notifications.scheduleLocalNotificationAsync(
    //   {
    //     title: "Title of local noti",
    //     body: "Body of local noti",
    //     data: {
    //       test: "test"
    //     }
    //   },
    //   {
    //     time: new Date().getTime() + 10000,
    //     repeat: "minute"
    //   }
    // )
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    Notifications.cancelAllScheduledNotificationsAsync()
      .then(response => {
        // console.log(response)
      })
      .catch(err => console.log(err));

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then(response => {
              let sending_data = {
                ...response.data(),
                ...{ isLoggedIn: true }
              };
              this.props.updateGeneralSettings(["account"], {}, value =>
                fromJS(sending_data)
              );
              let email = response.data().email;
              let email_name = String(email).substring(
                0,
                String(email).indexOf("@")
              );

              if (email_name.length > 24) {
                email_name = email_name.substring(0, 24) + "...";
              }

              this.setState({
                is_logged_in: true,
                account_email: email_name
              });
            })
            .catch(err => {
              // TO DO
            });
        } else {
          firebase
            .auth()
            .signOut()
            .then(() => {
              let sending_data = {
                isLoggedIn: false,
                plan: "free"
              };
              this.props.updateGeneralSettings(["account"], {}, value =>
                fromJS(sending_data)
              );
              this.setState({
                is_logged_in: false
              });
            })
            .catch(err => {
              // TO DO
            });
        }
      } else {
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
