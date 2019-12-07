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

export default class Drawer extends React.PureComponent {
  _goToSignInSignUp = () => {
    this.props.navigation.dispatch(DrawerActions.closeDrawer());
    this.props.navigation.navigate("SignInSignUp");
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.emailVerified) {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then(response => {
              console.log(response.data());
            })
            .catch(err => {
              console.log(err);
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
