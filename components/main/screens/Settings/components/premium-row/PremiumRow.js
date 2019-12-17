import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

import PremiumAd from "../../../../../shared/components/premium-ad/PremiumAd.Container";
import PremiumFeatures from "../../../../../shared/components/premium-features/PremiumFeatures";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles/styles";

import { Map } from "immutable";
import { normalize } from "../../../../../shared/helpers";
const window_width = Dimensions.get("window").width;

export default class Settings extends React.PureComponent {
  state = {
    account_plan: "free",
    should_display_premium_ad: false
  };

  _togglePremiumAdvert = () => {
    this.setState(prevState => ({
      should_display_premium_ad: !prevState.should_display_premium_ad
    }));
  };

  _updateAccountPlan = () => {
    let account_plan = Map(this.props.generalSettings).getIn([
      "account",
      "package",
      "plan"
    ]);

    this.setState({
      account_plan
    });
  };

  _goToLogin = () => {
    this.setState(
      {
        should_display_premium_ad: false
      },
      () => {
        this.props.navigation.navigate("SignInScreen");
      }
    );
  };

  componentDidMount() {
    this._updateAccountPlan();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Map(this.props.generalSettings).getIn(["account", "package", "plan"]) ||
      Map(prevProps.generalSettings).getIn(["account", "package", "plan"])
    ) {
      this._updateAccountPlan();
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          height: normalize(92, "height"),
          width: window_width,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: normalize(22, "width"),
          paddingVertical: normalize(22, "height"),
          marginTop: normalize(32, "height"),
          shadowOffset: {
            width: 4,
            height: 4
          },
          shadowRadius: 15,
          shadowColor: "rgb(0, 0, 0)",
          shadowOpacity: 0.08,
          backgroundColor: "white",
          elevation: 4,
        }}
        onPress={this._togglePremiumAdvert}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <View style={styles.plan_icon_container}>
            <Ionicons name="ios-star-outline" color="#05838B" size={normalize(26, "width")} />
          </View>

          {this.state.account_plan === "free" ? (
            <>
              <View
                style={{
                  marginLeft: normalize(15, "width")
                }}
              >
                <Text style={styles.normal_text}>Upgrade to Premium</Text>

                <View
                  style={{
                    marginTop: normalize(2, "height")
                  }}
                >
                  <Text style={styles.small_text}>Unlock special features</Text>
                </View>
              </View>
            </>
          ) : (
            <>
              <View
                style={{
                  marginLeft: normalize(15, "width")
                }}
              >
                <Text
                  style={{ ...styles.normal_text, ...{ color: "#05838B" } }}
                >
                  You're using Premium plan
                </Text>

                <View
                  style={{
                    marginTop: normalize(2, "height")
                  }}
                >
                  <Text style={styles.small_text}>See all features</Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* <Feather
              name="chevron-right"
              size={21}
              color="#6E6E6E"
            /> */}

        {this.state.should_display_premium_ad ? (
          <>
            {this.state.account_plan === "free" ? (
              <PremiumAd
                dismissAction={this._togglePremiumAdvert}
                _goToLogin={this._goToLogin}
              />
            ) : (
              <PremiumFeatures dismissAction={this._togglePremiumAdvert} />
            )}
          </>
        ) : null}
      </TouchableOpacity>
    );
  }
}
