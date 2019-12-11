import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  Picker
} from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles/styles";

import { Map } from "immutable";

const window_width = Dimensions.get("window").width;

export default class Settings extends React.PureComponent {
  state = {
  };

  _goToAccountScreen = () => {
    this.props.navigation.navigate("SettingsAccountScreen");
  };

  _goToSignInSignUp = () => {
    this.props.navigation.navigate("SignInScreen");
  };

  render() {
    let is_logged_in = Map(this.props.generalSettings).getIn([
      "account",
      "isLoggedIn"
    ]);

    let full_name = Map(this.props.generalSettings).getIn(["account", "fullName"]);

    return (
      <>
        {is_logged_in ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 92,
              width: window_width,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 22,
              paddingVertical: 22,
              marginTop: 20,
              shadowOffset: {
                width: 4,
                height: 4
              },
              shadowRadius: 15,
              shadowColor: "rgb(0, 0, 0)",
              shadowOpacity: 0.08,
              backgroundColor: "white"
            }}
            onPress={this._goToAccountScreen}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.user_icon_container}>
                <MaterialCommunityIcons
                  name="account"
                  color="white"
                  size={30}
                />
              </View>

              <View
                style={{
                  marginLeft: 15
                }}
              >
                <Text style={styles.normal_text}>{full_name}</Text>
              </View>
            </View>

            <Feather name="chevron-right" size={21} color="#6E6E6E" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 92,
              width: window_width,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 22,
              paddingVertical: 22,
              marginTop: 20,
              shadowOffset: {
                width: 4,
                height: 4
              },
              shadowRadius: 15,
              shadowColor: "rgb(0, 0, 0)",
              shadowOpacity: 0.08,
              backgroundColor: "white"
            }}
            onPress={this._goToSignInSignUp}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={styles.user_icon_container}>
                <MaterialCommunityIcons
                  name="account"
                  color="white"
                  size={30}
                />
              </View>

              <View
                style={{
                  marginLeft: 15
                }}
              >
                <Text style={styles.normal_text}>Sign in or Sign up</Text>
              </View>
            </View>

            <Feather name="chevron-right" size={21} color="#6E6E6E" />
          </TouchableOpacity>
        )}
      </>
    );
  }
}
