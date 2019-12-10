import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  Modal
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Map, List } from "immutable";
import { styles } from "./styles/styles";

const window_width = Dimensions.get("window").width;

export default class TitleDescriptionRow extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: 40,
          paddingHorizontal: 20,
        }}
      >
        <CompleteBox />

        <View
          style={{
            marginHorizontal: 20
          }}
        >
          <Text style={styles.title}>{this.props.title}</Text>

          <Text style={styles.description}>{this.props.description}</Text>
        </View>
      </View>
    );
  }
}

class CompleteBox extends React.PureComponent {
  render() {
    return (
      <View style={styles.complete_box_container}>
        {this.props.checked_complete ? <View></View> : null}

        <View></View>
      </View>
    );
  }
}
