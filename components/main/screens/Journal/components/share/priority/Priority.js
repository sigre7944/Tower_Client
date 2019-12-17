import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Switch,
  TextInput,
  ScrollView,
  Keyboard,
  UIManager,
  Dimensions,
  Platform
} from "react-native";

import { Linking } from "expo";

import {
  check_icon,
  close_icon,
  priority_icon,
  reward_icon,
  question_icon
} from "../../../../../../shared/icons";
import { normalize } from "../../../../../../shared/helpers";
const icon_size = normalize(14, "width");
const icon_color = "#2C2C2C";

import { styles } from "./styles/styles";
import { Map, fromJS } from "immutable";

import PriorityPicker from "./priority-picker/PriorityPicker";

const panel_width = normalize(338, "width");
const panel_height = normalize(375, "height");
const animation_duration = 250;
const easing = Easing.in();
const window_height = Dimensions.get("window").height;

const extra_margin_from_keyboard = normalize(10, "height");

const text_input_state = TextInput.State;

export default class Priority extends React.PureComponent {
  opacity_value = new Animated.Value(0);

  translate_y_value = new Animated.Value(0);

  priority_stored_rewards = {
    pri_01: {
      defaultValue: Map(this.props.priorities).getIn([
        "pri_01",
        "defaultValue"
      ]),
      setValue: Map(this.props.priorities).getIn(["pri_01", "defaultValue"])
    },

    pri_02: {
      defaultValue: Map(this.props.priorities).getIn([
        "pri_02",
        "defaultValue"
      ]),
      setValue: Map(this.props.priorities).getIn(["pri_02", "defaultValue"])
    },

    pri_03: {
      defaultValue: Map(this.props.priorities).getIn([
        "pri_03",
        "defaultValue"
      ]),
      setValue: Map(this.props.priorities).getIn(["pri_03", "defaultValue"])
    },

    pri_04: {
      defaultValue: Map(this.props.priorities).getIn([
        "pri_04",
        "defaultValue"
      ]),
      setValue: Map(this.props.priorities).getIn(["pri_04", "defaultValue"])
    }
  };

  state = {
    selected_priority_value: "Do first",

    is_important: true,

    is_urgent: true,

    reward_value: "5",

    should_display_priority_picker: false

    // should_display_decision_matrix: false
  };

  _toggleDecisionMatrix = () => {
    // this.setState(prevState => ({
    //   should_display_decision_matrix: !prevState.should_display_decision_matrix
    // }));
    Linking.openURL("https://www.google.com/");
  };

  _choosePriorityPicker = () => {
    this.setState({
      should_display_priority_picker: true
    });
  };

  _closePriorityPicker = () => {
    this.setState({
      should_display_priority_picker: false
    });
  };

  _setPriorityValue = value => {
    if (value === "Do first") {
      this.setState({
        selected_priority_value: value,
        is_important: true,
        is_urgent: true,
        reward_value: Map(this.props.priorities)
          .getIn(["pri_01", "defaultValue"])
          .toString()
      });
    } else if (value === "Plan") {
      this.setState({
        selected_priority_value: value,
        is_important: true,
        is_urgent: false,
        reward_value: Map(this.props.priorities)
          .getIn(["pri_02", "defaultValue"])
          .toString()
      });
    } else if (value === "Delay") {
      this.setState({
        selected_priority_value: value,
        is_important: false,
        is_urgent: true,
        reward_value: Map(this.props.priorities)
          .getIn(["pri_03", "defaultValue"])
          .toString()
      });
    } else {
      this.setState({
        selected_priority_value: value,
        is_important: false,
        is_urgent: false,
        reward_value: Map(this.props.priorities)
          .getIn(["pri_04", "defaultValue"])
          .toString()
      });
    }
  };

  _onImportanceChange = value => {
    if (value === true) {
      if (this.state.is_urgent) {
        this.setState({
          is_important: value,
          selected_priority_value: "Do first",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_01", "defaultValue"])
            .toString()
        });
      } else {
        this.setState({
          is_important: value,
          selected_priority_value: "Plan",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_02", "defaultValue"])
            .toString()
        });
      }
    } else {
      if (this.state.is_urgent) {
        this.setState({
          is_important: value,
          selected_priority_value: "Delay",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_03", "defaultValue"])
            .toString()
        });
      } else {
        this.setState({
          is_important: value,
          selected_priority_value: "Delegate",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_04", "defaultValue"])
            .toString()
        });
      }
    }
  };

  _onUrgencyChange = value => {
    if (value === true) {
      if (this.state.is_important) {
        this.setState({
          is_urgent: value,
          selected_priority_value: "Do first",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_01", "defaultValue"])
            .toString()
        });
      } else {
        this.setState({
          is_urgent: value,
          selected_priority_value: "Delay",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_03", "defaultValue"])
            .toString()
        });
      }
    } else {
      if (this.state.is_important) {
        this.setState({
          is_urgent: value,
          selected_priority_value: "Plan",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_02", "defaultValue"])
            .toString()
        });
      } else {
        this.setState({
          is_urgent: value,
          selected_priority_value: "Delegate",
          reward_value: Map(this.props.priorities)
            .getIn(["pri_04", "defaultValue"])
            .toString()
        });
      }
    }
  };

  _onRewardValueChange = e => {
    this.setState({
      reward_value: e.nativeEvent.text.replace(/[,]/g, ".")
    });
  };

  _animate = edit => {
    Animated.timing(this.opacity_value, {
      toValue: 1,
      duration: animation_duration,
      easing,
      // useNativeDriver: edit ? false : true
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start();
  };

  _animateEnd = (callback, edit) => {
    Animated.timing(this.opacity_value, {
      toValue: 0,
      duration: animation_duration,
      easing,
      // useNativeDriver: edit ? false : true
      useNativeDriver: Platform.OS === "android" ? true : false
    }).start(() => {
      callback();
    });
  };

  _cancel = () => {
    this._animateEnd(this.props.hideAction, this.props.edit);
  };

  _save = () => {
    let { selected_priority_value, reward_value } = this.state;

    let priority_id = "";

    if (selected_priority_value === "Do first") {
      priority_id = "pri_01";
    } else if (selected_priority_value === "Plan") {
      priority_id = "pri_02";
    } else if (selected_priority_value === "Delay") {
      priority_id = "pri_03";
    } else {
      priority_id = "pri_04";
    }

    let sending_obj = {
      priority_data: {
        keyPath: ["priority"],
        notSetValue: {},
        updater: value =>
          fromJS({
            value: priority_id
          })
      },

      reward_data: {
        keyPath: ["reward"],
        notSetValue: {},
        updater: value =>
          fromJS({
            value: parseFloat(reward_value)
          })
      }
    };

    if (this.props.edit) {
      this.props._editFieldData(
        sending_obj.priority_data.keyPath,
        sending_obj.priority_data.notSetValue,
        sending_obj.priority_data.updater
      );
      this.props._editFieldData(
        sending_obj.reward_data.keyPath,
        sending_obj.reward_data.notSetValue,
        sending_obj.reward_data.updater
      );
    } else {
      this.props.updateTaskPriorityAndReward(sending_obj);
    }

    this._cancel();
  };

  _setDefaultRewardValue = () => {
    if (this.state.selected_priority_value === "Do first") {
      this.setState({
        reward_value: Map(this.props.priorities)
          .getIn(["pri_01", "defaultValue"])
          .toString()
      });
    } else if (this.state.selected_priority_value === "Plan") {
      this.setState({
        reward_value: Map(this.props.priorities)
          .getIn(["pri_02", "defaultValue"])
          .toString()
      });
    } else if (this.state.selected_priority_value === "Delay") {
      this.setState({
        reward_value: Map(this.props.priorities)
          .getIn(["pri_03", "defaultValue"])
          .toString()
      });
    } else {
      this.setState({
        reward_value: Map(this.props.priorities)
          .getIn(["pri_04", "defaultValue"])
          .toString()
      });
    }
  };

  _keyboardWillHideHandler = e => {
    if (this.state.reward_value.length === 0) {
      this._setDefaultRewardValue();
    }

    Animated.timing(this.translate_y_value, {
      toValue: 0,
      duration: e.duration,
      useNativeDriver: true
    }).start();
  };

  _keyboardWillShowHandler = e => {
    let keyboard_height = e.endCoordinates.height,
      keyboard_duration = e.duration;

    let currently_focused_input = text_input_state.currentlyFocusedField();

    UIManager.measure(
      currently_focused_input,
      (x, y, width, height, pageX, pageY) => {
        let input_height = height,
          input_py = pageY;

        let gap =
          window_height -
          keyboard_height -
          (input_height + input_py) -
          extra_margin_from_keyboard;

        if (gap < 0) {
          Animated.timing(this.translate_y_value, {
            toValue: gap,
            duration: keyboard_duration,
            useNativeDriver: true
          }).start();
        }
      }
    );
  };

  _keyboardDidHideHandler = e => {
    if (this.state.reward_value.length === 0) {
      this._setDefaultRewardValue();
    }

    Animated.timing(this.translate_y_value, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  _keyboardDidShowHandler = e => {
    let keyboard_height = e.endCoordinates.height,
      keyboard_duration = e.duration;

    let currently_focused_input = text_input_state.currentlyFocusedField();

    UIManager.measure(
      currently_focused_input,
      (x, y, width, height, pageX, pageY) => {
        let input_height = height,
          input_py = pageY;

        let gap =
          window_height -
          keyboard_height -
          (input_height + input_py) -
          extra_margin_from_keyboard;

        if (gap < 0) {
          Animated.timing(this.translate_y_value, {
            toValue: gap,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    );
  };

  _initializePriorityData = task_data => {
    let priority_id = Map(task_data).getIn(["priority", "value"]),
      reward_value = Map(task_data)
        .getIn(["reward", "value"])
        .toString();

    let priority_value = Map(this.props.priorities).getIn([
      priority_id,
      "name"
    ]);

    if (priority_value === "Do first") {
      this.setState({
        selected_priority_value: priority_value,
        is_important: true,
        is_urgent: true,
        reward_value: reward_value
      });
    } else if (priority_value === "Plan") {
      this.setState({
        selected_priority_value: priority_value,
        is_important: true,
        is_urgent: false,
        reward_value: reward_value
      });
    } else if (priority_value === "Delay") {
      this.setState({
        selected_priority_value: priority_value,
        is_important: false,
        is_urgent: true,
        reward_value: reward_value
      });
    } else {
      this.setState({
        selected_priority_value: priority_value,
        is_important: false,
        is_urgent: false,
        reward_value: reward_value
      });
    }
  };

  componentDidMount() {
    this._animate(this.props.edit);

    if (Platform.OS === "ios") {
      this.keyboardWillHideListener = Keyboard.addListener(
        "keyboardWillHide",
        this._keyboardWillHideHandler
      );

      this.keyboardWillShowListener = Keyboard.addListener(
        "keyboardWillShow",
        this._keyboardWillShowHandler
      );
    } else {
      this.keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        this._keyboardDidHideHandler
      );
      this.keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        this._keyboardDidShowHandler
      );
    }

    if (this.props.edit) {
      this._initializePriorityData(this.props.edit_task_data);
    } else {
      this._initializePriorityData(this.props.task_data);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.should_call_end_animation_from_parent !==
      prevProps.should_call_end_animation_from_parent
    ) {
      this._cancel();
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "ios") {
      Keyboard.removeListener(
        "keyboardWillHide",
        this._keyboardWillHideHandler
      );
      Keyboard.removeListener(
        "keyboardWillShow",
        this._keyboardWillShowHandler
      );
    } else {
      Keyboard.removeListener("keyboardDidHide", this._keyboardDidHideHandler);
      Keyboard.removeListener("keyboardDidShow", this._keyboardDidShowHandler);
    }
  }

  render() {
    let priority_container_style = styles.priority_do_first_container,
      priority_text_style = styles.priority_do_first_text;

    if (this.state.selected_priority_value === "Plan") {
      priority_container_style = styles.priority_plan_container;
      priority_text_style = styles.priority_plan_text;
    } else if (this.state.selected_priority_value === "Delay") {
      priority_container_style = styles.priority_delay_container;
      priority_text_style = styles.priority_delay_text;
    } else if (this.state.selected_priority_value === "Delegate") {
      priority_container_style = styles.priority_delegate_container;
      priority_text_style = styles.priority_delegate_text;
    }

    return (
      <>
        {/* {this.state.should_display_decision_matrix ? (
          <View
            style={{
              position: "absolute",
              width: panel_width,
              height: 392,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 29
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: 15,
                  height: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  backgroundColor: "#2D9CDB"
                }}
              >
                {question_icon(9, "white")}
              </View>

              <View
                style={{
                  marginLeft: 10
                }}
              >
                <Text style={styles.title}>The Eisenhower Decision Matrix</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 52
              }}
            >
              <View
                style={{
                  transform: [{ rotate: "-90deg" }],
                  backgroundColor: "yellow"
                }}
              >
                <Text
                  style={{ ...styles.normal_text, ...{ color: "#F78096" } }}
                >
                  Important
                </Text>
              </View>

              <View
                style={{
                  width: 117,
                  height: 92,
                  shadowOffset: {
                    width: 4,
                    height: 4
                  },
                  shadowRadius: 15,
                  shadowColor: "black",
                  shadowOpacity: 0.08,
                  borderRadius: 5,
                  marginLeft: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative"
                }}
              >
                <View
                  style={{
                    height: 92,
                    width: 10,
                    borderRadius: 30,
                    backgroundColor: "#F78096"
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      ...styles.matrix_upper_text,
                      ...{ color: "#F78096" }
                    }}
                  >
                    1. DO FIRST
                  </Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    transform: [{ translateY: 7 }],
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{ ...styles.normal_text, ...{ color: "#F78096" } }}
                  >
                    Urgent
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : ( */}
        <Animated.View
          style={{
            position: "absolute",
            width: panel_width,
            height: panel_height,
            backgroundColor: "white",
            borderRadius: normalize(10, "width"),
            overflow: "hidden",
            opacity: this.opacity_value,
            paddingVertical: normalize(5, "height")
          }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: this.translate_y_value }]
            }}
          >
            <ScrollView scrollEnabled={false} keyboardDismissMode="on-drag">
              <View
                style={{
                  marginTop: normalize(30, "height"),
                  marginHorizontal: normalize(30, "width"),
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      width: icon_size,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {priority_icon(icon_size, icon_color)}
                  </View>

                  <Text style={styles.title}>Priority</Text>

                  {/* <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: 15,
                      height: 15,
                      borderRadius: 15,
                      backgroundColor: "#2D9CDB",
                      marginLeft: 15
                    }}
                    onPress={this._toggleDecisionMatrix}
                  >
                    {question_icon(9, "white")}
                  </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                  style={priority_container_style}
                  onPress={this._choosePriorityPicker}
                >
                  <Text style={priority_text_style}>
                    {this.state.selected_priority_value}
                  </Text>
                </TouchableOpacity>

                <PriorityPicker
                  _closePriorityPicker={this._closePriorityPicker}
                  _setPriorityValue={this._setPriorityValue}
                  selected_priority_value={this.state.selected_priority_value}
                  should_display_priority_picker={
                    this.state.should_display_priority_picker
                  }
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: normalize(59, "width"),
                  marginRight: normalize(30, "width"),
                  marginTop: normalize(30, "height")
                }}
              >
                <Text style={styles.normal_text}>Importance</Text>

                <Switch
                  value={this.state.is_important}
                  onValueChange={this._onImportanceChange}
                  trackColor={{
                    false: "rgba(189, 189, 189, 0.2)",
                    true: "#05838B"
                  }}
                  ios_backgroundColor="rgba(189, 189, 189, 0.2)"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginLeft: normalize(59, "width"),
                  marginRight: normalize(30, "width"),
                  marginTop: normalize(30, "height")
                }}
              >
                <Text style={styles.normal_text}>Urgency</Text>

                <Switch
                  value={this.state.is_urgent}
                  onValueChange={this._onUrgencyChange}
                  trackColor={{
                    false: "rgba(189, 189, 189, 0.2)",
                    true: "#05838B"
                  }}
                  ios_backgroundColor="rgba(189, 189, 189, 0.2)"
                />
              </View>

              <View
                style={{
                  flex: 1,
                  height: 1,
                  flexDirection: "row",
                  backgroundColor: "rgba(0, 0, 0, 0.15)",
                  marginHorizontal: normalize(30, "width"),
                  marginTop: normalize(30, "height")
                }}
              ></View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: normalize(30, "height"),
                  marginHorizontal: normalize(30, "width")
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      width: icon_size,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    {reward_icon(icon_size, icon_color)}
                  </View>

                  <Text style={styles.title}>Reward</Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <TextInput
                    style={styles.reward_input}
                    maxLength={4}
                    value={this.state.reward_value}
                    onChange={this._onRewardValueChange}
                    keyboardType="numeric"
                  />

                  <Text style={styles.currency}>pts</Text>
                </View>
              </View>

              <View
                style={{
                  marginTop: normalize(28, "height"),
                  marginHorizontal: normalize(30, "width"),
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginBottom: normalize(35, "height")
                }}
              >
                <TouchableOpacity
                  style={styles.close_icon_holder}
                  onPress={this._cancel}
                >
                  {close_icon(normalize(19, "width"), "white")}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.save_icon_holder}
                  onPress={this._save}
                >
                  {check_icon(normalize(19, "width"), "white")}
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </Animated.View>
        {/* )} */}
      </>
    );
  }
}
