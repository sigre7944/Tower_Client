import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch
} from "react-native";

import SettingHeader from "./components/header/SettingHeader";
import UserAccount from "./components/user-account/UserAccount.Container";
import PremiumRow from "./components/premium-row/PremiumRow.Container";
import Feather from "react-native-vector-icons/Feather";
import { styles } from "./styles/styles";
import { normalize } from "../../../shared/helpers";
import { Map } from "immutable";

const window_width = Dimensions.get("window").width;

export default class Settings extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      header: <SettingHeader navigation={navigation} />,
      swipeEnabled: false
    };
  };

  state = {};

  _onSoundChange = () => {
    this.props.updateGeneralSettings(["sound"], true, value => !value);
  };

  _onVibrationChange = () => {
    this.props.updateGeneralSettings(["vibration"], true, value => !value);
  };

  componentDidMount() {
    const didFocusScreen = this.props.navigation.addListener(
      "didFocus",
      payload => {
        this.props.changeRouteAction(payload.state.routeName);
      }
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1
        }}
      >
        <ScrollView>
          <UserAccount navigation={this.props.navigation} />

          <PremiumRow
            navigation={this.props.navigation}
            _togglePremiumAdvert={this._togglePremiumAdvert}
          />

          <View
            style={{
              paddingHorizontal: normalize(22, "width"),
              marginTop: normalize(32, "height"),
              marginBottom: normalize(22, "height")
            }}
          >
            <Text style={styles.normal_text}>Preference</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowRadius: 8,
              shadowColor: "black",
              shadowOpacity: 0.12
            }}
          >
            <View
              style={{
                height: normalize(59, "height"),
                width: window_width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: normalize(22, "width"),
                paddingVertical: normalize(18, "height")
              }}
            >
              <Text style={styles.normal_text}>Sound</Text>

              <Switch
                value={Map(this.props.generalSettings).get("sound")}
                onValueChange={this._onSoundChange}
                trackColor={{
                  false: "rgba(189, 189, 189, 0.2)",
                  true: "#05838B"
                }}
                ios_backgroundColor="rgba(189, 189, 189, 0.2)"
              />
            </View>

            <View style={styles.separating_line} />

            <View
              style={{
                height: normalize(59, "height"),
                width: window_width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: normalize(22, "width"),
                paddingVertical: normalize(18, "height")
              }}
            >
              <Text style={styles.normal_text}>Vibration</Text>

              <Switch
                value={Map(this.props.generalSettings).get("vibration")}
                onValueChange={this._onVibrationChange}
                trackColor={{
                  false: "rgba(189, 189, 189, 0.2)",
                  true: "#05838B"
                }}
                ios_backgroundColor="rgba(189, 189, 189, 0.2)"
              />
            </View>

            <View style={styles.separating_line} />
            {/* <CurrencySetting /> */}
          </View>

          {/* <View
            style={{
              paddingHorizontal: 22,
              marginTop: 32,
              marginBottom: 22,
            }}
          >
            <Text
              style={styles.normal_text}
            >
              Instruction
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowRadius: 8,
              shadowColor: "black",
              shadowOpacity: 0.12
            }}
          >
            <TouchableOpacity
              style={{
                height: 59,
                width: window_width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 22,
                paddingVertical: 18
              }}
            >
              <Text
                style={styles.normal_text}
              >
                User manual
              </Text>

              <Feather
                name="chevron-right"
                size={21}
                color="#6E6E6E"
              />
            </TouchableOpacity>

            <View
              style={styles.separating_line}
            />
            <TouchableOpacity
              style={{
                height: 59,
                width: window_width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 22,
                paddingVertical: 18
              }}
            >
              <Text
                style={styles.normal_text}
              >
                How Quint works?
              </Text>

              <Feather
                name="chevron-right"
                size={21}
                color="#6E6E6E"
              />
            </TouchableOpacity>

            <View
              style={styles.separating_line}
            />

            <TouchableOpacity
              style={{
                height: 59,
                width: window_width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 22,
                paddingVertical: 18
              }}
            >
              <Text
                style={styles.normal_text}
              >
                Question us
              </Text>

              <Feather
                name="chevron-right"
                size={21}
                color="#6E6E6E"
              />
            </TouchableOpacity>
          </View> */}

          <View
            style={{
              paddingHorizontal: normalize(22, "width"),
              marginTop: normalize(32, "height"),
              marginBottom: normalize(22, "height")
            }}
          >
            <Text style={styles.normal_text}>Support us</Text>
          </View>

          <View
            style={{
              backgroundColor: "white",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowRadius: 8,
              shadowColor: "black",
              shadowOpacity: 0.12,
              marginBottom: normalize(32, "height")
            }}
          >
            <TouchableOpacity
              style={{
                height: normalize(59, "height"),
                width: window_width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: normalize(22, "width"),
                paddingVertical: normalize(18, "height")
              }}
            >
              <Text style={styles.normal_text}>Write a review</Text>

              <Feather
                name="chevron-right"
                size={normalize(21, "width")}
                color="#6E6E6E"
              />
            </TouchableOpacity>

            <View style={styles.separating_line} />

            <TouchableOpacity
              style={{
                height: normalize(59, "height"),
                width: window_width,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: normalize(22, "width"),
                paddingVertical: normalize(18, "height")
              }}
            >
              <Text style={styles.normal_text}>Feedback</Text>

              <Feather
                name="chevron-right"
                size={normalize(21, "width")}
                color="#6E6E6E"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
