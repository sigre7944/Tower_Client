import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch
} from 'react-native';

import SettingHeader from "./components/header/SettingHeader";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { styles } from "./styles/styles";

const window_width = Dimensions.get("window").width

const euro_symbol = <FontAwesome name="euro" color="#05838B" size={21} />
const dollar_symbol = <FontAwesome name="dollar" color="#05838B" size={21} />
const pound_symbol = <FontAwesome5 name="pound-sign" color="#05838B" size={21} />
const yen_symbol = <FontAwesome name="yen" color="#05838B" size={21} />

export default class Settings extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return ({
      header: <SettingHeader navigation={navigation} />,
      swipeable: false
    })
  }

  state = {
    sound_bool: true,
    vibration_bool: true,
  }

  _onSoundChange = () => {
    this.setState(prevState => ({
      sound_bool: !prevState.sound_bool
    }))
  }

  _onVibrationChange = () => {
    this.setState(prevState => ({
      vibration_bool: !prevState.vibration_bool
    }))
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
    let currency_symbol = euro_symbol

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
                value={this.state.sound_bool}
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
                value={this.state.vibration_bool}
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
                Currency
              </Text>

              {currency_symbol}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}