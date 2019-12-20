import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Header from "./header/Header";

import { Map, fromJS } from "immutable";

import { plus_icon } from "../shared/icons";
import { normalize } from "../shared/helpers";

import { styles } from "./styles/styles";

import * as firebase from "firebase";

export default class SettingsAccountScreen extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => ({
    header: <Header navigation={navigation} />
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
    is_uploading_image: false,
    progress_percentage: 0,
    uuid: "",
    email: "",
    referral_code: "",
    expiry_timestamp: 0,
    renewal_timestamp: 0,
    plan: "free",
    billed: false,
    full_name: ""
  };

  _getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let permission = await this._getPermissionAsync();

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1
      });

      if (!result.cancelled) {
        let account = Map(this.props.generalSettings).get("account");
        let account_uuid = Map(account).get("uuid");
        let storage = firebase.storage();
        let storage_ref = storage.ref();
        let user_avatar_child_ref = storage_ref
          .child("images")
          .child(account_uuid)
          .child("avatar.jpg");

        let image_file = await fetch(result.uri);
        let image_blob = await image_file.blob();

        let upload_image_res = user_avatar_child_ref.put(image_blob, {
          contentType: "image/jpeg"
        });

        this.setState({
          is_uploading_image: true
        });

        let image_download_url = "";

        upload_image_res.on(
          "state_changed",
          snapshot => {
            let progress_percentage = parseFloat(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ).toFixed(2);

            this.setState({
              progress_percentage
            });
          },
          err => {
            alert("Could not upload avatar.");
            this.setState({
              image: null,
              is_uploading_image: false
            });
          },
          () => {
            upload_image_res.snapshot.ref
              .getDownloadURL()
              .then(download_url => {
                image_download_url = download_url;
                return firebase
                  .firestore()
                  .collection("users")
                  .doc(account_uuid)
                  .update({
                    avatarUrl: download_url
                  });
              })
              .then(() => {
                this.setState({
                  image: image_download_url,
                  is_uploading_image: false
                });
              })
              .catch(err => {
                this.setState({
                  image: null,
                  is_uploading_image: false
                });
              });
          }
        );
      }
    } catch (err) {
      this.setState({
        image: null,
        is_uploading_image: false
      });
    }
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

  _imageOnError = () => {
    this.setState({
      is_uploading_image: false,
      image: null
    });
  };

  componentDidMount() {
    let account = Map(Map(this.props.generalSettings).get("account")),
      account_image_url = account.get("avatarUrl");

    let email = account.get("email");

    if (email.length > 44) {
      email = String(email).substring(0, 44) + "...";
    }

    this.setState({
      uuid: account.get("uuid"),
      full_name: account.get("fullName"),
      email,
      referral_code: account.get("referralCode"),
      expiry_timestamp: parseInt(account.get("expiryTimestamp")),
      billed: account.getIn(["package", "billed"]),
      renewal_timestamp: parseInt(
        account.getIn(["package", "renewalTimestamp"])
      ),
      plan: account.getIn(["package", "plan"]),
      image: account_image_url
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
            marginTop: normalize(12, "height")
          }}
        >
          {this.state.is_uploading_image ? (
            <View style={styles.image_container}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <Text style={styles.progress_percentage_text}>
                  {this.state.progress_percentage} %
                </Text>

                <View style={{ marginLeft: 5 }}>
                  <ActivityIndicator color="#05838B" size="small" />
                </View>
              </View>
            </View>
          ) : (
            <>
              {this.state.image ? (
                <TouchableOpacity
                  style={styles.image_container}
                  onPress={this._pickImage}
                >
                  <Image
                    source={{ uri: this.state.image }}
                    style={{
                      width: normalize(150, "width"),
                      height: normalize(150, "width"),
                      borderRadius: normalize(150 / 2, "width"),
                      overflow: "hidden"
                    }}
                    resizeMode="contain"
                    onError={this._imageOnError}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.image_container}
                  onPress={this._pickImage}
                >
                  {plus_icon(normalize(18, "width"), "#05838B")}
                </TouchableOpacity>
              )}
            </>
          )}
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
            elevation: 8,
            paddingHorizontal: normalize(12, "width"),
            marginTop: normalize(48, "height")
          }}
        >
          <View style={styles.row_container}>
            <Text style={styles.normal_text}>User ID</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{ marginLeft: normalize(20, "width"), color: "#6E6E6E" }
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
                ...{
                  marginLeft: normalize(20, "width"),
                  color: "rgba(0, 0, 0, 0.5)"
                }
              }}
            >
              {this.state.email}
            </Text>
          </View>

          <View style={styles.separate_line} />

          <View style={styles.row_container}>
            <Text style={styles.normal_text}>Full name</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{
                  fontSize: normalize(18, "width"),
                  lineHeight: normalize(21, "height")
                }
              }}
            >
              {this.state.full_name}
            </Text>
          </View>

          <View style={styles.separate_line} />

          <View style={styles.row_container}>
            <Text style={styles.normal_text}>Referral code</Text>

            <Text
              style={{
                ...styles.highlight_text,
                ...{
                  fontSize: normalize(18, "width"),
                  lineHeight: normalize(21, "height")
                }
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
                ...{
                  fontSize: normalize(18, "width"),
                  lineHeight: normalize(21, "height")
                }
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
                ...{
                  fontSize: normalize(18, "width"),
                  lineHeight: normalize(21, "height")
                }
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
                    ...{
                      fontSize: normalize(18, "width"),
                      lineHeight: normalize(21, "height")
                    }
                  }}
                >
                  {renewal_date_text}
                </Text>
              </View>
            </>
          ) : null}
        </View>

        <View
          style={{
            marginTop: normalize(42, "height"),
            marginBottom: normalize(66, "height")
          }}
        >
          <TouchableOpacity
            style={{
              height: normalize(67, "height"),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowRadius: 8,
              shadowOpacity: 0.12,
              elevation: 8
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
