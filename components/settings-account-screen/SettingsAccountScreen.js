import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Switch,
  Picker,
  Image
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Header from "./header/Header";

export default class SettingsAccountScreen extends React.PureComponent {
  static navigationOptions = ({ navigation, navigationOptions }) => ({
    header: <Header navigation={navigation} />,
    swipeable: false
  });

  state = {
    image: null,
    uuid: "",
    email: "",
    referral_code: "",
    expiry_timestamp: 0,
    renewal_timestamp: 0,
    plan: "free",
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let permission = await this.getPermissionAsync();

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    } catch (err) {}
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white"
        }}
      >
        <TouchableOpacity></TouchableOpacity>
      </View>
    );
  }
}
