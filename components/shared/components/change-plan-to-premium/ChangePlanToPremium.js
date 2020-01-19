import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Easing
} from "react-native";

import { styles } from "./styles/styles";
import { normalize } from "../../helpers";
const window_width = Dimensions.get("window").width;
const logo_image = require("../../../../assets/pngs/logo.png");

export default class ChangePlanToPremium extends React.PureComponent {
  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
          }}
        >
          <TouchableWithoutFeedback onPress={this.props.dismissAction}>
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "black",
                opacity: 0.2
              }}
            />
          </TouchableWithoutFeedback>

          <View
            style={{
              position: "absolute",
              width: normalize(331, "width"),
              backgroundColor: "white",
              borderRadius: normalize(10, "width"),
              paddingHorizontal: normalize(22, "width"),
              paddingVertical: normalize(22, "height")
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                source={logo_image}
                style={{
                  width: normalize(150, "width"),
                  height: normalize(150, "width")
                }}
              />
            </View>
            <View
              style={{
                marginTop: normalize(32, "height"),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.normal_text}>
                Congratulations, your plan has been changed to Premium!
              </Text>
            </View>

            <View
              style={{
                marginTop: normalize(10, "height"),
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={styles.normal_text}>
                Stay productive and enjoy life!
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button_container}
              onPress={this.props.dismissAction}
            >
              <Text style={styles.button_text}>I understand</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
