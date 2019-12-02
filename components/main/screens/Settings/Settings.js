import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  Picker
} from 'react-native';

import SettingHeader from "./components/header/SettingHeader";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles/styles";

import { Map } from "immutable";

import CurrencySetting from "./components/currency-setting/CurrencySetting.Container";

const window_width = Dimensions.get("window").width

export default class Settings extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return ({
      header: <SettingHeader navigation={navigation} />,
      swipeable: false
    })
  }

  state = {
  }

  _onSoundChange = () => {
    this.props.updateGeneralSettings(
      ["sound"],
      true,
      (value) => !value
    )
  }

  _onVibrationChange = () => {
    this.props.updateGeneralSettings(
      ["vibration"],
      true,
      (value) => !value
    )
  }

  componentDidMount() {
    const didFocusScreen = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.changeRouteAction(payload.state.routeName)
      }
    )
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <ScrollView>
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
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={styles.user_icon_container}
              >
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
                <Text
                  style={styles.normal_text}
                >
                  Sign in
              </Text>
              </View>
            </View>

            <Feather
              name="chevron-right"
              size={21}
              color="#6E6E6E"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 92,
              width: window_width,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 22,
              paddingVertical: 22,
              marginTop: 32,
              shadowOffset: {
                width: 4,
                height: 4
              },
              shadowRadius: 15,
              shadowColor: "rgb(0, 0, 0)",
              shadowOpacity: 0.08,
              backgroundColor: "white"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={styles.plan_icon_container}
              >
                <Ionicons
                  name="ios-star-outline"
                  color="#05838B"
                  size={26}
                />
              </View>

              <View
                style={{
                  marginLeft: 15
                }}
              >
                <Text
                  style={styles.normal_text}
                >
                  Upgrade to Premium
                </Text>

                <View
                  style={{
                    marginTop: 2
                  }}
                >
                  <Text
                    style={styles.small_text}
                  >
                    Unlock special features
                </Text>
                </View>
              </View>
            </View>

            <Feather
              name="chevron-right"
              size={21}
              color="#6E6E6E"
            />
          </TouchableOpacity>

          <View
            style={{
              paddingHorizontal: 22,
              marginTop: 32,
              marginBottom: 22,
            }}
          >
            <Text
              style={styles.normal_text}
            >
              Preference
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
            <View
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
                Sound
              </Text>

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

            <View
              style={styles.separating_line}
            />

            <View
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
                Vibration
              </Text>

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

            <View
              style={styles.separating_line}
            />
            <CurrencySetting />
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
              paddingHorizontal: 22,
              marginTop: 32,
              marginBottom: 22,
            }}
          >
            <Text
              style={styles.normal_text}
            >
              Support us
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
              shadowOpacity: 0.12,
              marginBottom: 32,
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
                Write a review
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
                Feedback
              </Text>

              <Feather
                name="chevron-right"
                size={21}
                color="#6E6E6E"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}