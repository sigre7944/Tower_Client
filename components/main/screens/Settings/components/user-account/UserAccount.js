import React from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "./styles/styles";
import { normalize } from "../../../../../shared/helpers";
import { Map } from "immutable";

const window_width = Dimensions.get("window").width;

export default class Settings extends React.PureComponent {
  state = {};

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

    let full_name = Map(this.props.generalSettings).getIn([
      "account",
      "fullName"
    ]);

    let account_avatar = Map(this.props.generalSettings).getIn([
      "account",
      "avatarUrl"
    ]);
    return (
      <>
        {is_logged_in ? (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: normalize(92, "height"),
              width: window_width,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: normalize(22, "width"),
              paddingVertical: normalize(22, "height"),
              marginTop: normalize(20, "height"),
              shadowOffset: {
                width: 4,
                height: 4
              },
              shadowRadius: 15,
              shadowColor: "rgb(0, 0, 0)",
              shadowOpacity: 0.08,
              elevation: 8,
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
              {account_avatar ? (
                <View
                  style={{
                    width: normalize(48, "width"),
                    height: normalize(48, "width"),
                    borderRadius: normalize(48, "width"),
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={{
                      uri: account_avatar
                    }}
                    style={{
                      width: normalize(48, "width"),
                      height: normalize(48, "width"),
                      borderRadius: normalize(48 / 2, "width")
                    }}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View style={styles.user_icon_container}>
                  <MaterialCommunityIcons
                    name="account"
                    color="white"
                    size={normalize(30, "width")}
                  />
                </View>
              )}

              <View
                style={{
                  marginLeft: normalize(15, "width")
                }}
              >
                <Text style={styles.normal_text}>{full_name}</Text>
              </View>
            </View>

            <Feather
              name="chevron-right"
              size={normalize(21, "width")}
              color="#6E6E6E"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: normalize(92, "height"),
              width: window_width,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: normalize(22, "width"),
              paddingVertical: normalize(22, "height"),
              marginTop: normalize(20, "height"),
              shadowOffset: {
                width: 4,
                height: 4
              },
              shadowRadius: 15,
              shadowColor: "rgb(0, 0, 0)",
              shadowOpacity: 0.08,
              elevation: 4,
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
                  size={normalize(30, "width")}
                />
              </View>

              <View
                style={{
                  marginLeft: normalize(15, "width")
                }}
              >
                <Text style={styles.normal_text}>Sign in or Sign up</Text>
              </View>
            </View>

            <Feather
              name="chevron-right"
              size={normalize(21, "width")}
              color="#6E6E6E"
            />
          </TouchableOpacity>
        )}
      </>
    );
  }
}
