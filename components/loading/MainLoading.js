import React from "react";
import { View, Image, Modal, Animated, Platform } from "react-native";
// import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as firebase from "firebase";
import { Map } from "immutable";
import axios from "axios";
import { SERVER_URL } from "../../config";
import { fromJS } from "immutable";
// import SplashScreen from "react-native-splash-screen";

const waiting_time = 0; // 1s to load components

export default class MainLoading extends React.Component {
  opacity_value = new Animated.Value(1);

  state = {
    is_app_ready: false
  };

  _cacheResourcesAsync = async () => {
    let images = [
      require("../../assets/pngs/logo.png"),
      require("../../assets/pngs/no_main_reward_1x.png"),
      require("../../assets/pngs/premium_1x.png"),
      require("../../assets/pngs/have_no_reward_1x.png")
    ];

    const cacheImages = images.map(image => {
      if (typeof image === "string") {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });

    // const fonts = [
    //   {
    //     "sf-ui-display-light": require("../../assets/fonts/sf-ui-display-light.otf")
    //   },
    //   {
    //     "sf-ui-display-medium": require("../../assets/fonts/sf-ui-display-medium.otf")
    //   }
    // ];

    // const cacheFonts = fonts.map(font => {
    //   return Font.loadAsync(font);
    // });

    // await Promise.all([...cacheImages, ...cacheFonts]);
    await Promise.all([cacheImages]);
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

  _validateSubscription = (receipt_data, uuid) => {
    return axios({
      method: "POST",
      url: SERVER_URL + "payments/?action=validateSubscription",
      data: {
        receipt_data,
        uuid
      }
    });
  };

  _validateExpiryTimestamp = uuid => {
    return axios({
      method: "POST",
      url: SERVER_URL + "users/?action=validateExpiryTimestamp",
      data: {
        uuid
      }
    });
  };

  _checkAndUpdateCurrentUserAccount = async () => {
    let account = Map(this.props.generalSettings).get("account"),
      is_logged_in = Map(account).get("isLoggedIn");

    try {
      // If there is current logged in user, we do validations on subscription and expiry timestamp
      if (is_logged_in) {
        let billed = Map(account).getIn(["package", "billed"]),
          uuid = Map(account).get("uuid"),
          expiry_timestamp = Map(account).get("expiryTimestamp");

        // If expiry timestamp is past date, we have to validate with server
        if (expiry_timestamp < Date.now()) {
          let validate_expiry_timestamp_response = await this._validateExpiryTimestamp(
            uuid
          );
        }

        // If paid account, we validate its subscription
        if (billed) {
          let receipt_data = Map(account).get("iosLatestReceipt");

          let validate_sub_response = await this._validateSubscription(
            receipt_data,
            uuid
          );
        }

        let get_user_doc = await firebase
          .firestore()
          .collection("users")
          .doc(uuid)
          .get();

        this._updateAccountRedux(get_user_doc.data(), true);
      } else {
        let sign_out_response = await firebase.auth().signOut();
        this._updateAccountRedux({ package: { plan: "free" } }, false);
      }
    } catch (err) {
      let sign_out_response = await firebase.auth().signOut();
      this._updateAccountRedux({ package: { plan: "free" } }, false);
    }
  };

  _fade = callback => {
    Animated.timing(this.opacity_value, {
      toValue: 0,
      duration: 500,
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start(() => {
      callback();
    });
  };

  _imageOnLoad = () => {
    this._cacheResourcesAsync();
    this._checkAndUpdateCurrentUserAccount();

    setTimeout(() => {
      this._fade(this._setAppReady);
    }, waiting_time);
  };

  _setAppReady = () => {
    this.setState({ is_app_ready: true });
  };

  componentDidMount() {
    // SplashScreen.preventAutoHide();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.is_app_ready !== prevState.is_app_ready) {
      if (this.state.is_app_ready) {
        // SplashScreen.hide();
        this.props._setReady();
      }
    }
  }

  render() {
    // if (!this.state.is_app_ready) {
    return (
      <Modal>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            opacity: this.opacity_value
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            onLoad={this._imageOnLoad}
            style={{
              width: 150,
              height: 150
            }}
          />
        </Animated.View>
      </Modal>
    );
    // }

    // return <></>;
  }
}
