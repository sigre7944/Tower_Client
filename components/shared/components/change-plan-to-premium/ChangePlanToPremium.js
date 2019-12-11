import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  Picker,
  Modal,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  Animated,
  Easing
} from "react-native";

import { styles } from "./styles/styles";

import { close_icon, check_icon } from "../../icons";

const icon_size = 24;
const icon_color = "#05838B";

const check_icon_size = 19;

const window_width = Dimensions.get("window").width;
const window_height = Dimensions.get("window").height;
const anim_duration = 350;
const easing = Easing.in();
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
              width: 331,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 22
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
                  width: 150,
                  height: 150
                }}
              />
            </View>
            <View
              style={{
                marginTop: 32,
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
                marginTop: 10,
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
