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
import axios from "axios";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { SERVER_URL } from "../../../../config";

export default class Drawer extends React.PureComponent {
  _goToSignInSignUp = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate("SignInSignUp");
  };

  _registerForPushNotifications = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return axios({
      method: "POST",
      url: SERVER_URL + "notifications",
      body: {
        token: {
          value: token
        }
      }
    });
  };

  componentDidMount() {
    // this._registerForPushNotifications()
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

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
              let sending_data = { ...response.data(), ...{ uuid: user.uid } };
              this.props.updateGeneralSettings(["account"], {}, value =>
                fromJS(sending_data)
              );
            })
            .catch(err => {
              // TO DO
            });
        } else {
          firebase
            .auth()
            .signOut()
            .then(() => {
              console.log("sign out");
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

        <Text style={styles.sign_in_sign_up_text}>Sign in or Sign up</Text>
      </TouchableOpacity>
    );
  }
}
