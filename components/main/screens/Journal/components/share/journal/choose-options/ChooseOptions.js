import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faEdit, faSortAmountUpAlt } from "@fortawesome/free-solid-svg-icons";

import { normalize } from "../../../../../../../shared/helpers";

import { styles } from "./styles/styles";
import SortPanel from "./sort-panel/SortPanel.Container";

const window_width = Dimensions.get("window").width;
const animation_duration = 150;
const easing = Easing.in();
const translate_y_value = normalize(200, "height");

export default class ChooseOptions extends React.PureComponent {
  translate_y_value = new Animated.Value(translate_y_value);

  sort_scale_value = new Animated.Value(0);
  sort_opacity_value = this.sort_scale_value.interpolate({
    inputRange: [0, 0.3, 0.5, 0.7, 1],
    outputRange: [0, 0.3, 0.5, 0.7, 1],
    extrapolate: "clamp"
  });

  state = {
    should_display_sort_panel: false
  };

  _animateStart = () => {
    Animated.timing(this.translate_y_value, {
      toValue: 0,
      duration: 200,
      easing,
      useNativeDriver: true
    }).start();
  };

  _animateSortStart = () => {
    Animated.timing(this.sort_scale_value, {
      toValue: 1,
      duration: animation_duration,
      easing,
      useNativeDriver: true
    }).start();
  };

  _animateEnd = callback => {
    Animated.timing(this.translate_y_value, {
      toValue: translate_y_value,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      callback();
    });
  };

  _animateSortEnd = callback => {
    Animated.timing(this.sort_scale_value, {
      toValue: 0,
      duration: animation_duration,
      easing,
      useNativeDriver: true
    }).start(() => {
      callback();
    });
  };

  _close = () => {
    if (this.state.should_display_sort_panel) {
      this._animateSortEnd(this._chooseSortBy);
      this._animateStart();
    } else {
      this._animateEnd(this.props._toggleEditMultipleTasksAction);
    }
  };

  _chooseEditMultipleTasks = () => {
    this._animateEnd(() => {
      this.props._toggleEditMultipleTasksAction();
      this.props.navigation.navigate("EditMultipleTasks");
    });
  };

  _chooseSortBy = () => {
    if (!this.state.should_display_sort_panel) {
      this._animateEnd(() => {
        this._animateSortStart();
        this.setState({
          should_display_sort_panel: true
        });
      });
    } else {
      this.setState({
        should_display_sort_panel: false
      });
    }
  };

  componentDidMount() {
    this._animateStart();
  }

  render() {
    return (
      <Modal transparent={true}>
        <View
          style={{
            flex: 1,
            position: "relative",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TouchableWithoutFeedback onPress={this._close}>
            <View
              style={{
                flex: 1,
                width: window_width,
                backgroundColor: "black",
                opacity: 0.2
              }}
            ></View>
          </TouchableWithoutFeedback>
          {this.state.should_display_sort_panel ? (
            <Animated.View
              style={{
                position: "absolute",
                width: normalize(327, "width"),
                paddingVertical: normalize(33, "height"),
                backgroundColor: "white",
                borderRadius: normalize(10, "width"),
                opacity: this.sort_opacity_value,
                transform: [{ scale: this.sort_scale_value }],
                paddingHorizontal: normalize(33, "width")
              }}
            >
              <SortPanel hideAction={this._close} />
            </Animated.View>
          ) : (
            <Animated.View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: normalize(10, "width"),
                borderTopRightRadius: normalize(10, "width"),
                backgroundColor: "white",
                transform: [{ translateY: this.translate_y_value }],
                paddingVertical: normalize(5, "width")
              }}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={this._close}
              >
                <View
                  style={{
                    width: normalize(37, "width"),
                    height: normalize(5, "height"),
                    backgroundColor: "#E0E0E0",
                    borderRadius: normalize(3, "width")
                  }}
                ></View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  marginTop: normalize(5, "height"),
                  paddingHorizontal: normalize(33, "width"),
                  flexDirection: "row",
                  alignItems: "center",
                  height: normalize(60, "height")
                }}
                onPress={this._chooseEditMultipleTasks}
              >
                <FontAwesomeIcon icon={faEdit} size={normalize(20, "width")} color="#05838B" />

                <Text style={styles.edit_text}>Edit multiple tasks</Text>
              </TouchableOpacity>

              <View style={styles.separating_line}></View>

              <TouchableOpacity
                style={{
                  marginTop: normalize(5, "height"),
                  paddingHorizontal: normalize(33, "width"),
                  flexDirection: "row",
                  alignItems: "center",
                  height: normalize(60, "height")
                }}
                onPress={this._chooseSortBy}
              >
                <FontAwesomeIcon
                  icon={faSortAmountUpAlt}
                  size={normalize(20, "width")}
                  color="#05838B"
                />

                <Text style={styles.edit_text}>Sort by</Text>
              </TouchableOpacity>

              {/* <View
                                style={styles.separating_line}
                            >
                            </View> */}

              {/* <TouchableOpacity
                                style={{
                                    marginTop: 5,
                                    paddingHorizontal: 33,
                                    flexDirection: "row",
                                    alignItems: "center",
                                    height: 60,
                                }}
                            >
                                <FontAwesomeIcon
                                    icon={faShareSquare}
                                    size={20}
                                    color="#05838B"
                                />

                                <Text
                                    style={styles.edit_text}
                                >
                                    Share
                            </Text>
                            </TouchableOpacity> */}
            </Animated.View>
          )}
        </View>
      </Modal>
    );
  }
}
