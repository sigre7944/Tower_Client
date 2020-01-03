import React from "react";
import { Map } from "immutable";
import { View, Text, Modal, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./styles/styles";
import { normalize } from "../../../shared/helpers";

const window_width = Dimensions.get("window").width;

export default class ActiveActions extends React.PureComponent {
  state = {};

  _goToSignUp = () => {};

  _cancel = () => {
    this.props.updateGeneralSettings(
      ["active_info", "beta_suggest_login"],
      true,
      v => !v
    );
  };

  componentDidMount() {}

  render() {
    let beta_suggest_login = Map(this.props.generalSettings).getIn([
      "active_info",
      "beta_suggest_login"
    ]);
    return (
      <>
        {beta_suggest_login ? (
          <Modal transparent={true}>
            <View
              style={{
                flex: 1,
                position: "relative",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: window_width,
                  backgroundColor: "black",
                  opacity: 0.2
                }}
              />

              <View
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  padding: normalize(22, "width"),
                  width: "80%",
                  borderRadius: normalize(10, "width")
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.big_text}>Thank you for testing!</Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: normalize(22, "height")
                  }}
                >
                  <Text style={styles.normal_text}>
                    Please create a Quint account so you can get access to all
                    features. Don't worry, your testing account will be
                    persisted and granted gifts from our team!
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: normalize(22, "height")
                  }}
                >
                  <Text style={styles.small_text}>
                    You can sign up by going to "Settings" -> "Sign In or Sign
                    up"
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.go_to_sign_in_container}
                  onPress={this._goToSignUp}
                >
                  <Text style={styles.go_to_sign_in_text}>Go to Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.understand_container}
                  onPress={this._cancel}
                >
                  <Text style={styles.understand_text}>I understand</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : null}
      </>
    );
  }
}
