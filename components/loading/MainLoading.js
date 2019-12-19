import React from "react";
import { View, Image } from "react-native";

import * as Font from "expo-font";
import { Asset } from "expo-asset";
import * as firebase from "firebase";
import { Map } from "immutable";
import axios from "axios";
import { SERVER_URL } from "../../config";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class MainLoading extends React.PureComponent {
  _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      require("../../assets/pngs/logo.png"),
      require("../../assets/pngs/no_main_reward_1x.png"),
      require("../../assets/pngs/premium_1x.png"),
      require("../../assets/pngs/have_no_reward_1x.png")
    ]);

    const fontAssets = Font.loadAsync({
      "sf-ui-display-light": require("../../assets/fonts/sf-ui-display/sf-ui-display-light.otf"),
      "sf-ui-display-medium": require("../../assets/fonts/sf-ui-display/sf-ui-display-medium.otf")
    });

    await Promise.all([...imageAssets, fontAssets]);
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

    // If there is current logged in user, we do validations on subscription
    if (is_logged_in) {
      let billed = Map(account).getIn(["package", "billed"]);

      // If paid account, we validate its subscription
      if (billed) {
        let receipt_data = Map(account).get("iosLatestReceipt"),
          uuid = Map(account).get("uuid");
        try {
          let promises = [
            this._validateSubscription(receipt_data, uuid),
            this._validateExpiryTimestamp(uuid)
          ];

          let promises_results = await Promise.all(promises);

          firebase
            .firestore()
            .collection("users")
            .doc(uuid)
            .get()
            .then(doc => {
              this._updateAccountRedux(doc.data(), true);
              this.props._setReady();
            })
            .catch(err => {});
        } catch (err) {
          // TO DO
        }
      }
    } else {
      this._updateAccountRedux({ package: { plan: "free" } }, false);
    }
  };

  componentDidMount() {
    this._loadAssetsAsync();
    this._checkAndUpdateCurrentUserAccount();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={this.props.logo}
            style={{
              flex: 1
            }}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}
