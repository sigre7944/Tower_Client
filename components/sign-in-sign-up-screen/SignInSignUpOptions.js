import React from "react";
import { DrawerActions } from "react-navigation-drawer";
import { TouchableOpacity, Text, View, Image } from "react-native";

import { styles } from "./styles/styles";

import { left_arrow_icon } from "../shared/icons";
import { normalize } from "../shared/helpers";
const icon_size = normalize(39, "width");
const icon_color = "#BDBDBD";
const logo_image = require("../../assets/pngs/logo.png");

export default class SignInSignUpOptions extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: null
    };
  };

  _goBack = () => {
    this.props.navigation.navigate("Journal");
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  _goToSignInScreen = () => {
    this.props.navigation.navigate("SignInScreen");
  };

  _goToSignUpScreen = () => {
    this.props.navigation.navigate("SignUpScreen");
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            marginHorizontal: normalize(32, "width"),
            marginTop: normalize(45, "height")
          }}
        >
          <TouchableOpacity
            style={{
              width: icon_size
            }}
            onPress={this._goBack}
          >
            {left_arrow_icon(icon_size, icon_color)}
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: normalize(42, "height")
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: normalize(150, "width"),
              height: normalize(150, "width")
            }}
          >
            <Image
              source={logo_image}
              style={{
                flex: 1
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(97, "height")
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.button_container,
              ...{ backgroundColor: "#3B5998" }
            }}
          >
            <Text style={styles.sign_in_text}>SIGN IN WITH FACEBOOK</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.button_container,
              ...{
                backgroundColor: "#BD5240",
                marginTop: normalize(8, "height")
              }
            }}
          >
            <Text style={styles.sign_in_text}>SIGN IN WITH GOOGLE</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: normalize(32, "height")
          }}
        >
          <View style={styles.separating_line} />

          <View
            style={{
              marginHorizontal: normalize(8, "width")
            }}
          >
            <Text style={styles.or_text}>OR</Text>
          </View>

          <View style={styles.separating_line} />
        </View>

        <View
          style={{
            marginTop: normalize(32, "height")
          }}
        >
          <View
            style={{
              shadowOffset: {
                width: 0,
                height: 4
              },
              shadowRadius: 8,
              shadowColor: "black",
              shadowOpacity: 0.25,
              elevation: 4,
              backgroundColor: "white"
            }}
          >
            <TouchableOpacity
              style={styles.button_container}
              onPress={this._goToSignInScreen}
            >
              <Text style={styles.sign_in_text}>SIGN IN</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: normalize(32, "height"),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={styles.sign_up_small_text}>New to Quint?</Text>

          <TouchableOpacity
            style={{
              marginLeft: normalize(5, "width")
            }}
            onPress={this._goToSignUpScreen}
          >
            <Text style={styles.sign_up_small_underline_text}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
