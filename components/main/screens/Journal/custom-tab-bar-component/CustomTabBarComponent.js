import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Easing,
  Animated
} from "react-native";

const window_width = Dimensions.get("window").width;

import { styles } from "./styles";
import { normalize } from "../../../../shared/helpers";

export default class CustomTabBarComponent extends React.PureComponent {
  translate_x = new Animated.Value(0);

  state = {
    current_index: 0
  };

  goToDayScreen = () => {
    Animated.timing(this.translate_x, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(),
      useNativeDriver: true
    }).start();

    this.setState(
      {
        current_index: 0
      },
      () => {
        this.props.navigation.navigate("Day");
        this.props.updateCurrentChosenJournalType("day");
      }
    );
  };
  goToWeekScreen = () => {
    Animated.timing(this.translate_x, {
      toValue: (window_width * 1) / 3,
      duration: 300,
      easing: Easing.in(),
      useNativeDriver: true
    }).start();

    this.setState(
      {
        current_index: 1
      },
      () => {
        this.props.navigation.navigate("Week");
        this.props.updateCurrentChosenJournalType("week");
      }
    );
  };

  goToMonthScreen = () => {
    Animated.timing(this.translate_x, {
      toValue: (window_width * 2) / 3,
      duration: 300,
      easing: Easing.in(),
      useNativeDriver: true
    }).start();

    this.setState(
      {
        current_index: 2
      },
      () => {
        this.props.navigation.navigate("Month");
        this.props.updateCurrentChosenJournalType("month");
      }
    );
  };

  componentDidMount() {
    this.goToDayScreen();
  }

  render() {
    return (
      <View
        style={{
          // marginTop: normalize(13, "height"),
          height: normalize(41, "height"),
          justifyContent: "center"
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width / 3,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <Animated.View
            style={{
              height: normalize(3, "height"),
              width: normalize(52, "width"),
              backgroundColor: "#05838B",
              borderRadius: normalize(30, "width"),
              transform: [{ translateX: this.translate_x }]
            }}
          ></Animated.View>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1
          }}
        >
          <TouchableOpacity
            style={styles.annotation_container}
            onPress={this.goToDayScreen}
          >
            <Text
              style={
                this.state.current_index === 0
                  ? styles.chosen_annotation_text
                  : styles.annotation_text
              }
            >
              Day
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.annotation_container}
            onPress={this.goToWeekScreen}
          >
            <Text
              style={
                this.state.current_index === 1
                  ? styles.chosen_annotation_text
                  : styles.annotation_text
              }
            >
              Week
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.annotation_container}
            onPress={this.goToMonthScreen}
          >
            <Text
              style={
                this.state.current_index === 2
                  ? styles.chosen_annotation_text
                  : styles.annotation_text
              }
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
