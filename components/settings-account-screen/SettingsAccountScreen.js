import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  Picker,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Header from "./header/Header";

import { Map, fromJS } from "immutable";

import { plus_icon } from "../shared/icons";

import { styles } from "./styles/styles";

import * as firebase from "firebase";

export default class SettingsAccountScreen extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => ({
    header: <Header navigation={navigation} />,
  });

  month_names = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  state = {
    image: null,
    uuid: "",
    email: "",
    referral_code: "",
    expiry_timestamp: 0,
    renewal_timestamp: 0,
    plan: "free",
    billed: false
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

  _goBackToSettings = () => {
    this.props.navigation.navigate("DrawerNavigator");
  };

  _logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        let sending_data = {
          isLoggedIn: false,
          package: {
            plan: "free"
          }
        };
        this.props.updateGeneralSettings(["account"], {}, value =>
          fromJS(sending_data)
        );

        this._goBackToSettings();
      })
      .catch(err => {
        // TO DO
      });
  };

  componentDidMount() {
    let account = Map(Map(this.props.generalSettings).get("account"));

    let email = account.get("email");

    if (email.length > 44) {
      email = String(email).substring(0, 44) + "...";
    }

    this.setState({
      uuid: account.get("uuid"),
      email,
      referral_code: account.get("referralCode"),
      expiry_timestamp: parseInt(account.get("expiryTimestamp")),
      billed: account.getIn(["package", "billed"]),
      renewal_timestamp: parseInt(
        account.getIn(["package", "renewalTimestamp"])
      ),
      plan: account.getIn(["package", "plan"])
    });
  }

  render() {
    let expiry_date = new Date(this.state.expiry_timestamp),
      expiry_date_text = `${
        this.month_names[expiry_date.getMonth()]
      } ${expiry_date.getDate()} ${expiry_date.getFullYear()}`;

    let renewal_date = new Date(this.state.renewal_timestamp),
      renewal_date_text = `${
        this.month_names[renewal_date.getMonth()]
      } ${renewal_date.getDate()} ${renewal_date.getFullYear()}`;

    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12
          }}
        >
          <TouchableOpacity
            style={styles.image_container}
            onPress={this._pickImage}
          >
            {plus_icon(18, "#05838B")}
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: "white",
            shadowOffset: {
              width: 4,
              height: 4
            },
            shadowOpacity: 0.08,
            shadowRadius: 15,
            shadowColor: "black",
            paddingHorizontal: 12,
            marginTop: 48
          }}
        >
          <View style={styles.row_container}>
            <Text style={styles.normal_text}>User ID</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{ marginLeft: 20, color: "#6E6E6E" }
              }}
            >
              {this.state.uuid}
            </Text>
          </View>

          <View style={styles.separate_line} />

          <View style={styles.row_container}>
            <Text style={styles.normal_text}>Email</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{ marginLeft: 20, color: "rgba(0, 0, 0, 0.5)" }
              }}
            >
              {this.state.email}
            </Text>
          </View>

          <View style={styles.separate_line} />

          <View style={styles.row_container}>
            <Text style={styles.normal_text}>Referral code</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{ fontSize: 18, lineHeight: 21 }
              }}
            >
              {this.state.referral_code}
            </Text>
          </View>

          <View style={styles.separate_line} />

          <View style={styles.row_container}>
            <Text style={styles.normal_text}>Expiry date</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{ fontSize: 18, lineHeight: 21 }
              }}
            >
              {expiry_date_text}
            </Text>
          </View>

          <View style={styles.separate_line} />

          <View style={styles.row_container}>
            <Text style={styles.normal_text}>Plan</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{ fontSize: 18, lineHeight: 21 }
              }}
            >
              {this.state.plan}
            </Text>
          </View>

          {this.state.billed ? (
            <>
              <View style={styles.separate_line} />

              <View style={styles.row_container}>
                <Text style={styles.normal_text}>Renewal date</Text>

                <Text
                  style={{
                    ...styles.highlight_text,
                    ...{ fontSize: 18, lineHeight: 21 }
                  }}
                >
                  {renewal_date_text}
                </Text>
              </View>
            </>
          ) : null}
        </View>

        <View style={{ marginTop: 42, marginBottom: 66 }}>
          <TouchableOpacity
            style={{
              height: 67,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowRadius: 8,
              shadowOpacity: 0.12
            }}
            onPress={this._logOut}
          >
            <Text style={styles.log_out_text}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
